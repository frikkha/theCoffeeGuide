import React, { Component } from 'react';
import {
  Text, View, Image, StyleSheet, ScrollView,
} from 'react-native';
import * as Colors from '../../styles/colors';
import * as Typography from '../../styles/typography';

export default class Loading extends Component {
  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={Typography.FONT_H2_BROWN_LOADING}> The Coffee Guide </Text>
        <View style={styles.imageBox}>
          <Image source={require('../../assets/icon-coffee.png')} />
        </View>
      </ScrollView>
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
  imageBox: {
    alignItems: 'center',
    borderRadius: 5,
  },
});
