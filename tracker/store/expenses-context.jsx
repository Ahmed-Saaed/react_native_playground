import {createContext, useReducer, useState} from 'react';

export const ExpensesContext = createContext({
  expenses: {},
  addExpense: ({description, amount, date}) => {},
  deleteExpense: (id) => {},
  updateExpense: (id, {description, amount, date}) => {},
});

const DUMMY_EXPENSES = [
  {
    id: 'e1',
    description: 'tools',
    amount: 59.99,
    date: new Date('2021-12-19'),
  },
  {
    id: 'e2',
    description: 'weights',
    amount: 72.99,
    date: new Date('2022-9-19'),
  },
  {
    id: 'e3',
    description: 'cloths',
    amount: 100.99,
    date: new Date('1997-12-15'),
  },
  {
    id: 'e4',
    description: 'food',
    amount: 89.994,
    date: new Date('2021-12-19'),
  },
  {
    id: 'e5',
    description: 'books',
    amount: 14.99,
    date: new Date('2021-12-19'),
  },
  {
    id: 'e6',
    description: 'cloths',
    amount: 100.99,
    date: new Date('1997-12-15'),
  },
  {
    id: 'e7',
    description: 'food',
    amount: 89.994,
    date: new Date('2021-12-19'),
  },
  {
    id: 'e8',
    description: 'books',
    amount: 14.99,
    date: new Date('2023-10-17'),
  },
];

const expensesReducer = (state, action) => {
  switch (action.type) {
    case 'ADD':
      const id = (new Date() * Math.random().toFixed()).toString();
      return [{...action.payload, id: id}, ...state];
    case 'UPDATE':
      const updateableExpenseIndex = state.findIndex(
        (expense) => expense.id === action.payload.id
      );
      const updatableExpense = state[updateableExpenseIndex];
      const updatedItem = {...updatableExpense, ...action.payload.data};
      const updatedExpenses = [...state];
      updatedExpenses[updateableExpenseIndex] = updatedItem;

      return updatedExpenses;
    case 'DELETE':
      return state.filter((expense) => expense.id !== action.payload);
    default:
      return state;
  }
};

const ExpensesContextProvider = ({children}) => {
  const [expensesState, dispatch] = useReducer(expensesReducer, DUMMY_EXPENSES);

  const addExpense = (expenseData) => {
    dispatch({type: 'ADD', payload: expenseData});
  };
  const deleteExpense = (id) => {
    dispatch({type: 'DELETE', payload: id});
  };
  const updateExpense = (id, expenseData) => {
    dispatch({type: 'UPDATE', payload: {id: id, data: expenseData}});
  };

  const value = {
    expenses: expensesState,
    addExpense: addExpense,
    deleteExpense: deleteExpense,
    updateExpense: updateExpense,
  };

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
};

export default ExpensesContextProvider;
