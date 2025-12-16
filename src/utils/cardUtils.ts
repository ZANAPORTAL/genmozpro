export const luhnCheck = (num: string): boolean => {
  const arr = (num + '')
    .split('')
    .reverse()
    .map((x) => parseInt(x));
  const lastDigit = arr.splice(0, 1)[0];
  let sum = arr.reduce(
    (acc, val, i) =>
      i % 2 !== 0 ? acc + val : acc + ((val * 2) % 9) || 9,
    0
  );
  sum += lastDigit;
  return sum % 10 === 0;
};

export const generateCard = (bin: string): string => {
  let card = bin;
  // Standard length 16 for most, but simple logic: fill to 15, calc checksum
  while (card.length < 15) {
    card += Math.floor(Math.random() * 10);
  }

  const arr = card
    .split('')
    .reverse()
    .map((x) => parseInt(x));
  const sum = arr.reduce(
    (acc, val, i) =>
      i % 2 === 0 ? acc + val : acc + ((val * 2) % 9) || 9,
    0
  );
  const checkDigit = (10 - (sum % 10)) % 10;
  
  return card + checkDigit;
};

export const generateExpiry = (fixedMonth?: string, fixedYear?: string): string => {
  const month = fixedMonth && fixedMonth !== 'Random' 
    ? fixedMonth 
    : (Math.floor(Math.random() * 12) + 1).toString().padStart(2, '0');
    
  const year = fixedYear && fixedYear !== 'Random'
    ? fixedYear
    : (new Date().getFullYear() + Math.floor(Math.random() * 5) + 1).toString();
    
  return `${month}|${year}`;
};

export const generateCVV = (): string => {
  return Math.floor(Math.random() * 900 + 100).toString();
};

export const identifyCardType = (number: string): string => {
  if (/^4/.test(number)) return "Visa";
  if (/^5[1-5]/.test(number)) return "Mastercard";
  if (/^3[47]/.test(number)) return "Amex";
  if (/^6/.test(number)) return "Discover";
  return "Desconhecido";
};
