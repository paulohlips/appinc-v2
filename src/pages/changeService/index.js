import React, { Component } from 'react';

import { View, Text, TouchableOpacity } from 'react-native';
import {
  Header,
  PickerItem,
} from '../../globalComponents';

import styles from './styles';

class ChangeService extends Component {
  state = {
    infopicker: [
      {
        name: 'Servidor v1',
        value: 'http://35.198.17.69/api',
      },
      {
        name: 'Servidor v2',
        value: '32',
      },
    ],
  }

  receiveParams = params => {
    this.setState({ testeParam: params });
  }

  render() {
    const { infopicker } = this.state;
    return (
      <View style={styles.container}>
        <Header
          title="Trocar Servidor"
          showArrow
        />
        <View style={styles.mainView}>
          <Text style={styles.title}>
            Escolha um servidor:
          </Text>
          <View style={styles.picker}>
            <PickerItem
              receiveProps={(params => this.receiveParams(params))}
              arrayConfig={infopicker}
            />
          </View>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.textButton}>OK</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default ChangeService;
