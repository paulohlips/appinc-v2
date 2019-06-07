import React, { Component } from "react";
import {
  View,
  Text,
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
      <View style={styles.container} />
    );
  }
}

export default ListPops;

/*
  <ScrollView>
    {popList ? pops.map(item => this.renderPops(item)) : null}
  </ScrollView>
*/