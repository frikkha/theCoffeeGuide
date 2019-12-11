import React, { Component } from "react";
import {
  Text,
  AsyncStorage,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Keyboard,
  TextInput,
  SafeAreaView
} from "react-native";
import Validate from "./searchValidation.js";
import * as Colors from "../../styles/colors";
import * as Typography from "../../styles/typography";
import { TouchableWithoutFeedback } from "react-native-web";
import Icon from "react-native-vector-icons/MaterialIcons";

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchWord: "",
        searchError:"",
      searchResults: null,
      searched: false,
      favoritesId: [],
      allCoffees: null,
    };this.validateSearch = this.validateSearch.bind(this);
  }

  componentDidMount = async () => {
    this.getFavorites();
    this.getAllCoffee();
  };

  async storeFavorites(coffeeItem) {
    try {
      const favorites = await AsyncStorage.getItem("favorites");
      if (favorites !== null) {
        let favoritesParsed = JSON.parse(favorites);
        favoritesParsed.push(coffeeItem);
        AsyncStorage.setItem("favorites", JSON.stringify(favoritesParsed));
        this.setState({ favoritesId: favoritesParsed });
      } else {
        const favorites = [coffeeItem];
        AsyncStorage.setItem("favorites", JSON.stringify(favorites));
        this.setState({ favoritesId: favorites });
      }
    } catch (error) {
      console.log("Error storing favorites: ", error);}
  }

  async removeFavorite(coffeeItem) {
    try {
      const favorites = await AsyncStorage.getItem("favorites");
      if (favorites !== null) {
        let favoritesParsed = JSON.parse(favorites);
        const indexOfCoffeeItem = favoritesParsed.indexOf(coffeeItem);
        favoritesParsed.splice(indexOfCoffeeItem, 1);
        AsyncStorage.setItem("favorites", JSON.stringify(favoritesParsed));
        this.setState({ favoritesId: favoritesParsed });
      }
    } catch (error) { console.log("Error removing favorites: ", error);}
  }
  async getFavorites() {
    try {
      const favorites = await AsyncStorage.getItem("favorites");
      if (favorites !== null) {
        const favoritesParsed = JSON.parse(favorites);
        this.setState({ favoritesId: favoritesParsed });
      }
    } catch (error) {
      console.log("Error getting favorites: ", error);
    }
  }

  updateSearchText = searchWord => {
      this.setState({searchWord, searched:false});
  };

  async validateSearch(){
      Keyboard.dismiss();
      const searchError = Validate("search", this.state.searchWord);
      if(!searchError){
          await this.getCoffeeResults();
      } else{
          this.setState({searchError, searchResults:null});
      }
      this.setState({searched:true});
  }

    async getAllCoffee(){
        try{
            const response = await fetch(`http://192.168.1.110:5000/api/coffee/`, {
                method:"GET",
                accept:"application/json"
            });
            const responseJson = await response.json();
            if(response.ok){
                const allCoffees = responseJson.map(index => ({
                    coffeeId:index._id,
                    coffeeName:index.Name,
                    imagePath:index.ImagePath
                }));
                this.setState({allCoffees});
            }
            if(!response.ok){
                this.setState({searchResults:null});
            }
        }catch (e) {
            console.log("Error searching ", e);
        }
    }
  async getCoffeeResults(){
      try{
          const searchString = this.state.searchWord;
          console.log(searchString);
          const response = await fetch(`http://192.168.1.110:5000/api/coffee/?q={searchString}`, {
              method:"GET",
              accept:"application/json"
          });
          const responseJson = await response.json();
          console.log(responseJson);
          if(response.ok){
              const searchResults = responseJson.map(index => ({
                  coffeeId:index._id,
                      coffeeName:index.Name,
                  imagePath:index.ImagePath
              }));
              this.setState({searchResults});
          }
          if(!response.ok){
              this.setState({searchResults:null});
          }
      }catch (e) {
          console.log("Error searching ", e);
      }
  }


  render() {
    const CoffeeItem = ({ coffeeId, coffeeName, imagePath }) => {
      let favorite;
      if (this.state.favoritesId.includes(coffeeId)) {
        favorite = true;
      }
      return (
        <View style={styles.coffeeItem}>
          <View
            style={{
              flexDirection: "row",
              marginTop: 10,
              justifyContent: "space-between"
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <Image
                  source={{uri:imagePath}}
                style={{width:70, height:70}}
              />
              <Text
                style={[Typography.FONT_MED_BROWN_DARK, { marginLeft: 10 }]}
              >
                {coffeeName}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-end",
                marginRight: 15
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  {
                    favorite
                      ? this.removeFavorite(coffeeId)
                      : this.storeFavorites(coffeeId);
                  }
                  favorite = !favorite;
                }}
              >
                <Icon
                  name={favorite ? "favorite" : "favorite-border"}
                  size={35}
                  color={Colors.BROWN_RED}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
              alignItems: "center",
              marginBottom: 10
            }}
          >
            <Text style={Typography.FONT_MED_BROWN_DARK}>Show recipe</Text>
            <Icon name="arrow-drop-down" size={35} color={Colors.BROWN_RED} />
          </View>
        </View>
      );
    };
      let data;
      return (
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View style={styles.container}>
                  <View style={styles.text}>
                      <Text style={Typography.FONT_H2_ORANGE}> Browse Coffees </Text>
                  </View>
                  <View style={styles.searchBar}>
                      <TouchableOpacity value={this.state.searchWord} onPress={this.validateSearch}>
                          <Icon name="search" size={32} color={Colors.ORANGE_LIGHT}/>
                      </TouchableOpacity>
                      <TextInput
                          style={[Typography.FONT_H4_GREY, styles.textInput]}
                          placeholder="Search..."
                          placeholderTextColor={Colors.GREY}
                          onChangeText={this.updateSearchText}
                          value={this.state.searchWord}
                          returnKeyType="search"
                          autoFocus={false}
                          onSubmitEditing={this.validateSearch}
                          onBlur={() => {
                              this.setState({searchError: Validate("search", this.state.searchWord)});
                          }}
                          error={this.state.searchError}
                      />
                      <TouchableOpacity>
                          <Icon name="tune" size={32} color={Colors.ORANGE_LIGHT}/>
                      </TouchableOpacity>
                  </View>
                  <View style={{flex: 8}}>
                      <SafeAreaView style={styles.containerResults}>
                          <FlatList
                                data={this.state.searchResults && this.state.searched ? this.state.searchResults : this.state.allCoffees}
                              extraData={this.state}
                              renderItem={({item}) => (
                                  <TouchableOpacity>
                                      <CoffeeItem
                                          coffeeId={item.coffeeId}
                                          coffeeName={item.coffeeName}
                                          imagePath={item.imagePath}
                                      />
                                  </TouchableOpacity>
                              )}
                              keyExtractor={item => item.coffeeId}
                          />
                      </SafeAreaView>
                  </View>
              </View>
          </TouchableWithoutFeedback>
      );
  }
}
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.BEIGE
  },
  searchBar: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10
  },
  text: {
    flex: 1,
    marginTop: 80,
    alignItems: "center"
  },
  textInput: {
    height: 42,
    width: 260,
    borderBottomColor: Colors.ORANGE_LIGHT,
    borderBottomWidth: 1.5,
    marginLeft: 7
  },
  containerResults: {
    backgroundColor: Colors.BEIGE,
    alignItems: "center"
  },
  coffeeItem: {
    backgroundColor: Colors.BEIGE_LIGHT,
    width: 322,
    height: 110,
    marginVertical: 8,
    borderRadius: 10,
    shadowColor: Colors.BLACK,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 1,
    elevation: 1
  },
        stretch: {
            width: 50,
            height: 200,
            resizeMode: 'stretch'
        }
});
