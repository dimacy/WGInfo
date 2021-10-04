import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {BottomTabBar} from '@react-navigation/bottom-tabs';
import FontistoIcon from 'react-native-vector-icons/Fontisto';
import OcticonsIcon from 'react-native-vector-icons/Octicons';
import UserAccount from '../Screens/UserAccount';
import {Text} from 'react-native';
import TanksInfo from '../Screens/TanksInfo';
import {BlurView} from '@react-native-community/blur';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      tabBar={props => {
        return (
          <BlurView
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
            }}
            blurType="dark"
            blurAmount={0}
            blurRadius={25}
            overlayColor="transparent">
            <BottomTabBar {...props} />
          </BlurView>
        );
      }}
      screenOptions={{
        headerShown: false,
        tabBarStyle: {backgroundColor: 'transparent', elevation: 0},
      }}>
      <Tab.Screen
        name="UserAccount"
        component={UserAccount}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <FontistoIcon
                name={'person'}
                size={25}
                color={focused ? '#ff9332' : '#fff'}
              />
            );
          },
          tabBarLabel: ({focused}) => {
            return (
              <Text style={{color: focused ? '#ff9332' : '#fff'}}>
                {'Аккаунт'}
              </Text>
            );
          },
        }}
      />
      <Tab.Screen
        name="TanksInfo"
        component={TanksInfo}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <OcticonsIcon
                name={'book'}
                size={25}
                color={focused ? '#ff9332' : '#fff'}
              />
            );
          },
          tabBarLabel: ({focused}) => {
            return (
              <Text style={{color: focused ? '#ff9332' : '#fff'}}>
                {'Танковедение'}
              </Text>
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

const Navigation = () => {
  return (
    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>
  );
};

export default Navigation;
