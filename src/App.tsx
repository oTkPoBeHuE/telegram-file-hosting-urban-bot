import React, { useState } from 'react';
import fs from 'fs';
import { Image, Text, useImage } from '@urban-bot/core';

import { getTelegramFileUrl } from './api/getTelegramFile';
import { getTelegramFile } from './api/getTelegramFileUrl';



function ImageWatcher() {
    const [image, setImage] = useState<string | undefined>(undefined);

    useImage((data) => {
        setImage(data.files[0].id);

        data.files.forEach(async (data) => {
            if (data.id) {
                const telegramFileData = await getTelegramFile(process.env.TELEGRAM_TOKEN as string, data.id);
                const fileResult = await getTelegramFileUrl(
                    process.env.TELEGRAM_TOKEN as string,
                    telegramFileData.file_path,
                );

                const [_n, name] = telegramFileData.file_path.split('/');
                const fileStream = fs.createWriteStream(`./${name}`);
                fileResult.pipe(fileStream);
                fileResult.on('error', () => fileStream.close());
                fileStream.on('finish', () => fileStream.close());
            }
        });
    });

    if (!image) {
        return null;
    }

    return <Image title={'Image'} file={`${image}`} />;
}

export function App() {
    return (
        <>
            <Text>Hello. Send your Image</Text>
            <ImageWatcher />
        </>
    );
}
