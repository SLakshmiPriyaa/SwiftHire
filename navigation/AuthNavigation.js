import {createStackNavigator} from 'react-navigation-stack';
import Splash from '../screens/Splash';
import login from '../screens/login';
import otp from '../screens/otp';
import signup from '../screens/signup';
import home from '../screens/home';
import profile from '../screens/profile';
import tab from '../screens/tab';
import tab1 from '../screens/tab1';
import editprofile from '../screens/editprofile';
import schedulemeeting from '../screens/schedulemeeting';
import meetinglist from '../screens/meetinglist';
const AuthNavigation = createStackNavigator(
  {
    meetinglist: {
      screen: meetinglist,
      navigationOptions: {
        headerShown: null,
      },
    },
    schedulemeeting: {
      screen: schedulemeeting,
      navigationOptions: {
        headerShown: null,
      },
    },
    editprofile: {
      screen: editprofile,
      navigationOptions: {
        headerShown: null,
      },
    },
    tab: {
      screen: tab,
      navigationOptions: {
        headerShown: null,
      },
    },
    tab1: {
      screen: tab1,
      navigationOptions: {
        headerShown: null,
      },
    },
    home: {
      screen: home,
      navigationOptions: {
        headerShown: null,
      },
    },
    profile: {
      screen: profile,
      navigationOptions: {
        headerShown: null,
      },
    },
    otp: {
      screen: otp,
      navigationOptions: {
        headerShown: null,
      },
    },
    signup: {
      screen: signup,
      navigationOptions: {
        headerShown: null,
      },
    },
    login: {
      screen: login,
      navigationOptions: {
        headerShown: null,
      },
    },
    Splash: {
      screen: Splash,
      navigationOptions: {
        headerShown: null,
      },
    },
  },
  {
    initialRouteName: 'Splash',
  },
);

export default AuthNavigation;
