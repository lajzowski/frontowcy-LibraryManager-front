import { describe, expect } from 'vitest';
import { RegCompleted } from './RegCompleted.tsx';
import { UserInterface } from '../../types/user.interface.ts';
import { BrowserRouter } from 'react-router';
import { render } from '@testing-library/react';

describe('RegCompleted', () => {
  const sampleUserData: UserInterface = {
    cardNumber: 2222222222,
    firstname: 'Leon',
    lastname: 'Kowalski',
    email: 'kowalski@kowalskitest.pl',
    rule: 'u0',
    id: 'id_string',
    token: 'token_string',
  };

  it('renders the App component', () => {
    render(
      <BrowserRouter>
        <RegCompleted user={sampleUserData} />
      </BrowserRouter>
    );
  });

  it('visible text with cardNumber', () => {
    const reg = render(
      <BrowserRouter>
        <RegCompleted user={sampleUserData} />
      </BrowserRouter>
    );

    expect(reg.container.querySelector('.card-number')).toHaveTextContent(
      new RegExp(sampleUserData.cardNumber.toString())
    );
  });
});
