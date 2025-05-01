import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View, GestureResponderEvent } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';

interface GlassButtonProps {
  title?: string;
  onPress?: (event: GestureResponderEvent) => void;
}

const getRandomColor = (): string => {
  const letters = '0123456789ABCDEF';
  return '#' + Array.from({ length: 6 })
    .map(() => letters[Math.floor(Math.random() * 16)])
    .join('');
};

const GlassButton: React.FC<GlassButtonProps> = ({ title = 'Click Me', onPress }) => {
  const color1 = getRandomColor();
  const color2 = getRandomColor();

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <View style={styles.wrapper}>
        <LinearGradient
          colors={[color1, color2]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[StyleSheet.absoluteFillObject, styles.gradientBackground]}
        />
        <BlurView intensity={50} tint="light" style={styles.glassContainer}>
          <Text style={styles.text}>{title}</Text>
        </BlurView>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    height: 50,
    borderRadius: 10,
    borderWidth: 1,
    overflow: 'hidden',
    margin: 10,
  },
  gradientBackground: {
    opacity: 0.4,
  },
  glassContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    // borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 16,
  },
  text: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default GlassButton;
