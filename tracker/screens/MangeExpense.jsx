import {StyleSheet, Text, View} from 'react-native';
import React, {useContext, useLayoutEffect} from 'react';
import IconButton from '../UI/IconButton';
import {GlobalStyles} from '../constants/styles';
import Button from '../UI/Button';
import {ExpensesContext} from '../store/expenses-context';
import ExpenseForm from '../components/MangeExpense/ExpenseForm';
import {storeExpense} from '../util/http';

const MangeExpense = ({route, navigation}) => {
  const expensesId = route.params?.expenseId;
  const isEditing = !!expensesId; // will transfer the value to boolean

  const expensesCtx = useContext(ExpensesContext);

  const selectedExpense = expensesCtx.expenses.find(
    (expense) => expense.id === expensesId
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Edit expense' : 'Add Expense',
    });
  }, [navigation, isEditing]);

  const deleteHandler = () => {
    expensesCtx.deleteExpense(expensesId);
    navigation.goBack();
  };

  const cancelHandler = () => {
    navigation.goBack();
  };

  const confirmHandler = (expenseData) => {
    if (isEditing) {
      expensesCtx.updateExpense(expensesId, expenseData);
    } else {
      storeExpense(expenseData);
      expensesCtx.addExpense(expenseData);
    }
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <ExpenseForm
        submitButtonLabel={isEditing ? 'Update' : 'Add'}
        onSubmit={confirmHandler}
        onCancel={cancelHandler}
        defaultValues={selectedExpense}
      />

      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon='trash'
            color={GlobalStyles.colors.error500}
            size={36}
            onPress={deleteHandler}
          />
        </View>
      )}
    </View>
  );
};

export default MangeExpense;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: 'center',
  },
});
