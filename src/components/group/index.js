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
    prototype: [],
    //dataGroup: [],
  }


  componentWillMount() {
    this.readGroup();
  }


  readGroup = () => {
    const { components_group } = this.props.data;
    const array = {}

    components_group.map(item => {
      array[item.data_name] = null;
      this.setState({ prototype: array })
    })
  }



  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.hint}>Component Group</Text>
        {
          this.props.data.components_group.map(item => <ComponentList data={item} />)
        }
      </View>
    );
  }
}

export default Group;