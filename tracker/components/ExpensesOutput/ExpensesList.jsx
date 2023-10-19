import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {FlatList} from 'react-native';
import ExpensesItem from './ExpensesItem';

const RenderExpensesItem = (itemData) => {
  return <ExpensesItem {...itemData.item} />;
};

const ExpensesList = ({expenses}) => {
  return (
    <FlatList
      data={expenses}
      renderItem={RenderExpensesItem}
      keyExtractor={(item) => item.id}
    />
  );
};

export default ExpensesList;

const styles = StyleSheet.create({});
