import React, { Component } from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  ScrollView,
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

function CoffeeItem({ coffeeName }) {
  return (
    <View style={styles.coffeeItem}>
      <View>
        <Text style={Typography.FONT_MED_BROWN_DARK}>{coffeeName}</Text>
      </View>
    </View>
  );
}
export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchWord: "",
      searchResults: null,
      searched: false,
      allCoffees:
        [{ coffeeId: 1, coffeeName: "Espresso" },
        { coffeeId: 2, coffeeName: "Americano" },
            {coffeeId: 3, coffeeName: "Latte"}]
    };
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View style={styles.text}>
            <Text style={Typography.FONT_H2_ORANGE}> Browse Coffees </Text>
          </View>
          <View style={[styles.searchBar, { marginTop: 10 }]}>
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
          </View>
          <View style={{ flex: 8 }}>
            <SafeAreaView style={styles.containerResults}>
              <FlatList
                data={this.state.allCoffees}
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
    marginLeft: 20
  },
  text: {
    flex: 1,
    marginTop: 60,
    marginLeft: 20
  },
  textInput: {
    height: 42,
    width: 240,
    borderBottomColor: Colors.ORANGE_LIGHT,
    borderBottomWidth: 1.5,
    marginLeft: 7
  },
  containerResults: {
    backgroundColor: Colors.WHITE,
    alignItems: "center"
  },
  coffeeItem: {
    backgroundColor: Colors.WHITE,
    width: 322,
    height: 150,
    shadowColor: Colors.BLACK,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 1,
    elevation: 1
  }
});
