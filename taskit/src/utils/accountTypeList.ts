export const accountTypeList = [
  { name: 'Carteira', iconName: 'wallet' },
  { name: 'Conta Corrente', iconName: 'bank' },
  { name: 'Poupança', iconName: 'download' },
  { name: 'Investimentos', iconName: 'trending-up' },
  { name: 'Outros', iconName: 'dots-horizontal' },
];

export function getIcon(iconName: string): string | null {
  const icon = accountTypeList.find((i) => i.name.toLowerCase() === iconName.toLowerCase());
  return icon?.iconName || null;
}