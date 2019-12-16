import React, {Component} from "react";
import {View, StyleSheet, Text} from "react-native";
import MapView from "react-native-maps"


export default class Map extends Component{
    render(){
        const {region} = this.props;
        return(
            <MapView style={styles.container}
            initialRegion={region}
                     loadingEnabled = {true}
                     loadingIndicatorColor="#666666"
                     loadingBackgroundColor="#eeeeee"
                     moveOnMarkerPress = {false}
                     showsUserLocation={true}
                     showsCompass={true}
                     showsPointsOfInterest = {false}
            showsMyLocationButton>
                {this.props.places.map((place,i) => (
                    <MapView.Marker key={i} coordinate={place.coords} title={place.name}/>
                ))}
            </MapView>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        width:"100%",
        height:"100%"
    }
});
