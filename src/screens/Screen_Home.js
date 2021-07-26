import React, {Component} from 'react';
import { StyleSheet, Text, View,TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getUser} from "../api/rickandmorty";




export default class Screen_Home extends Component (){
    constructor() {
        super();
        this.state = {
          show: {},
          likes:[],
          contador:1,
          dislikes:[]
        }
      }
      
     
      // los resultados traidos de la api van a ser guardados en la variable show asique toda la info que quiera traer de la api
      //tengo que utilizar el this.show. ...
      getDataFromApi() {
        getUser(this.state.contador)
        .then((result)=> {
          this.setState({show: result})
        }) 
      
      }

        //quiero que el metodo me renderice apenas se carga la pagina la info traida de la api
      async componentDidMount(){
        this.getDataFromApi()
      }


    async savePerson(item){
        try{
         const JsonValue= await AsyncStorage.getItem("@likes")
         if (jsonValue !== null){
         const jsonParsed = JSON.parse(JsonValue)
         this.setState ({likes:jsonParsed})
         }
         console.log(this.state.likes)
        await this.state.likes.push(item)
        const liked= JSON.stringify(this.state.likes)
      await AsyncStorage.setItem("@likes", liked);
    
    //  llamo una nueva tarjeta
    let nuevoNumero = this.state.contador + 1
    this.setState({contador: nuevoNumero})
    this.getDataFromApi();
    
    // ver si se guardo 
    console.log("Se guardo el personaje")
    Alert.alert("Se guardo el personaje")
      }
      catch(e){
  console.log(e)
      }
    }

    async deleteCard() {
        console.log(this.state.contador)
        //  llaman una nueva tarjeta
        let nuevoNumero = this.state.contador + 1
        this.setState({contador: nuevoNumero})
        this.getDataFromApi();
      }


render(){
        
    const values =
        <View  style={{backgroundColor: 'grey', borderWidth: 5, margin: 3}}>
            <Image source={{uri:this.state.show.image}} style={{width: 150, height: 150, }}/>
            <Text>
                Nombre: {this.state.show.name}
            </Text>
            <Text>
                Especie: {this.state.show.species}
            </Text>
            <Text>
                Status: {this.state.show.status}
            </Text>
            
            <TouchableOpacity onPress={() => this.savePerson(this.state.show) }><Text>Guardar</Text></TouchableOpacity>
            <TouchableOpacity onPress={() => this.deleteCard() }> <Text>Descartar</Text> </TouchableOpacity>


        </View>
        
return (
<View style={styles.container}>
{ this.state.contador < 672
    ?
    <View>
    {values}
    </View>

    :

      <View>
      <Text>No hay mas tarjetas </Text>
      </View>

      
     }
      
  

    
</View>
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