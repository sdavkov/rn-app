import React, { createContext } from 'react';
import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import ShareScreen from './src/screens/ShareScreen';
import { ShareContext } from './src/ShareContext';
import Routs from './src/constants/constants';
import useColorScheme from './src/hooks/useColorSheme';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';

const Stack = createNativeStackNavigator();

export default function App() {
  const colorScheme = useColorScheme();
  const [selectedImage, setSelectedImage] = React.useState<null | { localUri: string }>(null);

  return (
    <SafeAreaProvider>
      <ShareContext.Provider value={{ selectedImage, setSelectedImage }}>
        <NavigationContainer theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <Stack.Navigator initialRouteName={Routs.HOME}>
            <Stack.Screen
              name={Routs.HOME}
              component={HomeScreen}
              options={{ title: 'Выбор изображения' }}
            />
            <Stack.Screen
              name={Routs.SHARE}
              component={ShareScreen}
              options={{
                title: 'Поделиться'
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
        <StatusBar />
      </ShareContext.Provider>
    </SafeAreaProvider >
  );
}