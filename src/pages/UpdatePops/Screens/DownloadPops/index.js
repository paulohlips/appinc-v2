import React, { Component } from "react";
import {
  View,
  Text,
} from "react-native";
import styles from "./styles";

import { PickerItem } from '../../../../globalComponents';

var jsonTest = {
  "area": [
    {
      "id": 1,
      "nome_area": "Area 1",
      "classe": [
        {
          "id": "1",
          "nome_classe": "Classe 1",
          "subclasse": [
            {
              "id": "1",
              "nome_subclasse": "Subclasse 1"
            },
            {
              "id": "5",
              "nome_subclasse": "Subclasse 5"
            },
            {
              "id": "6",
              "nome_subclasse": "Subclasse 6"
            }
          ]
        },
        {
          "id": "2",
          "nome_classe": "Classe 2",
          "subclasse": [
            {
              "id": "2",
              "nome_subclasse": "Subclasse 2"
            }
          ]
        }
      ]
    },
    {
      "id": 2,
      "nome_area": "Area 2",
      "classe": [
        {
          "id": "3",
          "nome_classe": "Classe 3",
          "subclasse": [
            {
              "id": "3",
              "nome_subclasse": "Subclasse 3"
            }
          ]
        },
        {
          "id": "4",
          "nome_classe": "Classe 4",
          "subclasse": [
            {
              "id": "4",
              "nome_subclasse": "Subclasse 3"
            }
          ]
        }
      ]
    }
  ]
}

class DownloadPops extends Component {
  state = {
    area: [],
    areadId: null,
    classe: null,
  };

  componentDidMount() {
    let array = [];
    jsonTest.area.map(item => {
      console.tron.log('area1', item, array)
      array = [
        ...array,
        {
          name: item.nome_area,
          value: item.id,
        }
      ]

      console.tron.log('area2', array)
    })

    console.tron.log('area', array)
    this.setState({ area: array });
  }

  receiveParams = params => {
    this.setState({ areadId: params });   
  }

  render() {
    const { area } = this.state;
    console.tron.log('state', this.state)
    return (
      <View style={styles.container}>
        {
          area.length !== 0 && (
            <View style={styles.picker}>
              <PickerItem
                receiveProps={(params => this.receiveParams(params))}
                arrayConfig={area}
              />
            </View>
          )
        }        
      </View>
    );
  }
}

export default (DownloadPops);

/*
  <ScrollView>
    {popList ? pops.map(item => this.renderPops(item)) : null}
  </ScrollView>
*/