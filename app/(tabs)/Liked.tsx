import { FlatList, Image, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { router } from 'expo-router';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useFocusEffect } from '@react-navigation/native';

interface LikedWallpaper {
  id: string;
  name: string;
  category: string;
}

const Liked = () => {
  const [likedWallpapers, setLikedWallpapers] = useState<LikedWallpaper[]>([]);
  const url = "https://raw.githubusercontent.com/AngelJumbo/gruvbox-wallpapers/refs/heads/main/wallpapers/"
  const tabBarHeight = useBottomTabBarHeight();
  
  const getLiked = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const liked = keys.map((key) => {
        return {
          id: key,
          name: key.split(`/`).pop() as string,
          category: key.split(`/`)[0] as string,
        }
      })
      setLikedWallpapers(liked);
    }
    catch (e) {
      console.error('Error loading data', e);
    }
  }

  // Replace useEffect with useFocusEffect
  useFocusEffect(
    React.useCallback(() => {
      getLiked();
      console.log("likedWallpapers", likedWallpapers);
      return () => {
        // cleanup if needed
      };
    }, [])
  );

  return (
   <View style={{ backgroundColor: '#18181b', flex:1, paddingBottom: tabBarHeight }}>
     <StatusBar barStyle="default" backgroundColor={"#18181b"}/>
     <SafeAreaView style={{ flex: 1, alignItems: 'center', width: '100%' }}>
       <View style={{marginTop:5, marginBottom:10}}>
         <Text style={{ color: 'white', fontSize: 24 }}>Liked Wallpapers</Text>
       </View>
       <FlatList
         style={{ width: '100%', paddingHorizontal:6, paddingBottom: 10 }}
         data={likedWallpapers}
         keyExtractor={(item) => item.id.toString()}
         numColumns={2}
         ItemSeparatorComponent={() => <View style={{ height: 6 }} />}
         renderItem={({ item }) => (
           <TouchableOpacity
             activeOpacity={0.7}
             onPress={() => router.push({
               pathname: "/open",
               params: { category: item.category, name: item.name }
             })}
             style={{ width: "50%", paddingHorizontal: 3 }}
           >
             <Image 
               source={{ uri: `${url}${item.category}/${item.name}` }} 
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

export default Liked

const styles = StyleSheet.create({})