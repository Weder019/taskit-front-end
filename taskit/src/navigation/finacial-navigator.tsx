import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import * as FinancialScreens from '~/screens/Financial';

export type FinancialStackParamList = {
  FinancialHome: undefined;
  NewBankAccount: undefined;
  AccountDetails: undefined;
  EditNewBankAccount: undefined;
  NewExpense: undefined;
  EditExpense: undefined;
  NewIncome: undefined;
  EditIncome: undefined;
  Categories: undefined;
  Transactions: undefined;
};

const FinancialStack = createStackNavigator<FinancialStackParamList>();

export default function FinancialNavigator() {
  return (
    <FinancialStack.Navigator initialRouteName="FinancialHome">
      <FinancialStack.Screen
        name="FinancialHome"
        component={FinancialScreens.FinancialHomeScreen}
        options={{ headerShown: false }}
      />
      <FinancialStack.Screen
        name="NewBankAccount"
        component={FinancialScreens.NewBankAccountScreen}
        options={{ headerShown: false }}
      />
      <FinancialStack.Screen
        name="AccountDetails"
        component={FinancialScreens.AccountDeatilsScreen}
        options={{ headerShown: false }}
      />
      <FinancialStack.Screen
        name="NewExpense"
        component={FinancialScreens.NewExpenseScreen}
        options={{ headerShown: false }}
      />
      <FinancialStack.Screen
        name="NewIncome"
        component={FinancialScreens.NewIncomeScreen}
        options={{ headerShown: false }}
      />
      <FinancialStack.Screen
        name="EditNewBankAccount"
        component={FinancialScreens.EditNewBankAccountScreen}
        options={{ headerShown: false }}
      />
      <FinancialStack.Screen
        name="EditExpense"
        component={FinancialScreens.EditExpenseScreen}
        options={{ headerShown: false }}
      />
      <FinancialStack.Screen
        name="EditIncome"
        component={FinancialScreens.EditIncomeScreen}
        options={{ headerShown: false }}
      />
      <FinancialStack.Screen
        name="Categories"
        component={FinancialScreens.CategoriesScreen}
        options={{ headerShown: false }}
      />
      <FinancialStack.Screen
        name="Transactions"
        component={FinancialScreens.TransactionScreen}
        options={{ headerShown: false }}
      />
    </FinancialStack.Navigator>
  );
}
