import React, { Component } from 'react';
// redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as GroupActions } from '../../store/ducks/group';
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
    //this.decrementDataGroup();
  }

  renderOneGroup = index  => this.props.data.components_group.map(item => <ComponentList data={item} index={index}/>);

  increment = () => {
      const { group } = this.props;
      const { dataGroup, prototype } = this.state;
      const size = group.dataGroup.length;
      var prototypeVar = prototype;
      prototypeVar = {
          ...prototype,
          index: size
      }
      console.tron.log(size, prototypeVar);
      this.props.incrementDataGroup(prototypeVar)
  }

  readGroup = () => {
    const { components_group } = this.props.data;
    const { dataGroup } = this.state;
    const array = {}
    let count = 0;

    components_group.map(item => {
      array[item.data_name] = null;
      this.setState({ prototype: array });     
    });
    array['index'] = 0;
    this.props.incrementDataGroup(array);
    this.setState({ prototype: array, dataGroup: [ ...dataGroup, array ] });
  }

  decrement = (id) => {
    var arrayState = this.state.dataGroup;
    arrayState.map(item => {
      if (item.index === id) {
        arrayState.splice(item.index, 1);
      }
    });
    this.setState({ dataGroup: arrayState })
    this.props.decrementDataGroup(id);
  };

  render() {
    const { group } = this.props
    const { dataGroup } = this.state;
    console.tron.log([dataGroup, this.props]);
    return (
      <View style={styles.container}>
        <ScrollView
          horizontal
          pagingEnabled
        >
          {
            group.dataGroup.map(item =>
              <View style={styles.boxGroup}>
                {this.renderOneGroup(item.index)}
                <TouchableOpacity style={styles.viewMinus} onPress={() => this.decrement(item.index)}>
                  <Icons name="minus" size={20} color="#FFF" />
                </TouchableOpacity>
              </View>
            )
          }
        </ScrollView>
        <TouchableOpacity style={styles.viewPlus} onPress={() => this.increment()}>
          <Icons name="plus" size={20} color="#232f34" />
        </TouchableOpacity>
      </View>
    );
  }
}

const mapStateToProps = state => ({
    group: state.groupState,
});

const mapDispatchToProps = dispatch => 
    bindActionCreators(GroupActions, dispatch);
    
export default connect(mapStateToProps, mapDispatchToProps)(Group);