
import { GeneratedBin } from '../types';

export const generateLuhnDigit = (number: string): number => {
  let sum = 0;
  for (let i = 0; i < number.length; i++) {
    let digit = parseInt(number[i]);
    if ((number.length - i) % 2 !== 0) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
  }
  return (10 - (sum % 10)) % 10;
};

export const generateCardFromBin = (bin: string, customMonth?: string, customYear?: string): GeneratedBin => {
  let number = bin.replace(/\D/g, '').slice(0, 8);
  if (number.length < 8) number = number.padEnd(8, Math.floor(Math.random() * 10).toString());
  
  while (number.length < 15) {
    number += Math.floor(Math.random() * 10).toString();
  }
  
  number += generateLuhnDigit(number);

  const month = customMonth && customMonth !== 'random' 
    ? customMonth 
    : Math.floor(Math.random() * 12 + 1).toString().padStart(2, '0');
    
  const currentYear = new Date().getFullYear();
  const year = customYear && customYear !== 'random'
    ? (customYear.length === 4 ? customYear.slice(-2) : customYear)
    : (currentYear + Math.floor(Math.random() * 5 + 1)).toString().slice(-2);
    
  const cvv = Math.floor(Math.random() * 899 + 100).toString();
  
  let brand = 'Unknown';
  if (number.startsWith('4')) brand = 'Visa';
  else if (/^5[1-5]/.test(number)) brand = 'Mastercard';
  else if (/^3[47]/.test(number)) brand = 'Amex';
  else if (/^6(?:011|5)/.test(number)) brand = 'Discover';
  else if (/^(?:2131|1800|35)/.test(number)) brand = 'JCB';

  return {
    number,
    expiry: `${month}/${year}`,
    cvv,
    brand
  };
};
