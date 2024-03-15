import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  FormInput,
  Text,
  View,
  Image,
  Alert,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Button,
  Platform,
  PermissionsAndroid,
  ImageBackground,
  BackHandler,
  ActivityIndicator,
  TouchableHighlight,
  DeviceEventEmitter,
} from 'react-native';
import {Dialog} from 'react-native-simple-dialogs';
import Icon from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import AsyncStorage from '@react-native-community/async-storage';
import Normalize from './size';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

var date = moment().format('YYYY/MM/DD ');
var time = moment().format('hh:mm A');
import ImagePicker from 'react-native-image-crop-picker';
import {CustomPicker} from 'react-native-custom-picker';

import axios from 'axios';

import publicIP from 'react-native-public-ip';
import DatePicker from 'react-native-date-picker';
import LinearGradient from 'react-native-linear-gradient';

import DateTimePicker from '@react-native-community/datetimepicker';

import {NavigationEvents} from 'react-navigation';
class editprofile extends React.Component {
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
      dialogVisible: true,
      UserName: '',
      upl: false,
      ProfileImage: null,
      success: false,
      fail: false,
      States: [],
      city: [],
      DateofBirth1: null,
      date10: new Date(),
      mode: 'date',
      showdate: false,
      merr: false,
      eerr: false,
      date: new Date(),
      pla: '',
    };
  }

  renderOption(settings) {
    const {item, getLabel} = settings;
    const element = (data, index) => (
      <TouchableOpacity onPress={() => this.props.navigation.push('update')}>
        <View style={styles.btn}>
          <Text style={styles.btnText}>button</Text>
        </View>
      </TouchableOpacity>
    );
    // console.log(item)
    return (
      <View style={styles.optionContainer}>
        <Text
          style={{
            color: 'black',
            // alignSelf: 'center',
            marginLeft: wp('3%'),
            fontSize: Normalize(13),
            fontFamily: 'NexaLight',
            marginTop: hp('1.5%'),
            marginRight: wp('1%'),
            textAlign: 'left',
          }}>
          {getLabel(item)}
        </Text>
      </View>
    );
  }
  selectedValue(index, item) {
    this.setState({selectedText: item.name});
  }

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
                  fontSize: Normalize(12),
                  fontFamily: 'WorkSans-Regular',

                  textAlign: 'left',

                  borderRadius: 20,
                  color: '#666',

                  // paddingLeft: 10,
                  paddingTop: -4,
                  marginLeft: wp('3%'),
                  width: wp('100%'),
                  // width: wp('30%'),
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
                    fontSize: Normalize(12),
                    fontFamily: 'WorkSans-Regular',

                    textAlign: 'left',

                    borderRadius: 20,
                    color: 'black',

                    paddingLeft: 2,
                    paddingTop: 2,
                    marginLeft: wp('3%'),
                    width: wp('100%'),
                    // width: wp('25%'),
                    flexWrap: 'wrap',
                  },
                ]}
                numberOfLines={1}
                ellipsizeMode="tail">
                {getLabel(selectedItem)}
              </Text>
            </View>
          )}
        </View>
      </View>
    );
  }
  chooseImage() {
    ImagePicker.openPicker({
      multiple: false,
      includeBase64: true,
      waitAnimationEnd: false,
      sortOrder: 'desc',
      includeExif: true,
      forceJpg: true,
      cropping: true,
      mediaType: 'photo',
      height: 150,
      width: 150,
    })
      .then(files => {
        // this.setState({
        //   files: files.map(i => {
        // console.log(files);
        //     var videoUri = this.state.base64;
        //     videoUri.push(i.data);
        //     // console.log(videoUri);
        this.setState({ProfileImage: files.data, dialogVisible: true});
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
      height: 150,
      width: 150,
    })
      .then(files => {
        // console.log(files);
        this.setState({ProfileImage: files.data, dialogVisible: true});
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
    this.setState({FullName: FullName});
    var MobileNumber = await AsyncStorage.getItem('MobileNumber');
    // console.log(u);
    this.setState({MobileNumber: MobileNumber});

    var EmailID = await AsyncStorage.getItem('EmailID');
    // console.log(EmailID);
    this.setState({EmailID: EmailID});
    var ProfileImage = await AsyncStorage.getItem('ProfileImage');
    // console.log(EmailID);
    this.setState({ProfileImage: ProfileImage});
    var DateOfBirth = await AsyncStorage.getItem('DateOfBirth');

    this.setState({DateofBirth1: DateOfBirth}, () => {});
  }
  check = async () => {
    if (this.state.FullName == null) {
      this.setState({FullNameError: true});
    } else if (this.state.DateofBirth1 == null) {
      this.setState({DateofBirthError: true});
    } else if (this.state.ProfileImage == null) {
      this.setState({ProfileImageerr: true});
    } else {
      AsyncStorage.setItem('MobileNumber', this.state.MobileNumber.toString());
      AsyncStorage.setItem('EmailID', this.state.EmailID.toString());
      AsyncStorage.setItem('FullName', this.state.FullName.toString());
      AsyncStorage.setItem('DateOfBirth', this.state.DateofBirth1.toString());
      AsyncStorage.setItem('ProfileImage', this.state.ProfileImage.toString());
      this.setState({success: true});
    }
  };
  handleInputChange = (inputName, inputValue) => {
    this.setState(state => ({
      ...state,
      [inputName]: inputValue,
    }));
  };

  render() {
    return (
      <ScrollView>
        <SafeAreaView>
          <Dialog
            visible={this.state.fail}
            dialogStyle={{
              borderRadius: wp('5%'),
              width: wp('80%'),
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
                // lineHeight: hp('2.5%'),
              }}>
              Error !! Please try Again.
            </Text>
            <TouchableOpacity
              style={styles.SubmitButtonStyledd}
              activeOpacity={0.5}
              onPress={() => {
                this.setState({fail: false}, () => {
                  // this.props.navigation.push('signup');
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
              width: wp('80%'),
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
          <Dialog
            visible={this.state.upl}
            dialogStyle={{
              borderRadius: wp('1%'),
              width: wp('90%'),
              alignSelf: 'center',
            }}
            onTouchOutside={() =>
              this.setState({upl: false, dialogVisible: true})
            }>
            <View
              style={{
                backgroundColor: '#faae6b',
                // width: wp('90%'),
                borderBottomColor: '#333',
                borderBottomWidth: 2,
                marginLeft: wp('-6.3%'),
                marginRight: wp('-6.2%'),
                marginTop: hp('-2.45%'),
                borderTopLeftRadius: wp('1%'),
                borderTopRightRadius: wp('1%'),
                flexDirection: 'row',
                // alignItems: 'center',s
                // justifyContent: 'center',
              }}>
              <Text
                style={{
                  // textAlign: 'center',
                  color: '#333',
                  fontFamily: 'WorkSans-SemiBold',
                  fontSize: Normalize(16),
                  marginLeft: wp('4%'),
                  // marginRight: wp('23%'),
                  marginTop: hp('1.5%'),
                  marginBottom: hp('1.5%'),
                  // alignSelf: 'center',
                }}>
                CHOOSE OPTION
              </Text>
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => {
                  this.setState({upl: false, dialogVisible: true});
                }}>
                <Icon
                  name="ios-close-circle"
                  color={'#333'}
                  style={{
                    marginTop: hp('1.2%'),
                    marginBottom: hp('1%'),
                    marginLeft: wp('27%'),
                  }}
                  size={hp('4.2%')}
                />
              </TouchableOpacity>
            </View>
            <View
              style={{
                alignItems: 'center',
                marginTop: hp('-3%'),
                marginBottom: hp('-2%'),
              }}>
              <TouchableOpacity
                style={{
                  marginTop: hp('7%'),

                  backgroundColor: '#fffcc4',
                  borderRadius: wp('3%'),

                  alignItems: 'center',
                  justifyContent: 'center',
                  height: hp('4.2%'),
                  marginBottom: hp('1%'),
                  width: wp('55%'),
                  borderWidth: 1,
                }}
                activeOpacity={0.5}
                onPress={() => {
                  this.setState({upl: false});
                  this.clickImage();
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    color: '#333',
                    fontFamily: 'WorkSans-Bold',
                    fontSize: Normalize(13),
                  }}>
                  {' '}
                  Capture Image{' '}
                </Text>
                {/* </LinearGradient> */}
              </TouchableOpacity>
            </View>
            <View
              style={{
                alignItems: 'center',
                marginBottom: hp('-1%'),
              }}>
              <TouchableOpacity
                style={{
                  marginTop: hp('4%'),

                  backgroundColor: '#c2ffdd',
                  borderRadius: wp('3%'),

                  alignItems: 'center',
                  justifyContent: 'center',
                  height: hp('4.2%'),
                  marginBottom: hp('1%'),
                  width: wp('55%'),
                  borderWidth: 1,
                }}
                activeOpacity={0.5}
                onPress={() => {
                  this.setState({upl: false});
                  this.chooseImage();
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    color: '#333',
                    fontFamily: 'WorkSans-Bold',
                    fontSize: Normalize(13),
                  }}>
                  {' '}
                  Choose Image{' '}
                </Text>
                {/* </LinearGradient> */}
              </TouchableOpacity>
            </View>
            <View
              style={{
                alignItems: 'center',
                marginBottom: hp('3%'),
                marginTop: hp('-1%'),
              }}>
              <TouchableOpacity
                activeOpacity={0.5}
                style={{
                  marginTop: hp('4%'),

                  backgroundColor: '#ffc8c2',
                  borderRadius: wp('3%'),

                  alignItems: 'center',
                  justifyContent: 'center',
                  height: hp('4.2%'),
                  marginBottom: hp('1%'),
                  width: wp('55%'),
                  borderWidth: 1,
                }}
                onPress={() => {
                  this.setState({upl: false});
                  this.setState({ProfileImage: null});
                  this.setState({dialogVisible: true});
                  // this.setState({files: null});
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    color: '#333',
                    fontFamily: 'WorkSans-Bold',
                    fontSize: Normalize(13),
                  }}>
                  {' '}
                  Clear Image{' '}
                </Text>
                {/* </LinearGradient> */}
              </TouchableOpacity>
            </View>
          </Dialog>
          <View
            style={{
              backgroundColor: '#f3c49b',
              width: wp('100%'),
              // height: hp('30%'),
              borderBottomLeftRadius: wp('7%'),
              borderBottomRightRadius: wp('7%'),
            }}>
            <Image
              style={{
                height: hp('12%'),
                width: wp('70%'),
                alignSelf: 'center',
                marginTop: hp('4%'),
                // marginLeft: wp('60%'),
                // justifyContent: 'center',
                // alignItems: 'center',
                // alignContent: 'center',
              }}
              resizeMode="stretch"
              source={require('../assets/logo.png')}
            />
            <Icon
              name="ios-arrow-back-outline"
              color={'#333'}
              size={hp('4.5%')}
              onPress={() => this.props.navigation.push('tab1')}
              style={{
                marginLeft: wp('3%'),
                marginTop: hp('-8.3%'),
                marginBottom: hp('2.5%'),
              }}
            />
            <Text
              style={{
                marginLeft: wp('3%'),
                marginTop: hp('3%'),
                color: '#333',
                fontFamily: 'WorkSans-Bold',
                fontSize: Normalize(17),
                marginRight: wp('3%'),
                textAlign: 'center',
                marginBottom: hp('10%'),
                // lineHeight: hp('2.5%'),
              }}>
              EDIT PROFILE
            </Text>
          </View>

          <View
            style={{
              backgroundColor: '#ffff',
              width: wp('93%'),
              // height: hp('30%'),
              alignSelf: 'center',
              borderRadius: wp('5%'),
              marginTop: hp('-7.5%'),
              marginBottom: hp('3%'),
              borderRadius: wp('3%'),
            }}>
            <Text
              style={{
                marginLeft: wp('6%'),
                marginTop: hp('3%'),
                color: '#333',
                fontFamily: 'WorkSans-SemiBold',
                fontSize: Normalize(12),
              }}>
              Mobile Number
            </Text>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() =>
                this.setState({
                  merr: !this.state.merr,
                })
              }>
              <View
                style={{
                  // justifyContent: 'center',
                  borderWidth: wp('0.3%'),
                  borderRadius: wp('2%'),
                  // padding: 5,
                  // height: hp('5%'),
                  // marginBottom: hp('3%'),
                  borderColor: '#faae6b',
                  marginTop: hp('1%'),
                  backgroundColor: 'white',

                  width: wp('80%'),
                  // alignSelf: 'center',
                  flexDirection: 'row',
                  // paddingLeft: wp('12%'),a
                  alignItems: 'center',
                  marginLeft: wp('6%'),
                  backgroundColor: '#fffcba',
                }}>
                <Icon
                  style={{
                    // width: wp('10%'),
                    // marginRight: hp('2%'),
                    // marginTop: hp('-4.2%'),
                    // marginLeft: wp('-16%'),
                    paddingLeft: wp('3.5%'),
                  }}
                  // onPress={this.setPasswordVisibility}
                  activeOpacity={0.5}
                  name="ios-phone-portrait"
                  color={'#faae6b'}
                  size={hp('2.8%')}
                />
                <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={() =>
                    this.setState({
                      merr: !this.state.merr,
                    })
                  }>
                  <Text
                    style={{
                      marginLeft: wp('3%'),
                      // marginTop: hp('0.5%'),
                      color: '#333',
                      fontFamily: 'WorkSans-Regular',
                      fontSize: Normalize(12),
                      marginTop: hp('1%'),
                      marginBottom: hp('1%'),
                      marginRight: wp('5%'),
                    }}>
                    {this.state.MobileNumber}
                  </Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>

            {this.state.merr == true ? (
              <Text style={styles.errorMessage}>
                * Mobile Number cannot be updated.
              </Text>
            ) : null}
            <Text
              style={{
                marginLeft: wp('6%'),
                marginTop: hp('2%'),
                color: '#333',
                fontFamily: 'WorkSans-SemiBold',
                fontSize: Normalize(12),
              }}>
              Email ID
            </Text>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() =>
                this.setState({
                  eerr: !this.state.eerr,
                })
              }>
              <View
                style={{
                  // justifyContent: 'center',
                  borderWidth: wp('0.3%'),
                  borderRadius: wp('2%'),
                  // padding: 5,
                  // height: hp('5%'),
                  // marginBottom: hp('3%'),
                  borderColor: '#faae6b',
                  marginTop: hp('1%'),
                  backgroundColor: 'white',

                  width: wp('80%'),
                  // alignSelf: 'center',
                  flexDirection: 'row',
                  // paddingLeft: wp('12%'),a
                  alignItems: 'center',
                  marginLeft: wp('6%'),
                  backgroundColor: '#fffcba',
                }}>
                <Icon
                  style={{
                    // width: wp('10%'),
                    // marginRight: hp('2%'),
                    // marginTop: hp('-4.2%'),
                    // marginLeft: wp('-16%'),
                    paddingLeft: wp('3.5%'),
                  }}
                  // onPress={this.setPasswordVisibility}
                  activeOpacity={0.5}
                  name="ios-mail"
                  color={'#faae6b'}
                  size={hp('2.8%')}
                />
                <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={() =>
                    this.setState({
                      eerr: !this.state.eerr,
                    })
                  }>
                  <Text
                    style={{
                      marginLeft: wp('3%'),
                      // marginTop: hp('0.5%'),
                      color: '#333',
                      fontFamily: 'WorkSans-Regular',
                      fontSize: Normalize(12),
                      marginTop: hp('1%'),
                      marginBottom: hp('1%'),
                      marginRight: wp('5%'),
                    }}>
                    {this.state.EmailID}
                  </Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>

            {this.state.eerr == true ? (
              <Text style={styles.errorMessage}>
                * EmailID cannot be updated.
              </Text>
            ) : null}
            <View>
              <Text
                style={{
                  marginLeft: wp('6%'),
                  marginTop: hp('2%'),
                  color: '#333',
                  fontFamily: 'WorkSans-SemiBold',
                  fontSize: Normalize(12),
                }}>
                Full Name
              </Text>
              <View
                style={{
                  // justifyContent: 'center',
                  borderWidth: wp('0.3%'),
                  borderRadius: wp('2%'),
                  // padding: 5,
                  height: hp('5%'),
                  // marginBottom: hp('3%'),
                  borderColor: '#faae6b',
                  marginTop: hp('1%'),
                  backgroundColor: 'white',

                  width: wp('80%'),
                  // alignSelf: 'center',
                  flexDirection: 'row',
                  // paddingLeft: wp('12%'),a
                  alignItems: 'center',
                  marginLeft: wp('6%'),
                }}>
                <Icon
                  style={{
                    // width: wp('10%'),
                    // marginRight: hp('2%'),
                    // marginTop: hp('-4.2%'),
                    // marginLeft: wp('-16%'),
                    paddingLeft: wp('3%'),
                  }}
                  // onPress={this.setPasswordVisibility}
                  activeOpacity={0.5}
                  name="ios-person-circle"
                  color={'#faae6b'}
                  size={hp('3%')}
                />
                {this.state.FullName == null ? (
                  <>
                    <TextInput
                      placeholder="Full Name"
                      fontFamily={'WorkSans-Regular'}
                      placeholderTextColor={'#666'}
                      color={'black'}
                      maxLength={100}
                      fontSize={Normalize(12)}
                      onChangeText={value =>
                        this.handleInputChange('FullName', value)
                      }
                      style={{
                        // paddingLeft: wp('1%'),
                        padding: hp('0.5%'),
                        marginLeft: wp('2%'),
                        width: wp('60%'),
                        alignItems: 'center',
                        alignSelf: 'center',
                      }}
                    />
                  </>
                ) : (
                  <>
                    <TextInput
                      // placeholder="Full Name"
                      fontFamily={'WorkSans-Regular'}
                      placeholderTextColor={'#666'}
                      color={'black'}
                      fontSize={Normalize(12)}
                      maxLength={100}
                      value={this.state.FullName}
                      onChangeText={value =>
                        this.handleInputChange('FullName', value)
                      }
                      style={{
                        // paddingLeft: wp('1%'),
                        padding: hp('0.5%'),
                        marginLeft: wp('2%'),
                        width: wp('60%'),
                        alignItems: 'center',
                        alignSelf: 'center',
                      }}
                    />
                  </>
                )}
              </View>
            </View>
            <View>
              <Text
                style={{
                  marginLeft: wp('6%'),
                  marginTop: hp('2%'),
                  color: '#333',
                  fontFamily: 'WorkSans-SemiBold',
                  fontSize: Normalize(12),
                }}>
                Date of Birth
              </Text>
            </View>

            <View
              style={{
                // justifyContent: 'center',
                borderWidth: wp('0.3%'),
                borderRadius: wp('2%'),
                // padding: 5,
                height: hp('5%'),
                // marginBottom: hp('3%'),
                borderColor: '#faae6b',
                marginTop: hp('1%'),
                backgroundColor: 'white',

                width: wp('80%'),
                // alignSelf: 'center',
                flexDirection: 'row',
                // paddingLeft: wp('12%'),a
                alignItems: 'center',
                marginLeft: wp('6%'),
              }}>
              <Icon
                style={{
                  // width: wp('10%'),
                  // marginRight: hp('2%'),
                  // marginTop: hp('-4.2%'),
                  // marginLeft: wp('-16%'),
                  paddingLeft: wp('3.5%'),
                }}
                // onPress={this.setPasswordVisibility}
                activeOpacity={0.5}
                name="ios-calendar"
                color={'#faae6b'}
                size={hp('2.8%')}
              />

              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() =>
                  this.setState({
                    showdate: true,
                  })
                }>
                {this.state.DateofBirth1 == null ? (
                  <Text
                    style={{
                      marginLeft: wp('3%'),
                      // marginTop: hp('0.2%'),
                      color: '#666',
                      fontFamily: 'WorkSans-Regular',
                      fontSize: Normalize(12),
                    }}>
                    DOB
                  </Text>
                ) : (
                  <Text
                    style={{
                      marginLeft: wp('2%'),
                      // marginTop: hp('0.5%'),
                      color: '#333',
                      fontFamily: 'WorkSans-Regular',
                      fontSize: Normalize(12),
                    }}>
                    {this.state.DateofBirth1}
                  </Text>
                )}
              </TouchableOpacity>
            </View>
            {this.state.DateofBirthError == true ? (
              <Text style={styles.errorMessage}>
                * Please select Date of Birth.
              </Text>
            ) : null}
            <DatePicker
              modal
              mode={'date'}
              open={this.state.showdate}
              date={this.state.date10}
              maximumDate={new Date()}
              onConfirm={date => {
                // console.log(date)

                this.setState({showdate: false});
                this.setState({
                  DateofBirth1: moment(date).format('DD-MM-YYYY'),
                });
                this.setState({
                  DateOfBirth: moment(date).format('DD-MM-YYYY'),
                });
              }}
              onCancel={() => {
                this.setState({showdate: false});
              }}
            />

            <View>
              <Text
                style={{
                  marginLeft: wp('6%'),
                  marginTop: hp('2%'),
                  color: '#333',
                  fontFamily: 'WorkSans-SemiBold',
                  fontSize: Normalize(12),
                }}>
                Profile Image
              </Text>
            </View>
            {this.state.ProfileImage == null ? (
              <>
                <TouchableOpacity
                  onPress={() =>
                    this.setState({dialogVisible: false, upl: true})
                  }
                  activeOpacity={0.5}>
                  <Image
                    style={{
                      height: hp('10%'),
                      width: hp('15%'),
                      marginTop: hp('1%'),
                      marginBottom: hp('1%'),
                      alignSelf: 'center',
                      // marginLeft: hp('1%'),
                      // marginRight: hp('1%'),
                    }}
                    source={require('../assets/upload.jpg')}
                  />
                </TouchableOpacity>
              </>
            ) : (
              <>
                <TouchableOpacity
                  onPress={() =>
                    this.setState({dialogVisible: false, upl: true})
                  }
                  activeOpacity={0.5}>
                  <Image
                    style={{
                      height: hp('10%'),
                      width: hp('15%'),
                      marginTop: hp('1%'),
                      marginBottom: hp('1%'),
                      alignSelf: 'center',
                      // marginLeft: hp('1%'),
                      // marginRight: hp('1%'),
                    }}
                    source={{
                      uri: 'data:image/jpeg;base64,' + this.state.ProfileImage,
                    }}
                  />
                </TouchableOpacity>
              </>
            )}

            {this.state.ProfileImageerr == true ? (
              <Text style={styles.errorMessage}>
                * Please choose profile image.
              </Text>
            ) : null}
            <View style={{alignItems: 'center', marginBottom: hp('3%')}}>
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => this.check()}>
                <LinearGradient
                  colors={['#faae6b', '#faa55a']}
                  style={{
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
                    marginTop: hp('3%'),
                    alignSelf: 'center',
                    // backgroundColor: 'forestgreen',
                    marginBottom: hp('5%'),
                    height: hp('4%'),
                    // marginRight: wp('1%'),
                    alignItems: 'center',
                    justifyContent: 'center',
                    // flexDirection: 'row',
                  }}>
                  <Text
                    style={{
                      textAlign: 'center',
                      color: '#333',
                      fontFamily: 'WorkSans-Bold',
                      fontSize: Normalize(14),
                    }}>
                    {' '}
                    UPDATE{' '}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </ScrollView>
    );
  }
}

const Separator = () => <View style={styles.separator} />;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#faae6b',
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
    backgroundColor: '#faae6b',
    borderRadius: wp('3%'),
  },
  header: {
    // backgroundColor: '#faae6b',
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
    color: '#faae6b',
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
    borderBottomColor: '#faae6b',
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
export default editprofile;
