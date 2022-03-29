import React from 'react';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { HighlightCard } from '../../components/HighlightCard';
import { TransactionCard } from '../../components/TransactionCard';

import {
  Container,
  Header,
  UserWrapper,
  UserInfo,
  Photo,
  User,
  UserGreeting,
  UserName,
  Icon,
  HighlightCards,
  Transactions,
  Title,
  TransactionList,
} from './styles';

export function Dashboard() {
  const data = [
    {
      type: 'positive',
      title: 'Desenvolvimento de Sites',
      amount: 'R$ 12.000,00',
      category: {
        name: 'Vendas',
        icon: 'dollar-sign',
      },
      date: '29/03/2022',
    },
    {
      type: 'negative',
      title: 'Hamburger Pix',
      amount: 'R$ 59,00',
      category: {
        name: 'Alimentação',
        icon: 'coffee',
      },
      date: '10/03/2022',
    },
    {
      type: 'negative',
      title: 'Aluguel do Apartamento',
      amount: 'R$ 1.200,00',
      category: {
        name: 'Casa',
        icon: 'shopping-bag',
      },
      date: '05/03/2022',
    },
  ];

  return (
    <Container>
      <Header>
        <UserWrapper>
          <UserInfo>
            <Photo
              source={{
                uri: 'https://avatars.githubusercontent.com/u/54038618?v=4',
              }}
            />
            <User>
              <UserGreeting>Olá,</UserGreeting>
              <UserName>Alex</UserName>
            </User>
          </UserInfo>

          <Icon name='power' />
        </UserWrapper>
      </Header>

      <HighlightCards>
        <HighlightCard
          type='up'
          title='Entradas'
          amount='R$ 17.400,40'
          lastTransaction='Última entrada dia 29 de março'
        />
        <HighlightCard
          type='down'
          title='Saídas'
          amount='R$ 1.259,00'
          lastTransaction='Última entrada dia 20 de março'
        />
        <HighlightCard
          type='total'
          title='Total'
          amount='R$ 16.141,00'
          lastTransaction='01 à 29 de março'
        />
      </HighlightCards>

      <Transactions>
        <Title>Listagem</Title>

        <TransactionList
          data={data}
          renderItem={({ item }) => <TransactionCard data={item} />}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: getBottomSpace(),
          }}
        />
      </Transactions>
    </Container>
  );
}
