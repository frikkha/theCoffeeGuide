import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  ScrollView,
  View,
  Image,
  TouchableOpacity, Dimensions
} from "react-native";
import * as Colors from "../../styles/colors";
import * as Typography from "../../styles/typography";

export default class Random extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allCoffeeIDs: null,
      randomCoffee:null,
    };
    this.random = this.random.bind(this);
  }
  async random() {
    let randomIndex = Math.floor(Math.random() * this.state.allCoffeeIDs.length);
    console.log(randomIndex, this.state.allCoffeeIDs.length);
    await this.setState({randomCoffee: this.state.allCoffeeIDs[randomIndex]});
    console.log(this.state.randomCoffee.content)
  }

  componentDidMount = async () => {
    this.getAllCoffee();
  };

  async getAllCoffee() {
    try {
      const response = await fetch(`http://192.168.1.110:5000/api/coffee/`, {
        method: "GET",
        accept: "application/json"
      });
      const responseJson = await response.json();
      if (response.ok) {
        const allCoffeeIDs = responseJson.map(index => ({
          coffeeID:index._id,
          coffeeName: index.Name,
          imagePath: index.ImagePath,
          content:index.Content,
          hits:index.Hits,
        }));
        this.setState({ allCoffeeIDs });
      }
      if (!response.ok) {
        this.setState({ allCoffeeIDs: null });
      }
    } catch (e) {
      console.log("Error getting all coffees ", e);
    }
  }
  render() {
    const screenWidth = Math.round(Dimensions.get("window").width);
    const screenHeight = Math.round(Dimensions.get("window").height);
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <View style={{ flex: 2}}>
          <View style={{alignItems:"center", width:screenWidth, height: 250}}><Image style={{width:375, height:250}} source={require("../../assets/coffee.jpg")}/></View>
          <Text style={[styles.heading, Typography.FONT_H2_ORANGE, {alignSelf:"center"}]}>
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
        <View style={{ flex: 3 }}>
          {this.state.randomCoffee === null ? null : (
            <View style={styles.randomCoffee}>
              <Image source={{uri:this.state.randomCoffee.imagePath}} style={{width:100, height:100, alignSelf:"center"}}/>
              <Text style={[Typography.FONT_H4_BROWN_LIGHT, {marginTop:8}]}>
                {this.state.randomCoffee.coffeeName}
              </Text>
              {this.state.randomCoffee.content.map (index => ( <Text key={index.toString()} style={[Typography.FONT_MED_BROWN_DARK]}>{index}</Text>))}
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
    marginTop: 20,
    alignItems: "center"
  },
  randomButton: {
    width: 203,
    height: 38,
    borderRadius: 20,
    backgroundColor: Colors.BROWN_LIGHT,
    alignSelf: "center"
  },
  buttonText: {
    color: Colors.BEIGE,
    alignSelf: "center",
    marginTop: 9,
    fontFamily: "roboto",
    fontSize: 14
  },
randomCoffee:{
  width: 300,
  height:150,
  justifyContent: "center"
},
});
