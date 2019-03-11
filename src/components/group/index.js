import React, { Component } from 'react';
// redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as FormActions } from '../../store/ducks/form';
import ComponentList from '../../pages/Step/components/ComponentsList';

// styles
import { View, TextInput, Text } from 'react-native';
import styles from './style';
import Icons from 'react-native-vector-icons/FontAwesome5';

class Group extends Component {
  state = {
    prototype: null,
    dataGroup: [
        {
            texto2: '',
            camera2: null,
            geoloc2: '',
            index: 0,
        },
        {
            texto2: '',
            camera2: null,
            geoloc2: '',
            index: 1,
        }

    ],
  }
  did



  render() {
    console.tron.log(['props groups', this.props])
    return (
      <View style={styles.container}>
        <View style={styles.boxGroup}>
            {
                this.props.data.components_group.map(item => <ComponentList data={item}/>)
            }
        </View>
        <View style={styles.viewPlus}>
            <Icons name="plus" size={20} color="#232f34" />
        </View>   
      </View>
    );
  }
}

export default Group;