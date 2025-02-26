import { useState } from 'react';

import { Card, Select, Spin } from 'antd';
import './StatsMonthCard.scss';
import { useGetQuery } from '../../../hooks/useGetQuery.ts';
import { RentsCountResponse } from '../../../types/rents-count-response.interface.ts';

export const StatsMonthCard = () => {
  const currentYear = new Date().getFullYear();
  const [year, setYear] = useState<number>(currentYear);
  const [month, setMonth] = useState<number>(new Date().getMonth() + 1);
  const { data, isLoading } = useGetQuery<RentsCountResponse>(
    `stats/month/${year}/${month}`
  );

  const years = Array.from({ length: 10 }, (_, index) => currentYear - index);
  const months = [
    'Styczeń',
    'Luty',
    'Marzec',
    'Kwiecień',
    'Maj',
    'Czerwiec',
    'Lipiec',
    'Sierpień',
    'Wrzesień',
    'Październik',
    'Listopad',
    'Grudzień',
  ];

  return (
    <Card title={'Ilość wypożyczeń w danym miesiącu'} style={{ minWidth: 350 }}>
      <div className={'stats-month'}>
        <div className={'select-container'}>
          <Select
            placeholder='Wybierz miesiąc'
            style={{ width: 150 }}
            defaultValue={month}
            onChange={(value) => setMonth(value)}
          >
            {months.map((month, index) => (
              <Select.Option key={index} value={index + 1}>
                {month}
              </Select.Option>
            ))}
          </Select>
          <Select
            placeholder='Wybierz rok'
            style={{ width: 150 }}
            defaultValue={year}
            onChange={(value) => setYear(value)}
          >
            {years.map((year) => (
              <Select.Option key={year} value={year}>
                {year}
              </Select.Option>
            ))}
          </Select>
        </div>
        <div className={'stats-month-total'}>
          {isLoading ? <Spin /> : data?.rentsCount}
        </div>
      </div>
    </Card>
  );
};
