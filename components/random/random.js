import React, {Component} from "react";
import {Text, StyleSheet, ScrollView} from "react-native";



export default class Random extends Component {
    render() {
        return (<ScrollView contentContainerStyle={styles.container}>
            <Text> RANDOM COFFEE GENERATOR </Text>
        </ScrollView>);
    }
}
const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center"
    }
});