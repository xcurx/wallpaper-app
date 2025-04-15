import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const _layout = () => {
  return (
    <Stack>
        <Stack.Screen
            name="(tabs)"
            options={{
                headerShown: false,
                animation: 'slide_from_right',
            }}
        />
        <Stack.Screen
            name="open"
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