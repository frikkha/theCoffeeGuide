import React, { Component, useState } from 'react';
import {
  Text,
  AsyncStorage,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Keyboard,
  SafeAreaView,
} from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-web';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as Colors from '../../styles/colors';
import * as Typography from '../../styles/typography';
import * as Api from '../../services/apiUrls';

export default class Favorites extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favoritesId: null,
      allCoffees: null,
    };
  }

  componentDidMount = async () => {
    this.focusListener = this.props.navigation.addListener('didFocus', () => {
      this.getFavorites();
      this.getAllCoffee();
    });
  };

  componentWillUnmount() {
    this.focusListener.remove();
  }


  async getFavorites() {
    try {
      const favorites = await AsyncStorage.getItem('favorites');
      if (favorites !== null) {
        const favoritesParsed = JSON.parse(favorites);
        this.setState({ favoritesId: favoritesParsed });
      }
    } catch (error) {
      console.log('Error getting favorites: ', error);
    }
  }

  async getAllCoffee() {
    try {
      const response = await fetch(Api.GET_ALL_COFFEES, {
        method: 'GET',
        accept: 'application/json',
      });
      if (response.ok) {
        const responseJson = await response.json();
        const allCoffees = responseJson.map((index) => ({
          coffeeId: index._id,
          coffeeName: index.Name,
          imagePath: index.ImagePath,
          content: index.Content,
        }));
        this.setState({ allCoffees });
      }
      if (!response.ok) {
        this.setState({ allCoffees: null });
      }
    } catch (e) {
      console.log('Error searching ', e);
    }
  }

  async removeFavorite(coffeeItem) {
    try {
      const favorites = await AsyncStorage.getItem('favorites');
      if (favorites !== null) {
        const favoritesParsed = JSON.parse(favorites);
        const indexOfCoffeeItem = favoritesParsed.indexOf(coffeeItem);
        favoritesParsed.splice(indexOfCoffeeItem, 1);
        AsyncStorage.setItem('favorites', JSON.stringify(favoritesParsed));
        this.setState({ favoritesId: favoritesParsed });
      }
    } catch (error) {
      console.log('Error removing favorites: ', error);
    }
  }

  async storeFavorites(coffeeItem) {
    try {
      const favorites = await AsyncStorage.getItem('favorites');
      if (favorites !== null) {
        const favoritesParsed = JSON.parse(favorites);
        favoritesParsed.push(coffeeItem);
        AsyncStorage.setItem('favorites', JSON.stringify(favoritesParsed));
        this.setState({ favoritesId: favoritesParsed });
      } else {
        const favorites = [coffeeItem];
        AsyncStorage.setItem('favorites', JSON.stringify(favorites));
        this.setState({ favoritesId: favorites });
      }
    } catch (error) {
      console.log('Error storing favorites: ', error);
    }
  }

  render() {
    const CoffeeItem = ({
      coffeeId, coffeeName, imagePath, content,
    }) => {
      const [collapse, changeCollapse] = useState(true);
      let favorite;
      const handleClick = () => {
        changeCollapse(!collapse);
      };
      if (this.state.favoritesId.includes(coffeeId)) {
        favorite = true;
        return (
          <View style={styles.coffeeItem}>
            { collapse
              ? (
                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: 10,
                    justifyContent: 'space-between',
                    alignSelf: 'flex-start',
                  }}
                >
                  <View style={{ flexDirection: 'row' }}>
                    <Image
                      source={{ uri: imagePath }}
                      style={{ width: 70, height: 70, marginLeft: 10 }}
                    />
                    <Text
                      style={[Typography.FONT_MED_BROWN_DARK_BOLD, { marginLeft: 10 }]}
                    >
                      {coffeeName}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'flex-start',
                      marginRight: 15,
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
                        name={favorite ? 'favorite' : 'favorite-border'}
                        size={30}
                        color={Colors.BROWN_LIGHT}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              )
              : (
                <View
                  style={{
                    flex: 1,
                    marginTop: 10,
                    justifyContent: 'space-between',
                  }}
                >
                  <View style={{
                    flex: 1,
                    flexDirection: 'column',
                  }}
                  >
                    <View style={{ flexDirection: 'row' }}>
                      <Image
                        source={{ uri: imagePath }}
                        style={{ width: 70, height: 70, marginLeft: 10 }}
                      />
                      <Text
                        style={[Typography.FONT_MED_BROWN_DARK_BOLD, { marginLeft: 10 }]}
                      >
                        {coffeeName}
                      </Text>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'flex-end',
                          marginRight: 10,
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
                            name={favorite ? 'favorite' : 'favorite-border'}
                            size={30}
                            color={Colors.BROWN_LIGHT}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                  <View style={{
                    flex: 1,
                    flexDirection: 'column',
                    marginVertical: 10,
                    marginHorizontal: 10,
                    justifyContent: 'space-between',
                    alignSelf: 'flex-start',
                  }}
                  >
                    <Text style={[Typography.FONT_MED_BROWN_DARK]}>
                      {content.map((i) => `• ${i}\n`)}
                    </Text>
                  </View>
                </View>
              )}
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-end',
                alignItems: 'center',
                marginBottom: 10,
              }}
              onPress={handleClick}
            >
              {collapse
                ? (
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={Typography.FONT_MED_BROWN_DARK}>Show recipe</Text>
                    <Icon name="arrow-drop-down" size={30} color={Colors.BROWN_LIGHT} />
                  </View>
                )
                : (
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={Typography.FONT_MED_BROWN_DARK}> Hide recipe</Text>
                    <Icon name="arrow-drop-up" size={30} color={Colors.BROWN_LIGHT} />
                  </View>
                )}
            </TouchableOpacity>
          </View>
        );
      }
      return null;
    };
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View style={{ flexDirection: 'row', alignItems: 'space-between' }}>
            <View style={styles.text}>
              <Text style={Typography.FONT_H2_ORANGE}> Your favorite coffees </Text>
            </View>


          </View>
          <View style={{ flex: 8 }}>
            <SafeAreaView style={styles.containerResults}>
              {this.state.favoritesId !== null ? (
                <FlatList
                  data={this.state.allCoffees}
                  extraData={this.state}
                  renderItem={({ item }) => (
                    <TouchableOpacity>
                      <CoffeeItem
                        coffeeId={item.coffeeId}
                        coffeeName={item.coffeeName}
                        imagePath={item.imagePath}
                        content={item.content}
                      />
                    </TouchableOpacity>
                  )}
                  keyExtractor={(item) => item.coffeeId}
                />
              ) : (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={Typography.FONT_MED_BROWN_DARK}>You don't have any favorites</Text>
                </View>
              )}
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.BEIGE,
  },
  text: {
    flex: 1,
    marginTop: 80,
    alignItems: 'center',
  },
  containerResults: {
    backgroundColor: Colors.BEIGE,
    alignItems: 'center',
  },
  coffeeItem: {
    backgroundColor: Colors.BEIGE_LIGHT,
    width: 322,
    marginVertical: 8,
    borderRadius: 10,
    shadowColor: Colors.BLACK,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 1,
    elevation: 1,
  },
});
