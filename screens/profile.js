import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  Image,
  Alert,
  TouchableOpacity,
  ScrollView,
  Linking,
  TextInput,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import {Switch} from 'react-native-switch';
import axios from 'axios';

import ToggleSwitch from 'toggle-switch-react-native';
import {Dialog} from 'react-native-simple-dialogs';
import {CustomPicker} from 'react-native-custom-picker';

import ImagePicker from 'react-native-image-crop-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
var RNFS = require('react-native-fs');
import {
  notifications,
  messages,
  NotificationMessage,
  Android,
} from 'react-native-firebase-push-notifications';
import Normalize from './size';
class profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      UserType: '',
      isOn: true,
      dialogVisible1: false,
      reg1: false,
      reg2: false,
      reg3: false,
      Email: null,
      dia: true,
      FullName: null,
      LoginUserProfileID: '',
      dia: false,
      dia1: false,
      StateID: null,
      CityID: null,
      State: null,
      City: null,
      DateofBirth: null,
      MobileNo: null,
      showcalendar: false,
      base64: null,
      date10: new Date(),
      dialogVisible: false,
      UserName: '',
      upl: false,
      ProfileImage: null,
      success: false,
      fail: false,
      States: [],
      city: [],
      datechoosed: null,
      date10: new Date(),
      mode: 'date',
      showdate: false,
      merr: false,
      eerr: false,
      FullNameError: false,
      DateofBirthError: false,
      StateIDError: null,
      CityIDError: null,
    };
  }

  renderOption(settings) {
    const {item, getLabel} = settings;
    // console.log(item)
    return (
      <View style={styles.optionContainer}>
        <Text
          style={{
            color: 'black',
            alignSelf: 'flex-start',
            marginLeft: wp('0.5%'),
            fontSize: 15,
            fontFamily: 'WorkSans-Regular',
            marginTop: hp('1%'),
            marginRight: wp('3%'),
            // textAlign: 'center',
          }}>
          {getLabel(item)}
        </Text>
      </View>
    );
  }
  handleInputChange = (inputName, inputValue) => {
    this.setState(state => ({...state, [inputName]: inputValue}));
  };
  renderField(settings) {
    const {selectedItem, defaultText, getLabel, clear} = settings;
    return (
      <View style={styles.container1}>
        <View>
          {!selectedItem && (
            <Text
              style={[
                styles.text,
                {
                  fontSize: 15,
                  fontFamily: 'WorkSans-Regular',

                  textAlign: 'left',

                  borderRadius: 20,
                  color: 'black',
                  backgroundColor: '#ffffff',
                  paddingLeft: wp('1%'),
                  paddingTop: 2,
                  marginLeft: wp('2%'),
                  width: wp('100%'),
                },
              ]}>
              {defaultText}
            </Text>
          )}
          {selectedItem && (
            <View style={styles.innerContainer}>
              <Text
                style={[
                  styles.text,
                  {
                    fontSize: 15,
                    fontFamily: 'WorkSans-Regular',

                    textAlign: 'left',

                    borderRadius: 20,
                    color: 'black',
                    backgroundColor: '#ffffff',
                    paddingLeft: wp('1%'),
                    paddingTop: 2,
                    marginLeft: wp('2%'),
                    width: wp('100%'),
                  },
                ]}>
                {getLabel(selectedItem)}
              </Text>
            </View>
          )}
        </View>
      </View>
    );
  }

  handleInputChange = (inputName, inputValue) => {
    this.setState(state => ({
      ...state,
      [inputName]: inputValue,
    }));
  };

  chooseImage() {
    ImagePicker.openPicker({
      multiple: false,
      includeBase64: true,
      waitAnimationEnd: false,
      sortOrder: 'desc',
      includeExif: true,
      forceJpg: true,
      mediaType: 'photo',
    })
      .then(files => {
        // this.setState({
        //   files: files.map(i => {
        // console.log(files);
        //     var videoUri = this.state.base64;
        //     videoUri.push(i.data);
        //     // console.log(videoUri);
        this.setState({base64: files.data, dialogVisible: true});
        //     return {
        //       uri: i.path,
        //       width: i.width,
        //       height: i.height,
        //       mime: i.mime,
        //       // data: i.data,
        //     };
        //   }),
        // });
      })
      .catch(e => alert(e));
  }
  clickImage() {
    ImagePicker.openCamera({
      multiple: false,
      includeBase64: true,
      waitAnimationEnd: false,
      sortOrder: 'desc',
      includeExif: true,
      forceJpg: true,
      cropping: true,
      mediaType: 'photo',
    })
      .then(files => {
        // console.log(files);
        this.setState({base64: files.data, dialogVisible: true});
        // console.log(files);
        // var videoUri = this.state.base64;
        // videoUri.push(files.data);
        // this.setState({base64: videoUri});
        // console.log(videoUri);
        // console.log('videoUri');
        // this.setState({
        //   files: files.map(i => {
        //     // console.log('received image', i);
        //
        //     this.setState({base64: videoUri});
        //   }),
        // });
      })
      .catch(e => alert(e));
  }
  async componentDidMount() {
    var FullName = await AsyncStorage.getItem('FullName');
    // console.log(u);
    this.setState({UserName: FullName});
    var ProfileImage = await AsyncStorage.getItem('ProfileImage');
    // console.log(u);
    this.setState({ProfileImage: ProfileImage});
  }

  render() {
    return (
      <SafeAreaView>
        <ScrollView>
          <Dialog
            visible={this.state.fail}
            dialogStyle={{
              borderRadius: wp('5%'),
              width: wp('75%'),
              alignSelf: 'center',
            }}
            onTouchOutside={() => console.log('no')}>
            <View
              style={{
                alignItems: 'center',
                marginTop: hp('2%'),
                marginBottom: hp('0.5%'),
              }}>
              <Image
                style={{
                  //  borderWidth: 1,
                  height: hp('6%'),
                  width: hp('6%'),
                  // borderColor: 'forestgreen',
                  borderRadius: hp('100%'),
                  alignSelf: 'center',
                  justifyContent: 'center',
                  // marginTop: hp('-1%'),
                  // marginBottom: hp('1%'),
                }}
                resizeMode="contain"
                source={require('../assets/1024px-Cross_red_circle.svg-removebg-preview.png')}
              />
            </View>
            <Text
              style={{
                color: 'red',
                fontSize: 15,
                fontFamily: 'CalibriRegular',
                textAlign: 'center',
                marginTop: hp('2%'),
                marginBottom: hp('1%'),
                lineHeight: hp('2.5%'),
              }}>
              Error !! Please try Again.
            </Text>
            <TouchableOpacity
              style={styles.SubmitButtonStyledd}
              activeOpacity={0.5}
              onPress={() => {
                this.setState({fail: false}, () => {
                  this.props.navigation.push('tab1');
                });
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  color: 'white',
                  fontFamily: 'CalibriBold',
                  fontSize: 16,
                }}>
                {' '}
                OK{' '}
              </Text>
            </TouchableOpacity>
          </Dialog>
          <Dialog
            visible={this.state.success}
            dialogStyle={{
              borderRadius: wp('5%'),
              width: wp('75%'),
              alignSelf: 'center',
            }}
            onTouchOutside={() => console.log('no')}>
            <View
              style={{
                alignItems: 'center',
                marginTop: hp('2%'),
                marginBottom: hp('0.5%'),
              }}>
              <Image
                style={{
                  //  borderWidth: 1,
                  height: hp('7%'),
                  width: hp('7%'),
                  // borderColor: 'forestgreen',
                  borderRadius: hp('100%'),
                  alignSelf: 'center',
                  justifyContent: 'center',
                  // marginTop: hp('-1%'),
                  // marginBottom: hp('1%'),
                }}
                resizeMode="contain"
                source={require('../assets/accepted-removebg-preview.png')}
              />
            </View>
            <Text
              style={{
                color: 'green',
                fontSize: 15,
                fontFamily: 'CalibriRegular',
                textAlign: 'center',
                marginTop: hp('2%'),
                marginBottom: hp('1%'),
                lineHeight: hp('2.5%'),
                marginLeft: wp('3%'),
                marginRight: wp('3%'),
              }}>
              Profile Updated Successfully.
            </Text>
            <TouchableOpacity
              style={styles.SubmitButtonStyled}
              activeOpacity={0.5}
              onPress={() => {
                this.setState({success: false}, () => {
                  this.props.navigation.push('tab1');
                });
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  color: 'white',
                  fontFamily: 'CalibriBold',
                  fontSize: 16,
                }}>
                {' '}
                OK{' '}
              </Text>
            </TouchableOpacity>
          </Dialog>
          <View style={{backgroundColor: '#f3c49b', height: hp('38%')}}>
            <Image
              style={{
                height: hp('18%'),
                width: wp('90%'),
                alignSelf: 'center',
                marginTop: hp('5%'),
                // marginLeft: wp('60%'),
                // justifyContent: 'center',
                // alignItems: 'center',
                // alignContent: 'center',
              }}
              resizeMode="stretch"
              source={require('../assets/logo.png')}
            />
          </View>
          <View
            style={{
              backgroundColor: 'whitesmoke',

              marginTop: hp('-4%'),
              borderTopLeftRadius: wp('8%'),
              borderTopEndRadius: wp('8%'),
            }}>
            {this.state.ProfileImage == null ? (
              <>
                <View style={styles.header}></View>
                <Image
                  style={styles.avatar}
                  source={require('../assets/profile.jpg')}
                />
              </>
            ) : (
              <>
                <View style={styles.header}></View>

                <Image
                  style={styles.avatar}
                  source={{
                    uri: 'data:image/jpeg;base64,' + this.state.ProfileImage,
                  }}
                />
              </>
            )}
            <View style={styles.body}>
              <View>
                <Text style={styles.name}>{this.state.FullName}</Text>
              </View>
            </View>

            <TouchableOpacity
              activeOpacity={0.5}
              onPress={async () => {
                this.props.navigation.push('editprofile');
              }}>
              <View
                style={{
                  backgroundColor: 'white',
                  width: wp('90%'),
                  height: hp('6%'),
                  alignSelf: 'center',
                  marginTop: hp('2%'),
                  borderRadius: wp('3%'),
                  flexDirection: 'row',
                }}>
                <Icon
                  name="ios-ellipsis-vertical-circle"
                  size={hp('3%')}
                  color="#333"
                  style={{alignSelf: 'center', marginLeft: wp('4%')}}
                />
                <Text
                  style={{
                    fontSize: Normalize(12.5),
                    color: '#333',
                    // marginTop: hp('2.5%'),

                    marginLeft: wp('5%'),
                    fontFamily: 'WorkSans-SemiBold',
                    textAlign: 'center',
                    alignSelf: 'center',
                  }}>
                  Edit Profile
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.5}
              onPress={async () => {
                await AsyncStorage.removeItem('isLogin');
                await AsyncStorage.removeItem('ProfileImage');
                await AsyncStorage.removeItem('MobileNumber');
                await AsyncStorage.removeItem('EmailID');
                await AsyncStorage.removeItem('FullName');

                this.props.navigation.push('login');
              }}>
              <View
                style={{
                  backgroundColor: 'white',
                  width: wp('90%'),
                  height: hp('6%'),
                  alignSelf: 'center',
                  marginTop: hp('5%'),
                  borderRadius: wp('3%'),
                  flexDirection: 'row',
                }}>
                <Icon
                  name="ios-exit-outline"
                  size={hp('3%')}
                  color="#333"
                  style={{alignSelf: 'center', marginLeft: wp('4%')}}
                />
                <Text
                  style={{
                    fontSize: Normalize(12.5),
                    color: '#333',
                    // marginTop: hp('2.5%'),

                    marginLeft: wp('5%'),
                    fontFamily: 'WorkSans-SemiBold',
                    textAlign: 'center',
                    alignSelf: 'center',
                  }}>
                  Logout
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <View>
            <Text
              style={{
                textAlign: 'center',
                fontSize: Normalize(11.5),
                fontFamily: 'Rubik-Regular',
                marginTop: hp('6%'),
              }}>
              For any queries, please email us at{' '}
            </Text>
            <TouchableOpacity
              onPress={() => Linking.openURL('mailto:sales@datasack.in')}>
              <Text
                style={{
                  textAlign: 'center',
                  textDecorationLine: 'underline',
                  color: '#fa9339',
                  fontSize: Normalize(11.5),
                  fontFamily: 'Rubik-Bold',
                  marginTop: hp('1.5%'),
                }}>
                sales@datasack.in
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: hp('3.5%'),
              marginBottom: hp('2%'),
            }}>
            <View style={{flexDirection: 'row'}}>
              <Icon
                onPress={
                  () =>
                    this.props.navigation.push('web', {
                      data: {
                        Link: 'https://www.facebook.com/DataSackSolutions/',
                        navi: 'tab1',
                      },
                    })

                  // Linking.openURL('https://www.facebook.com/ampindia.org/')
                }
                name="ios-logo-facebook"
                color={'#faae6b'}
                size={hp('4%')}
                style={{marginRight: hp('3%'), marginBottom: hp('2%')}}
              />
              <Icon
                onPress={
                  () =>
                    this.props.navigation.push('web', {
                      data: {
                        Link: 'https://in.linkedin.com/company/data-sack',
                        navi: 'tab1',
                      },
                    })
                  // Linking.openURL(
                  //   'https://www.linkedin.com/groups/2228112/profile',
                  // )
                }
                name="ios-logo-linkedin"
                color={'#faae6b'}
                size={hp('4%')}
                style={{marginRight: hp('3%'), marginBottom: hp('2%')}}
              />
              <Icon
                onPress={
                  () =>
                    this.props.navigation.push('web', {
                      data: {
                        Link: 'https://datasack.in/',
                        navi: 'tab1',
                      },
                    })
                  // Linking.openURL(
                  //   'https://plus.google.com/104867308022959569080',
                  // )
                }
                name="ios-logo-google"
                color={'#faae6b'}
                size={hp('4%')}
                style={{marginRight: hp('3%'), marginBottom: hp('2%')}}
              />
              <Icon
                onPress={
                  () =>
                    this.props.navigation.push('web', {
                      data: {
                        Link: 'https://www.ambitionbox.com/overview/datasack-solutions-overview',
                        navi: 'tab1',
                      },
                    })
                  // Linking.openURL('https://twitter.com/AMPIndia')
                }
                name="ios-logo-twitter"
                color={'#faae6b'}
                size={hp('4%')}
                style={{marginBottom: hp('2%')}}
              />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const Separator = () => <View style={styles.separator} />;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3c49b',
    position: 'absolute',
    flexDirection: 'row',
    // marginTop: hp('6%'),
    marginLeft: wp('75%'),
    borderRadius: hp('3%'),
    alignSelf: 'center',
  },
  appButtonContainer2: {
    // borderWidth: 1,
    paddingTop: hp('0.1%'),
    paddingBottom: hp('0.1%'),
    // backgroundColor: 'forestgreen',
    // borderRadius: wp('3%'),
    width: wp('48%'),
    // marginLeft: wp('3%'),
    // marginBottom: hp('2%'),
    borderRadius: wp('3%'),
    padding: wp('0.5%'),
    // marginLeft: wp('57%'),
    // width: wp('35%'),
    // marginBottom: hp('3%'),
    // borderColor: 'forestgreen',
    marginTop: hp('4%'),
    alignSelf: 'center',
    // backgroundColor: 'forestgreen',
    marginBottom: hp('2%'),
    height: hp('4%'),
    // marginRight: wp('1%'),
    alignItems: 'center',
    justifyContent: 'center',
    // flexDirection: 'row',
  },
  SubmitButtonStyle: {
    marginTop: hp('2%'),
    paddingTop: hp('1%'),
    paddingBottom: hp('1%'),
    backgroundColor: '#f3c49b',
    borderRadius: wp('3%'),
  },
  header: {
    // backgroundColor: '#f3c49b',
    // height: hp('12%'),
  },
  avatar: {
    width: wp('30%'),
    height: hp('12%'),
    borderRadius: hp('2%'),
    borderWidth: 4,
    borderColor: 'white',
    alignSelf: 'center',
    // position: 'absolute',
    marginTop: hp('-6%'),
  },
  separator: {
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderWidth: 1,
  },

  body: {
    marginTop: hp('1%'),
  },
  appButtonContainer1: {
    // borderWidth: 1,
    paddingTop: hp('0.1%'),
    paddingBottom: hp('0.1%'),
    // backgroundColor: 'forestgreen',
    // borderRadius: wp('3%'),
    width: wp('48%'),
    // marginLeft: wp('3%'),
    // marginBottom: hp('2%'),
    borderRadius: wp('3%'),
    padding: wp('0.5%'),
    // marginLeft: wp('57%'),
    // width: wp('35%'),
    // marginBottom: hp('3%'),
    // borderColor: 'forestgreen',
    marginTop: hp('4%'),
    alignSelf: 'center',
    // backgroundColor: 'forestgreen',
    marginBottom: hp('2%'),
    height: hp('4%'),
    // marginRight: wp('1%'),
    alignItems: 'center',
    justifyContent: 'center',
    // flexDirection: 'row',
  },
  name: {
    fontSize: Normalize(15),
    color: '#f3c49b',
    fontFamily: 'WorkSans-SemiBold',
    marginTop: hp('0.5%'),
    textAlign: 'center',
  },
  errorMessage: {
    fontSize: Normalize(11),
    color: 'red',
    textAlign: 'center',
    marginLeft: wp('2%'),
    marginRight: wp('2%'),
    fontFamily: 'WorkSans-Regular',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  row1: {
    height: hp('6%'),
    width: wp('13%'),
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: wp('0.5%'),
    borderColor: '#f5f5f5',
    borderWidth: 0.7,
  },
  row2: {
    height: hp('6%'),
    width: wp('43%'),
    backgroundColor: '#fff',

    justifyContent: 'center',
    // marginLeft: wp('0.5%'),
    borderColor: '#f5f5f5',
    borderWidth: 0.7,
  },
  row3: {
    height: hp('6%'),
    width: wp('21%'),
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',

    borderColor: '#f5f5f5',
    borderWidth: 0.7,
  },
  row4: {
    height: hp('6%'),
    width: wp('21%'),
    backgroundColor: '#fff',
    // alignItems: 'center',
    justifyContent: 'center',

    borderColor: '#f5f5f5',
    borderWidth: 0.7,
  },
  horizontal: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp('50%'),
  },
  btn: {
    width: wp('16%'),
    height: hp('2.5%'),
    backgroundColor: 'forestgreen',
    borderRadius: wp('5%'),
    alignItems: 'center',
    justifyContent: 'center',
    // marginLeft: wp('1.5%'),
    marginBottom: hp('1.5%'),
    marginTop: hp('1.5%'),
    alignSelf: 'center',
  },
  btn1: {
    // width: wp('16%'),
    // height: hp('2.5%'),
    backgroundColor: 'forestgreen',
    borderRadius: wp('1%'),
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: hp('14%'),
    marginBottom: hp('1.5%'),
    marginTop: hp('0.7%'),
    alignSelf: 'flex-end',
  },
  btnText: {
    textAlign: 'center',
    color: '#fff',
    fontFamily: 'WorkSans-Regular',
    fontSize: 13,
  },
  container1: {
    borderColor: '#ffcc00',
  },
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  text: {
    fontSize: 18,
  },
  headerFooterContainer: {
    padding: 10,
    alignItems: 'center',
  },
  clearButton: {
    backgroundColor: 'grey',
    borderRadius: 5,
    marginRight: 10,
    padding: 5,
  },
  optionContainer: {
    padding: 10,
    borderBottomColor: '#f3c49b',
    borderBottomWidth: 1,
  },
  optionInnerContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  box: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  itemSeparatorStyle: {
    height: 1,
    width: '90%',
    alignSelf: 'center',
    backgroundColor: '#D3D3D3',
  },
  errorMessage: {
    fontSize: Normalize(11),
    color: '#ff4500',
    textAlign: 'center',
    marginTop: hp('1%'),
    fontFamily: 'WorkSans-Regular',
    marginLeft: wp('3%'),
    marginRight: wp('3%'),
    // marginBottom: hp('2%'),
  },
  SubmitButtonStyled: {
    paddingTop: hp('0.5%'),
    paddingBottom: hp('0.5%'),
    backgroundColor: 'forestgreen',
    borderRadius: wp('5%'),
    width: wp('25%'),
    alignSelf: 'center',
    marginTop: hp('2%'),
    // marginLeft: wp('3%'),
    marginBottom: hp('2%'),
  },
  SubmitButtonStyledd: {
    paddingTop: hp('0.5%'),
    paddingBottom: hp('0.5%'),
    backgroundColor: 'red',
    borderRadius: wp('5%'),
    width: wp('25%'),
    alignSelf: 'center',
    marginTop: hp('2%'),
    // marginLeft: wp('3%'),
    marginBottom: hp('3%'),
  },
});

export default profile;
