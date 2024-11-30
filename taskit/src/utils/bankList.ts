export const bankList = [
  { name: 'Nubank', imageUri: 'https://logopng.com.br/logos/nubank-95.png' },
  {
    name: 'Banco do Brasil',
    imageUri: 'https://assets.hgbrasil.com/finance/companies/big/banco-do-brasil.png',
  },
  {
    name: 'Itaú',
    imageUri:
      'https://upload.wikimedia.org/wikipedia/commons/2/2d/2023_Ita%C3%BA_Unibanco_Logo.png',
  },
  {
    name: 'Bradesco',
    imageUri: 'https://logospng.org/download/bradesco/logo-bradesco-escudo-1024.png',
  },
  {
    name: 'Caixa Econômica Federal',
    imageUri:
      'https://www.clipartmax.com/png/small/97-972438_reforma-trabalhista-acaba-com-incorpora%C3%A7%C3%A3o-de-fun%C3%A7%C3%A3o-caixa-econ%C3%B4mica-federal.png',
  },
  {
    name: 'Santander',
    imageUri:
      'https://w7.pngwing.com/pngs/181/292/png-transparent-santander-group-santander-bank-logo-quiz-ultimate-bank-text-hand-logo.png',
  },
  {
    name: 'Banco Safra',
    imageUri: 'https://logospng.org/download/banco-safra/logo-banco-safra-icon-4096.png',
  },
  {
    name: 'BTG Pactual',
    imageUri:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtrGLKgEY6wZE4qsTYuCe2nHn947_jdCPTkQ&s',
  },
  {
    name: 'Banco Votorantim',
    imageUri: 'https://logospng.org/wp-content/uploads/bv-financeira.png',
  },
  {
    name: 'Banco Inter',
    imageUri: 'https://i.pinimg.com/474x/ab/2a/a1/ab2aa12174248670698405c4ca454a48.jpg',
  },
  {
    name: 'Banco Original',
    imageUri: 'https://pbs.twimg.com/profile_images/1381393729790091266/OpNx3ruq_400x400.png',
  },
  {
    name: 'Banco Pan',
    imageUri:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUVDb5OEnUXCGg3CNTS9s3ljyDbKpta8om-w&s',
  },
  {
    name: 'Banco Modal',
    imageUri: 'https://logowik.com/content/uploads/images/banco-modal7606.logowik.com.webp',
  },
  {
    name: 'XP Investimentos',
    imageUri: 'https://www.logoscapital.com.br/wp-content/uploads/2020/12/icone-XP.png',
  },

  {
    name: 'C6 Bank',
    imageUri:
      'https://cdn.adtechpanda.com/33879e54-e00d-4c8d-9e13-c061b0e9d7ef/-/format/jpeg/-/quality/lightest/',
  },
  {
    name: 'Banco Next',
    imageUri: 'https://logospng.org/wp-content/uploads/banco-next.png',
  },
  {
    name: 'Agibank',
    imageUri:
      'https://kolor360.com/agibank/lojaconceito/uploads/vr/5f1b5cd0ffd0e15531a5bf5d/asset/1595885365-1.png',
  },
  {
    name: 'PagBank (PagSeguro)',
    imageUri: 'https://seeklogo.com/images/P/pagseguro-logo-B23BF76524-seeklogo.com.png',
  },
  {
    name: 'Banco ABC Brasil',
    imageUri:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4YH2vh2gGgRBLENVC_SlpMyITarbzQs6xpg&s',
  },

  {
    name: 'Goldman Sachs',
    imageUri:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQN2OVdEFL3Chjmni3eyiKJYiS7rjZMqOL7ZQ&s',
  },
  {
    name: 'J.P. Morgan',
    imageUri:
      'https://e7.pngegg.com/pngimages/751/120/png-clipart-jpmorgan-chase-logo-jpmorgan-corporate-challenge-j-p-morgan-co-others-miscellaneous-text.png',
  },
  {
    name: 'Morgan Stanley',
    imageUri: 'https://i.pinimg.com/originals/e9/6c/0a/e96c0a272b688696826189822221b6f9.png',
  },
];

export function getBankImageUri(bankName: string): string | undefined {
  const bank = bankList.find((b) => b.name.toLowerCase() === bankName.toLowerCase());
  return bank?.imageUri; // undefined é retornado automaticamente se bank for undefined
}
