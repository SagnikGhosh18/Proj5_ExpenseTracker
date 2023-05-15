import axios from 'axios';

const url = 'https://expense-tracker-260c0-default-rtdb.asia-southeast1.firebasedatabase.app'

export async function storeExpense(expenseData){
    const response = await axios.post(url+'/expenses.json', expenseData );
    const id = response.data.name;
    return id;
};

export async function fetchExpense(expenseData){
    const response = await axios.get(url+'/expenses.json');

    const expenses = [];

    for( const key in response.data){
        const expObj = {
            id: key,
            amount: response.data[key].amount,
            date: new Date(response.data[key].date),
            description: response.data[key].description,
        }
        expenses.push(expObj);
    }
    return expenses;
}

export function updateExpense(id, expenseData){
    return axios.put(url+`/expenses/${id}.json`, expenseData);
}

export function deleteExpense(id){
    return axios.delete(url+`/expenses/${id}.json`);
}