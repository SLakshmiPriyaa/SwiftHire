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
  FlatList,
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
import Icon from 'react-native-vector-icons/Ionicons';
import DatePicker from 'react-native-date-picker';
import {CustomPicker} from 'react-native-custom-picker';
import LinearGradient from 'react-native-linear-gradient';
import {Dialog} from 'react-native-simple-dialogs';
class meetinglist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date10: new Date(),
      mode: 'date',
      Date: null,
      Time: null,
      participant: null,
      title: null,
      duration: null,
      participantname: null,
      titleerro: false,
      durationerror: false,
      participantnameerr: false,
      dateerro: false,
      timeerroe: false,
    };
  }
  async componentDidMount() {
    var MobileNumber = await AsyncStorage.getItem('MobileNumber');
    var p2 = await AsyncStorage.getItem('Meetingl');
    var z2 = JSON.parse(p2);
    if (z2 != null) {
      var cou2 = z2.filter(data => data.MobileNumber == MobileNumber);
      this.setState({participant: cou2});
      // await AsyncStorage.setItem('Meetingl', JSON.stringify(cou2));
    }
  }
  render() {
    return (
      <SafeAreaView>
        <ScrollView>
          <View style={{backgroundColor: '#f3c49b', width: wp('100%')}}>
            <Image
              style={{
                //  borderWidth: 1,
                height: hp('12%'),
                width: wp('75%'),
                // borderColor: 'forestgreen',
                // borderRadius: hp('100%'),
                alignSelf: 'center',
                justifyContent: 'center',
                // backgroundColor:"lightgrey"s
                marginTop: hp('3%'),
                marginBottom: hp('1%'),
                //   marginLeft:wp('17.5%')
              }}
              resizeMode="contain"
              source={require('../assets/logo.png')}
            />

            <TouchableOpacity
              onPress={() => {
                this.props.navigation.push('tab');
              }}
              style={{
                marginLeft: wp('5%'),
                marginTop: hp('-9%'),
                marginBottom: hp('8.5%'),
              }}>
              <Icon name="ios-chevron-back-sharp" color={'#333'} size={35} />
            </TouchableOpacity>
          </View>

          <View
            style={{
              backgroundColor: '#ffff',
              width: wp('70%'),
              height: hp('5%'),
              alignItems: 'center',
              justifyContent: 'center',
              alignSelf: 'center',
              borderRadius: wp('5%'),
              marginTop: hp('-2.5%'),
              marginBottom: hp('2.5%'),
            }}>
            <Text
              style={{
                color: '#333',
                fontSize: 18,
                fontFamily: 'WorkSans-Regular',
                textAlign: 'center',
                // marginTop: hp('-2%'),
                // marginBottom: hp('2.5%'),
                // marginLeft:wp('5%'),marginRight:wp('3%'),
              }}>
              MEETINGS LIST
            </Text>
          </View>
          {this.state.participant == null ||
          this.state.participant == undefined ||
          this.state.participant.length == 0 ? (
            <>
              <Text
                style={{
                  //   marginLeft: wp('0.5%'),marginRight:wp('0.5%')
                  fontFamily: 'WorkSans-Bold',
                  fontSize: 22,
                  color: '#b33035',
                  textAlign: 'center',
                  marginTop: hp('25%'),
                }}>
                OOPS !
              </Text>
              <Text
                style={{
                  //   marginLeft: wp('0.5%'),marginRight:wp('0.5%')
                  fontFamily: 'WorkSans-Bold',
                  fontSize: 20,
                  color: 'black',
                  textAlign: 'center',
                  // marginTop: hp('5%'),
                }}>
                No Data Found
              </Text>
            </>
          ) : (
            <>
              <FlatList
                data={this.state.participant}
                // horizontal={true}
                showsHorizontalScrollIndicator={false}
                renderItem={({item, index}) => {
                  return (
                    <>
                      <View
                        style={{
                          // height: hp('4.4%'),
                          width: wp('90%'),
                          borderRadius: wp('3%'),
                          backgroundColor: '#ffff',
                          marginLeft: wp('2%'),
                          marginRight: wp('2%'),
                          marginTop: hp('1%'),
                          marginBottom: hp('1%'),
                          // alignItems: 'center',
                          // justifyContent: 'center',
                          alignSelf: 'center',
                          elevation: 10,
                          shadowColor: '#000',
                          shadowOffset: {width: 0, height: 3},
                          shadowOpacity: 0.5,
                          shadowRadius: 5,
                        }}>
                        <Text
                          style={{
                            // textAlign: 'right',
                            color: 'grey',
                            fontFamily: 'WorkSans-SemiBold',
                            fontSize: 14,
                            // marginRight: wp('28%'),
                            marginTop: hp('1%'),
                            // marginBottom: hp('2.2%'),
                            marginLeft: wp('5%'),
                          }}>
                          <Text
                            style={{
                              // textAlign: 'right',
                              color: '#333',
                              fontFamily: 'WorkSans-SemiBold',
                              fontSize: 14,
                              // marginRight: wp('28%'),
                              marginTop: hp('1%'),
                              // marginBottom: hp('2.2%'),
                              marginLeft: wp('5%'),
                            }}>
                            Meeting Title :
                          </Text>
                          <Text
                            style={{
                              textAlign: 'right',
                              color: '#333',
                              fontFamily: 'WorkSans-Regular',
                              fontSize: 14,
                              // marginRight: wp('28%'),
                              marginTop: hp('-3%'),
                              // marginBottom: hp('2.2%'),
                              marginRight: wp('5%'),
                              marginLeft: wp('35%'),
                            }}>
                            {'  '}
                            {item.MettingTitle}
                          </Text>
                        </Text>

                        <Text
                          style={{
                            // textAlign: 'right',
                            color: 'grey',
                            fontFamily: 'WorkSans-SemiBold',
                            fontSize: 14,
                            // marginRight: wp('28%'),
                            marginTop: hp('1%'),
                            // marginBottom: hp('2.2%'),
                            marginLeft: wp('5%'),
                          }}>
                          <Text
                            style={{
                              // textAlign: 'right',
                              color: '#333',
                              fontFamily: 'WorkSans-SemiBold',
                              fontSize: 14,
                              // marginRight: wp('28%'),
                              marginTop: hp('1%'),
                              // marginBottom: hp('2.2%'),
                              marginLeft: wp('5%'),
                            }}>
                            Meeting Date :
                          </Text>
                          <Text
                            style={{
                              textAlign: 'right',
                              color: '#333',
                              fontFamily: 'WorkSans-Regular',
                              fontSize: 14,
                              // marginRight: wp('28%'),
                              marginTop: hp('-3%'),
                              // marginBottom: hp('2.2%'),
                              marginRight: wp('5%'),
                              marginLeft: wp('35%'),
                            }}>
                            {'  '}
                            {item.MettingDate}
                          </Text>
                        </Text>
                        <Text
                          style={{
                            // textAlign: 'right',
                            color: 'grey',
                            fontFamily: 'WorkSans-SemiBold',
                            fontSize: 14,
                            // marginRight: wp('28%'),
                            marginTop: hp('1%'),
                            // marginBottom: hp('2.2%'),
                            marginLeft: wp('5%'),
                          }}>
                          <Text
                            style={{
                              // textAlign: 'right',
                              color: '#333',
                              fontFamily: 'WorkSans-SemiBold',
                              fontSize: 14,
                              // marginRight: wp('28%'),
                              marginTop: hp('1%'),
                              // marginBottom: hp('2.2%'),
                              marginLeft: wp('5%'),
                            }}>
                            Meeting Time :
                          </Text>
                          <Text
                            style={{
                              textAlign: 'right',
                              color: '#333',
                              fontFamily: 'WorkSans-Regular',
                              fontSize: 14,
                              // marginRight: wp('28%'),
                              marginTop: hp('-3%'),
                              // marginBottom: hp('2.2%'),
                              marginRight: wp('5%'),
                              marginLeft: wp('35%'),
                            }}>
                            {'  '}
                            {item.MettingTime}
                          </Text>
                        </Text>
                        <Text
                          style={{
                            // textAlign: 'right',
                            color: 'grey',
                            fontFamily: 'WorkSans-SemiBold',
                            fontSize: 14,
                            // marginRight: wp('28%'),
                            marginTop: hp('1%'),
                            // marginBottom: hp('2.2%'),
                            marginLeft: wp('5%'),
                          }}>
                          <Text
                            style={{
                              // textAlign: 'right',
                              color: '#333',
                              fontFamily: 'WorkSans-SemiBold',
                              fontSize: 14,
                              // marginRight: wp('28%'),
                              marginTop: hp('1%'),
                              // marginBottom: hp('2.2%'),
                              marginLeft: wp('5%'),
                            }}>
                            Meeting Duration :
                          </Text>
                          <Text
                            style={{
                              textAlign: 'right',
                              color: '#333',
                              fontFamily: 'WorkSans-Regular',
                              fontSize: 14,
                              // marginRight: wp('28%'),
                              marginTop: hp('-3%'),
                              // marginBottom: hp('2.2%'),
                              marginRight: wp('5%'),
                              marginLeft: wp('35%'),
                            }}>
                            {'  '}
                            {item.MettingDuration} Mins
                          </Text>
                        </Text>
                        <Text
                          style={{
                            // textAlign: 'right',
                            color: 'grey',
                            fontFamily: 'WorkSans-SemiBold',
                            fontSize: 14,
                            // marginRight: wp('28%'),
                            marginTop: hp('1%'),
                            // marginBottom: hp('2.2%'),
                            marginLeft: wp('5%'),
                          }}>
                          <Text
                            style={{
                              // textAlign: 'right',
                              color: '#333',
                              fontFamily: 'WorkSans-SemiBold',
                              fontSize: 14,
                              // marginRight: wp('28%'),
                              marginTop: hp('1%'),
                              // marginBottom: hp('2.2%'),
                              marginLeft: wp('5%'),
                            }}>
                            Meeting Participant :
                          </Text>
                          <Text
                            style={{
                              textAlign: 'right',
                              color: '#333',
                              fontFamily: 'WorkSans-Regular',
                              fontSize: 14,
                              // marginRight: wp('28%'),
                              marginTop: hp('-3%'),
                              // marginBottom: hp('2.2%'),
                              marginRight: wp('5%'),
                              marginLeft: wp('35%'),
                            }}>
                            {'  '}
                            {item.MettingParticipant}
                          </Text>
                        </Text>
                        <Text
                          style={{
                            // textAlign: 'right',
                            color: 'grey',
                            fontFamily: 'WorkSans-SemiBold',
                            fontSize: 14,
                            // marginRight: wp('28%'),
                            marginTop: hp('0.5%'),
                            marginBottom: hp('1%'),
                            marginLeft: wp('5%'),
                          }}>
                          <Text
                            style={{
                              // textAlign: 'right',
                              color: '#333',
                              fontFamily: 'WorkSans-SemiBold',
                              fontSize: 14,
                              // marginRight: wp('28%'),
                              marginTop: hp('1%'),
                              // marginBottom: hp('2.2%'),
                              marginLeft: wp('5%'),
                            }}>
                            Status :
                          </Text>
                          <Text
                            style={{
                              textAlign: 'right',
                              color: 'green',
                              fontFamily: 'WorkSans-SemiBold',
                              fontSize: 15,
                              // marginRight: wp('28%'),
                              marginTop: hp('-3%'),
                              // marginBottom: hp('2.2%'),
                              marginRight: wp('5%'),
                              marginLeft: wp('35%'),
                            }}>
                            {'  '}
                            Active
                          </Text>
                        </Text>
                      </View>
                    </>
                  );
                }}
              />
            </>
          )}
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
});

export default meetinglist;
