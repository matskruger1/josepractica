
import React, {Component} from 'react';
import {StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {Screen_Home} from "./src/screens/Screen_Home";
import {Screen_Likes} from "./src/screens/Screen_Likes";
import 'react-native-gesture-handler';



const Drawer= createDrawerNavigator();

export default class App extends Component() {
  
  render(){
    return (
       <NavigationContainer>
        <Drawer.Navigator initialRouteName="Eleccion de Personajes"
							drawerType="slide"
							drawerPosition="left">
          <Drawer.Screen name= 'Eleccion de Personajes' component={Screen_Home}/>
          <Drawer.Screen name= 'Personajes Likeados' component={Screen_Likes}/> 
      </Drawer.Navigator>
      </NavigationContainer>
     
    );
    }
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
