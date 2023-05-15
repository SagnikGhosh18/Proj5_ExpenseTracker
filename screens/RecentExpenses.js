import { useContext, useEffect, useState } from "react";
import { ExpensesContext } from "../store/expenses-context";

import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";
import { dateMinusDays } from "../util/date";

import { fetchExpense } from "../util/http";

function RecentExpenses(){

    const expensesContext = useContext(ExpensesContext);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState();

    useEffect(()=>{
        async function getExpenses(){
            setIsLoading(true);
            try{
                const expenses = await fetchExpense();
                expensesContext.setExpenses(expenses);
            } catch(err){
                setError("Could not fetch");
            }
            setIsLoading(false);
            
        }

        getExpenses();
    },[]);

    function errorHandler(){
        setError(null);
    }

    if(error && !isLoading){
        return <ErrorOverlay message={error} onConfirm={errorHandler} />
    }

    if(isLoading){
        return <LoadingOverlay />
    }

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