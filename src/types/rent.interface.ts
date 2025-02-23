import { BookInterface } from './book.interface.ts';
import { UserInterface } from './user.interface.ts';

export interface RentInterface {
  id: string;

  book: BookInterface;

  user: UserInterface;

  rentDate: Date;

  returnDate: Date | null;
}
