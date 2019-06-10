import { Platform, StyleSheet } from 'react-native';
import { colors, responsividade } from '../../../../styles';


const styles = StyleSheet.create({
    container: {
        flex: 1,
        //paddingTop: Platform.OS === 'ios' ? 30 : 0
        //backgroundColor: '#565698',
    },
    
    main: {
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },

    picker: {
        width: responsividade.LARGURABUTTON * 1.01,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        borderRadius: 5,
        backgroundColor: colors.white,
      },

});

export default styles;