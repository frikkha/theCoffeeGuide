import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import MapView from 'react-native-maps';


export default class Map extends Component {
  render() {
    const { region } = this.props;
    return (
      <MapView
        style={styles.container}
        initialRegion={region}
        loadingEnabled
        loadingIndicatorColor="#666666"
        loadingBackgroundColor="#eeeeee"
        moveOnMarkerPress={false}
        showsUserLocation
        showsCompass
        showsPointsOfInterest={false}
        showsMyLocationButton
      >
        {this.props.places.map((place, i) => (
          <MapView.Marker key={i} coordinate={place.coords} title={place.name} />
        ))}
      </MapView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
});
