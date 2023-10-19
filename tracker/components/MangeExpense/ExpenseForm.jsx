import {StyleSheet, Text, View, Alert} from 'react-native';
import Button from '../../UI/Button';
import React, {useState} from 'react';
import Input from './Input';
import {getFormattedDate} from '../../util/date';

const ExpenseForm = (onCancel, onSubmit, submitButtonLabel, defaultValues) => {
  const [inputs, setinputs] = useState({
    amount: {
      value: defaultValues ? defaultValues.amount.toString() : '',
      isValid: !!defaultValues,
    },
    date: {
      value: defaultValues ? getFormattedDate(defaultValues.data) : '',
      isValid: !!defaultValues,
    },
    description: {
      value: defaultValues ? defaultValues.description.toString() : '',
      isValid: !!defaultValues,
    },
  });

  const inputChangeHandler = (inputIdentifier, enteredValue) => {
    setinputs((curInputs) => {
      return {
        ...curInputs,
        [inputIdentifier]: {value: enteredValue, isValid: true},
      };
    });
  };

  const submitHandler = () => {
    const expenseData = {
      amount: +inputs.amount.value,
      date: new Date(inputs.date.value),
      description: inputs.description.value,
    };

    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const dateIsValid = expenseData.date.toString() === 'Invalid Date';
    const descriptionIsValid = expenseData.description.trim().length > 0;

    if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
      setinputs((curInputs) => {
        return {
          amount: {value: curInputs.amount.value, isValid: amountIsValid},
        };
      });
      return;
    }

    onSubmit(expenseData);
  };

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your expenses </Text>
      <View style={styles.inputsRow}>
        <Input
          style={styles.rowInput}
          label='Amount'
          textInputConfig={{
            keyboardType: 'decimal-pad',
            onchangeText: inputChangeHandler.bind(this, 'amount'),
            value: inputs.amount.value,
          }}
        />
        <Input
          style={styles.rowInput}
          label='Date'
          textInputConfig={{
            value: inputs.date.date,
            placeholder: 'YYYY-MM-DD',
            maxLength: 10,
            onchangeText: inputChangeHandler.bind(this, 'date'),
          }}
        />
      </View>
      <Input
        label='Description'
        textInputConfig={{
          multiline: true,
          value: inputs.description.value,
          // autoCapitalize: 'none',
          // autoCorrect: false,
          onchangeText: inputChangeHandler.bind(this, 'description'),
        }}
      />
      <View style={styles.buttons}>
        <Button style={styles.button} mode='flat' onPress={onCancel}>
          cancel
        </Button>
        <Button style={styles.button} onPress={submitHandler}>
          {submitButtonLabel} || {'a7a'}
        </Button>
      </View>
    </View>
  );
};

export default ExpenseForm;

const styles = StyleSheet.create({
  form: {
    marginTop: 80,
  },
  inputsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowInput: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginVertical: 24,
    textAlign: 'center',
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
