import React, { Component } from 'react';
import {
  View, Text, StyleSheet, ScrollView, Alert,
  Image, TouchableOpacity, NativeModules, Dimensions, TextInput, AsyncStorage
} from 'react-native';

import styles from './styles';
import stylesGroup from './stylesGroup';
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { responsividade } from '../../styles';

var ImagePicker = NativeModules.ImageCropPicker;

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as FormActions } from '../../store/ducks/form';
import { Creators as GroupActions } from '../../store/ducks/group';

class Camera extends React.Component {

  state = {
    avatarSource: null,
    videoSource: null,
    imagePath: null,
    image: null,
    images: null,
  };


  componentWillMount() {
    const { form, data, group, index } = this.props;    
    if (data.group === 'true' && group.flag === true) {
      group.dataGroup.map(item => {        
        if (item.index === index) {          
          if (item[data.data_name] !== null && item[data.data_name] !== undefined) {            
            this.setState({ image: item[data.data_name].extra, imagePath: item[data.data_name].value.uri });
          }
        }
      });
    } else {
      for (var key in form.step) {
        if (key === data.data_name) {
          if (form.step[key].filled === true) {
            this.setState({ image: form.step[key].data, imagePath: form.step[key].value.uri });
          }
        }
      }
    }    

  }

  pickSingleWithCamera(cropping) {
    ImagePicker.openCamera({
      cropping: cropping,
      includeExif: false,
      includeBase64: true,
    }).then(image => {

      this.setState({
        image: { uri: image.path, width: image.width, height: image.height },
        images: null,
        imagePath: image.path
      });

    }).catch();
  }



  pickSingleBase64(cropit) {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: cropit,
      includeBase64: true,
      includeExif: true,

    }).then(image => {
      console.log('received base64 image');
      this.setState({
        image: { uri: `data:${image.mime};base64,` + image.data, width: image.width, height: image.height },
        images: null
      });
    }).catch();
  }

  cleanupImages() {
    ImagePicker.clean().then(() => {
      console.log('removed tmp images from tmp directory');
    }).catch(e => {
      //alert(e);
    });
  }

  cleanupSingleImage() {
    let image = this.state.image || (this.state.images && this.state.images.length ? this.state.images[0] : null);
    console.log('will cleanup image', image);

    ImagePicker.cleanSingle(image ? image.uri : null).then(() => {
      console.log(`removed tmp image ${image.uri} from tmp directory`);
    }).catch(e => {
      //alert(e);
    })
  }

  cropLast() {
    if (!this.state.image) {
      //return Alert.alert('Sem imagem', 'Por favor , selecione uma imagem');
    }

    ImagePicker.openCropper({
      path: this.state.image.uri,
      width: 200,
      height: 200
    }).then(image => {
      console.log('received cropped image', image);
      this.setState({
        image: { uri: image.path, width: image.width, height: image.height, mime: image.mime },
        images: null
      });
    }).catch(e => {
      console.log(e);
      // Alert.alert(e.message ? e.message : e);
    });
  }

  pickSingle(cropit, circular = false) {
    ImagePicker.openPicker({
      cropping: cropit,
      cropperCircleOverlay: circular,
      compressImageMaxWidth: 640,
      compressImageMaxHeight: 480,
      compressImageQuality: 0.5,
      compressVideoPreset: 'MediumQuality',
      includeExif: true,
    }).then(image => {
      console.log('received image', image);
      this.setState({
        image: { uri: image.path, width: image.width, height: image.height, mime: image.mime },
        images: null,
        imagesPath: image.path,
      });
    }).catch(e => {
      console.log(e);
      //Alert.alert(e.message ? e.message : e);
    });
  }

  pickMultiple() {
    ImagePicker.openPicker({
      multiple: true,
      waitAnimationEnd: false,
      includeExif: true,
      forceJpg: true,
    }).then(images => {
      this.setState({
        image: null,
        images: images.map(i => {
          console.log('received image', i);
          return { uri: i.path, width: i.width, height: i.height, mime: i.mime };
        })
      });
    });//.catch(e => alert(e));
  }

  scaledHeight(oldW, oldH, newW) {
    return (oldH / oldW) * newW;
  }

  renderVideo(video) {
    return (<View style={{ height: 300, width: 300 }}>
      <Video source={{ uri: video.uri, type: video.mime }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          bottom: 0,
          right: 0
        }}
        rate={1}
        paused={false}
        volume={1}
        muted={false}
        resizeMode={'cover'}
        onError={e => console.log(e)}
        onLoad={load => console.log(load)}
        repeat={true} /> 
    </View>);
  }

  renderImage(image) {
    return <Image resizeMode="contain" style={styles.avatar} source={image} />
  }

  renderAsset(image) {
    if (image.mime && image.mime.toLowerCase().indexOf('video/') !== -1) {
      return this.renderVideo(image);
    }

    return this.renderImage(image);
  }

  saveFormInput = info => {
    
    const { imageData, imagePath, image } = this.state;
    const { 
      form, 
      getSaveStateForm, 
      startControlArray, 
      saveDataGroup, //importa
      data, // importa
      index, //importa
      group, // importa
    } = this.props;
    console.tron.log('entrei no save',info, imagePath, image)

    if (imagePath || image) {
      console.tron.log('entrei if',data, imagePath, image)
      if (data.group === 'true') {
        group.dataGroup.map(item => {
          if (item.index === index) {
            saveDataGroup({ index, name: info.data_name, data: { uri: image.uri, type: 'image/jpeg', name: `${info.data_name}.jpg` }, type: data.component_type, extra: image })
           // saveDataGroup({ index: , name: , data: , type: , extra: })
           console.tron.log('entrei form  grupo', image, imagePath)
          }
        });
      } else {
        for (var key in form.step) {
          if (key === info.data_name) {
            const form = {};
            form[info.data_name] = { key: info.data_name, value: { uri: imagePath, type: 'image/jpeg', name: `${info.data_name}.jpg` }, data: image, filled: true };
            getSaveStateForm(form);
            console.tron.log('entrei form nao grupo', image, imagePath)
          }
        }
      }      
    } else {
      for (var key in form.step) {
        if (key === info.data_name && info.data_name.filled === false) {
          const form = {};
          form[info.data_name] = { key: info.data_name, value: { uri: '', type: '', name: '' }, data: image, filled: false };
          getSaveStateForm(form);
          console.tron.log('sem foto', image, imagePath)
        }
      }
    }
    startControlArray();
  }

  render() {
    const { data_name, label, hint, default_value, newState, group } = this.props.data;
    const { saveStep } = this.props.form;
    const  { largura_tela } = responsividade;

    if (saveStep) {
      this.saveFormInput({ data_name, default_value });
    }
    return (
      <View style={group ? stylesGroup.container : styles.container}>

        <ScrollView>
          {this.state.image ? this.renderAsset(this.state.image) : null}
          {this.state.images ? this.state.images.map(i => <View key={i.uri}>{this.renderAsset(i)}</View>) : null}
        </ScrollView>
        <View style={styles.buttonsView}>
          <TouchableOpacity onPress={() => this.pickSingleWithCamera(true)}>
            <View style={styles.avatarContainer}>
              <View style={styles.avatarContainer2}>
                <Icon name="add-a-photo" color = "black" size={largura_tela< 430 ? 20 : 30} style={styles.icon} />
                <View style={styles.text_foto}>
                  <Text style={styles.text1}>Tirar foto</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this.pickSingle(false)} style={styles.button}>
            <View style={styles.avatarContainer1}>
              <View style={styles.avatarContainer2}>
                <Icon name="photo-library" color = "white" size={largura_tela< 430 ? 20 : 30} style={styles.icon} />
                <View style={styles.text_foto}>
                  <Text style={styles.text}>Abrir galeria</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.containerText}>
          <TextInput
            style={group ? stylesGroup.input : styles.input}
            autoCapitalize="none"
            autoCorrect={false}
            multiline
            placeholder={"Suas notas..."}
            maxLength={100}
            underlineColorAndroid="rgba(0,0,0,0)"
            onChangeText={inputSave => this.setState({ inputSave })}
          />
        </View>

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

export default connect(mapStateToProps, mapDispatchToProps)(Camera);
