import { StyleSheet, Text } from "react-native";
import { useLayoutEffect } from "react";
import { View } from "react-native";
import { useContext } from "react";

import IconButton from "../components/UI/IconButton";
import Button from "../components/UI/Button";
import { GlobalStyles } from "../constants/styles";
import { ExpensesContext } from "../store/expenses-context";

const colors = GlobalStyles.colors;


function ManageExpenses({route, navigation}){

    const expensesContext = useContext(ExpensesContext);

    const editedExpenseId = route.params?.expenseId ;
    const isEditing = !!editedExpenseId;

    useLayoutEffect(()=>{
        navigation.setOptions({
        title: isEditing ? "Edit Expense" : "Add Expense"
    })
    },[navigation,isEditing]);


    function deleteExpenseHandler(){
        expensesContext.deleteExpense(editedExpenseId);
        navigation.goBack();
    }

    function cancelHandler(){
        navigation.goBack();
    }

    function confirmHandler(){

        if(isEditing)
            expensesContext.updateExpense(editedExpenseId, {description:"Text!!!", amount: 19.95, date: new Date("2023-05-2")});
        else
            expensesContext.addExpense({description:"Text", amount: 19.95, date: new Date("2023-05-01")});

        navigation.goBack();
    }

    return(
        <View style={styles.container}>

            <View style={styles.buttonsContainer}>
                <Button mode="flat" onPress={cancelHandler} style={styles.button}>Cancel</Button>
                <Button onPress={confirmHandler} style={styles.button}>{isEditing?"Update":"Add"}</Button>
            </View>

            {isEditing && 
                <View style={styles.deleteContainer}>
                    <IconButton icon="trash" color={colors.error500} size={36} onPress={deleteExpenseHandler} />
                </View>
            }
        </View>
    )
};

export default ManageExpenses;

const styles = StyleSheet.create({
    container:{
        flex: 1,
        padding: 24,
        backgroundColor: colors.primary800
    },
    deleteContainer:{
        marginTop: 16,
        paddingTop: 8,
        borderTopWidth: 2,
        borderTopColor: colors.primary200,
        alignItems: 'center'
    },
    buttonsContainer:{
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    button:{
        minWidth: 120,
        marginHorizontal: 8
    }
});