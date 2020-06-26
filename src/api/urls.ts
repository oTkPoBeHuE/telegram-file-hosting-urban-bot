export const API_URL = {
    getFile: (botToken: string, fileId: string) => `https://api.telegram.org/bot${botToken}/getFile?file_id=${fileId}`,
    getUrl: (botToken: string, filePath: string) => `https://api.telegram.org/file/bot${botToken}/${filePath}`,
};
