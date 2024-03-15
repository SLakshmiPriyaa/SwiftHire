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
import {NavigationEvents} from 'react-navigation';
import moment from 'moment';
import AsyncStorage from '@react-native-community/async-storage';
import Normalize from './size';
import Images from './images';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
var Year = moment().format('YYYY');
import {SwiperFlatList} from 'react-native-swiper-flatlist';
const colors = ['tomato', 'thistle', 'skyblue', 'teal'];
import RBSheet from 'react-native-raw-bottom-sheet';
class home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      op: [1, 2, 3, 4, 5, 6],
      UserProfileID: '',
      data: [1],
      StudentID: null,
      UserName: '',
      delete: false,
      loader: true,
      SETTINGNAME: null,
      SETTINGVALUE: null,
      SETTINGNAME1: null,
      SETTINGVALUE1: null,
      SETTINGNAME2: null,
      SETTINGVALUE2: null,
      // fail: true,
    };
  }
  async componentDidMount() {
    // console.log(Images);
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
    BackHandler.exitApp();
    return true;
  };
  render() {
    return (
      <>
        <NavigationEvents
          onWillFocus={this._onFocus}
          onWillBlur={this._onBlurr}
        />
        <ScrollView>
          <SafeAreaView>
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
                  height: hp('14%'),
                  width: wp('90%'),
                  alignSelf: 'center',
                  marginTop: hp('2%'),
                  marginBottom: hp('2%'),
                  // marginLeft: wp('60%'),a
                  // justifyContent: 'center',
                  // alignItems: 'center',
                  // alignContent: 'center',
                }}
                resizeMode="center"
                source={require('../assets/logo.png')}
              />

              <View style={{marginBottom: hp('7%')}}>
                <SwiperFlatList
                  autoplay
                  autoplayDelay={4}
                  autoplayLoop
                  index={0}
                  showPagination
                  data={Images}
                  paginationDefaultColor={'#bab8b8'}
                  paginationActiveColor={'#109c00'}
                  paginationStyleItemActive={{
                    // fontSize: Normalize(5),
                    marginTop: hp('0.3%'),
                    height: hp('1%'),
                    width: wp('7%'),
                  }}
                  paginationStyleItem={{
                    // fontSize: Normalize(5),
                    marginTop: hp('0.3%'),
                    height: hp('0.7%'),
                    width: wp('5%'),
                  }}
                  renderItem={({item}) => (
                    <View style={{marginBottom: wp('10%')}}>
                      <TouchableOpacity
                        activeOpacity={0.5}
                        onPress={() => {
                          // if(item.BannerURL != null || item.item.BannerURL != ''){
                          //   this.props.navigation.push('web', {
                          //     data: {
                          //       Link: item.BannerURL,
                          //       navi: 'tab',
                          //     },
                          //   });
                          // }
                          // console.log(item.BannerURL)
                          // Linking.openURL('https://youtu.be/1aeXVdFiJn0');
                        }}>
                        <Image
                          style={{
                            width: wp('90%'),
                            height: hp('23%'),
                            // resizeMode: 'stretch',s
                            // borderTopRightRadius: hp('1%'),
                            // borderTopLeftRadius: hp('1%'),
                            // marginTop: hp('2%'),
                            marginLeft: wp('5%'),
                            marginRight: wp('5%'),
                            borderRadius: wp('5%'),
                            // marginBottom: hp('2%'),
                            // marginLeft: wp('1.5%'),
                          }}
                          // resizeMode="cover"
                          source={{
                            uri: 'data:image/jpeg;base64,' + item,
                          }}
                        />
                      </TouchableOpacity>
                    </View>
                  )}
                />
              </View>
            </View>
            <View
              style={{
                backgroundColor: '#ffff',
                width: wp('93%'),
                // height: hp('30%'),
                alignSelf: 'center',
                borderRadius: wp('5%'),
                marginTop: hp('-5.5%'),
                marginBottom: hp('3%'),
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: hp('-2%'),
                }}>
                <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={() => {
                    this.props.navigation.push('schedulemeeting');
                  }}>
                  <View
                    style={{
                      // height: hp('16%'),
                      width: wp('43%'),
                      // backgroundColor: '#ffff',
                      // elevation: 15,
                      // // borderColor: '#ba131a',
                      // shadowOffset: {width: 0, height: 3},
                      // shadowOpacity: 0.5,
                      // shadowRadius: 5,
                      borderRadius: wp('3%'),
                      marginLeft: wp('1.5%'),
                      marginRight: wp('1%'),
                      marginTop: hp('1.8%'),
                      borderColor: '#ba131a',
                      // borderWidth: 1,
                      // alignItems: 'center',
                      // justifyContent: 'center',
                    }}>
                    <Image
                      style={{
                        height: hp('10%'),
                        width: hp('10%'),
                        alignSelf: 'center',
                        marginTop: hp('2.8%'),
                        marginBottom: hp('-1%'),
                        // marginLeft: wp('8%'),
                        // justifyContent: 'center',
                        // alignItems: 'center',
                        // alignContent: 'center',
                      }}
                      // resizeMode="stretch"
                      source={require('../assets/SM.png')}
                    />
                    <Text
                      style={{
                        // marginLeft: wp('8%'),
                        marginTop: hp('1.5%'),
                        color: '#333',
                        fontFamily: 'WorkSans-SemiBold',
                        fontSize: Normalize(12),
                        // marginRight: wp('3%'),
                        textAlign: 'center',
                        marginBottom: hp('1%'),
                        // marginRight: wp('1%'),
                        // marginLeft: wp('1%'),
                      }}>
                      Schedule Meeting
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={() => this.props.navigation.push('meetinglist')}>
                  <View
                    style={{
                      // height: hp('16%'),
                      width: wp('43%'),
                      // backgroundColor: '#ffff',
                      // elevation: 15,
                      // // borderColor: '#ba131a',
                      // shadowOffset: {width: 0, height: 3},
                      // shadowOpacity: 0.5,
                      // shadowRadius: 5,
                      borderRadius: wp('3%'),
                      marginLeft: wp('1.5%'),
                      marginRight: wp('1%'),
                      // marginTop: hp('1.8%'),
                      borderColor: '#ba131a',
                      // borderWidth: 1,
                      // alignItems: 'center',
                      // justifyContent: 'center',
                    }}>
                    <Image
                      style={{
                        height: hp('9%'),
                        width: hp('9%'),
                        alignSelf: 'center',
                        marginTop: hp('5%'),
                        // marginLeft: wp('8%'),
                        // justifyContent: 'center',
                        // alignItems: 'center',
                        // alignContent: 'center',
                      }}
                      resizeMode="stretch"
                      source={require('../assets/list.png')}
                    />
                    <Text
                      style={{
                        // marginLeft: wp('8%'),
                        marginTop: hp('1%'),
                        color: '#333',
                        fontFamily: 'WorkSans-SemiBold',
                        fontSize: Normalize(12),
                        // marginRight: wp('3%'),
                        textAlign: 'center',
                        marginBottom: hp('1%'),
                      }}>
                      Meetings list
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  marginBottom: hp('3%'),
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={() => this.props.navigation.push('tab1')}>
                  <View
                    style={{
                      // height: hp('16%'),
                      width: wp('43%'),
                      // backgroundColor: '#ffff',
                      // elevation: 15,
                      // // borderColor: '#ba131a',
                      // shadowOffset: {width: 0, height: 3},
                      // shadowOpacity: 0.5,
                      // shadowRadius: 5,
                      borderRadius: wp('3%'),
                      marginLeft: wp('1.5%'),
                      marginRight: wp('1%'),
                      // marginTop: hp('1.8%'),
                      borderColor: '#ba131a',
                      // borderWidth: 1,
                      // alignItems: 'center',
                      // justifyContent: 'center',
                    }}>
                    <Image
                      style={{
                        height: hp('9%'),
                        width: hp('9%'),
                        alignSelf: 'center',
                        marginTop: hp('3%'),
                        // marginLeft: wp('8%'),
                        // justifyContent: 'center',
                        // alignItems: 'center',
                        // alignContent: 'center',
                      }}
                      resizeMode="stretch"
                      source={require('../assets/pro.png')}
                    />
                    <Text
                      style={{
                        // marginLeft: wp('8%'),
                        marginTop: hp('1%'),
                        color: '#333',
                        fontFamily: 'WorkSans-SemiBold',
                        fontSize: Normalize(13),
                        // marginRight: wp('3%'),
                        textAlign: 'center',
                        marginBottom: hp('1%'),
                      }}>
                      Profile
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </SafeAreaView>
        </ScrollView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default home;
