import React, { Component } from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import styles from './styles';


class NotesForm extends Component {
  state = {}

  render() {
      const { viewNotes, onCloseNotes, data } = this.props;
      console.tron.log(['data do modal notes', data]);
    return (
        <Modal
            animationType="fade"
            transparent
            visible={viewNotes}
            onRequestClose={() => onCloseNotes()}
        >
        <TouchableOpacity style={styles.container} onPress={() => onCloseNotes()}>
          <View style={styles.box}>
            <TouchableOpacity style={styles.button}>
                <Icon name="microphone-alt" size={20} color="black" style={styles.icon} />
                <Text style={styles.textButton}>Gravar Audios</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    );
  }
}

export default NotesForm;