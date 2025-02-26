import { Content } from '../../layout/Content/Content.tsx';
import { StatsMonthCard } from '../addons/StatsMonthCard/StatsMonthCard.tsx';
import './Stats.scss';
import { StatsReturnCard } from '../addons/StatsReturnCard/StatsReturnCard.tsx';
import { StatsCurrentCard } from '../addons/StatsCurrentCard/StatsCurrentCard.tsx';

export const Stats = () => {
  return (
    <Content title={'Statystyki'} subtitle={''}>
      <div className={'stats-container'}>
        <StatsMonthCard />
        <StatsReturnCard />
        <StatsCurrentCard />
      </div>
    </Content>
  );
};
/*
<p>Ilość wypożyczona: 0</p>
<p>Zwróconych w terminie: 0</p>
<p>Zwróconych po terminie: 0</p>*/
