import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import home from '../screens/home';
import profile from '../screens/profile';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Normalize from './size';

const TabNavigator = createBottomTabNavigator(
  {
    home: {
      screen: home,
      navigationOptions: {
        tabBarLabel: 'Home',

        tabBarOptions: {
          showLabel: true,
          activeTintColor: '#fa9339',
          labelStyle: {fontSize: Normalize(10)},
          // labelStyle: {paddingTop: hp('0.5%')},
          style: {
            paddingTop: 2,
            paddingBottom: 2,
            height: hp('6.5%'),
          },
          inactiveTintColor: '#666',
        },

        tabBarIcon: ({tintColor}) => (
          <Icon name="ios-home" color={tintColor} size={hp('3%')} />
        ),
      },
    },

    profile: {
      screen: profile,

      navigationOptions: {
        tabBarLabel: 'Profile',
        tabBarOptions: {
          showLabel: true,
          activeTintColor: '#fa9339',
          labelStyle: {fontSize: Normalize(10)},
          // inactiveTintColor: '#333',
          style: {
            paddingTop: 2,
            paddingBottom: 2,
            height: hp('6.5%'),
          },
          inactiveTintColor: '#666',
        },
        tabBarIcon: ({tintColor}) => (
          <Icon
            name="ios-person-circle-sharp"
            color={tintColor}
            size={hp('3.3%')}
          />
        ),
      },
    },
  },

  {
    initialRouteName: 'profile',
  },
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default createAppContainer(TabNavigator);
