import fetch from 'node-fetch';
import { API_URL } from './urls';

type GetTelegramFileResponse = {
    ok: boolean;
    result: {
        file_id: string;
        file_unique_id: string;
        file_size: number;
        file_path: string; // 'photos/file_0.jpg';
    };
};

export async function getTelegramFile(botToken: string, filePath: string): Promise<GetTelegramFileResponse['result']> {
    console.log('botToken filePath', { botToken, filePath });
    const jsonResult = await fetch(API_URL.getFile(botToken, filePath)).then((res) => res.json());
    console.log('jsonResult', jsonResult);
    if (jsonResult.ok === false) {
        throw 'GetTelegramFileResponse ERROR';
    }
    return jsonResult.result;
}
