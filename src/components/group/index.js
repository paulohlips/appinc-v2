import React, { Component } from 'react';
// redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as FormActions } from '../../store/ducks/form';
import ComponentList from '../../pages/Step/components/ComponentsList';

// styles
import { View, TextInput, Text } from 'react-native';
import styles from './style';

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
      console.tron.log(['props group', this.props])
    return (
      <View style={styles.container}>
        <Text style={styles.hint}>Component Group</Text>
        {
            this.props.data.components_group.map(item => <ComponentList data={item}/>)
        }        
      </View>
    );
  }
}

export default Group;