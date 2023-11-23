import dotenv from 'dotenv';
dotenv.config();

export const PORT = process.env.PORT || 3000;
export const SENDBIRD_APP_ID = process.env.SENDBIRD_APP_ID || '';
export const SENDBIRD_API_TOKEN = process.env.SENDBIRD_API_TOKEN || '';