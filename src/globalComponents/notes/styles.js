import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0, 0.3)'
    },
    box: {
        width: 200,
        height: 55,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFF',
        borderRadius: 6,
    },
    button: {
        width: 275,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    textButton: {
        fontSize: 18,
        color:  '#000',
        margin: 5,
    },
    icon: {
        marginRight: 5,
    }

});

export default styles;