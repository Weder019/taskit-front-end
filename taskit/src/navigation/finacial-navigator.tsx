import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import { FinancialHomeScreen, NewBankAccountScreen, NewExpenseScreen, EditNewBankAccountScreen, EditIncomeScreen, EditExpenseScreen } from '~/screens/Financial';

export type FinancialStackParamList = {
  FinancialHome: undefined;
  NewBankAccount: undefined;
  EditNewBankAccount: undefined;
  NewExpense: undefined;
  NewIncome: undefined;
  EditExpense: undefined;
  EditIncome: undefined;
};

const FinancialStack = createStackNavigator<FinancialStackParamList>();

export default function FinancialNavigator() {
  return (
    <FinancialStack.Navigator initialRouteName="FinancialHome">
      <FinancialStack.Screen
        name="FinancialHome"
        component={FinancialHomeScreen}
        options={{ headerShown: false }}
      />
      <FinancialStack.Screen
        name="NewBankAccount"
        component={NewBankAccountScreen}
        options={{ headerShown: false }}
      />
      <FinancialStack.Screen
        name="NewExpense"
        component={NewExpenseScreen}
        options={{ headerShown: false }}
      />
      <FinancialStack.Screen
        name="EditNewBankAccount"
        component={EditNewBankAccountScreen}
        options={{ headerShown: false }}
      />
      <FinancialStack.Screen
        name="EditExpense"
        component={EditExpenseScreen}
        options={{ headerShown: false }}
      />
      <FinancialStack.Screen
        name="EditIncome"
        component={EditIncomeScreen}
        options={{ headerShown: false }}
      />
      
    </FinancialStack.Navigator>
  );
}
