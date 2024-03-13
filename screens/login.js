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
import Icon from 'react-native-vector-icons/Ionicons';
import {NavigationEvents} from 'react-navigation';
import AsyncStorage from '@react-native-community/async-storage';
class login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      wishes: null,
      Username: null,
      UsernameError: false,

      PasswordError: false,
    };
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
    BackHandler.exitApp();
    return true;
  };
  componentDidMount = async () => {
    var today = new Date();
    var curHr = today.getHours();

    if (curHr < 12) {
      this.setState({wishes: 'Good Morning'});
      // console.log('good morning')
    } else if (curHr < 18) {
      this.setState({wishes: 'Good Afternoon'});
      // console.log('good afternoon')
    } else {
      this.setState({wishes: 'Good Evening'});
      // console.log('good evening')
    }
  };
  check() {
    const mreg = /^[0-9]*$/;
    // console.log();
    this.setState({UsernameError: false, PasswordError: false});
    if (this.state.Username == null) {
      this.setState({UsernameError: true});
    } else if (
      mreg.test(this.state.Username) != true ||
      this.state.Username.length != 10
    ) {
      this.setState({PasswordError: true});
    } else {
      this.setState({UsernameError: false, PasswordError: false}, async () => {
        AsyncStorage.setItem('MobileNumber', this.state.Username.toString());
        this.props.navigation.push('otp');
      });
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
                fontSize: 16,
                fontFamily: 'WorkSans-Bold',
                marginTop: hp('7%'),
                color: '#333',
                // marginBottom: hp('15%'),
                // lineHeight: hp('2.5%'),
              }}>
              Register With Mobile Number
            </Text>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 15,
                fontFamily: 'WorkSans-Regular',
                marginTop: hp('3%'),
                color: '#333',
                // lineHeight: hp('2.5%'),
                marginBottom: hp('18%'),
                marginLeft: wp('3%'),
                marginRight: wp('3%'),
              }}>
              We will send OTP to verify your Mobile Number
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
                fontSize: 20,
                fontFamily: 'WorkSans-Bold',
                marginTop: hp('5%'),
                color: '#333',
                // marginBottom: hp('15%'),
                // lineHeight: hp('2.5%'),
              }}>
              LOGIN
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
                width: wp('80%'),
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
                name="phone-portrait"
                color={'#ffbd80'}
                size={hp('3%')}
              />
              <TextInput
                placeholder="Enter Your Mobile Number"
                fontFamily={'WorkSans-Regular'}
                placeholderTextColor={'gray'}
                color={'black'}
                maxLength={10}
                keyboardType={'number-pad'}
                fontSize={14}
                onChangeText={value =>
                  this.handleInputChange('Username', value)
                }
                style={{
                  // paddingLeft: wp('1%'),
                  padding: hp('0.5%'),
                  marginLeft: wp('2%'),
                  width: wp('70%'),
                  alignItems: 'center',
                  alignSelf: 'center',
                }}
              />
            </View>
            {this.state.UsernameError == true ? (
              <Text style={styles.errorMessage}>
                * Please enter Mobile Number.
              </Text>
            ) : null}
            {this.state.PasswordError == true ? (
              <Text style={styles.errorMessage}>
                * Please enter valid Mobile Number.
              </Text>
            ) : null}

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
                SEND OTP{' '}
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
    marginBottom: hp('20%'),
  },
  errorMessage: {
    fontSize: 15,
    color: 'red',
    textAlign: 'center',
    // marginTop: hp('1%'),
    fontFamily: 'WorkSans-Regular',
    // marginBottom: hp('-2%'),
  },
});

export default login;
