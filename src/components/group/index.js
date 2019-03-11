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
    dataGroup: [
      {
        texto2: '',
        camera2: null,
        geoloc2: '',
        index: 0,
      },
    ],
  }

  componentWillMount() {
    this.readGroup();
    this.decrementDataGroup();
  }

  renderOneGroup = () => this.props.data.components_group.map(item => <ComponentList data={item} />);

  incrementDataGroup = () => {
    const { dataGroup, prototype } = this.state;
    var dataGroupVar = dataGroup;
    dataGroupVar.push(prototype)
    this.setState({ dataGroup: dataGroupVar });
  }

  readGroup = () => {
    const { components_group } = this.props.data;
    const array = {}
    let count = 0;

    components_group.map(item => {
      array[item.data_name] = null;
    });
    array['index'] = 0;
    this.setState({ prototype: array });
  }

  decrementDataGroup = (id) => {
    var arrayState = this.state.dataGroup;
    arrayState.map(item => {
      if (item.index === id) {
        arrayState.splice(item.index, 1);
      }
    });
    this.setState({ dataGroup: arrayState })
  };

  render() {
    const { dataGroup } = this.state
    return (
      <View style={styles.container}>
        <ScrollView
          horizontal
          pagingEnabled
        >
          {
            dataGroup.map(item =>
              <View style={styles.boxGroup}>
                {this.renderOneGroup()}
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