import { MaterialIcons } from '@expo/vector-icons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { Tabs } from 'expo-router';
import { StyleSheet, View } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs 
     screenOptions={{ 
        tabBarActiveTintColor: '#dc2626',
        tabBarInactiveTintColor: '#434343',
        headerShown: false,
        tabBarStyle: {
            position: 'absolute',
            backgroundColor: 'transparent',
            borderTopWidth: 0, 
            elevation: 0, // Android only: removes shadow
        },
        tabBarBackground: () => (
            <LinearGradient
              colors={["rgba(0, 0, 0, 0.5)", "rgba(0, 0, 0, 1)"]}
              start={{ x: 0.5, y: 0 }}
              end={{ x: 0.5, y: 1 }}
              style={[StyleSheet.absoluteFillObject]}
            />
        )
     }}
     initialRouteName="index"
    >
        <Tabs.Screen
        name="index"
        options={{
            title: 'Explore',
            tabBarIcon: ({ color }) => <FontAwesome size={28} name="paper-plane" color={color} />,
        }}
        />
        <Tabs.Screen
        name="categories"
        options={{
            title: 'Categories',
            tabBarIcon: ({ color }) => <MaterialIcons size={28} name="category" color={color} />,
        }}
        />
        <Tabs.Screen
        name="Liked"
        options={{
            title: 'Liked',
            tabBarIcon: ({ color }) => <FontAwesome size={28} name="heart" color={color} />,
        }}
        />
    </Tabs>
  );
}

const styles = StyleSheet.create({
    gradientBackground: {
      opacity: 0.8,
    },
  });
  
