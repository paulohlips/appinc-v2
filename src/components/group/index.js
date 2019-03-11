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
    prototype: {
        texto2: '',
        camera2: null,
        geoloc2: '',
        index: 0,
    },
    dataGroup: [
        {
            texto2: '',
            camera2: null,
            geoloc2: '',
            index: 0,
        },
    ],
  }

  renderOneGroup = () =>  this.props.data.components_group.map(item => <ComponentList data={item}/>);

  incrementDataGroup = () => {
      const { dataGroup, prototype } = this.state;
      var dataGroupVar = dataGroup;
      dataGroupVar.push(prototype)
      this.setState({ dataGroup: dataGroupVar });
  }

  decrementDataGroup = (id) => {};

  render() {
    const { dataGroup } = this.state;
    console.tron.log(['props groups', this.props])
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