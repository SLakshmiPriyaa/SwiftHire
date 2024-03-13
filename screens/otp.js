import React from 'react';
import {
  StyleSheet,
  ImageBackground,
  SafeAreaView,
  FormInput,
  Text,
  Share,
  View,
  Image,
  Alert,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Button,
  Linking,
  FlatList,
  BackHandler,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Normalize from './size';
import {Dialog} from 'react-native-simple-dialogs';
import Icon from 'react-native-vector-icons/Ionicons';
import {NavigationEvents} from 'react-navigation';
import AsyncStorage from '@react-native-community/async-storage';
class otp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      wishes: null,
      otp: null,
      otpError: false,
      Password: null,
      PasswordError: false,
      invalid: false,
      time: {},
      seconds: 600,
      expired: false,
      MobileNumber: null,
    };
    this.timer = 0;
    this.startTimer = this.startTimer.bind(this);
    this.countDown = this.countDown.bind(this);
  }
  handleInputChange = (inputName, inputValue) => {
    this.setState(state => ({...state, [inputName]: inputValue}));
  };

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
    this.startTimer();
    var MobileNumber = await AsyncStorage.getItem('MobileNumber');
    // console.log(MobileNumber);
    this.setState({MobileNumber: MobileNumber});
  };
  check() {
    const mreg = /^[0-9]*$/;
    // console.log();
    this.setState({UsernameError: false, invalid: false});
    if (this.state.otp == null) {
      this.setState({otpError: true});
    } else if (this.state.otp != '12345' || this.state.otp != 12345) {
      this.setState({invalid: true});
      console.log('sdakgbs');
    } else {
      this.setState({UsernameError: false, invalid: false}, () => {
        clearInterval(this.timer);
        this.props.navigation.push('signup');
      });
    }
  }
  secondsToTime(secs) {
    let hours = Math.floor(secs / (60 * 60));

    let divisor_for_minutes = secs % (60 * 60);
    let minutes = Math.floor(divisor_for_minutes / 60);

    let divisor_for_seconds = divisor_for_minutes % 60;
    let seconds = Math.ceil(divisor_for_seconds);

    let obj = {
      h: hours,
      m: minutes,
      s: seconds,
    };
    return obj;
  }
  startTimer() {
    if (this.timer == 0 && this.state.seconds > 0) {
      this.timer = setInterval(this.countDown, 1000);
    }
  }

  countDown() {
    // Remove one second, set state so a re-render happens.
    let seconds = this.state.seconds - 1;
    this.setState(
      {
        time: this.secondsToTime(seconds),
        seconds: seconds,
      },
      () => {
        if (this.state.time.m == 0 && this.state.time.s == 0) {
          clearInterval(this.timer);
          this.setState({expired: true});
        }
      },
    );
    // console.log(this.state.time);
    // Check if we're at zero.
    if (seconds == 0) {
      clearInterval(this.timer);
    }
  }
  render() {
    return (
      <SafeAreaView>
        <ScrollView>
          <NavigationEvents
            onWillFocus={this._onFocus}
            onWillBlur={this._onBlurr}
          />
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
            visible={this.state.invalid}
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
                // lineHeight: hp('2.5%'),
              }}>
              Error !! Invalid OTP.
            </Text>
            <TouchableOpacity
              style={styles.SubmitButtonStyledd}
              activeOpacity={0.5}
              onPress={() => {
                this.setState({invalid: false}, () => {
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
            visible={this.state.expired}
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
                // lineHeight: hp('2.5%'),
              }}>
              OOPS! Your OTP Expired.
            </Text>
            <TouchableOpacity
              style={styles.SubmitButtonStyledd}
              activeOpacity={0.5}
              onPress={() => {
                this.setState({expired: false}, () => {
                  this.props.navigation.push('login');
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
                marginTop: hp('10%'),
              }}>
              <Image
                style={{
                  height: hp('15%'),
                  width: wp('80%'),
                  alignSelf: 'center',
                  marginTop: hp('-4%'),
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
                fontSize: 18,
                fontFamily: 'WorkSans-Bold',
                marginTop: hp('5%'),
                color: '#333',
                // marginBottom: hp('15%'),
                // lineHeight: hp('2.5%'),
              }}>
              OTP Verification
            </Text>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 15,
                fontFamily: 'WorkSans-Regular',
                marginTop: hp('3%'),
                color: '#333',
                // lineHeight: hp('2.5%'),
                // marginBottom: hp('18%'),
                marginLeft: wp('3%'),
                marginRight: wp('3%'),
              }}>
              We have sent an OTP on
            </Text>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 16,
                fontFamily: 'WorkSans-Bold',
                marginTop: hp('0.5%'),
                color: '#333',
                // lineHeight: hp('2.5%'),
                marginBottom: hp('15%'),
              }}>
              {this.state.MobileNumber}
            </Text>
          </View>
          <View
            style={{
              backgroundColor: '#ffff',
              width: wp('100%'),
              borderTopLeftRadius: wp('17%'),
              marginTop: hp('-8%'),
            }}>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 16,
                fontFamily: 'WorkSans-SemiBold',
                marginTop: hp('5%'),
                color: '#333',
                // marginBottom: hp('15%'),
                // lineHeight: hp('2.5%'),
              }}>
              Enter the OTP Here
            </Text>

            <View
              style={{
                justifyContent: 'center',
                borderWidth: wp('0.3%'),
                borderRadius: wp('2%'),
                // padding: 5,
                // height: hp('8%'),
                marginBottom: hp('3%'),
                borderColor: '#333',
                marginTop: hp('5%'),
                backgroundColor: 'white',
                height: hp('5.5%'),
                width: wp('75%'),
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
                  paddingLeft: wp('5%'),
                }}
                // onPress={this.setPasswordVisibility}
                activeOpacity={0.5}
                name="ios-lock-closed-sharp"
                color={'#ffbd80'}
                size={hp('3%')}
              />
              <TextInput
                placeholder="Enter the OTP"
                fontFamily={'WorkSans-Regular'}
                placeholderTextColor={'gray'}
                color={'black'}
                maxLength={6}
                keyboardType={'number-pad'}
                fontSize={14}
                onChangeText={value => this.handleInputChange('otp', value)}
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
            {this.state.otpError == true ? (
              <Text style={styles.errorMessage}>* Please enter OTP.</Text>
            ) : null}

            <Text
              style={{
                textAlign: 'center',
                color: '#ba131a',
                fontFamily: 'WorkSans-Regular',
                fontSize: Normalize(12),
                marginTop: hp('3%'),
              }}>
              RESEND
            </Text>
            <Text
              style={{
                textAlign: 'center',
                color: '#ba131a',
                fontFamily: 'WorkSans-SemiBold',
                fontSize: Normalize(14),
                marginTop: hp('1%'),
              }}>
              00 : 0{this.state.time.m} : {this.state.time.s}
            </Text>
            {/* {console.log(this.state.time.m + this.state.time.s)} */}
            <Text
              style={{
                textAlign: 'center',
                color: '#ba131a',
                fontFamily: 'WorkSans-Regular',
                fontSize: Normalize(12),
                marginTop: hp('2%'),
              }}>
              OTP will be available only for 10 minutes
            </Text>

            <TouchableOpacity
              style={styles.SubmitButtonStyle}
              activeOpacity={0.5}
              onPress={() => {
                // this.setState({loader: true}, () => {
                this.check();
                // });
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  color: '#333',
                  fontFamily: 'WorkSans-Bold',
                  fontSize: 17,
                }}>
                {' '}
                CONTINUE{' '}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  SubmitButtonStyle: {
    paddingTop: hp('0.5%'),
    paddingBottom: hp('0.5%'),
    backgroundColor: '#ffbd80',
    borderRadius: wp('5%'),
    width: wp('50%'),
    alignSelf: 'center',
    marginTop: hp('5%'),
    // marginLeft: wp('3%'),
    marginBottom: hp('15%'),
  },
  errorMessage: {
    fontSize: 15,
    color: 'red',
    textAlign: 'center',
    // marginTop: hp('1%'),
    fontFamily: 'WorkSans-Regular',
    // marginBottom: hp('-2%'),
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
});

export default otp;
