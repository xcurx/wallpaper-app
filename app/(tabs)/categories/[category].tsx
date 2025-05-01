import { FlatList, Image, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useWallpapers } from '@/hooks/useWallpapers';
import { router, useLocalSearchParams } from 'expo-router';
import { WallperKey } from '@/assets/wallpapers';

const Categories = () => {
    const url = "https://raw.githubusercontent.com/AngelJumbo/gruvbox-wallpapers/refs/heads/main/wallpapers/"   
    const { category } = useLocalSearchParams();
    const { wallpersByCategory } = useWallpapers(category as WallperKey)
    const tabBarHeight = useBottomTabBarHeight();
    
  return (
    <View style={{ backgroundColor: '#18181b', flex:1 }}>
          <StatusBar barStyle="default" backgroundColor={"#18181b"}/>
          <SafeAreaView style={{ flex: 1, alignItems: 'center', width: '100%' }}>
            <View style={{marginTop:5, marginBottom:10}}>
              <Text style={{ color: 'white', fontSize: 24 }}>{(category as string)[0].toUpperCase() + (category as string).slice(1)}</Text>
            </View>
            <FlatList
             style={{ width: '100%', paddingHorizontal:6, paddingBottom: 10 }}
             contentContainerStyle={{ paddingBottom: tabBarHeight + 10 }} 
             data={wallpersByCategory}
             keyExtractor={(item) => item.id.toString()}
             numColumns={2}
             ItemSeparatorComponent={() => <View style={{ height: 6 }} />}
             renderItem={({ item }) => (
               <TouchableOpacity 
                 activeOpacity={0.7}
                 onPress={() => router.push({
                   pathname: "/open",
                   params: { category, name: item.name }
                 })}
                 style={{ width: "50%", paddingHorizontal: 3 }}
               >
                 <Image 
                   source={{ uri: `${url}${category}/${item.name}` }} 
                   style={{ 
                     width: '100%',
                     aspectRatio: 16/9,
                     borderRadius: 10, 
                     padding: 3,
                     backgroundColor:"#27272a"
                   }} 
                 />
               </TouchableOpacity>
             )}
            />
          </SafeAreaView>
        </View>
  )
}

export default Categories

const styles = StyleSheet.create({})