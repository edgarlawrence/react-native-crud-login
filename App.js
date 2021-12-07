import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Entypo } from '@expo/vector-icons'; 

import Login from './src/components/Login';
import Register from './src/components/Register';
import AddProduct from './src/components/AddProduct';
import HomeProduct from './src/components/HomeProduct';
import HomeCategory from './src/components/HomeCategory';
import EditCategory from './src/components/EditCategory';
import EditProduct from './src/components/EditProduct';
import AddCategory from './src/components/AddCategory';

export default function App () {
  const Tabs = createBottomTabNavigator()
const StackComponent = createStackNavigator();

const SignedIn = () => {
  return (
    <StackComponent.Navigator>
    <StackComponent.Screen 
      name="Login"
      component={Login}
      options={{ 
        headerShown: false
      }}  
    />

  <StackComponent.Screen 
      name="Register"
      component={Register}
      options={{ 
        headerShown: false
      }}  
    />
  </StackComponent.Navigator>
  )
}

const HOME = () => {
  return (
        <Tabs.Navigator>
          <Tabs.Screen 
             name="HomeProduct" 
             component={HomeProduct} 
             options={{ headerTitleAlign: 'center' }} 
             options={{ 
                   headerShown: false, 
                   tabBarIcon: () => {
                     return <Entypo name="shopping-basket" size={24} color="black" />
             }}}  
           />
          <Tabs.Screen 
             name="HomeCategory" 
             component={HomeCategory} 
             options={{ headerTitleAlign: 'center' }} 
             options={{ 
                   headerShown: false, 
                   tabBarIcon: () => {
                     return <Entypo name="list" size={24} color="black" />
             }}}  
           />
      </Tabs.Navigator>
  )
}

  return (
    <NavigationContainer>
    <StackComponent.Navigator>
    <StackComponent.Screen 
         name="SignedIn" 
         component={SignedIn} 
       />
       <StackComponent.Screen 
         name="Home" 
         component={HOME} 
       />
       <StackComponent.Screen 
        name="AddCategory" 
        component={AddCategory} 
      />
        <StackComponent.Screen 
          name="EditCategory" 
          component={EditCategory} 
        />
      <StackComponent.Screen 
         name="EditProduct" 
         component={EditProduct} 
       />
        <StackComponent.Screen 
         name="AddProduct" 
         component={AddProduct} 
       />
       <StackComponent.Screen 
         name="HomeProduct" 
         component={HomeProduct} 
       />
        <StackComponent.Screen 
         name="HomeCategory" 
         component={HomeCategory} 
       />
    </StackComponent.Navigator>
 </NavigationContainer>
  )
}
