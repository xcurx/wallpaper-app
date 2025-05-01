import { FlatList, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useWallpapers } from '@/hooks/useWallpapers';
import { router } from 'expo-router';
import GlassButton from '@/components/GlassButton';

const Categories = () => {
    const tabBarHeight = useBottomTabBarHeight();
    const { categories } = useWallpapers();
  return (
    <View style={{ backgroundColor: '#18181b', flex:1, paddingBottom: tabBarHeight }}>
          <StatusBar barStyle="default" backgroundColor={"#18181b"}/>
          <SafeAreaView style={{ flex: 1, alignItems: 'center', width: '100%' }}>
            <View style={{marginTop:5, marginBottom:10}}>
              <Text style={{ color: 'white', fontSize: 24 }}>Categories</Text>
            </View>
            <FlatList
             style={{ width: '100%', paddingHorizontal:0, paddingBottom: 10 }}
             data={categories}
             keyExtractor={(item) => item}
             numColumns={1}
             ItemSeparatorComponent={() => <View style={{ height: 6 }} />}
             renderItem={({ item }) => (
                <GlassButton 
                 title={item.split("").map(e => e.toUpperCase()).join("")}
                 onPress={() => router.push({
                    pathname: "/categories/[category]",
                    params: { category: item },
                 })}
                />
             )}
            />
          </SafeAreaView>
    </View>
  )
}

export default Categories

const styles = StyleSheet.create({})