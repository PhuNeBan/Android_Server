import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Login from '../Screens/Login';
import Register from '../Screens/Register';
import { AppContext } from './Context/AppContext';
import ListProduct from '../Screens/ListProduct';
import DetailProduct from '../Screens/DetailProduct';
import Cart from '../Screens/Cart';
import Profile from '../Screens/Profile';
import EditProfile from '../Screens/EditProfile';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const User = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
        </Stack.Navigator >
    );
};

const List = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="ListProduct" component={ListProduct} options={{ headerShown: false }}/>
            <Stack.Screen name="DetailProduct" component={DetailProduct}/>
            <Stack.Screen name="Cart" component={Cart}/>
        </Stack.Navigator >
    );
};

const ListProfile = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="EditProfile" component={EditProfile}/>
        </Stack.Navigator >
    );
};



const Main = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let imgName;
                    if (route.name === 'List') {
                        imgName = focused ? require("../Images/icon-Shop.png") : require("../Images/icon-Shop.png");
                    } else if (route.name === 'ListProfile') {
                        imgName = focused ? require("../Images/icon-User.png") : require("../Images/icon-User.png");
                    }
                    return <Image source={imgName} style = {{width: 30, height: 30, resizeMode: 'contain'}}/>;
                },
                tabBarActiveTintColor: 'blue',
                tabBarInactiveTintColor: 'gray',
            })}
        >
            <Tab.Screen name="List" component={List} options={{headerShown: false}} />
            <Tab.Screen name="ListProfile" component={ListProfile} options={{ headerShown: false }} />
        </Tab.Navigator>
    );
};

const AppNavigation = () => {
    const {isLogin} = useContext(AppContext);
    return (
        <>
        {!isLogin ? <User/> : <Main/>}
        </>
    )
}

export default AppNavigation

const styles = StyleSheet.create({})