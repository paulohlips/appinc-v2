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
    dataGroup: [],
  }

  componentWillMount() {

    this.readGroup();
  }

  renderOneGroup = () =>  this.props.data.components_group.map(item => <ComponentList data={item}/>);

  incrementDataGroup = () => {
      const { dataGroup, prototype } = this.state;
      const size = dataGroup.length;
      var prototypeVar = prototype;
      prototypeVar = {
          ...prototype,
          index: size
      }
      console.tron.log(size, prototypeVar);
      this.setState({ dataGroup: [ ...dataGroup, prototypeVar ] });
  }

  readGroup = () => {
    const { components_group } = this.props.data;
    const { dataGroup } = this.state;
    const array = {}

    components_group.map(item => {
      array[item.data_name] = null;
      this.setState({ prototype: array });     
    });
    array['index'] = 0;
    this.setState({ prototype: array, dataGroup: [ ...dataGroup, array ] });
  }

  decrementDataGroup = (id) => {};

  render() {
    const { dataGroup } = this.state;
    console.tron.log(['props groups', this.props, this.state])
    return (
      <View style={styles.container}>
        <ScrollView 
           horizontal
           pagingEnabled
        >
            {
                dataGroup.map(item => 
                    <View style={styles.boxGroup}>
                        { this.renderOneGroup() }
                        <TouchableOpacity style={styles.viewMinus} onPress={() => this.decrementDataGroup(item.index)}>
                            <Icons name="minus" size={20} color="#FFF" />
                        </TouchableOpacity>
                    </View>                
                )
            }           
        </ScrollView>
        <TouchableOpacity style={styles.viewPlus} onPress={() => this.incrementDataGroup()}>
            <Icons name="plus" size={20} color="#232f34" />
        </TouchableOpacity>   
      </View>
    );
  }
}

export default Group;