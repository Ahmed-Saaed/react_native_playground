import {StyleSheet, Text, View} from 'react-native';
import React, {useContext} from 'react';
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import {ExpensesContext} from '../store/expenses-context';
import {getDateMinDays} from '../util/date';

const RecentExpenses = () => {
  const expensesCtx = useContext(ExpensesContext);

  const RecentExpenses = expensesCtx.expenses.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = getDateMinDays(today, 7);

    return expense.date >= date7DaysAgo && expense.date <= today;
  });

  return (
    <ExpensesOutput
      fallBackText='no expenses registerd for last 7 days'
      expenses={RecentExpenses}
      expensesPeriod={'last 7 days'}
    />
  );
};

export default RecentExpenses;

const styles = StyleSheet.create({});
