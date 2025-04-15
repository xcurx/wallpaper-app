import { StyleSheet, Text, View, Animated } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'

const Toast = ({set, duration = 3000}:{set:string, duration?: number}) => {
    const [toast, setToast] = useState(""); 
    const animatedValue = useRef(new Animated.Value(0)).current;
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    
    useEffect(() => {
        if (set) {
            setToast(set);
            setTimeout(() => setToast(""), duration);
        } else {
            setToast("");
        }
    }, [set])

    useEffect(() => {
        if (toast) {
            // Clear any existing timer
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
            
            // Animate toast up
            Animated.timing(animatedValue, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            }).start();
            
            // Set timer to close toast
            timerRef.current = setTimeout(() => {
                Animated.timing(animatedValue, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: true,
                }).start();
            }, duration);
        } else {
            // Animate toast down
            Animated.timing(animatedValue, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }).start();
        }
        
        // Cleanup function
        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
        };
    }, [toast, duration, animatedValue]);
    
    const translateY = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [100, 0],
    });
    
    return (
        <Animated.View
         style={{
                 position: 'absolute',
                 bottom: 20,
                 left: 0,
                 right: 0,
                 backgroundColor: '#dc2626',
                 padding: 10,
                 marginHorizontal: 20,
                 borderRadius: 10,
                 marginBottom: 10,
                 alignItems: 'center',
                 justifyContent: 'center',
                 transform: [{ translateY }],
                 opacity: animatedValue,
                 zIndex: 1000,
         }}
        >
            <Text style={{color:"white"}}>{toast}</Text>
        </Animated.View>
    )
}

export default Toast

const styles = StyleSheet.create({})