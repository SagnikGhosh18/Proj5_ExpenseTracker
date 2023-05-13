import { StyleSheet, Text, TextInput } from "react-native";
import { useLayoutEffect } from "react";
import { View } from "react-native";
import { useContext } from "react";

import Button from "../components/UI/Button";
import { GlobalStyles } from "../constants/styles";
import { ExpensesContext } from "../store/expenses-context";
import ExpenseForm from "../components/ManageExpenses/ExpenseForm";
import IconButton from "../components/UI/IconButton";

const colors = GlobalStyles.colors;


function ManageExpenses({route, navigation}){

    const expensesContext = useContext(ExpensesContext);

    const editedExpenseId = route.params?.expenseId ;
    const isEditing = !!editedExpenseId;

    const selectedExpense = expensesContext.expenses.find((expense)=>expense.id===editedExpenseId);

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

    function confirmHandler(expenseData){

        if(isEditing)
            expensesContext.updateExpense(editedExpenseId, expenseData);
        else
            expensesContext.addExpense(expenseData);

        navigation.goBack();
    }

    return(
        <View style={styles.container}>
            <ExpenseForm 
                    onCancel={cancelHandler} 
                    submitLabel={isEditing?"Update":"Add"}
                    onSubmit={confirmHandler} 
                    defaultValues={selectedExpense} 
                />
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