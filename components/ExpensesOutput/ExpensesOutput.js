import { Text, View, StyleSheet, FlatList } from "react-native";

import ExpensesList from "./ExpensesList";
import ExpensesSummary from "./ExpensesSummary";
import { GlobalStyles } from "../../constants/styles";

const colors= GlobalStyles.colors;


function ExpensesOutput({expenses, periodName}){
    return(
        <View style={styles.container}>
            <ExpensesSummary expenses={expenses} periodName={periodName} />
            <ExpensesList expenses={expenses} />
        </View>
    );
};

export default ExpensesOutput;

const styles = StyleSheet.create({
    container:{
        flex: 1,
        padding: 24,
        backgroundColor: colors.primary700
    }
})