import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { View, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { Icon } from 'react-native-paper';
import { Text, Divider } from 'react-native-paper';

import GlobalCard from '~/components/GlobalCard';
import { Account } from '~/types';
import { getIcon } from '~/utils/accountTypeList';

interface AccountListProps {
  accounts: Account[]; // Lista de contas
}

const AccountList: React.FC<AccountListProps> = ({ accounts }) => {
  // Soma total das contas
  const totalBalance = accounts.reduce((sum, account) => sum + account.balance, 0);

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
            <View key={index} style={styles.accountItem}>
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
            </View>
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
  card: {
    paddingVertical: 16,
    flex: 1,
  },
  scrollContainer: {
    maxHeight: 100,
    flexGrow: 0,
  },
  accountItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8, // Espaçamento entre as contas
  },
  accountName: {
    fontFamily: 'Outfit-Regular',
    color: '#000',
  },
  accountBalance: {
    fontFamily: 'Outfit-Regular',
  },
  positive: {
    color: 'green',
  },
  negative: {
    color: 'red',
  },
  divider: {
    marginVertical: 8, // Espaçamento entre a lista e o total
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
    fontWeight: 'bold', // Destaque para o total
  },
});

export default AccountList;
