import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import {ExpensesContext} from '../store/expenses-context';
import {getDateMinDays} from '../util/date';
import {fetchExpenses} from '../util/http';
import LoadingOverlay from '../components/UI/LoadingOverlay';
import ErrorOverlay from './../components/UI/ErrorOverlay';

const RecentExpenses = () => {
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState();
  const expensesCtx = useContext(ExpensesContext);

  useEffect(() => {
    async function getExpenses() {
      setIsFetching(true);
      try {
        const expenses = await fetchExpenses();
        expensesCtx.setExpenses(expenses);
      } catch (error) {
        setError('could not fetch expenses');
      }
      setIsFetching(false);
    }

    getExpenses();
  }, []);

  const errorHandler = () => {
    setError(null);
  };

  if (error && !isFetching) {
    return <ErrorOverlay message={error} onConfirm={errorHandler} />;
  }
  if (isFetching) {
    return <LoadingOverlay />;
  }

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
