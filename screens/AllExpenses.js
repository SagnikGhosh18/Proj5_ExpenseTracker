import { Text } from "react-native";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { useContext } from "react";
import { ExpensesContext } from "../store/expenses-context";


function AllExpenses(){
    const expensesContext = useContext(ExpensesContext);

    return(
        <ExpensesOutput expenses={expensesContext.expenses} periodName="Total" />
    )
};

export default AllExpenses;