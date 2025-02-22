import { Content } from '../../layout/Content/Content.tsx';

export const Logout = () => {
  return (
    <Content title={'Zostałeś wylogowany'}>
      <div className='logout'>
        <h3>Dziękujemy, że skorzystałeś z naszej biblioteki!</h3>
        <p>Mamy nadzieję, że odwiedzisz nas ponownie.</p>
      </div>
    </Content>
  );
};
