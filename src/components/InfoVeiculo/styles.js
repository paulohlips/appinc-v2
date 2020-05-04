import { StyleSheet, Platform } from 'react-native';
import { metrics, colors, responsividade } from '../../styles';

const styles = StyleSheet.create({
    container: {
        flex: 1,
       },
    header: { 
        marginVertical: 30,
        alignSelf: "center",
        color: '#000000',
        fontSize: 20,
        fontWeight: '800',       
    },
  titulo: {
    marginTop: 12,
    color: '#000000',
    fontSize: 18,
    fontWeight: '800',
  },
  text: {
    marginTop: 12,
    color: '#000000',
    fontSize: 18,
    fontWeight: '400',
  },
  box: {
    flexDirection: 'row',
  },

  imageBox: {
    width: "100%",
    height: 300, 
    justifyContent: 'center',
    alignItems: 'center'
  },

  image: {
      width: "90%",
      height: "90%"
      
  },

picker: {
    flexDirection: "row",
    fontSize: 15,
    height: 30
  }
 
});

export default styles;