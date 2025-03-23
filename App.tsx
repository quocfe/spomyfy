import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {TabNavigator} from './src/navigators';
import {PlayScreen} from './src/screens';

const queryClient = new QueryClient();
const Stack = createNativeStackNavigator();
const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Tab"
            screenOptions={{
              headerShown: false,
              navigationBarColor: 'black',
              // statusBarColor: 'black',
            }}>
            <Stack.Screen name="Tab" component={TabNavigator} />
            <Stack.Screen
              name="Play"
              component={PlayScreen}
              options={{
                animation: 'slide_from_bottom',
                headerShown: false,
                headerTransparent: true,
                // statusBarColor: 'black',
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
};

export default App;
