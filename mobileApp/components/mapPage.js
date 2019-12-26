import React from "react";
import {View, StyleSheet} from "react-native";
import Map from "./map";
import CoffeeShopsFromAPI from "../services/coffeeShopsFromAPI";

// A placeholder until we get our own location
const region = {
    latitude: 37.321996988,
    longitude: -122.0325472123455,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
};

const deltas = {
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
};

export default class MapPage extends React.Component {
    state = {
        region: null,
        coffeeShops: []
    };

    componentDidMount = async () => {
       await this.findCoordinates();
    };

    getCoffeeShops = async () => {
        const {latitude, longitude} = this.state.region;
        const userLocation = {latitude,longitude};
        console.log("userlocation: ", userLocation);
        const coffeeShops = await CoffeeShopsFromAPI.getCoffeeShops(userLocation);
        this.setState({coffeeShops});
    };
    findCoordinates = () => {
        navigator.geolocation.getCurrentPosition(
            position => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                const region={
                    latitude: latitude,
                    longitude: longitude,
                    ...deltas
                };
                this.setState({region});
                console.log(region);
                this.getCoffeeShops();
            },
            error => Alert.alert(error.message),
            { enableHighAccuracy: true, timeout: 2000, maximumAge: 1000 }
        );
    };

    render() {
        const {region, coffeeShops} = this.state;
        return (
            <View style={styles.container}>
                <Map region={region} places={coffeeShops}/>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
}
});