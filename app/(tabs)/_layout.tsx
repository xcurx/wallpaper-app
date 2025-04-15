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
        tabBarInactiveTintColor: '#18181b',
        headerShown: false,
        tabBarStyle: {
            position: 'absolute',
            backgroundColor:"#09090b"
        },
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
        name="Liked"
        options={{
            title: 'Liked',
            tabBarIcon: ({ color }) => <FontAwesome size={28} name="heart" color={color} />,
        }}
        />
    </Tabs>
  );
}
