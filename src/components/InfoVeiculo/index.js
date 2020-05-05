import React, { Component } from 'react';

// styles
import { View, Text, Image, Picker } from 'react-native';
import { CheckBox } from 'react-native-elements';

import styles from './styles';
import { colors } from '../../styles';



class InfoVeiculo extends Component {

    state = {
        checked1: false,
        checked2: false,
        checked3: false,
        checked4: false,
        checked5: false,
        checked6: false,
        checked7: false,
        checked8: false,
        image: 1
    }

    render() {
        {console.tron.log(this.state.image)}
    return (
       

      <View style={styles.container}>
        
        <Text  style={styles.header}>DADOS EXTERNOS DO VEÍCULO</Text>
        
        <View style={styles.box}>
            <CheckBox
            checkedColor={'#cdad00'}
                checked={this.state.checked1}
                onPress={() => this.setState({checked1: !this.state.checked1})} 
            />
            <Text  style={styles.titulo}>MARCA/MODELO: <Text style={styles.text}>CITROEN/C3 1.6</Text></Text>
        </View>

        <View style={styles.box}>
            <CheckBox
            checkedColor={'#cdad00'}
                checked={this.state.checked2}
                onPress={() => this.setState({checked2: !this.state.checked2})} 
            />
            <Text  style={styles.titulo}>PLACA:<Text style={styles.text}> ABC1D23</Text></Text>
        </View>

        <View style={styles.box}>
            <CheckBox
            checkedColor={'#cdad00'}
                checked={this.state.checked3}
                onPress={() => this.setState({checked3: !this.state.checked3})} 
            />
            <Text  style={styles.titulo}>COR:<Text style={styles.text}> VERMELHO</Text></Text>
        </View>

        <View style={styles.box}>
            <CheckBox
                checkedColor={'#cdad00'}
                checked={this.state.checked4}
                onPress={() => this.setState({checked4: !this.state.checked4})} 
            />
                <Text  style={styles.titulo}>Nº PORTAS/EIXOS: <Text style={styles.text}>2 PORTAS</Text></Text>
        </View>

        <View style={styles.box}>
            <CheckBox
            checkedColor={'#cdad00'}
                checked={this.state.checked5}
                onPress={() => this.setState({checked5: !this.state.checked5})} 
            />
            <Text  style={styles.titulo}>ANO FAB/MODELO: <Text style={styles.text}>2012/2012</Text> </Text>
        </View>

        <View style={styles.box}>
            <CheckBox
            checkedColor={'#cdad00'}
                checked={this.state.checked6}
                onPress={() => this.setState({checked6: !this.state.checked6})} 
            />
            <Text  style={styles.titulo}>Nº VIN: <Text style={styles.text}>9BWAB45U4CT000000</Text></Text>
        </View> 

        <View style={styles.box}>
            <CheckBox
            checkedColor={'#cdad00'}
                checked={this.state.checked7}
                onPress={() => this.setState({checked7: !this.state.checked7})} 
            />
            <Text  style={styles.titulo}>HODÔMETRO: <Text style={styles.text}>99999.9 KM</Text></Text>
        </View> 
        <View style={styles.picker}>
        <Text style={styles.customText}>Trocar Imagem</Text>
        <View style={styles.pickerView}>
            <Picker
                selectedValue={this.state.image}
                style={{ height: 40, width: 40, color: '#cdad00'}}
                onValueChange={value =>
                this.setState({ image: value })
                }
            >
                <Picker.Item label="Carro" value={1} />
                <Picker.Item label="Caminhão" value={2}/>
                <Picker.Item label="Moto" value={3} />
            </Picker>
            </View>
                        
        </View>

        <View style={styles.imageBox}>
            { this.state.image == 1 ? 
                    <Image
                    style={styles.image}
                    source={require("../../assents/imgs/car.png")}
                />
            : null}


            {  this.state.image == 2 ? 
                    <Image
                    style={styles.image}
                    source={require("../../assents/imgs/truck.png")}
                    width={380}
                    height={200}
                />
            : null}

            {  this.state.image == 3 ? 
                    <Image
                    style={styles.image}
                    width={380}
                    height={200}
                    source={require("../../assents/imgs/moto.png")}
                />
            : null}

        
    </View>

      </View>
    );
  }
}

export default InfoVeiculo;