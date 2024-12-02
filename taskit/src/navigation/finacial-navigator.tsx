import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import { useUser } from '~/context/UserContext';

import * as FinancialScreens from '~/screens/Financial';

export type FinancialStackParamList = {
  FinancialHome: undefined;
  NewBankAccount: undefined;
  AccountDetails: { account_id: string };
  EditNewBankAccount: { account_id: string };
  NewExpense: undefined;
  EditExpense: { expense_id: string; account_id: string };
  NewIncome: undefined;
  EditIncome: { income_id: string; account_id: string };
  Categories: undefined;
  Transactions: { type: 'expenses' | 'income' | 'transactions' };
};

const FinancialStack = createStackNavigator<FinancialStackParamList>();

export default function FinancialNavigator() {
  const { userData, loading } = useUser();

  if (loading || !userData) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
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

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});
