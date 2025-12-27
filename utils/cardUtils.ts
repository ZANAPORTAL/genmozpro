
export const getCardType = (bin: string): string => {
  if (!bin) return 'Unknown';
  if (/^4/.test(bin)) return 'Visa';
  if (/^5[1-5]/.test(bin) || (/^2[2-7]/.test(bin) && bin.length >= 4 && parseInt(bin.slice(0, 4)) >= 2221 && parseInt(bin.slice(0, 4)) <= 2720)) return 'Mastercard';
  if (/^3[47]/.test(bin)) return 'Amex';
  if (/^6(?:011|5|4[4-9])/.test(bin)) return 'Discover';
  if (/^35(?:2[89]|[3-8][0-9])/.test(bin)) return 'JCB';
  if (/^(4011|4312|4389|4514|4573|4576|5041|5066|5090|6277|6362|6363|6500|6504|6505|6507|6509|6516|6550)/.test(bin)) return 'Elo';
  if (/^6062/.test(bin)) return 'Hipercard';
  return 'Credit Card';
};

export const luhnCheck = (num: string): boolean => {
  if (!num) return false;
  const arr = (num + '')
    .split('')
    .reverse()
    .map((x) => parseInt(x));
  if (arr.length < 13) return false;
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
  let card = bin.replace(/\s/g, '').replace(/x/gi, '');
  const targetLength = 15;
  while (card.length < targetLength) {
    card += Math.floor(Math.random() * 10);
  }
  const arr = card.split('').reverse().map((x) => parseInt(x));
  const sum = arr.reduce((acc, val, i) => i % 2 === 0 ? acc + val : acc + ((val * 2) % 9) || 9, 0);
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

export const generateCVV = (): string => Math.floor(Math.random() * 900 + 100).toString();
