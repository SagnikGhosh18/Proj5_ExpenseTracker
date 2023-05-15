import { View, ActivityIndicator, StyleSheet, Text } from "react-native";

import { GlobalStyles } from "../../constants/styles";
import Button from "./Button";

const colors = GlobalStyles.colors;


function ErrorOverlay({message, onConfirm}){
    return(
        <View style={styles.container}>
            <Text style={[styles.text, styles.title]}>An error occurred</Text>
            <Text style={styles.message}>{message}</Text>
            <Button onPress={onConfirm}>Okay</Button>
        </View>
    )
}

export default ErrorOverlay;

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.primary700
    },
    text:{
        color:"white",
        textAlign: "center",
        marginBottom: 8
    },
    title:{
        fontSize: 20,
        fontWeight: "bold"
    },
    message:{}
});