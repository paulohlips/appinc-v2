import React, { Component } from 'react';
// redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as FormActions } from '../../store/ducks/form';
import { Creators as GroupActions } from '../../store/ducks/group';

// styles
import { View, TextInput, Text } from 'react-native';
import styles from './styles';
import stylesGroup from './stylesGroup';
import { colors } from '../../styles';


class InputText extends Component {
  state = {
    inputSave: null,
  }

  componentDidMount() {
    const { form, data, group, index } = this.props;    

    if (data.group === 'true') {
      group.dataGroup.map(item => {
        console.tron.log(['map array', item])
        item.value.map(components => {
          console.tron.log(['map array components', components])
          if (components.index === index) {
            console.tron.log('deucerteo', index)
            Object.keys(components).map(key => {
              console.tron.log('object map', components, key, data.data_name)
              if (key === data.data_name) {
                console.tron.log('deu input', components[key].value)
                this.setState({ inputSave: components[key].value })
              }
            })
          }          
        })       
      });
    } else {
      for (var key in form.step) {
        if (key === data.data_name) {
          if (form.step[key].filled === true) {
            this.setState({ inputSave: form.step[key].value });
          }
        } 
      }
    }
  }

  saveGroupInput = info => {
    const { inputSave } = this.state;
    const { 
      form, 
      getSaveStateForm, 
      startControlArray, 
      data, 
      index, 
      saveDataGroup, 
      group,
      groupMother,
      startControlArrayGroup,
    } = this.props;
    console.tron.log(['group save input', data.group, info.data_name])
    if (inputSave) {     
        console.tron.log(['group save', data.group, info.data_name])
        saveDataGroup({ 
          index, 
          groupMother, 
          name: info.data_name, 
          data: inputSave,
          extra: null,
          type: data.component_type
        })
    }
    //console.tron.log('antes de ', info.data_name)
    startControlArrayGroup(info.data_name)
  }

  saveFormInput = info => {
    const { inputSave } = this.state;
    const { 
      form, 
      getSaveStateForm, 
      startControlArray, 
      data, 
      index, 
      saveDataGroup, 
      group,
      groupMother,
      startControlArrayGroup,
    } = this.props;
    //console.tron.log('cheguei no saveinput', index, groupMother)
    if (inputSave) {
      //console.tron.log(['input', data.group, info.data_name])
      if (data.group === 'jhg') {
        // console.tron.log(['group save', data.group, info.data_name])
        saveDataGroup({ index, groupMother, name: info.data_name, data: inputSave })
      } else {
        for (var key in form.step) {
          if (key === info.data_name) {
            const form = {};
            form[info.data_name] = { key: info.data_name, value: inputSave, filled: true };
            //console.log(form[info.data_name])
            getSaveStateForm(form);
          }
        }
      }
    } else {
      for (var key in form.step) {
        if (key === info.data_name) {
          const form = {};
          form[info.data_name] = { key: info.data_name, value: inputSave, filled: false };
          //console.log(form[info.data_name])
          getSaveStateForm(form);
        }
      }
    }
    startControlArray();
    // await startControlArrayGroup();
  }

  render() {
    const { data_name, label, hint, default_value, newState, groupFlag } = this.props.data;
    const { group } = this.props
    const { saveStep, step } = this.props.form;
    //console.tron.log(['input group test', group, this.props]); 

    if (saveStep) {
      this.saveFormInput({ data_name, default_value });      
    }
    if (group.flagGroup) {
      console.tron.log('numero de flag gorup input', group.groupFlag)
      this.saveGroupInput({ data_name, default_value })
    }
    return (
      <View style={{ ...styles.container, backgroundColor: (groupFlag === true ? 'white' : null) }}>
        <Text style={styles.hint}>{hint}</Text>
        <TextInput
          style={{ ...styles.input, backgroundColor: (groupFlag === true ? colors.light : 'white') }}
          autoCapitalize="sentences"
          autoCorrect={false}
          placeholder={"Digite aqui..."}
          maxLength={255}
          underlineColorAndroid="rgba(0,0,0,0)"
          onChangeText={inputSave => this.setState({ inputSave })}
          value={this.state.inputSave}
        />

      </View>
    );
  }
}

const mapStateToProps = state => ({
  form: state.formState,
  group: state.groupState,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ ...FormActions, ...GroupActions }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(InputText);