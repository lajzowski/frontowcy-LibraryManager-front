/** Funkcja zamienia polskie znaki oraz spacje na "-". Opcjonalnie na końcu dodaje.html **/
export const generateFriendlyURL = (
  inputString: string,
  withHTML: boolean = false
): string => {
  const polishToEnglishMap: Record<string, string> = {
    ą: 'a',
    ć: 'c',
    ę: 'e',
    ł: 'l',
    ń: 'n',
    ó: 'o',
    ś: 's',
    ź: 'z',
    ż: 'z',
  };

  const sanitizedString = inputString
    .normalize('NFD')
    .replace(/[ąćęłńóśźż]/g, (char) => polishToEnglishMap[char] || '')
    .replace(/\s+/g, '-')
    .replace(/[^a-zA-Z0-9-]/g, '')
    .toLowerCase();

  return withHTML ? `${sanitizedString}.html` : sanitizedString;
};
