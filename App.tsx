import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import HomeScreen from './src/screens/HomeScreen';

export default function App(): React.JSX.Element {
  return (
    <SafeAreaProvider>
      <HomeScreen />
      <StatusBar style="light" backgroundColor="#1E3A8A" />
    </SafeAreaProvider>
  );
}