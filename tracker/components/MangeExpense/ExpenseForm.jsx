import {StyleSheet, Text, View, Alert} from 'react-native';
import Button from '../../UI/Button';
import React, {useState} from 'react';
import Input from './Input';
import {getFormattedDate} from '../../util/date';
import {GlobalStyles} from '../../constants/styles';

const ExpenseForm = ({
  onCancel,
  onSubmit,
  submitButtonLabel,
  defaultValues,
}) => {
  const [inputs, setinputs] = useState({
    amount: {
      value: defaultValues ? defaultValues.amount.toString() : '',
      isValid: true,
    },
    date: {
      value: defaultValues ? getFormattedDate(defaultValues.date) : '',
      isValid: true,
    },
    description: {
      value: defaultValues ? defaultValues.description.toString() : '',
      isValid: true,
    },
  });

  const inputChangeHandler = (enteredValue, inputIdentifier) => {
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
    const dateIsValid = !expenseData.date.toString() === 'Invalid Date';
    const descriptionIsValid = !expenseData.description.trim().length > 0;

    if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
      setinputs((curInputs) => {
        return {
          amount: {value: curInputs.amount.value, isValid: amountIsValid},
          date: {value: curInputs.date.value, isValid: dateIsValid},
          description: {
            value: curInputs.description.value,
            isValid: descriptionIsValid,
          },
        };
      });
      return;
    }

    onSubmit(expenseData);
  };

  const formIsInvalid =
    !inputs.amount.isValid ||
    !inputs.date.isValid ||
    !inputs.description.isValid;

  console.log(submitButtonLabel, onCancel);
  console.log(inputs);
  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your expenses </Text>
      <View style={styles.inputsRow}>
        <Input
          style={styles.rowInput}
          label='Amount'
          invalid={!inputs.amount.isValid}
          textInputConfig={{
            keyboardType: 'decimal-pad',
            onchangeText: inputChangeHandler.bind(this, 'amount'),
            value: inputs.amount.value,
          }}
        />
        <Input
          style={styles.rowInput}
          label='Date'
          invalid={!inputs.date.isValid}
          textInputConfig={{
            value: inputs.date.value,
            placeholder: 'YYYY-MM-DD',
            maxLength: 10,
            onchangeText: inputChangeHandler.bind(this, 'date'),
          }}
        />
      </View>
      <Input
        label='Description'
        invalid={!inputs.description.isValid}
        textInputConfig={{
          multiline: true,
          value: inputs.description.value,
          // autoCapitalize: 'none',
          // autoCorrect: false,
          onchangeText: inputChangeHandler.bind(this, 'description'),
        }}
      />
      {formIsInvalid && (
        <Text style={[styles.label, styles.errorText]}>check your values</Text>
      )}
      <View style={styles.buttons}>
        <Button style={styles.button} mode='flat' onPress={onCancel}>
          cancel
        </Button>
        <Button style={styles.button} onPress={submitHandler}>
          {submitButtonLabel}
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
  errorText: {
    textAlign: 'center',
    color: GlobalStyles.colors.error50,
  },
});
