import React, {Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import SearchPage from "./components/search/search";
import LoadingPage from "./components/loading/loading";
import FavoritesPage from "./components/favorites/favorites";
import RandomPage from "./components/random/random";
import {createAppContainer} from "react-navigation";
import {createStackNavigator} from "react-navigation-stack";
import {createBottomTabNavigator} from "react-navigation-tabs";
import Icon from "react-native-vector-icons/MaterialIcons";
import * as Font from "expo-font";
import { Asset } from 'expo-asset';
import * as Colors  from "./styles/colors";


const SearchStack = createStackNavigator(
    {Search:SearchPage,
    Loading: LoadingPage,
    Favorites: FavoritesPage},
    {
      initialRouteName: "Search",
      header:null,
      headerMode: "none"
    }
);

const FavoritesStack = createStackNavigator(
    {
      Favorites:FavoritesPage
    },
    {
      initialRouteName: "Favorites",
      header: null,
      headerMode: "none"
    }
);
const RandomStack = createStackNavigator(
    {
        Random:RandomPage
    },{
        initialRouteName:"Random",
        header:null,
        headerMode:"none"
    }
);


const bottomTabNavigator = createBottomTabNavigator({
    Search: {
  screen: SearchStack,
      navigationOptions: {
    tabBarIcon: ({ tintColor }) => (
        <Icon name="search" size={32} color={tintColor} />
    )
  }
},
Favorites: {
  screen: FavoritesStack,
      navigationOptions: {
    tabBarIcon: ({ tintColor }) => (
        <Icon name="favorite" size={32} color={tintColor} />
    )
  }
},
    Random:{
        screen: RandomStack,
        navigationOptions:{
            tabBarIcon: ({ tintColor }) => (
                <Icon name="cached" size={32} color={tintColor} />
            )
        }
    }
},
{
  initialRouteName: "Search",
      tabBarOptions: {
  activeTintColor: Colors.BROWN_RED,
          inactiveTintColor: Colors.BROWN_LIGHT,
          activeBackgroundColor:Colors.BEIGE,
          inactiveBackgroundColor:Colors.BEIGE,
      height: 85
}
});

const AppContainer = createAppContainer(bottomTabNavigator);

export default class App extends Component {
    state = {
       fontLoaded:false,
   };
    async componentDidMount() {
        await Font.loadAsync({
            roboto: require("./assets/fonts/roboto-regular.ttf"),
            quando: require("./assets/fonts/quando-regular.ttf")
        });
        this.setState({fontLoaded:true})
    }

    render(){
        if(this.state.fontLoaded){
            console.log("font is loaded");
            return <AppContainer/>;
        }else{
            return <LoadingPage/>;
        }
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
