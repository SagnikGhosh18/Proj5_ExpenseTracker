import { Text } from "react-native";
import { useContext } from "react";
import { ExpensesContext } from "../store/expenses-context";

import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { dateMinusDays } from "../util/date";

function RecentExpenses(){

    const expensesContext = useContext(ExpensesContext);

    const recentExp = expensesContext.expenses.filter((expense) => {
        const today= new Date();
        const date7DaysAgo = dateMinusDays(today,6);

        return expense.date > date7DaysAgo;
    });

    return(
        <ExpensesOutput periodName="Last 7 Days" expenses={recentExp} />
    )
};

export default RecentExpenses;