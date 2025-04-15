import React from 'react'
import { SafeAreaView, StyleSheet, Text, View, StatusBar, FlatList, Image, Dimensions } from 'react-native'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useWallpapers } from '@/hooks/useWallpapers';
import { TouchableOpacity } from 'react-native';
import { router } from 'expo-router';

const { width } = Dimensions.get('window');
const itemWidth = width / 2 - 8;

const Explore = () => {
    const url = "https://raw.githubusercontent.com/AngelJumbo/gruvbox-wallpapers/refs/heads/main/wallpapers/"   
    const tabBarHeight = useBottomTabBarHeight();
    const { wallpapers } = useWallpapers()

  return (
    <View style={{ backgroundColor: '#18181b', flex:1, paddingBottom: tabBarHeight }}>
      <StatusBar barStyle="default" backgroundColor={"#18181b"}/>
      <SafeAreaView style={{ flex: 1, alignItems: 'center', width: '100%' }}>
        <View style={{marginTop:5, marginBottom:10}}>
          <Text style={{ color: 'white', fontSize: 24 }}>Wallpapers</Text>
        </View>
        <FlatList
          style={{ width: '100%', paddingHorizontal:6, paddingBottom: 10 }}
          data={wallpapers}
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

export default Explore

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#18181b',
  },
  header: {
    marginTop: 5,
    marginBottom: 10,
  },
  title: {
    color: 'white',
    fontSize: 24,
  },
  itemContainer: {
    margin: 4,
  },
  image: {
    borderRadius: 10,
  },
  itemTitle: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 4,
  }
})