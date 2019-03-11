import React, { Component } from 'react';
// redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as FormActions } from '../../store/ducks/form';
import ComponentList from '../../pages/Step/components/ComponentsList';

// styles
import { View, TextInput, Text, ScrollView, TouchableOpacity } from 'react-native';
import styles from './style';
import Icons from 'react-native-vector-icons/FontAwesome5';

class Group extends Component {
  state = {
    prototype: [],
    //dataGroup: [],
  }


  componentWillMount() {
    this.readGroup();
  }

  renderOneGroup = () =>  this.props.data.components_group.map(item => <ComponentList data={item}/>);

  incrementDataGroup = () => {
      const { dataGroup, prototype } = this.state;
      var dataGroupVar = dataGroup;
      dataGroupVar.push(prototype)
      this.setState({ dataGroup: dataGroupVar });
  }
  readGroup = () => {
    const { components_group } = this.props.data;
    const array = {}

    components_group.map(item => {
      array[item.data_name] = null;
      this.setState({ prototype: array })
    })
  }



  decrementDataGroup = (id) => {};
  render() {
    const { dataGroup } = this.state;
    console.tron.log(['props groups', this.props])
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