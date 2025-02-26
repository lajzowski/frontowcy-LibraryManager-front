import { Card, Spin } from 'antd';

import './StatsReturnCard.scss';
import { useGetQuery } from '../../../hooks/useGetQuery.ts';
import { useEffect, useState } from 'react';
import { ReturnCountResponse } from '../../../types/return-count-response.interface.ts';
export const StatsReturnCard = () => {
  const { data, isLoading } = useGetQuery<ReturnCountResponse>(`stats/return`);
  const [returnCount, setReturnCount] = useState<number>(0);
  const [delayedReturnCount, setDelayedReturnCount] = useState<number>(0);

  useEffect(() => {
    if (data) {
      setReturnCount(data.returnCount);
      setDelayedReturnCount(data.returnDelayedCount);
    }
  }, [data]);

  return (
    <Card title={'Statystyki zwrotów'} style={{ minWidth: 350 }}>
      <div className={'stats-return'}>
        <div className={'stats-return-total'}>
          <div className={'label'}>Zwróconych w terminie:</div>
          <div className={'count'}>{isLoading ? <Spin /> : returnCount}</div>
        </div>

        <div className={'stats-return-total'}>
          <div className={'label'}>Zwróconych po terminie:</div>
          <div className={'count'}>
            {isLoading ? <Spin /> : delayedReturnCount}
          </div>
        </div>
      </div>
    </Card>
  );
};
