import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  ScrollView,
  View,
  TouchableOpacity
} from "react-native";
import * as Colors from "../../styles/colors";
import * as Typography from "../../styles/typography";

export default class Random extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coffees: ["Espresso", "Americano", "Cappuccino", "Macchiato", "Latte"],
      randomNumber: null
    };
    this.random = this.random.bind(this);
  }
  async random() {
    this.setState({ randomNumber: 2 });
  }
  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <View style={{ flex: 2}}>
          <Text style={[styles.heading, Typography.FONT_H2_ORANGE]}>
            Coffee suggestions{" "}
          </Text>
        </View>
        <View style={{ flex: 2 }}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={this.random}
            style={styles.randomButton}
          >
            <Text style={styles.buttonText}> Get a coffee suggestion </Text>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 2 }}>
          {this.state.randomNumber === null ? null : (
            <View>
              <Text style={styles.randomResult}>
                {this.state.coffees[this.state.randomNumber]}
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
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
  heading: {
    marginTop: 80,
    alignItems: "center"
  },
  randomButton: {
    width: 203,
    height: 38,
    borderRadius: 20,
    backgroundColor: Colors.ORANGE_LIGHT,
    marginTop: 6,
    alignSelf: "center"
  },
  buttonText: {
    color: Colors.BROWN_DARK,
    alignSelf: "center",
    marginTop: 9,
    fontFamily: "roboto",
    fontSize: 14
  },
  randomResult: {
    color: Colors.BROWN_DARK,
    alignSelf: "center",
    marginTop: 9,
    fontFamily: "roboto",
    fontSize: 14
  }
});
