import React, { Component } from 'react';
import { Modal, TouchableOpacity, View, Text} from 'react-native';

import styles from './styles';

class CheckModal extends Component {
    state = {}
    render() {
        const { viewModal, onClose } = this.props;
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={viewModal}
                onRequestClose={() => onClose()}
            >
                <View style={styles.container}>
                   <View style={styles.box}>
                    <Text>Atenção!</Text>
                    <Text>Tem certeza que deseja apagar os itens selecionados?</Text>
                    <View style={styles.containerButton}>
                        <TouchableOpacity>
                            <Text>SIM</Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Text>NÂO</Text>
                        </TouchableOpacity>
                    </View>
                   </View>
                </View>
            </Modal>
        );
    }
};

export default CheckModal;