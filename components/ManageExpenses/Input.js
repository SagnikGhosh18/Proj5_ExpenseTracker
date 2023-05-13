import { Text, View, TextInput, StyleSheet } from "react-native";

import { GlobalStyles } from "../../constants/styles";

const colors = GlobalStyles.colors;

function Input({label, style, textInputConfig, invalid}){

    let inputStyles=[styles.input];

    if(textInputConfig && textInputConfig.multiline)
        inputStyles.push(styles.inputMult);
    
    if(invalid)
        inputStyles.push(styles.invalidInput);

    return(
        <View style={[styles.inputContainer, style]}>
            <Text style={[styles.label, invalid&&styles.invalidLabel]}>{label}</Text>
            <TextInput {... textInputConfig} style={inputStyles} />
        </View>
    );
};

export default Input;

const styles = StyleSheet.create({
    inputContainer:{
        marginHorizontal: 4,
        marginVertical: 8
    },
    label:{
        fontSize: 12,
        color: colors.primary100,
        marginBottom: 4
    },
    input:{
        backgroundColor: colors.primary100,
        padding: 6,
        borderRadius: 6,
        fontSize: 18,
        color: colors.primary700
    },
    inputMult:{
        minHeight: 100,
        textAlignVertical: 'top'
    },
    invalidLabel:{
        color: colors.error500
    },
    invalidInput:{
        backgroundColor: colors.error50
    }
});