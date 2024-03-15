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
  Linking,
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
import {CustomPicker} from 'react-native-custom-picker';
import DeviceInfo from 'react-native-device-info';
import axios from 'axios';
import DatePicker from 'react-native-date-picker';
import {NavigationEvents} from 'react-navigation';
class signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      FullName: null,
      FullNameError: false,
      MobileNumber: null,
      MobileNumberError: false,
      EmailID: null,
      EmailID1: null,
      EmailIDError: false,
      DateOfBirth: null,
      DateOfBirthError: false,
      StateID: null,
      StateIDError: false,
      CityID: null,
      CityIDError: false,
      UserTypeID: null,
      UserTypeIDError: false,
      rege: false,
      regm: false,
      fail: false,
      notexist: false,
      passwordwrong: false,
      loader: false,
      Users: [],
      States: [],
      city: [],
      datechoosed: null,
      date10: new Date(),
      mode: 'date',
      showdate: false,
      success: false,
      City: null,
      State: null,
      UserType: null,
      Emaino: false,
      pla: '',
    };
  }
  _onBlurr = () => {
    BackHandler.removeEventListener(
      'hardwareBackPress',
      this._handleBackButtonClick,
    );
  };

  _onFocus = () => {
    BackHandler.addEventListener(
      'hardwareBackPress',
      this._handleBackButtonClick,
    );
  };

  _handleBackButtonClick = () => {
    // BackHandler.exitApp();
    return true;
  };
  componentDidMount = async () => {
    var MobileNumber = await AsyncStorage.getItem('MobileNumber');
    // console.log(MobileNumber);
    this.setState({MobileNumber: MobileNumber});
  };
  handleInputChange = (inputName, inputValue) => {
    this.setState(state => ({...state, [inputName]: inputValue}));
  };
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
            marginTop: hp('1%'),
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
                    // width: wp('25%'),
                    flexWrap: 'wrap',
                    width: wp('100%'),
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
  async check() {
    this.setState({
      FullNameError: false,
      MobileNumberError: false,
      regm: false,
      EmailIDError: false,
      ereg: false,
      DateOfBirthError: false,
      StateIDError: false,
      CityIDError: false,
      UserTypeIDError: false,
    });
    const mreg = /^[0-9]*$/;
    const ereg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (this.state.FullName == null) {
      this.setState({FullNameError: true});
    } else if (this.state.MobileNumber == null) {
      this.setState({MobileNumberError: true});
    } else if (mreg.test(this.state.MobileNumber) != true) {
      this.setState({regm: true});
    } else if (this.state.EmailID == null) {
      this.setState({EmailIDError: true});
    } else if (ereg.test(this.state.EmailID.trim()) != true) {
      this.setState({ereg: true});
    } else if (this.state.DateOfBirth == null) {
      this.setState({DateOfBirthError: true});
    } else {
      this.setState({
        FullNameError: false,
        MobileNumberError: false,
        regm: false,
        EmailIDError: false,
        ereg: false,
        DateOfBirthError: false,
      });
      var p = await AsyncStorage.getItem('MobileNumberList');
      var z = JSON.parse(p);
      if (z == null) {
        var ml = [];
        ml.push(this.state.MobileNumber);
        await AsyncStorage.setItem('MobileNumberList', JSON.stringify(ml));
      } else {
        var ml = z;
        ml.push(this.state.MobileNumber);
        await AsyncStorage.setItem('MobileNumberList', JSON.stringify(ml));
      }

      const a = {
        FullName: this.state.FullName.trim(),
        MobileNumber: this.state.MobileNumber,
        EmailID: this.state.EmailID.trim(),
        DateOfBirth: this.state.DateOfBirth,
      };
      console.log(a);

      var p2 = await AsyncStorage.getItem('Userdata');
      var z2 = JSON.parse(p2);
      if (z2 == null) {
        var daa = [];
        daa.push(a);
        await AsyncStorage.setItem('Userdata', JSON.stringify(daa));
      } else {
        var daa = z2;
        daa.push(a);
        await AsyncStorage.setItem('Userdata', JSON.stringify(daa));
      }

      AsyncStorage.setItem('isLogin', 'true');
      AsyncStorage.setItem('MobileNumber', this.state.MobileNumber.toString());
      AsyncStorage.setItem('EmailID', this.state.EmailID.toString());
      AsyncStorage.setItem('FullName', this.state.FullName.toString());
      AsyncStorage.setItem('DateOfBirth', this.state.datechoosed.toString());
      this.setState({success: true});
    }
  }
  render() {
    return (
      <ScrollView>
        <SafeAreaView>
          <NavigationEvents
            onWillFocus={this._onFocus}
            onWillBlur={this._onBlurr}
          />
          <Dialog
            visible={this.state.success}
            dialogStyle={{
              borderRadius: wp('5%'),
              width: wp('90%'),
              alignSelf: 'center',
            }}
            onTouchOutside={() => console.log('no')}>
            <ScrollView>
              <View
                style={{
                  alignItems: 'center',
                  // marginTop: hp('2%'),
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
                    marginTop: hp('2%'),
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
                  fontFamily: 'WorkSans-Bold',
                  textAlign: 'center',
                  marginTop: hp('2%'),
                  marginBottom: hp('1%'),
                  lineHeight: hp('2.5%'),
                  marginLeft: wp('3%'),
                  marginRight: wp('3%'),
                }}>
                User Created Successfully.
              </Text>

              <TouchableOpacity
                style={styles.SubmitButtonStyled}
                activeOpacity={0.5}
                onPress={() => {
                  this.setState({success: false}, () => {
                    this.props.navigation.push('tab');
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
            </ScrollView>
          </Dialog>
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
              Error !! Please Add Again.
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
            visible={this.state.notexist}
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
              Error !! User Already Exist.
            </Text>
            <TouchableOpacity
              style={styles.SubmitButtonStyledd}
              activeOpacity={0.5}
              onPress={() => {
                this.setState({notexist: false}, () => {
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
          <View style={{width: wp('100%'), backgroundColor: '#f3c49b'}}>
            <View
              style={{
                // alignItems: 'center',
                // justifyContent: 'center',
                marginTop: hp('7%'),
              }}>
              <Image
                style={{
                  height: hp('18%'),
                  width: wp('90%'),
                  alignSelf: 'center',
                  // marginLeft: wp('60%'),
                  // justifyContent: 'center',
                  // alignItems: 'center',
                  // alignContent: 'center',
                }}
                resizeMode="stretch"
                source={require('../assets/logo.png')}
              />
            </View>
            <Text
              style={{
                textAlign: 'center',
                fontSize: Normalize(16),
                fontFamily: 'WorkSans-SemiBold',
                marginTop: hp('6%'),
                color: '#333',
                marginBottom: hp('15%'),
                // lineHeight: hp('2.5%'),
              }}>
              Register With Personal Details
            </Text>
          </View>
          <View
            style={{
              backgroundColor: '#ffff',
              width: wp('100%'),
              borderTopLeftRadius: wp('17%'),
              marginTop: hp('-8%'),
            }}>
            <View
              style={{
                // justifyContent: 'center',
                borderWidth: wp('0.3%'),
                borderRadius: wp('5%'),
                // padding: 5,
                height: hp('5%'),
                // marginBottom: hp('3%'),
                borderColor: '#f3c49b',
                marginTop: hp('5%'),
                backgroundColor: 'white',

                width: wp('85%'),
                alignSelf: 'center',
                flexDirection: 'row',
                // paddingLeft: wp('12%'),a
                alignItems: 'center',
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
                color={'#f3c49b'}
                size={hp('3%')}
              />
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
            </View>
            {this.state.FullNameError == true ? (
              <Text style={styles.errorMessage}>* Please enter Full Name.</Text>
            ) : null}
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() =>
                this.setState({
                  MobileNumberError: !this.state.MobileNumberError,
                })
              }>
              <View
                style={{
                  // justifyContent: 'center',
                  borderWidth: wp('0.3%'),
                  borderRadius: wp('5%'),
                  // padding: 5,
                  height: hp('5%'),
                  // marginBottom: hp('3%'),
                  borderColor: '#f3c49b',
                  marginTop: hp('4%'),
                  backgroundColor: '#fcfbd2',

                  width: wp('85%'),
                  alignSelf: 'center',
                  flexDirection: 'row',
                  // paddingLeft: wp('12%'),a
                  alignItems: 'center',
                }}>
                <Icon
                  style={{
                    // width: wp('10%'),
                    // marginRight: hp('2%'),
                    // marginTop: hp('-4.2%'),
                    // marginLeft: wp('-16%'),
                    // paddingLeft: wp('-4%'),
                    paddingLeft: wp('3%'),
                  }}
                  // onPress={this.setPasswordVisibility}
                  activeOpacity={0.5}
                  name="ios-phone-portrait"
                  color={'#f3c49b'}
                  size={hp('3%')}
                />
                <Text
                  style={{
                    textAlign: 'center',
                    color: '#333',
                    fontFamily: 'WorkSans-Regular',
                    fontSize: Normalize(12),
                    marginLeft: wp('3%'),
                  }}>
                  {this.state.MobileNumber}
                </Text>
              </View>
            </TouchableOpacity>
            {this.state.MobileNumberError == true ? (
              <Text style={styles.errorMessage}>
                * Mobile Number cannot change.
              </Text>
            ) : null}
            {this.state.mreg == true ? (
              <Text style={styles.errorMessage}>
                * Please enter only Numbers.
              </Text>
            ) : null}

            <View
              style={{
                // justifyContent: 'center',
                borderWidth: wp('0.3%'),
                borderRadius: wp('5%'),
                // padding: 5,
                height: hp('5%'),
                // marginBottom: hp('3%'),
                borderColor: '#f3c49b',
                marginTop: hp('4%'),
                backgroundColor: 'white',

                width: wp('85%'),
                alignSelf: 'center',
                flexDirection: 'row',
                // paddingLeft: wp('12%'),a
                alignItems: 'center',
              }}>
              <Icon
                style={{
                  // width: wp('10%'),
                  // marginRight: hp('2%'),
                  // marginTop: hp('-4.2%'),
                  // marginLeft: wp('-16%'),
                  // paddingLeft: wp('-4%'),
                  paddingLeft: wp('3%'),
                }}
                // onPress={this.setPasswordVisibility}
                activeOpacity={0.5}
                name="ios-mail"
                color={'#f3c49b'}
                size={hp('3%')}
              />
              <TextInput
                placeholder="Email"
                fontFamily={'WorkSans-Regular'}
                placeholderTextColor={'#666'}
                maxLength={100}
                color={'black'}
                fontSize={Normalize(12)}
                onChangeText={value => this.handleInputChange('EmailID', value)}
                style={{
                  // paddingLeft: wp('1%'),
                  padding: hp('0.5%'),
                  marginLeft: wp('2%'),
                  width: wp('60%'),
                  alignItems: 'center',
                  alignSelf: 'center',
                }}
              />
            </View>

            {this.state.EmailIDError == true ? (
              <Text style={styles.errorMessage}>* Please enter Email.</Text>
            ) : null}
            {this.state.ereg == true ? (
              <Text style={styles.errorMessage}>
                * Please enter valid Email.
              </Text>
            ) : null}

            <View
              style={{
                // justifyContent: 'center',
                borderWidth: wp('0.3%'),
                borderRadius: wp('5%'),
                // padding: 5,
                height: hp('5%'),
                // marginBottom: hp('3%'),
                borderColor: '#f3c49b',
                marginTop: hp('4%'),
                backgroundColor: 'white',

                width: wp('85%'),
                alignSelf: 'center',
                flexDirection: 'row',
                // paddingLeft: wp('12%'),a
                alignItems: 'center',
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
                color={'#f3c49b'}
                size={hp('3%')}
              />
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() =>
                  this.setState({
                    showdate: true,
                  })
                }>
                {this.state.datechoosed == null ? (
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
                    {this.state.datechoosed}
                  </Text>
                )}
              </TouchableOpacity>
            </View>

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
                  datechoosed: moment(date).format('DD-MM-YYYY'),
                });
                this.setState({
                  DateOfBirth: moment(date).format('DD-MM-YYYY'),
                });
              }}
              onCancel={() => {
                this.setState({showdate: false});
              }}
            />
            {this.state.DateOfBirthError == true ? (
              <Text style={styles.errorMessage}>
                * Please select Date of Birth.
              </Text>
            ) : null}

            <TouchableOpacity
              style={styles.SubmitButtonStyle}
              activeOpacity={0.5}
              onPress={() => {
                this.check();
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  color: '#333',
                  fontFamily: 'WorkSans-Bold',
                  fontSize: Normalize(15),
                }}>
                {' '}
                REGISTER{' '}
              </Text>
            </TouchableOpacity>
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  horizontal: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp('50%'),
  },
  separator1: {
    borderBottomColor: '#f3c49b',
    borderBottomWidth: 0.5,
    marginBottom: hp('2%'),
    marginTop: hp('1%'),
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
    fontSize: Normalize(12),
    color: 'red',
    textAlign: 'center',
    marginTop: hp('1%'),
    fontFamily: 'WorkSans-Regular',
    marginBottom: hp('1%'),
  },
  SubmitButtonStyled: {
    paddingTop: hp('0.5%'),
    paddingBottom: hp('0.5%'),
    backgroundColor: 'forestgreen',
    borderRadius: wp('5%'),
    width: wp('25%'),
    alignSelf: 'center',
    marginTop: hp('3%'),
    // marginLeft: wp('3%'),
    marginBottom: hp('3%'),
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
  SubmitButtonStyle: {
    marginTop: hp('8%'),
    paddingTop: hp('0.5%'),
    paddingBottom: hp('0.5%'),
    backgroundColor: '#f3c49b',
    borderRadius: wp('3%'),
    marginLeft: wp('17%'),
    marginRight: wp('17%'),
    borderColor: 'white',
    marginBottom: hp('10%'),
    borderWidth: 1,
  },
  linearGradient: {
    flex: 1,
    // paddingLeft: 15,
    // paddingRight: 15,
    // borderRadius: 5,
    height: hp('65%'),
    // width: hp('60%'),
    // borderRadius: wp('20'),
    marginTop: hp('-10%'),
    // width: wp('110%'),
    borderRadius: wp('20%'),
    borderColor: '#f3c49b',

    borderWidth: 1,
    // marginLeft: wp('-14%'),
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
  errorMessage: {
    fontSize: Normalize(12),
    color: 'red',
    textAlign: 'center',
    marginTop: hp('2%'),
    fontFamily: 'WorkSans-Regular',
    // marginBottom: hp('1%'),
  },
});

export default signup;
