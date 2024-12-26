import { createHmac } from 'node:crypto';

interface IGenerateSignature {
  header: string;
  payload: string;
  secret: string;
}

export function generateSignature({ header, payload, secret }: IGenerateSignature) {
  const hmac = createHmac('sha256', secret);
  
  const signature = hmac
    .update(`${header}.${payload}`)
    .digest('base64url');

  return signature;
}