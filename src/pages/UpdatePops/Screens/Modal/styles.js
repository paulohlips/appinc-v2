import { Platform, StyleSheet } from 'react-native';
import { colors, responsividade } from '../../../../styles';


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(43, 43, 43, 0.3)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    box: {        
        width: 300,
        backgroundColor: 'white',
        alignItems: 'center',
        borderRadius: 10,
    },
    containerButton: {
        flexDirection: 'row',
    }
});

export default styles;