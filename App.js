import React from 'react'
import { StatusBar, Platform } from 'react-native'
import Home from './src/screens/home/Home'
import Login from './src/screens/login/login'
import Ajustes from './src/screens/ajustes/ajustes'
import Description from './src/screens/description/description'
import { StackNavigator, TabNavigator, TabBarBottom } from 'react-navigation'

const TabUser = TabNavigator(
  {
    Home: {
      screen: Home,
    },
    Ajustes: {
      screen: Ajustes,
	navigationOptions: () => ({
		title: 'Ajustes',
	}),
    },
  },
  {
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
	animationEnabled: true,
	swipeEnabled: true,
	tabBarOptions: {
	    activeTintColor: '#f11f22',
	    inactiveTintColor: '#000000',
	    style: {
	        backgroundColor: 'rgba(169, 169, 169, 0.8)',
	        borderTopWidth: 1,
	        borderTopColor: '#353535',
	        position: 'absolute',
	        left: 0,
	        right: 0,
	        bottom: 0,
	    },
	},

  },
);


const App = StackNavigator({
  Home: {
    screen: TabUser
  },
  Login: {
  	screen: Login
  },

  Description: {
    screen: Description,
	navigationOptions: () => ({
		title: 'Descrição',
	}),
  },
},
{
  initialRouteName: "Login",
  cardStyle: {
    paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight
  }
})

export default App

