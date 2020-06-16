import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import Title from './Title';

// Generate Sales Data
function createData(time, amount) {
  return { time, amount };
}

const data = [
  createData('Янв', 0),
  createData('Фев', 3),
  createData('Мар', 2),
  createData('Апр', 5),
  createData('Май', 12),
  createData('Июн', 1),
  createData('Июл', 9),
  createData('Авг', 3),
  createData('Сен', 1),
  createData('Окт', 4),
  createData('Ноя', 5),
  createData('Дек', undefined),

];

export default function Chart() {
  const theme = useTheme();

  return (
    <React.Fragment>
      <Title>Ваша статистика</Title>
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <XAxis dataKey="time" stroke={theme.palette.text.secondary} />
          <YAxis stroke={theme.palette.text.secondary}>
            <Label
              angle={270}
              position="left"
              style={{ textAnchor: 'middle', fill: theme.palette.text.primary }}
            >
              Найдено чел.
            </Label>
          </YAxis>
          <Line type="monotone" dataKey="amount" stroke={theme.palette.primary.main} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}