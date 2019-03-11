import React, { Component } from 'react';
import { Text, View , StyleSheet, Animated , TouchableOpacity} from 'react-native';
import styles from './styles';
import {responsividade} from './../../styles'


export default class SnackBar extends Component {

    state = {
        x: new Animated.Value(responsividade.altura_tela),
    }


  componentDidMount () {
        Animated.sequence([
            Animated.timing(this.state.x , {
                toValue: responsividade.altura_tela * 0.8,
                duration: 500,
            }),
            Animated.delay(4000),
        Animated.timing(this.state.x , {
                toValue: responsividade.altura_tela,
                duration: 500,
            })
        ]
        ).start()
  

  }

    closeSnack = () =>  {

        Animated.timing(this.state.x , {
            toValue: responsividade.altura_tela,
            duration: 500,
        }).start()

    }
  

  render() {
    return (
      <View style = {styles.container}>
        <Animated.View style = {{ 
            justifyContent: 'space-between',
            width: 330,
            height: 60,
            top: this.state.x,
            borderRadius: 5,
            alignItems: 'center',
            backgroundColor: this.props.color,
            margin: 20,
            elevation: 1,
            flexDirection: 'row',
            paddingHorizontal : 20,
        }}>
            <View style = {styles.text_view}>
                <Text style = {styles.text}>{this.props.content}</Text>
            </View>

            <TouchableOpacity onPress={this.closeSnack} style = {styles.action_view}>
                <Text style = {styles.text}>OK</Text>
            </TouchableOpacity>
        
        </Animated.View>       
       </View>

        
    )
  }
}

  