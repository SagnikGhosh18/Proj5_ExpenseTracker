import { useState } from "react";
import { View, StyleSheet, TextInput, Text, Alert } from "react-native";

import Input from "./Input";
import Button from "../UI/Button";
import { GlobalStyles } from "../../constants/styles";

const colors =  GlobalStyles.colors;

function ExpenseForm({submitLabel, onCancel, onSubmit, defaultValues}){

    const [input, setInput] = useState({
        amount: {
            value: defaultValues ? defaultValues.amount.toString() : '',
            isValid: true
        }, 
        date: {
            value: defaultValues ? defaultValues.date.toISOString().slice(0,10) : '',
            isValid: true
        }, 
        description: {
            value: defaultValues ? defaultValues.description.toString() : '',
            isValid: true
        }
    });



    function inputHandler(inputIdentifier, enteredValue){
        setInput((prevValue)=>{
            return{
                ...prevValue,
                [inputIdentifier]: {value: enteredValue, isValid: true}
            };
        });
    };

    function submitHandler(){
        const expenseData ={
            amount: +input.amount.value,
            date: new Date(input.date.value),
            description: input.description.value
        };

        const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
        const dateIsValid = expenseData.date.toString() !== 'Invalid Date';
        const descIsValid = expenseData.description.trim().length > 0;

        if( !amountIsValid || !dateIsValid || !descIsValid){
            //Alert.alert('Invalid input','Please check input fields');

            setInput((prevValue)=>{
            return{
                amount: {value: prevValue.amount.value, isValid: amountIsValid},
                date: {value: prevValue.date.value, isValid: dateIsValid},
                description : {value: prevValue.description.value, isValid: descIsValid},
                };
            });

            return ;
        }
            

        onSubmit(expenseData);
    }

    const formIsValid = !input.amount.isValid || !input.description.isValid || !input.date.isValid;

    return(
        <View style={styles.form}>
            <Text style={styles.title}>Your Expense</Text>
            <View style={styles.inputRow}>
                <Input label="Amount" invalid={!input.amount.isValid} style={styles.rowInput} textInputConfig={{
                    keyboardType: 'decimal-pad',
                    onChangeText: inputHandler.bind(this, 'amount'),
                    value: input.amount.value
                }} />
                <Input label="Date" invalid={!input.date.isValid} style={styles.rowInput} textInputConfig={{
                    placeholder: 'YYYY-MM-DD',
                    maxLength: 10,
                    onChangeText: inputHandler.bind(this, 'date'),
                    value: input.date.value
                }}/>
            </View>
            <Input label="Description" invalid={!input.description.isValid} textInputConfig={{
                multiline: true,
                onChangeText: inputHandler.bind(this, 'description'),
                value: input.description.value
            }}/>

            {formIsValid && <Text style = {styles.errorText}>Please check your data</Text>}

            <View style={styles.buttonsContainer}>
                <Button mode="flat" onPress={onCancel} style={styles.button}>Cancel</Button>
                <Button onPress={submitHandler} style={styles.button}>{submitLabel}</Button>
            </View>
        </View>
    );
};

export default ExpenseForm;

const styles = StyleSheet.create({
    form:{
        marginTop: 40,
    },
    title:{
        fontSize: 24,
        fontWeight: "bold",
        color: "white",
        marginVertical: 24,
        textAlign: "center"
    },
    inputRow:{
        flexDirection: "row",
        justifyContent: "space-between"
    },
    rowInput:{
        flex: 1
    },buttonsContainer:{
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    button:{
        minWidth: 120,
        marginHorizontal: 8
    },
    errorText:{
        textAlign: "center",
        color: colors.error500,
        margin: 8
    }
});