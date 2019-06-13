import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  AsyncStorage,
} from "react-native";
import styles from "./styles";

class ListPops extends Component {
  state = {
    offlinePops: []
  };

  async componentWillMount() {
    let array = [];
    try{
      const response = await AsyncStorage.getItem('arrayKeys');
      console.tron.log('arrayKeys', response);
      const keyPops = JSON.parse(response);
      console.tron.log('keyPops', keyPops);


      for (let i = 0; i < keyPops.length; i++) {
        const popJSON = await AsyncStorage.getItem(keyPops[i]);
        const pop = JSON.parse(popJSON);

        console.tron.log('pop', pop); 

        array = [
          ...array,
          {
            form_name: pop.form_name,
            form_titulo: pop.form_titulo,
            form_version: pop.form_version,
          }         
        ]
        console.tron.log('array', array);        
      }

      /*keyPops.map(async item => {
        const pop = await AsyncStorage.getItem(item);

        array = [
          ...array,
          {
            form_name: pop.form_name,
            form_titulo: pop.form_titulo,
            form_version: pop.form_version,
          }         
        ]

      })*/
      
      
    } catch(err) {
      console.tron.log('error', err);
    }

    this.setState({ offlinePops: array });
  }

  getPopOffline = async key => {
    const resp = AsyncStorage.getItem(key);
    const pop = JSON.parse(resp);
    return pop;
  }

  renderPops = item => {
    if (item) {
      return (
        <TouchableOpacity
          style={styles.box}
          onPress={() => { }}
        >
          <View style={styles.row}>
            <Text style={styles.status}>Perícia {item.form_titulo} </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.status1}>Versão {item.form_version}</Text>
          </View>
        </TouchableOpacity>

      );
    }
    return null;
  }


  render() {
    const { offlinePops } = this.state;
    console.tron.log(this.state);
    return (
      <View style={styles.container}>
        {
          offlinePops.map(item => this.renderPops(item))         
        }
      </View>
    );
  }
}

export default ListPops;

/*
  <ScrollView>
    {popList ? pops.map(item => this.renderPops(item)) : null}
  </ScrollView>
*/