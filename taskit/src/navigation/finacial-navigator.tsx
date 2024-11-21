import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import { FinancialHomeScreen, NewBankAccountScreen, NewExpenseScreen } from '~/screens/Financial';

export type FinancialStackParamList = {
  FinancialHome: undefined;
  NewBankAccount: undefined;
  NewExpense: undefined;
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
    </FinancialStack.Navigator>
  );
}
