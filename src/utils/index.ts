import { SHA256, enc } from 'crypto-js';

const SECRET = import.meta.env.VITE_SECRET_KEY;

export function generateChecksum(requestData?: any) {
  let str = SECRET;
  if (requestData) {
    str += JSON.stringify(requestData);
  } else {
    str += '{}';
  }
  return SHA256(str).toString(enc.Hex);
}

export function format(value: any) {
  const formattedValue = Math.round(Number(value) * 100) / 100;
  return formattedValue.toLocaleString();
}

export function isNumber(value: any) {
  return isNaN(Number(value));
}

export function isEmpty(value: any) {
  return value === '' || value === undefined || value === null;
}
