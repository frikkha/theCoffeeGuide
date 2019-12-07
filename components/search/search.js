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
import * as Colors from "../../styles/colors";
import * as Typography from "../../styles/typography";
import { TouchableWithoutFeedback } from "react-native-web";
import Icon from "react-native-vector-icons/MaterialIcons";

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchWord: "",
      searchResults: null,
      searched: false,
      favoritesId: [],
      allCoffees: [
        { coffeeId: "1", coffeeName: "Espresso" },
        { coffeeId: "2", coffeeName: "Americano" },
        { coffeeId: "3", coffeeName: "Latte" },
        { coffeeId: "4", coffeeName: "Mokka" },
        { coffeeId: "5", coffeeName: "Irish" },
        { coffeeId: "6", coffeeName: "Marocchino" }
      ]
    };
  }

  componentDidMount = async () => {
    this.getFavorites();
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
    } catch (error) {}
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
    } catch (error) {}
  }
  async getFavorites() {
    try {
      const favorites = await AsyncStorage.getItem("favorites");
      if (favorites !== null) {
        const favoritesParsed = JSON.parse(favorites);
        this.setState({ favoritesId: favoritesParsed });
      }
    } catch (error) {}
  }

  render() {
    const CoffeeItem = ({ coffeeId, coffeeName }) => {
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
                source={require("../../assets/icon-coffee.png")}
                style={{ width: 70, height: 70 }}
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
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View style={styles.text}>
            <Text style={Typography.FONT_H2_ORANGE}> Browse Coffees </Text>
          </View>
          <View style={styles.searchBar}>
            <TouchableOpacity value={this.state.searchWord}>
              <Icon name="search" size={32} color={Colors.ORANGE_LIGHT} />
            </TouchableOpacity>
            <TextInput
              style={[Typography.FONT_H4_GREY, styles.textInput]}
              placeholder="Search..."
              placeholderTextColor={Colors.GREY}
              returnKeyType="search"
              autoFocus={false}
            />
            <TouchableOpacity value={this.state.searchWord}>
              <Icon name="tune" size={32} color={Colors.ORANGE_LIGHT} />
            </TouchableOpacity>
          </View>
          <View style={{ flex: 8 }}>
            <SafeAreaView style={styles.containerResults}>
              <FlatList
                data={this.state.allCoffees}
                extraData={this.state}
                renderItem={({ item }) => (
                  <TouchableOpacity>
                    <CoffeeItem
                      coffeeId={item.coffeeId}
                      coffeeName={item.coffeeName}
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
  }
});
