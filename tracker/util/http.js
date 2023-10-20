import axios from 'axios';

const url = 'https://expenses-9d5b9-default-rtdb.firebaseio.com';

export async function storeExpense(expenseData) {
  await axios.post(`${url}/expenses.json`, expenseData);
}

export async function fetchExpenses() {
  const response = await axios.get(`${url}/expenses.json`);
  const expenses = [];
  for (const key in response.data) {
    const expenseObj = {
      id: key,
      amount: response.data[key].amount,
      date: new Date(response.data[key].date),
      description: response.data[key].description,
    };
    expenses.push(expenseObj);
  }
  return expenses;
}
