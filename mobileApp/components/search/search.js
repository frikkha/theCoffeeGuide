import React, { Component, useState } from "react";
import {
    Text,
    AsyncStorage,
    View,
    Image,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    Keyboard,
    Dimensions,
    TextInput,
    SafeAreaView,
    Modal
} from "react-native";
import Validate from "./searchValidation.js";
import * as Colors from "../../styles/colors";
import * as Typography from "../../styles/typography";
import * as Api from "../../services/apiUrls";
import { TouchableWithoutFeedback } from "react-native-web";
import Icon from "react-native-vector-icons/MaterialIcons";

export default class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchWord: "",
            searchError: "",
            searchResults: null,
            searchResultsCopy:null,
            searched: false,
            favoritesId: [],
            allCoffees: null,
            allCoffeesCopy:null,
            modalVisible: false,
            filters: ["Milk", "Alcohol", "Cream", "Chocolate"],
            selectedFilter: ""
        };
        this.validateSearch = this.validateSearch.bind(this);
    }

    componentDidMount = async () => {
        this.focusListener = this.props.navigation.addListener("didFocus", () =>{
            this.getFavorites();
            this.getAllCoffee();
        });
    };
    componentWillUnmount() {
        this.focusListener.remove();
    }

    setModalVisible() {
        this.setState({ modalVisible: !this.state.modalVisible });
    }

    setFilter(item) {
        if (this.state.selectedFilter === item) {
            this.setState({ selectedFilter: "" });
        } else {
            this.setState({ selectedFilter: item });
        }
    }

    filter(ingredient) {
        let filtered = [];
        if (this.state.searched) {
            this.state.searchResultsCopy.map(index => {
                console.log(index);
                index.content.map(index2 => {
                    console.log(index2);
                    if (index2.includes(ingredient)) {
                        filtered.push(index)
                    }
                });
            });
            this.setState({searchResults: filtered})
        }
        else{ this.state.allCoffeesCopy.map(index => {
            console.log(index);
            index.content.map(index2 => {
                console.log(index2);
                if (index2.includes(ingredient)) {
                    filtered.push(index)
                }
            });
        });
            this.setState({allCoffees: filtered})}

    }
    applyFilter() {
        this.setModalVisible();
        console.log("FILTER: ", this.state.selectedFilter);
        if (this.state.selectedFilter === "Chocolate") {
            this.filter("chocolate");
        } else if (this.state.selectedFilter === "Alcohol") {
            this.filter("alcohol");
        } else if (this.state.selectedFilter === "Milk") {
            this.filter("milk");
        } else {
            this.filter("cream");
        }
    }
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
            console.log("Error storing favorites: ", error);
        }
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
        } catch (error) {
            console.log("Error removing favorites: ", error);
        }
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
        this.setState({ searchWord, searched: false });
    };

    async validateSearch() {
        Keyboard.dismiss();
        const searchError = Validate("search", this.state.searchWord);
        if (!searchError) {
            await this.getCoffeeResults();
        } else {
            this.setState({ searchError, searchResults: null, searchResultsCopy:null });
        }
        this.setState({ searched: true });
    }

    async getAllCoffee() {
        try {
            const response = await fetch(Api.GET_ALL_COFFEES, {
                method: "GET",
                accept: "application/json"
            });
            const responseJson = await response.json();
            if (response.ok) {
                const allCoffees = responseJson.map(index => ({
                    coffeeId: index._id,
                    coffeeName: index.Name,
                    imagePath: index.ImagePath,
                    content: index.Content
                }));
                this.setState({ allCoffees, allCoffeesCopy:allCoffees });
            }
            if (!response.ok) {
                this.setState({ searchResults: null, searchResultsCopy:null});
            }
        } catch (e) {
            console.log("Error searching ", e);
        }
    }
    async getCoffeeResults() {
        try {
            const searchString = this.state.searchWord;
            const response = await fetch(
                Api.SEARCH_FOR_COFFEE(searchString),
                {
                    method: "GET",
                    accept: "application/json"
                }
            );
            const responseJson = await response.json();
            if (response.ok) {
                const searchResults = responseJson.map(index => ({
                    coffeeId: index._id,
                    coffeeName: index.Name,
                    imagePath: index.ImagePath,
                    content:index.Content,
                    hits:index.Hits,
                }));
                this.setState({ searchResults, searchResultsCopy:searchResults });
            }
            if (!response.ok) {
                this.setState({ searchResults: null, searchResultsCopy:null });
            }
        } catch (e) {
            console.log("Error searching ", e);
        }
    }

    render() {
        const screenWidth = Math.round(Dimensions.get("window").width);
        const CoffeeItem = ({ coffeeId, coffeeName, imagePath, content }) => {
            let [collapse, changeCollapse] = useState(true);
            let favorite;
            const handleClick = () => {
                changeCollapse(!collapse)
            };
            if (this.state.favoritesId.includes(coffeeId)) {
                favorite = true;
            }
            return (
                <View style={styles.coffeeItem}>
                    { collapse ?
                        <View
                            style={{
                                flexDirection: "row",
                                marginTop: 10,
                                justifyContent: "space-between",
                                alignSelf: 'flex-start'
                            }}
                        >
                            <View style={{ flexDirection: "row" }}>
                                <Image
                                    source={{ uri: imagePath }}
                                    style={{ width: 70, height: 70, marginLeft:10 }}
                                />
                                <Text
                                    style={[Typography.FONT_MED_BROWN_DARK_BOLD, { marginLeft: 10 }]}
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
                                        size={30}
                                        color={Colors.BROWN_LIGHT}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                        :
                        <View
                            style={{
                                flex: 1,
                                marginTop: 10,
                                justifyContent: "space-between",
                            }}
                        >
                            <View style={{
                                flex: 1,
                                flexDirection: "column"
                            }}>
                                <View style={{ flexDirection: "row" }}>
                                    <Image
                                        source={{ uri: imagePath }}
                                        style={{ width: 70, height: 70, marginLeft:10 }}
                                    />
                                    <Text
                                        style={[Typography.FONT_MED_BROWN_DARK_BOLD, { marginLeft: 10 }]}
                                    >
                                        {coffeeName}
                                    </Text>
                                    <View
                                        style={{
                                            flexDirection: "row",
                                            justifyContent: "flex-end",
                                            marginRight: 10
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
                                                size={30}
                                                color={Colors.BROWN_LIGHT}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                            <View style = {{
                                flex: 1,
                                flexDirection: "column",
                                marginVertical: 10,
                                marginHorizontal: 10,
                                justifyContent: "space-between",
                                alignSelf: "flex-start"
                            }}>
                                <Text>{content.map( i => { return '• ' + i + '\n'})}</Text>
                            </View>
                        </View>
                    }
                    <TouchableOpacity
                        style={{
                            flexDirection: "row",
                            justifyContent: "flex-end",
                            alignItems: "center",
                            marginBottom: 10
                        }}
                        onPress={handleClick}
                    >
                        {collapse ?
                            <View style={{flexDirection: "row"}}>
                                <Text style={Typography.FONT_MED_BROWN_DARK}>Show recipe</Text>
                                <Icon name="arrow-drop-down" size={30} color={Colors.BROWN_LIGHT}/>
                            </View>
                            :
                            <View style={{flexDirection: "row"}}>
                                <Text style={Typography.FONT_MED_BROWN_DARK}> Hide recipe</Text>
                                <Icon name="arrow-drop-up" size={30} color={Colors.BROWN_LIGHT}/>
                            </View>
                        }
                    </TouchableOpacity>
                </View>
            );
        };
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.container}>
                    <View style = {{flexDirection:"row", alignItems:"space-between"}}>
                        <View style={styles.text}>
                            <Text style={Typography.FONT_H2_ORANGE}> Your guide to making the perfect cup of coffee. </Text>
                        </View>
                        <TouchableOpacity
                            style={styles.filterButton}
                            onPress={() => this.setModalVisible()}
                        >
                            <Icon name="filter-list" size={30} color={Colors.ORANGE_LIGHT} />
                        </TouchableOpacity>

                        <Modal
                            visible={this.state.modalVisible}
                            animationType="slide"
                            transparent={false}
                        >

                            <View style={styles.modalContainer}>
                                <TouchableOpacity
                                    onPress={() => this.setModalVisible()}
                                    style={{ marginLeft: (screenWidth * 0.1) / 2 }}
                                >
                                    <Icon name={"chevron-left"} size={40} />
                                </TouchableOpacity>
                                <Text style={[Typography.FONT_H2_BROWN, { alignSelf: "center" }]}>
                                    Show only results containing:
                                </Text>
                                <FlatList
                                    data={this.state.filters}
                                    extraData={this.state}
                                    renderItem={({ item }) => (
                                        <TouchableOpacity
                                            onPress={() => this.setFilter(item)}
                                            style={{
                                                justifyContent: "center",
                                                height: 40,
                                                backgroundColor:
                                                    this.state.selectedFilter === item
                                                        ? Colors.ORANGE_LIGHT
                                                        : Colors.WHITE
                                            }}
                                        >
                                            <Text
                                                style={[
                                                    Typography.FONT_MED_BROWN_DARK,
                                                    {
                                                        width: screenWidth * 0.85,
                                                        marginLeft: (screenWidth * 0.15) / 2
                                                    }
                                                ]}
                                            >
                                                {item}
                                            </Text>
                                        </TouchableOpacity>
                                    )}
                                    keyExtractor={item =>item}
                                    style={{ marginVertical: 30 }}
                                />
                                {this.state.selectedFilter ? (
                                    <TouchableOpacity
                                        style={styles.applyButton}
                                        onPress={() => this.applyFilter()}
                                    >
                                        <Text
                                            style={[Typography.FONT_H4_GREY, { textAlign: "center" }]}
                                        >
                                            Apply
                                        </Text>
                                    </TouchableOpacity>
                                ) : (
                                    <View
                                        style={[
                                            styles.applyButton,
                                            { backgroundColor: Colors.BROWN_LIGHT }
                                        ]}
                                    >
                                        <Text
                                            style={[Typography.FONT_H4_GREY, { textAlign: "center" }]}
                                        >
                                            Apply
                                        </Text>
                                    </View>

                                )}</View></Modal>

                    </View>
                    <View style={styles.searchBar}>
                        <TouchableOpacity
                            value={this.state.searchWord}
                            onPress={this.validateSearch}
                        >
                            <Icon name="search" size={32} color={Colors.ORANGE_LIGHT} />
                        </TouchableOpacity>
                        <TextInput
                            style={[Typography.FONT_H4_GREY, styles.textInput]}
                            placeholder="Find recipes"
                            placeholderTextColor={Colors.GREY}
                            onChangeText={this.updateSearchText}
                            value={this.state.searchWord}
                            returnKeyType="search"
                            autoFocus={false}
                            onSubmitEditing={this.validateSearch}
                            onBlur={() => {
                                this.setState({
                                    searchError: Validate("search", this.state.searchWord)
                                });
                            }}
                            error={this.state.searchError}
                        />
                    </View>
                    <View style={{ flex: 8 }}>
                        <SafeAreaView style={styles.containerResults}>
                            <FlatList
                                data={
                                    this.state.searchResults && this.state.searched
                                        ? this.state.searchResults
                                        : this.state.allCoffees
                                }
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
        marginRight: 20,
        marginLeft:10,
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
        resizeMode: "stretch"
    },
    modalContainer: {
        backgroundColor: Colors.WHITE,
        marginTop: 30
    },
    applyButton: {
        backgroundColor: Colors.BROWN_RED,
        width: 120,
        borderRadius: 50,
        alignSelf: "center",
        height: 35,
        justifyContent: "center"
    },
    filterButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center"
    }
});

