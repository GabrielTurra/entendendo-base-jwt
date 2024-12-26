import { generateSignature } from './generateSignature';

interface ISignOptions {
  data: Record<string, any>;
  exp: number;
  secret: string;
}

export function sign({ data, exp, secret }: ISignOptions) {
  const header = {
    alg: 'HS256',
    typ: 'JWT'
  };

  const payload = {
    ...data,
    iat: Date.now(),
    exp: exp
  };

  const Base64EncodedHeader = Buffer
    .from(JSON.stringify(header))
    .toString('base64url');

  const Base64EncodedPayload = Buffer
    .from(JSON.stringify(payload))
    .toString('base64url');

  const signature = generateSignature({
    header: Base64EncodedHeader, 
    payload: Base64EncodedPayload, 
    secret,
  });

  return `${Base64EncodedHeader}.${Base64EncodedPayload}.${signature}`;
}
