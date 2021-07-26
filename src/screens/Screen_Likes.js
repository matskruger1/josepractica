import React, {Component} from 'react';
import { StyleSheet, Text, View,TouchableOpacity, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CardMini} from "../components/CardMini";




export default class Screen_Likes extends Component{
    constructor() {
        super();
        this.state = {
          show: {},
          likes:[],
        }
      }

      componentDidMount(){
        this.unsubscribe = this.props.navigation.addListener("focus",()=>{
          this.getObjectStorage();    
        })
      };
    
       async getObjectStorage(){
            try {
                const jsonValue = await AsyncStorage.getItem('@likes')
                if (jsonValue !== null) {
                    const jsonParsed = JSON.parse(jsonValue)
                    this.setState({likes: jsonParsed})
                }
                console.log(this.state.likes)
            } catch (e) {
                console.log(e)
            }
        }
    
    
        keyExtractor = (item, idx) => idx.toString();
        renderItem = ({item}) => {
       return(
        <View> 
          <CardMini
          name={item.name} 
          image={item.image}/>
        </View>     
         )
       }
     
   
     render (){
       return (
       <View>   
           <View >
             <Text>Personajes Likeados</Text>
           </View>   
           <View >
               <FlatList
               data={this.state.likes}
               keyExtractor={this.keyExtractor}
               renderItem={this.renderItem}
               />
           </View>
       </View>
     
     
     )}  
   }

    
    
    
    
    