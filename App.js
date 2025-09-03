import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { ErrorBoundary } from 'react-error-boundary';
import { View, Text, StyleSheet } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts, Inter_400Regular, Inter_500Medium, Inter_600SemiBold } from '@expo-google-fonts/inter';
import { LinearGradient } from 'expo-linear-gradient';
import { Slot } from 'expo-router';

// Prevent the splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

// Error fallback component
function ErrorFallback({ error, resetError }) {
  return (
    <LinearGradient
      colors={['#1E3A8A', '#93C5FD']}
      style={styles.errorContainer}
    >
      <View style={styles.errorContent}>
        <Text style={styles.errorTitle}>Something went wrong</Text>
        <Text style={styles.errorMessage}>
          {error?.message || 'An unexpected error occurred'}
        </Text>
        <Text style={styles.errorButton} onPress={resetError}>
          Try again
        </Text>
      </View>
    </LinearGradient>
  );
}

export default function App() {
  // Load Inter fonts
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
  });

  React.useEffect(() => {
    async function prepare() {
      if (fontsLoaded) {
        // Hide the splash screen once fonts are loaded
        await SplashScreen.hideAsync();
      }
    }

    prepare();
  }, [fontsLoaded]);

  // Don't render anything until fonts are loaded
  if (!fontsLoaded) {
    return null;
  }

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <SafeAreaProvider>
        <NavigationContainer>
          <StatusBar style="light" backgroundColor="#1E3A8A" />
          <LinearGradient
            colors={['#1E3A8A', '#93C5FD']}
            style={styles.container}
          >
            <Slot />
          </LinearGradient>
        </NavigationContainer>
      </SafeAreaProvider>
    </ErrorBoundary>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorContent: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
    maxWidth: '90%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
  },
  errorTitle: {
    fontSize: 20,
    fontFamily: 'Inter_600SemiBold',
    color: '#1F2937',
    marginBottom: 12,
    textAlign: 'center',
  },
  errorMessage: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 21,
  },
  errorButton: {
    fontSize: 14,
    fontFamily: 'Inter_500Medium',
    color: '#3B82F6',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    textAlign: 'center',
  },
});