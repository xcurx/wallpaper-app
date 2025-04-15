import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import Toast from '@/components/Toast';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import AsyncStorage from '@react-native-async-storage/async-storage';

const open = () => {
  const url = "https://raw.githubusercontent.com/AngelJumbo/gruvbox-wallpapers/refs/heads/main/wallpapers/"
  const { category, name } = useLocalSearchParams();
  const [isLiked, setIsLiked] = useState(false);
  const [toast, setToast] = useState("");

  const handlePress = (message:string) => {
    setToast(message);
    setTimeout(() => { 
      setToast("");
    }
    , 3000);
  } 

  const handleDownload = async () => {
    try { 
      // Request permissions
      const { status } = await MediaLibrary.requestPermissionsAsync();
      
      if (status !== 'granted') {
        handlePress("Permission denied!");
        return;
      }
      
      // Download the file
      const fileUri = `${FileSystem.documentDirectory}${name}`;
      const downloadResumable = FileSystem.createDownloadResumable(
        `${url}${category}/${name}`,
        fileUri
      );
      
      const result = await downloadResumable.downloadAsync();
      if (!result) {
        handlePress("Download failed!");
        return;
      }
      const { uri } = result;
      
      // Save to media library
      const asset = await MediaLibrary.createAssetAsync(uri);
      await MediaLibrary.createAlbumAsync("Wallpapers", asset, false);
      
      handlePress("Wallpaper downloaded!");
    } catch (error) {
      console.error(error);
      handlePress("Download failed!");
    }
  }

  const handleLiked = async () => {
    try {
      const value = await AsyncStorage.getItem(`${category}/${name}`);
      if( value !== null) {
        setIsLiked(false);
        await AsyncStorage.removeItem(`${category}/${name}`);
        handlePress("Removed from liked!");
      } else {
        setIsLiked(true);
        await AsyncStorage.setItem(`${category}/${name}`, JSON.stringify({ category, name }));
        handlePress("Added to liked!");
      } 
    } catch (e) {
      console.error('Error loading data', e);
    }
  }

  useEffect(() => {
    const checkLiked = async () => {
      try {
        const value = await AsyncStorage.getItem(`${category}/${name}`);
        if (value !== null) {
          setIsLiked(true);
        } else {
          setIsLiked(false);
        }
      } catch (e) {
        console.error('Error loading data', e);
      }
    }
    checkLiked();
  },[isLiked])
  
  return (
    <View style={{ backgroundColor: '#18181b', flex:1, paddingTop:10, justifyContent:"center" }}>
      <View style={{ padding:10, marginBottom:10 }}>
        <Image 
          source={{ uri: `${url}${category}/${name}` }} 
          style={{ 
            width: '100%',
            aspectRatio: 16/9,
            borderRadius: 10, 
            padding: 3,
            backgroundColor:"#27272a"
          }} 
        />
      </View>
      <View style={{ padding:10, width:"100%", flexDirection:"row", gap:10, alignItems:"center" }}>
        <TouchableOpacity 
         style={{
          flex:1,
          backgroundColor: '#dc2626',
          padding: 10,
          borderRadius: 10,
          marginBottom: 10,
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
          gap: 20,
         }}
         onPress={handleDownload}
        >
          <Text style={{ color:"white", fontSize:18 }}>Download</Text>
          <FontAwesome size={28} name="download" color={"white"} />
        </TouchableOpacity>
        <TouchableOpacity 
         style={{
          backgroundColor: '#dc2626',
          padding: 10,
          borderRadius: 10,
          marginBottom: 10,
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
          gap: 20,
         }}
         onPress={handleLiked}
        >
          {
            isLiked ? (
                <FontAwesome size={28} name="heart" color={"white"} />
            ) : (
                <FontAwesome size={28} name="heart-o" color={"white"} />
            )
          }
        </TouchableOpacity>
      </View>
      <View style={{ padding:10, width:"100%", flexDirection:"row", gap:10, alignItems:"center" }}>
        <TouchableOpacity 
         style={{
          flex:1,
          backgroundColor: '#dc2626',
          padding: 10,
          borderRadius: 10,
          marginBottom: 10,
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
          gap: 20,
         }}
          onPress={() => handlePress("Wallpaper set successfully!")}
        >
          <Text style={{ color:"white", fontSize:18 }}>Set as wallpaper</Text>
        </TouchableOpacity>
      </View>
      <Toast set={toast}/>
    </View>
  )
}

export default open

const styles = StyleSheet.create({})