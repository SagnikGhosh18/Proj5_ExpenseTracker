import { View, ActivityIndicator, StyleSheet } from "react-native";

import { GlobalStyles } from "../../constants/styles";

const colors = GlobalStyles.colors;


function LoadingOverlay(){
    return(
        <View style={styles.container}>
            <ActivityIndicator size='large' color='white' />
        </View>
    )
}

export default LoadingOverlay;

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.primary700
    }
});