import React, {Component} from "react";
import {Text, StyleSheet, ScrollView} from "react-native";


export default class Search extends Component {
    render() {
        return (<ScrollView contentContainerStyle={styles.container}>
            <Text> SEARCH </Text>
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