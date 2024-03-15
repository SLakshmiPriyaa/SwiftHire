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
import Icon from 'react-native-vector-icons/Ionicons';
import DatePicker from 'react-native-date-picker';
import {CustomPicker} from 'react-native-custom-picker';
import LinearGradient from 'react-native-linear-gradient';
import {Dialog} from 'react-native-simple-dialogs';
class schedulemeeting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date10: new Date(),
      mode: 'date',
      Date: null,
      Time: null,
      participant: [
        {name: 'Participant 1'},
        {name: 'Participant 2'},
        {name: 'Participant 3'},
        {name: 'Participant 4'},
        {name: 'Participant 5'},
        {name: 'Participant 6'},
        {name: 'Participant 7'},
      ],
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
                  fontSize: Normalize(12),
                  fontFamily: 'WorkSans-Regular',

                  textAlign: 'left',

                  borderRadius: 20,
                  color: '#666',
                  backgroundColor: '#ffff',
                  // paddingLeft: wp('1%'),
                  paddingTop: 1,
                  marginLeft: wp('5%'),
                  width: wp('60%'),
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

                    borderRadius: 14,
                    color: 'black',
                    backgroundColor: '#ffff',
                    // paddingLeft: wp('0.5%'),
                    paddingTop: 1,
                    marginLeft: wp('5%'),
                    width: wp('60%'),
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
  async check() {
    var MobileNumber = await AsyncStorage.getItem('MobileNumber');
    this.setState({
      titleerro: false,
      dateerro: false,
      timeerroe: false,
      durationerror: false,
      participantnameerr: false,
    });
    if (this.state.title == null) {
      this.setState({titleerro: true});
    } else if (this.state.Date == null) {
      this.setState({dateerro: true});
    } else if (this.state.Time == null) {
      this.setState({timeerroe: true});
    } else if (this.state.duration == null) {
      this.setState({durationerror: true});
    } else if (this.state.participantname == null) {
      this.setState({participantnameerr: true});
    } else {
      this.setState({
        titleerro: false,
        dateerro: false,
        timeerroe: false,
        durationerror: false,
        participantnameerr: false,
      });
      const a = {
        MettingTitle: this.state.title,
        MettingDate: this.state.Date,
        MettingTime: this.state.Time,
        MettingDuration: this.state.duration,
        MettingParticipant: this.state.participantname,
        MobileNumber: MobileNumber,
      };
      console.log(a);
      var p = await AsyncStorage.getItem('Meetingl');
      var z = JSON.parse(p);
      if (z == null) {
        var ml = [];
        ml.push(a);
        await AsyncStorage.setItem('Meetingl', JSON.stringify(ml));
      } else {
        var ml = z;
        ml.push(a);
        await AsyncStorage.setItem('Meetingl', JSON.stringify(ml));
      }
      this.setState({success: true});
    }
  }
  render() {
    return (
      <SafeAreaView>
        <ScrollView>
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
                fontFamily: 'WorkSans-Regular',
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
                fontFamily: 'WorkSans-Regular',
                textAlign: 'center',
                marginTop: hp('2%'),
                marginBottom: hp('1%'),
                lineHeight: hp('2.5%'),
                marginLeft: wp('3%'),
                marginRight: wp('3%'),
              }}>
              Meeting Scheduled Successfully.
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
          </Dialog>
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
              SCHEDULE MEETING
            </Text>
          </View>
          <Text
            style={{
              marginLeft: wp('8%'),

              color: '#333',
              fontFamily: 'WorkSans-Regular',
              fontSize: 16,
              marginTop: hp('1%'),
            }}>
            Meeting Title
          </Text>
          <View
            style={{
              justifyContent: 'center',
              //   borderWidth: this.state.Nameerror == true ? 1 : 0,
              borderRadius: wp('2%'),
              // padding: 5,
              height: hp('5%'),
              // marginBottom: hp('3%'),
              borderColor: '#f77f77',
              marginTop: hp('1.5%'),
              backgroundColor: '#ffff',

              width: wp('85%'),
              alignSelf: 'center',
              flexDirection: 'row',
              marginBottom: hp('1%'),
              // paddingLeft: wp('12%'),a
              alignItems: 'center',
              textAlignVertical: 'top',
              alignSelf: 'center',
            }}>
            <Icon
              name="information-circle-sharp"
              color={'#faae6b'}
              size={28}
              style={{marginTop: hp('-0.2%'), marginLeft: wp('4%')}}
            />
            <TextInput
              placeholder="Enter Meeting Title"
              fontFamily={'WorkSans-Regular'}
              placeholderTextColor={'grey'}
              color={'black'}
              fontSize={14}
              maxLength={250}
              onChangeText={value => this.handleInputChange('title', value)}
              style={{
                // borderWidth: 1,
                padding: hp('1%'),
                width: wp('70%'),
                marginLeft: wp('2%'),
              }}
            />
          </View>
          {this.state.titleerro == true ? (
            <Text style={styles.errorMessage}>
              * Please enter Meeting Title.
            </Text>
          ) : null}
          <Text
            style={{
              marginLeft: wp('8%'),

              color: '#333',
              fontFamily: 'WorkSans-Regular',
              fontSize: 16,
              marginTop: hp('1%'),
            }}>
            Meeting Date
          </Text>
          <View
            style={{
              //   justifyContent: 'center',
              //   borderWidth: this.state.Nameerror == true ? 1 : 0,
              borderRadius: wp('2%'),
              // padding: 5,
              height: hp('5%'),
              // marginBottom: hp('3%'),
              borderColor: '#f77f77',
              marginTop: hp('1.5%'),
              backgroundColor: '#ffff',

              width: wp('85%'),
              alignSelf: 'center',
              flexDirection: 'row',
              marginBottom: hp('1%'),
              // paddingLeft: wp('12%'),a
              alignItems: 'center',
              textAlignVertical: 'top',
              alignSelf: 'center',
            }}>
            <Icon
              style={{
                // width: wp('10%'),
                // marginRight: hp('2%'),
                // marginTop: hp('-4.2%'),
                marginLeft: wp('2%'),
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
              {this.state.Date == null ? (
                <Text
                  style={{
                    marginLeft: wp('5%'),
                    // marginTop: hp('0.2%'),
                    color: '#666',
                    fontFamily: 'WorkSans-Regular',
                    fontSize: Normalize(12),
                  }}>
                  Choose Date
                </Text>
              ) : (
                <Text
                  style={{
                    marginLeft: wp('5%'),
                    // marginTop: hp('0.5%'),
                    color: '#333',
                    fontFamily: 'WorkSans-Regular',
                    fontSize: Normalize(12),
                  }}>
                  {this.state.Date}
                </Text>
              )}
            </TouchableOpacity>
          </View>
          {this.state.dateerro == true ? (
            <Text style={styles.errorMessage}>
              * Please choose Meeting Date.
            </Text>
          ) : null}
          <DatePicker
            modal
            mode={'date'}
            open={this.state.showdate}
            date={this.state.date10}
            minimumDate={new Date()}
            onConfirm={date => {
              // console.log(date)

              this.setState({showdate: false});
              this.setState({
                Date: moment(date).format('DD-MM-YYYY'),
              });
            }}
            onCancel={() => {
              this.setState({showdate: false});
            }}
          />
          <Text
            style={{
              marginLeft: wp('8%'),

              color: '#333',
              fontFamily: 'WorkSans-Regular',
              fontSize: 16,
              marginTop: hp('1%'),
            }}>
            Meeting Time
          </Text>
          <View
            style={{
              //   justifyContent: 'center',
              //   borderWidth: this.state.Nameerror == true ? 1 : 0,
              borderRadius: wp('2%'),
              // padding: 5,
              height: hp('5%'),
              // marginBottom: hp('3%'),
              borderColor: '#f77f77',
              marginTop: hp('1.5%'),
              backgroundColor: '#ffff',

              width: wp('85%'),
              alignSelf: 'center',
              flexDirection: 'row',
              marginBottom: hp('1%'),
              // paddingLeft: wp('12%'),a
              alignItems: 'center',
              textAlignVertical: 'top',
              alignSelf: 'center',
            }}>
            <Icon
              style={{
                // width: wp('10%'),
                // marginRight: hp('2%'),
                // marginTop: hp('-4.2%'),
                marginLeft: wp('2%'),
                paddingLeft: wp('3.5%'),
              }}
              // onPress={this.setPasswordVisibility}
              activeOpacity={0.5}
              name="time-sharp"
              color={'#faae6b'}
              size={hp('2.8%')}
            />

            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() =>
                this.setState({
                  showdate1: true,
                })
              }>
              {this.state.Time == null ? (
                <Text
                  style={{
                    marginLeft: wp('5%'),
                    // marginTop: hp('0.2%'),
                    color: '#666',
                    fontFamily: 'WorkSans-Regular',
                    fontSize: Normalize(12),
                  }}>
                  Choose Time
                </Text>
              ) : (
                <Text
                  style={{
                    marginLeft: wp('5%'),
                    // marginTop: hp('0.5%'),
                    color: '#333',
                    fontFamily: 'WorkSans-Regular',
                    fontSize: Normalize(12),
                  }}>
                  {this.state.Time}
                </Text>
              )}
            </TouchableOpacity>
          </View>
          {this.state.timeerroe == true ? (
            <Text style={styles.errorMessage}>
              * Please choose Meeting Time.
            </Text>
          ) : null}
          <DatePicker
            modal
            mode={'time'}
            open={this.state.showdate1}
            date={this.state.date10}
            minimumDate={new Date()}
            onConfirm={date => {
              // console.log(date)

              this.setState({showdate1: false});
              this.setState({
                Time: moment(date).format('hh:mm A'),
              });
            }}
            onCancel={() => {
              this.setState({showdate1: false});
            }}
          />
          <Text
            style={{
              marginLeft: wp('8%'),

              color: '#333',
              fontFamily: 'WorkSans-Regular',
              fontSize: 16,
              marginTop: hp('1%'),
            }}>
            Meeting Durations (In Mins)
          </Text>
          <View
            style={{
              justifyContent: 'center',
              //   borderWidth: this.state.Nameerror == true ? 1 : 0,
              borderRadius: wp('2%'),
              // padding: 5,
              height: hp('5%'),
              // marginBottom: hp('3%'),
              borderColor: '#f77f77',
              marginTop: hp('1.5%'),
              backgroundColor: '#ffff',

              width: wp('85%'),
              alignSelf: 'center',
              flexDirection: 'row',
              marginBottom: hp('1%'),
              // paddingLeft: wp('12%'),a
              alignItems: 'center',
              textAlignVertical: 'top',
              alignSelf: 'center',
            }}>
            <Icon
              name="timer"
              color={'#faae6b'}
              size={28}
              style={{marginTop: hp('-0.2%'), marginLeft: wp('4%')}}
            />
            <TextInput
              placeholder="Enter Meeting Duration"
              fontFamily={'WorkSans-Regular'}
              placeholderTextColor={'grey'}
              color={'black'}
              fontSize={14}
              maxLength={3}
              keyboardType={'number-pad'}
              onChangeText={value => this.handleInputChange('duration', value)}
              style={{
                // borderWidth: 1,
                padding: hp('1%'),
                width: wp('70%'),
                marginLeft: wp('2%'),
              }}
            />
          </View>
          {this.state.durationerror == true ? (
            <Text style={styles.errorMessage}>
              * Please enter Meeting Duration.
            </Text>
          ) : null}
          <Text
            style={{
              marginLeft: wp('8%'),

              color: '#333',
              fontFamily: 'WorkSans-Regular',
              fontSize: 16,
              marginTop: hp('1%'),
            }}>
            Participants
          </Text>
          <View
            style={{
              borderRadius: wp('2%'),
              // padding: 5,
              height: hp('5%'),
              // marginBottom: hp('3%'),
              borderColor: '#f77f77',
              marginTop: hp('1.5%'),
              backgroundColor: '#ffff',

              width: wp('85%'),
              alignSelf: 'center',
              flexDirection: 'row',
              marginBottom: hp('1%'),
              // paddingLeft: wp('12%'),a
              alignItems: 'center',
              textAlignVertical: 'top',
              alignSelf: 'center',
            }}>
            <Icon
              style={{
                // width: wp('10%'),
                // marginRight: hp('2%'),
                // marginTop: hp('-4.2%'),
                marginLeft: wp('2%'),
                paddingLeft: wp('3.5%'),
              }}
              // onPress={this.setPasswordVisibility}
              activeOpacity={0.5}
              name="chevron-down-circle-sharp"
              color={'#faae6b'}
              size={hp('2.8%')}
            />
            <CustomPicker
              style={{color: '#dcdcdc'}}
              placeholder={'Select Participant'}
              fontFamily={'WorkSans-ExtraBold'}
              placeholderTextColor={'black'}
              color={'black'}
              labelStyle={{
                color: 'black',
              }}
              fieldTemplate={this.renderField}
              options={this.state.participant}
              getLabel={item => item.name}
              optionTemplate={this.renderOption}
              //   onValueChange={(itemValue, itemIndex) =>
              //     this.setState({MemberShipID: itemValue})
              // console.log(itemValue);
              //   }

              onValueChange={value => {
                this.setState({participantname: value.name});
              }}
            />
          </View>
          {this.state.participantnameerr == true ? (
            <Text style={styles.errorMessage}>
              * Please choose Meeting Participant.
            </Text>
          ) : null}
          <View style={{alignItems: 'center', marginBottom: hp('3%')}}>
            <TouchableOpacity activeOpacity={0.5} onPress={() => this.check()}>
              <LinearGradient
                colors={['#fad2af', '#faa55a']}
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
                  marginTop: hp('5%'),
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
                  SAVE{' '}
                </Text>
              </LinearGradient>
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

export default schedulemeeting;
