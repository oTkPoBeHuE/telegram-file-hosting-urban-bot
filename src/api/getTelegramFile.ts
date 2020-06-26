import fetch from 'node-fetch';
import { API_URL } from './urls';

export async function getTelegramFileUrl(botToken: string, fileId: string) {
    const response = await fetch(API_URL.getUrl(botToken, fileId));
    return response.body;
}
