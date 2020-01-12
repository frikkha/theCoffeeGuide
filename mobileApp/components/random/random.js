import React, { Component } from 'react';
import {
  Text,
  StyleSheet,
  ScrollView,
  View,
  Image,
  TouchableOpacity, Dimensions,
} from 'react-native';
import * as Colors from '../../styles/colors';
import * as Typography from '../../styles/typography';
import * as Api from '../../services/apiUrls';

export default class Random extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allCoffeeIDs: null,
      randomCoffee: null,
    };
    this.random = this.random.bind(this);
  }

  componentDidMount = async () => {
    await this.getAllCoffee();
  };

  async getAllCoffee() {
    try {
      const response = await fetch(Api.GET_ALL_COFFEES, {
        method: 'GET',
        accept: 'application/json',
      });
      if (response.ok) {
        const responseJson = await response.json();
        const allCoffeeIDs = responseJson.map((index) => ({
          coffeeID: index._id,
          coffeeName: index.Name,
          imagePath: index.ImagePath,
          content: index.Content,
          hits: index.Hits,
        }));
        this.setState({ allCoffeeIDs });
      }
      if (!response.ok) {
        this.setState({ allCoffeeIDs: null });
      }
    } catch (e) {
      console.log('Error getting all coffees ', e);
    }
  }

  async random() {
    if (this.state.allCoffeeIDs != null) {
      const randomIndex = Math.floor(Math.random() * this.state.allCoffeeIDs.length);
      await this.setState({ randomCoffee: this.state.allCoffeeIDs[randomIndex] });
    }
  }

  render() {
    const screenWidth = Math.round(Dimensions.get('window').width);
    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollView}>
          <View style={{ flex: 3 }}>
            <View style={{ alignItems: 'center', width: screenWidth, height: 180 }}><Image style={{ width: 375, height: 180 }} source={require('../../assets/coffee.png')} /></View>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={this.random}
              style={styles.randomButton}
            >
              <Text style={styles.buttonText}> Get a coffee suggestion </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.randomView}>
            {this.state.randomCoffee === null ? null : (
              <View style={styles.randomCoffee}>
                <Text style={[Typography.FONT_H4_BROWN_LIGHT, { marginTop: 8 }]}>
                  {this.state.randomCoffee.coffeeName}
                </Text>
                <View style={styles.line} />
                {this.state.randomCoffee.content.map((index) => (
                  <Text key={index.toString()} style={[Typography.FONT_MED_BROWN_DARK]}>{'• ' + index}</Text>))}
              </View>
            )}
          </View>
        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BEIGE,
  },
  scrollView: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
  },
  randomButton: {
    width: 203,
    height: 38,
    marginTop: 10,
    marginBottom: 15,
    borderRadius: 20,
    backgroundColor: Colors.BROWN_LIGHT,
    alignSelf: 'center',
  },
  buttonText: {
    color: Colors.BEIGE,
    alignSelf: 'center',
    marginTop: 9,
    fontFamily: 'robotoBold',
    fontSize: 14,
  },
  randomCoffee: {
    width: 300,
    height: 150,
    marginTop: 30
  },
  randomView: {
    flex: 6,
  },
  line: {
    marginVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: Colors.BROWN_LIGHT,
  },
});
