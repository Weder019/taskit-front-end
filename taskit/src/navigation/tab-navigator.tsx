import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';

import { RootStackParamList } from '.';
import FinancialNavigator from './finacial-navigator';
import { TabBarIcon } from '../components/TabBarIcon';
import NewExpenseScreen from '../screens/Financial/NewExpense';
import Three from '../screens/three' ;

import NewBankAccount from '~/screens/Financial/NewBankAccount';
import NewIncome from '~/screens/Financial/NewIncome';
import TransactionsScreen from '~/screens/TransactionScreen';
import CategoriesScreen from '~/screens/Categories/CategoriesScreen';
import CategoryItem from '~/screens/Categories/Components/CategoryItem';


const Tab = createBottomTabNavigator();

type Props = StackScreenProps<RootStackParamList, 'TabNavigator'>;

export default function TabLayout({ navigation }: Props) {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => {
        const routeName = getFocusedRouteNameFromRoute(route) ?? 'FinancialHome';

        return {
          tabBarStyle: {
            display: routeName === 'FinancialHome' ? 'flex' : 'none', // Exibe somente na FinancialHome
          },
          headerShown: false, // Oculta o header de navegação
          tabBarActiveTintColor: 'black',
        };
      }}>
      <Tab.Screen
        name="CategoriesScreen"
        component={CategoriesScreen}
        options={{
          title: 'Tab One',
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
        }}
      />
      <Tab.Screen
        name="Two"
        component={NewExpenseScreen}
        options={{
          title: 'Tab Two',
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
        }}
      />
      <Tab.Screen
        name="Financial"
        component={FinancialNavigator}
        options={{
          title: 'Financial',
          tabBarIcon: ({ color }) => <TabBarIcon name="money" color={color} />, // ícone representativo
        }}
      />
    </Tab.Navigator>
  );
}