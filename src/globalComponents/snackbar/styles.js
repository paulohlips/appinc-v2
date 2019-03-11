import { StyleSheet } from 'react-native';
import {responsividade} from './../../styles'

const styles = StyleSheet.create({
    container: {
        justifyContent: 'flex-end',
        alignItems: 'center',
        position: 'absolute'
      },
  
      card: {
  
          justifyContent: 'space-between',
          width: 330,
          borderRadius: 5,
          alignItems: 'center',
          backgroundColor: 'white',
          margin: 20,
          elevation: 1,
          flexDirection: 'row',
          paddingHorizontal : 20, 
      },
  
      text_view: {
          //backgroundColor: 'red',
      },
  
      text: {
          fontSize: 16,
          color: 'grey',
          //fontWeight: 'bold',
      },
  
      action: {
          fontSize: 16,
          color: 'grey',
          //fontWeight: 'bold',
      },
  
      action_view: {
          //backgroundColor: 'pink',
          marginHorizontal: 8,
      }
});

export default styles;
