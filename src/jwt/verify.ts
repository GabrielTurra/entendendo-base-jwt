import { generateSignature } from "./generateSignature";

interface IVerifyOptions {
  token: string;
  secret: string;
}

export function verify({ token, secret }: IVerifyOptions) {
  const [headerSent, payloadSent, signatureSent] = token.split('.');

  const signature = generateSignature({
    header: headerSent, 
    payload: payloadSent, 
    secret,
  });

  const isValidTokenSignature = signature === signatureSent;

  if(!isValidTokenSignature) {
    throw new Error('Invalid JWT token');
  }

  const decodedPayload = JSON.parse(
    Buffer
      .from(payloadSent, 'base64url')
      .toString('utf-8')
  );

  const isValidTokenTime = decodedPayload.exp > Date.now();

  if(!isValidTokenTime) {
    throw new Error('JWT token expired');
  }

  return decodedPayload;
}