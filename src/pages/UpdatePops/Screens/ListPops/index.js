import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import styles from "./styles";

class ListPops extends Component {
  state = {
  };

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
            <Text style={styles.status1}>Num ID: {item.form_id}  |  Versão {item.form_version}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.status1}></Text>
          </View>
        </TouchableOpacity>

      );
    }
    return null;
  }


  render() {
    return (
      <View style={styles.container}>
        {this.renderPops({form_titulo: 'ahhaha', form_id: 32, form_version: 2 })}
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