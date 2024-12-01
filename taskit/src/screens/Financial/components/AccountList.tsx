import { NavigationProp } from '@react-navigation/native';
import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Text, Divider, Icon } from 'react-native-paper';

import GlobalCard from '~/components/GlobalCard';
import { FinancialStackParamList } from '~/navigation/finacial-navigator';
import { Account } from '~/types';
import { getIcon } from '~/utils/accountTypeList';

type FinancialHomeScreenNavigationProp = NavigationProp<FinancialStackParamList, 'FinancialHome'>;

interface AccountListProps {
  accounts: Account[]; // Lista de contas
  navigation: FinancialHomeScreenNavigationProp; // Navegação passada como prop
}

const AccountList: React.FC<AccountListProps> = ({ accounts, navigation }) => {
  // Soma total das contas
  const totalBalance = accounts.reduce((sum, account) => sum + account.balance, 0);

  const handleNavigateToDetails = (accountId: string) => {
    console.log(accountId);
    navigation.navigate('AccountDetails', { account_id: accountId });
  };

  return (
    <GlobalCard style={{ marginHorizontal: 20 }}>
      {/* Lista de Contas Scrollável */}
      <ScrollView
        style={styles.scrollContainer}
        nestedScrollEnabled // Permite rolagem aninhada
        keyboardShouldPersistTaps="handled">
        {accounts.map((account, index) => {
          const iconName = getIcon(account.acc_type) || 'arrow-up-bold';
          return (
            <TouchableOpacity
              key={index}
              style={styles.accountItem}
              onPress={() => handleNavigateToDetails(account.id)}>
              <Icon source={iconName} size={24} color="#1C1B1F" />
              {/* Nome da conta */}
              <Text variant="bodyMedium" style={styles.accountName}>
                {account.acc_name}
              </Text>
              {/* Saldo */}
              <Text
                variant="bodyMedium"
                style={[
                  styles.accountBalance,
                  account.balance >= 0 ? styles.positive : styles.negative,
                ]}>
                R$ {account.balance.toFixed(2)}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Linha divisória */}
      <Divider style={styles.divider} />

      {/* Total Fixo no Rodapé */}
      <View style={styles.totalContainer}>
        <Text variant="bodyLarge" style={styles.totalLabel}>
          Total
        </Text>
        <Text
          variant="bodyLarge"
          style={[styles.totalBalance, totalBalance >= 0 ? styles.positive : styles.negative]}>
          R$ {totalBalance.toFixed(2)}
        </Text>
      </View>
    </GlobalCard>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    maxHeight: 500,
    flexGrow: 0,
  },
  accountItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  accountName: {
    fontFamily: 'Outfit-Regular',
    color: '#000',
    flex: 1,
    marginLeft: 8,
  },
  accountBalance: {
    fontFamily: 'Outfit-Regular',
    textAlign: 'right',
  },
  positive: {
    color: 'green',
  },
  negative: {
    color: 'red',
  },
  divider: {
    marginVertical: 8,
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 8,
  },
  totalLabel: {
    fontFamily: 'Outfit-Regular',
    color: '#000',
  },
  totalBalance: {
    fontFamily: 'Outfit-Regular',
    fontWeight: 'bold',
  },
});

export default AccountList;
