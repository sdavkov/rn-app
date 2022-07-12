import React, { createContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import ShareScreen from './src/screens/ShareScreen';
import { ShareContext } from './src/ShareContext';
import { Routs } from './src/constants';

const Stack = createNativeStackNavigator();

export default function App() {
  const [selectedImage, setSelectedImage] = React.useState<null | { localUri: string }>(null);

  return (
    <ShareContext.Provider value={{ selectedImage, setSelectedImage }}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={Routs.home}>
          <Stack.Screen
            name={Routs.home}
            component={HomeScreen}
            options={{ title: 'Выбор изображения' }}
          />
          <Stack.Screen
            name={Routs.share}
            component={ShareScreen}
            options={{
              title: 'Поделиться'
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ShareContext.Provider>
  );
}