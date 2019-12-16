import React from "react";
import { Text, SafeAreaView, StyleSheet } from "react-native";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
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
        console.log(coffeeShops);
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

    getLocationAsync = async () => {
        const {status} = await Permissions.askAsync(Permissions.LOCATION).catch(error);
        if(status !== "granted"){
            this.setState({errorMessage:"Permission to access location was denied"});
        }
        let location = await Location.getCurrentPositionAsync({}).catch(error);
        const region={
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            ...deltas
        };

        await this.setState({region});
        console.log(region);
        //await this.getCoffeeShops();
    };

    render() {
        const {region, coffeeShops} = this.state;
        return (
            <SafeAreaView style={styles.container}>
                <Map region={region} places={coffeeShops}/>
            </SafeAreaView>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
alignItems: "center",
justifyContent: "center",
}
});