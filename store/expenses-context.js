import { createContext, useReducer } from "react";

const DUMMY_DATA =[
    {
        id: 'e1',
        description: 'A pair of shoes',
        amount: 59.99,
        date: new Date('2022-12-19')
    },
    {
        id: 'e2',
        description: 'A pair of pants',
        amount: 89.99,
        date: new Date('2022-12-19')
    },
    {
        id: 'e3',
        description: 'Fruits',
        amount: 19.99,
        date: new Date('2023-5-7')
    },
    {
        id: 'e4',
        description: 'Book',
        amount: 9.99,
        date: new Date('2023-5-8')
    },
    {
        id: 'e5',
        description: 'Notebook',
        amount: 19.99,
        date: new Date('2023-5-9')
    },
    {
        id: 'e6',
        description: 'A pair of shoes',
        amount: 59.99,
        date: new Date('2022-12-19')
    },
    {
        id: 'e7',
        description: 'A pair of pants',
        amount: 89.99,
        date: new Date('2022-12-19')
    },
    {
        id: 'e8',
        description: 'Fruits',
        amount: 19.99,
        date: new Date('2023-5-7')
    },
    {
        id: 'e9',
        description: 'Book',
        amount: 9.99,
        date: new Date('2023-5-8')
    },
    {
        id: 'e10',
        description: 'Notebook',
        amount: 19.99,
        date: new Date('2023-5-9')
    },
];


export const ExpensesContext = createContext({
    expenses:[],
    addExpense: ({description, amount, date})=>{},
    deleteExpense: (id)=>{},
    updateExpense:(id, {description, amount, date})=>{}
});

function expensesReducer(state, action){

    switch(action.type){
        case 'ADD': const id = new Date().toString() + Math.random().toString();
                    return [{...action.payload, id:id},...state];
        case 'UPDATE':
                    const updateableIndex = state.findIndex((expense)=>expense.id===action.payload.id);
                    const updateableExpense = state[updateableIndex];
                    const updatedItem = {...updateableExpense, ...action.payload.data};
                    const updatedExpenses = [...state];
                    updatedExpenses[updateableIndex] = updatedItem;

                    return updatedExpenses;
        case 'DELETE':
                    return state.filter((expense)=>expense.id!==action.payload);

        default: return state;
    }

}

export default function ExpensesContextProvider({children}){

    const [expensesState, dispatch] = useReducer(expensesReducer, DUMMY_DATA);

    function addExpense(expenseData){
        dispatch({type: 'ADD', payload: expenseData});
    };

    function deleteExpense(id){
        dispatch({type: 'DELETE', payload: id});
    };

    function updateExpense(id, expenseData){
        dispatch({type: 'UPDATE', payload: {id: id, data: expenseData}});
    };

    const value = {
        expenses: expensesState,
        addExpense: addExpense,
        deleteExpense: deleteExpense,
        updateExpense: updateExpense
    };

    return <ExpensesContext.Provider value={value}>{children}</ExpensesContext.Provider>
}