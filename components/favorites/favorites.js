import React, {Component} from "react";
import {Text, StyleSheet, ScrollView} from "react-native";
import * as Colors  from "../../styles/colors";
import * as Typography from "../../styles/typography";


export default class Favorites extends Component {
    render() {
        return (<ScrollView contentContainerStyle={styles.container}>
            <Text style={Typography.FONT_H2_ORANGE}> Your favorite coffees </Text>
        </ScrollView>);
    }
}
const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor:Colors.BEIGE
    }
});