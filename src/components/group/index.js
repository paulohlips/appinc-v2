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
    // console.tron.log(['entrei grupo', this.props])
    const { group } = this.props;
    if (!group.flag) {
      this.readGroup();
    }

    //this.decrementDataGroup();
  }

  renderOneGroup = index => this.props.data.components_group.map(item => <ComponentList data={item} index={index} />);

  increment = () => {
    const { group } = this.props;
    const { dataGroup, prototype } = this.state;
    const size = group.dataGroup.length;
    var prototypeVar = prototype;
    prototypeVar = {
      ...prototype,
      index: Math.random(),
    }
    this.props.incrementDataGroup(prototypeVar)
  }

  readGroup = () => {
    this.props.activeFlag();
    const { components_group } = this.props.data;
    const { dataGroup } = this.state;
    const array = {}
    let count = 0;

    components_group.map(item => {
      array[item.data_name] = null;
      this.setState({ prototype: array });
    });
    array['index'] = Math.random();
    array['extra'] = null;
    this.props.incrementDataGroup(array);
    this.setState({ prototype: array, dataGroup: [...dataGroup, array] });
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
    // console.tron.log(['group', this.props, this.state])
    return (
      <View style={styles.container}>
        <ScrollView
          horizontal
          pagingEnabled
          ref={ref => this.scrollView = ref}
          onContentSizeChange={(contentWidth, contentHeight) => {
            this.scrollView.scrollToEnd({ animated: true, duration: 3000 });
          }}
        >
          {
            group.dataGroup.map(item =>
              <View style={styles.boxGroup}>
                {this.renderOneGroup(item.index)}
                <TouchableOpacity style={styles.viewMinus} onPress={() => this.decrement(item.index)}>
                  <Icons name="minus" size={18} color="#FFF" />
                </TouchableOpacity>
              </View>
            )
          }
        </ScrollView>
        <View style={styles.viewIndicator}>
          {
            group.dataGroup.map(item => <View style={styles.indicator} />)
          }
        </View>
        <TouchableOpacity style={styles.viewPlus} onPress={() => this.increment()}>
          <Icons name="plus" size={18} color="#232f34" />
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