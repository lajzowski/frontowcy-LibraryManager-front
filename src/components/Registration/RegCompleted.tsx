import { UserI } from '../../types/user.interface.ts';
import { Link } from 'react-router';

interface Props {
  user: UserI;
}

export const RegCompleted = ({ user }: Props) => {
  return (
    <div className='registration-completed'>
      <h3 className='heading'>Dziękujemy za rejestrację!</h3>
      <p className='card-number'>
        Numer Twojej karty: <span>{user.cardNumber}</span>
      </p>
      <p className='important-note'>
        <strong>Zapamiętaj numer karty. Będzie wymagany do logowania!</strong>
      </p>
      <p className='login-link'>
        Możesz teraz przejść na stronę <Link to='/login'>logowania</Link>.
      </p>
    </div>
  );
};
