import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import React, {useEffect} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {TabNavigator} from './src/navigators';
import {PlayScreen} from './src/screens';
import messaging from '@react-native-firebase/messaging';
import {PermissionsAndroid, Platform} from 'react-native';
import '@react-native-firebase/app';
import {ToastProvider, useToast} from 'react-native-toast-notifications';
import CustomToast from './src/components/CustomToast';

const queryClient = new QueryClient();
const Stack = createNativeStackNavigator();

const App = () => {
  const toast = useToast();

  useEffect(() => {
    async function initFirebaseMessaging() {
      // 1. Request notification permission
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
          {
            title: 'Notification Permission',
            message: 'App needs notification permission',
            buttonPositive: 'OK',
          },
        );
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Notification permission denied');
          return;
        }
      }

      // 2. Get FCM Token
      try {
        const token = await messaging().getToken();
        console.log('FCM Token:', token);
      } catch (error) {
        console.error('Failed to get FCM Token:', error);
      }
    }

    initFirebaseMessaging();

    return () => {
      initFirebaseMessaging();
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ToastProvider
        placement="top"
        animationType="slide-in"
        duration={4000}
        renderToast={toastOptions => <CustomToast data={toastOptions} />}>
        <SafeAreaProvider>
          <NavigationContainer>
            <Stack.Navigator
              initialRouteName="Tab"
              screenOptions={{
                headerShown: false,
                navigationBarColor: 'black',
              }}>
              <Stack.Screen name="Tab" component={TabNavigator} />
              <Stack.Screen
                name="Play"
                component={PlayScreen}
                options={{
                  animation: 'slide_from_bottom',
                  headerShown: false,
                  headerTransparent: true,
                }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </SafeAreaProvider>
      </ToastProvider>
    </QueryClientProvider>
  );
};

export default App;
