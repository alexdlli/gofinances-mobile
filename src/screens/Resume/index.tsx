import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { HistoryCard } from '../../components/HistoryCard';
import { VictoryPie } from 'victory-native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

import { useTheme } from 'styled-components';

import {
  Container,
  Header,
  Title,
  Content,
  ChartContainer,
  MouthSelect,
  MouthSelectButton,
  MouthSelectIcon,
  Mouth,
} from './styles';
import { categories } from '../../utils/categories';
import { RFValue } from 'react-native-responsive-fontsize';

interface TransactionData {
  id: string;
  type: 'positive' | 'negative';
  name: string;
  amount: string;
  category: string;
  date: string;
}

interface CategoryDate {
  key: string;
  name: string;
  total: number;
  totalFormatted: string;
  color: string;
  percent: string;
}

export function Resume() {
  const [totalByCategories, setTotalByCategories] = useState<CategoryDate[]>(
    []
  );

  const theme = useTheme();

  async function LoadData() {
    const dataKey = '@gofinances:transactions';
    const response = await AsyncStorage.getItem(dataKey);
    const responseFormatted = response ? JSON.parse(response) : [];

    const expensives = responseFormatted.filter(
      (expensive: TransactionData) => expensive.type === 'negative'
    );

    const expensivesTotal = expensives.reduce(
      (accumulator: number, expensive: TransactionData) => {
        return accumulator + Number(expensive.amount);
      },
      0
    );

    const totalByCategory: CategoryDate[] = [];

    categories.forEach((category) => {
      let categorySum = 0;

      expensives.forEach((expensive: TransactionData) => {
        if (expensive.category === category.key) {
          categorySum += Number(expensive.amount);
        }
      });

      if (categorySum > 0) {
        const totalFormatted = categorySum.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        });

        const percent = `${((categorySum / expensivesTotal) * 100).toFixed(
          0
        )}%`;

        totalByCategory.push({
          key: category.key,
          name: category.name,
          color: category.color,
          total: categorySum,
          totalFormatted,
          percent,
        });
      }
    });

    setTotalByCategories(totalByCategory);
  }

  useEffect(() => {
    LoadData();
  }, []);

  return (
    <Container>
      <Header>
        <Title>Resumo por categoria</Title>
      </Header>

      <Content
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingBottom: useBottomTabBarHeight(),
        }}
      >
        <MouthSelect>
          <MouthSelectButton>
            <MouthSelectIcon name='chevron-left' />
          </MouthSelectButton>

          <Mouth>Março</Mouth>

          <MouthSelectButton>
            <MouthSelectIcon name='chevron-right' />
          </MouthSelectButton>
        </MouthSelect>

        <ChartContainer>
          <VictoryPie
            data={totalByCategories}
            colorScale={totalByCategories.map((category) => category.color)}
            style={{
              labels: {
                fontSize: RFValue(18),
                fontWeight: 'bold',
                fill: theme.colors.shape,
              },
            }}
            labelRadius={50}
            x='percent'
            y='total'
          />
        </ChartContainer>

        {totalByCategories.map((category) => (
          <HistoryCard
            key={category.key}
            title={category.name}
            amount={category.totalFormatted}
            color={category.color}
          />
        ))}
      </Content>
    </Container>
  );
}
