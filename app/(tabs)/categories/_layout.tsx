import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const _layout = () => {
  return (
    <Stack screenOptions={{
        headerShown: false,
        animation: 'slide_from_bottom',
        contentStyle: {
            backgroundColor: '#18181b',
        },
    }}>
        <Stack.Screen
            name="categories/[category]"
            options={{
                headerShown: false,
                animation: 'slide_from_bottom',
            }}
        />
    </Stack>
  )
}

export default _layout

const styles = StyleSheet.create({})