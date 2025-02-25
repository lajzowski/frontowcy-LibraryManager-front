import { LogAction } from './log-action.enum.ts';
import { BookInterface } from './book.interface.ts';
import { UserInterface } from './user.interface.ts';

export interface LogInterface {
  id: string;

  user: UserInterface | null;

  book: BookInterface | null;

  cardNumber: number;

  date: Date;
  action: LogAction;
}
