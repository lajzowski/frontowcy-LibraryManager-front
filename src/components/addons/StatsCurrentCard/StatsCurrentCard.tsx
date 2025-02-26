import { useGetQuery } from '../../../hooks/useGetQuery.ts';
import { useEffect, useState } from 'react';
import { CurrentCountResponse } from '../../../types/current-count-response.interface.ts';
import { Card, Spin } from 'antd';

import './StatsCurrentCard.scss';

export const StatsCurrentCard = () => {
  const { data, isLoading } =
    useGetQuery<CurrentCountResponse>(`stats/current`);
  const [currentCount, setCurrentCount] = useState<number>(0);

  useEffect(() => {
    if (data) {
      setCurrentCount(data.currentCount);
    }
  }, [data]);

  return (
    <Card title={'Aktualnie Wypożyczonych'} style={{ minWidth: 350 }}>
      <div className={'stats-current'}>
        <div className={'current'}>{isLoading ? <Spin /> : currentCount}</div>
      </div>
    </Card>
  );
};
