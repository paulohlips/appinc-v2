import React, { Component } from "react";
import {
  View,
  AsyncStorage,
  Text,
  ScrollView,
  TouchableOpacity
} from "react-native";
import styles from "./styles";

import Api from '../../../../services/api';

import { PickerItem } from '../../../../globalComponents';


class DownloadPops extends Component {
  state = {
    area: [],   
    classe: [],
    subclasse: [],
    areaId: null,
    classeId: null,
    subclasseId: null,
    allPops: [],
    viewPops: [],
  };

  async componentDidMount() {
    Api.setTokenTest();
    try {
      const response = await Api.form.getHierarchyPops();
      
      this.setState({ hierarchy: response.data })
    } catch (error) {
      console.tron.log(error)
    }

    try {
      const response = await Api.form.getAllPops();
     
      this.setState({ allPops: response.data })
    } catch (error) {
      console.tron.log(error)
    }

    let array = [];
    this.state.hierarchy.area.map(item => {
      array = [
        ...array,
        {
          name: item.nome_area,
          value: item,
        }
      ]
    })
    this.setState({ area: array });

    
  }

  makeArrayClasse = async area => {
    await this.setState({ classe: [], subclasse: [] });
    
    let array = []; 
    area.classe.map(item => {
      array = [
        ...array,
        {
          name: item.nome_classe,
          value: item,
        }
      ]
    })
   
    this.setState({ classe: array, areaId: area.id });
  }

  makeArraySubClasse = async classe => {
    await this.setState({ subclasse: [] });
    let array = [];
    classe.subclasse.map(item => {
      array = [
        ...array,
        {
          name: item.nome_subclasse,
          value: item.id,
        }
      ]
    })
    this.setState({ subclasse: array, classeId: classe.id });
  }

  filterPops = subclasse => {
    const {
      areaId,
      classeId,
      subclasseId,
      allPops
     } = this.state;

     let array = [];
     
    allPops.map(item => {
      if(item.area == areaId && item.classe == classeId && item.subclasse == subclasse) {
        array = [
          ...array,
          item
        ]
      }      
    })
    console.tron.log('array', array)

    this.setState({ viewPops: array })
  }

  rederItem = (item) => (
    <TouchableOpacity style={styles.card} onPress={() => this.setFormOffline(item)}>
      <Text style={styles.title}>{item.form_titulo}</Text>
      <Text style={styles.version}>versão: {item.form_version}</Text>
    </TouchableOpacity>
  )

  setFormOffline = async (item) => {
    var arrayKeys = await AsyncStorage.getItem('arrayKeys');
    console.tron.log('arrayKeys', JSON.parse(arrayKeys))

    try{
      const resp = await Api.form.getNewForm(item.form_id);

      if(arrayKeys === null) {
        console.tron.log('if');
        const array = []
        
        await AsyncStorage.setItem(item.form_name, JSON.stringify(resp.data));
        array.push(item.form_name);

        await AsyncStorage.setItem('arrayKeys', JSON.stringify(array));
      } else {
        console.tron.log('else');
        const array = JSON.parse(arrayKeys);
        console.tron.log('arrayKeys2', array)

        await AsyncStorage.setItem(item.form_name, JSON.stringify(resp.data));
        array.push(item.form_name);
        await AsyncStorage.setItem('arrayKeys', JSON.stringify(array));
      }
    } catch(err) {
      console.tron.log('error', err)
    }
  }

  render() {
    const { area, classe, subclasse, viewPops } = this.state;
    console.tron.log('STATEEEE', this.state)
    return (
      <View style={styles.container}>
        <View style={styles.main}>
          {
            area.length !== 0 && (
              <View style={styles.picker}>
                <PickerItem
                  receiveProps={(params => this.makeArrayClasse(params))}
                  arrayConfig={area}
                />
              </View>
            )
          }
          {
            classe.length !== 0 && (
              <View style={styles.picker}>
                <PickerItem
                  receiveProps={(params => this.makeArraySubClasse(params))}
                  arrayConfig={classe}
                />
              </View>
            )
          }
          {
            subclasse.length !== 0 && (
              <View style={styles.picker}>
                <PickerItem
                  receiveProps={(params => this.filterPops(params))}
                  arrayConfig={subclasse}
                />
              </View>
            )
          }
          <View style={styles.viewCard}>
            <ScrollView>
              {
                viewPops.map(item => this.rederItem(item))
              }
            </ScrollView>            
          </View>          
        </View>                
      </View>
    );
  }
}

export default (DownloadPops);

