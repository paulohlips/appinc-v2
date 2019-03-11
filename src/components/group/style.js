import { StyleSheet } from 'react-native';
import { colors, metrics, responsividade } from '../../styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'pink',
    width: responsividade.largura_tela,
    //padding: 20,
    alignItems: 'center',
    paddingBottom: 40,   
    borderBottomColor: 'black',             
    borderBottomWidth: 0.5,
  },
  boxGroup: {
    width: responsividade.largura_tela * 0.95,
    padding: 5,
    backgroundColor: 'white',
    borderRadius: 5,    
    elevation: 2,
    margin: 10,
    alignItems: 'center',
  },
  hint: {
    fontSize: responsividade.fonts.descriptionSize * 0.9,
    fontWeight: 'bold',
    color: 'black',
    opacity: 0.3,
    paddingVertical: 10,
  },
  viewPlus: {
    backgroundColor: colors.secundary,
    marginTop: 20,
    width: 60,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
  },
  viewMinus: {
    backgroundColor: colors.danger,
    marginTop: 20,
    width: 60,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    margin: 20,
  }
});

export default styles;