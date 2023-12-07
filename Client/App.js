import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {AppContextProvider} from './Src/Until/Context/AppContext';
import {NavigationContainer} from '@react-navigation/native';
import AppNavigation from './Src/Until/AppNavigation';
import Login from './Src/Screens/Login';
import Register from './Src/Screens/Register';
import DetailProduct from './Src/Screens/DetailProduct';
import Cart from './Src/Screens/Cart';
import ItemCart from './Src/Screens/ItemCart';
import Profile from './Src/Screens/Profile';
import EditProfile from './Src/Screens/EditProfile';

const App = () => {
  return (
    <AppContextProvider>
      <NavigationContainer>
        <AppNavigation></AppNavigation>
      </NavigationContainer>
    </AppContextProvider>

    // <Login/>
    // <Register/>
    // <DetailProduct/>
    // <Cart/>
    // <ItemCart/>
    // <Profile/>
    // <EditProfile/>
  );
};

export default App;

const styles = StyleSheet.create({});
