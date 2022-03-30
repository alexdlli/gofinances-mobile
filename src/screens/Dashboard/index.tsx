import React from 'react';
import { HighlightCard } from '../../components/HighlightCard';
import {
  TransactionCard,
  TransactionCardProps,
} from '../../components/TransactionCard';

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

export interface DataListProps extends TransactionCardProps {
  id: string;
}

export function Dashboard() {
  const data: DataListProps[] = [
    {
      id: '1',
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
      id: '2',
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
      id: '3',
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
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <TransactionCard data={item} />}
        />
      </Transactions>
    </Container>
  );
}
