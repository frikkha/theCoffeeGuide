import React, {Component} from "react";
import {Text, StyleSheet, ScrollView} from "react-native";



export default class Favorites extends Component {
    render() {
        return (<ScrollView contentContainerStyle={styles.container}>
            <Text> FAVORITES </Text>
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