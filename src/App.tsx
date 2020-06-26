import React, { useState } from 'react';
import fs from 'fs';
import { Image, Text, useImage } from '@urban-bot/core';

import { getTelegramFileUrl } from './api/getTelegramFile';
import { getTelegramFile } from './api/getTelegramFileUrl';

function ImageWatcher() {
    const [image, setImage] = useState<string | undefined>(undefined);
    //
    // const addRobot = () => {
    //     setTitle(title + '🤖');
    // };

    useImage((data) => {
        console.log('data', data);
        console.log('nativeEvent photo:', data.nativeEvent.payload.photo);
        setImage(data.files[0].id);

        data.files.forEach(async (data) => {
            console.log(data.name);
            const telegramFileData = await getTelegramFile(process.env.TELEGRAM_TOKEN as string, data.id as string);
            const fileResult = await getTelegramFileUrl(
                process.env.TELEGRAM_TOKEN as string,
                telegramFileData.file_path,
            );
            const [_n, name] = telegramFileData.file_path.split('/');
            const fileStream = fs.createWriteStream(`./${name}`);
            fileResult.pipe(fileStream);
            fileResult.on('error', () => {
                fileStream.close();
            });
            fileStream.on('finish', function () {
                fileStream.close();
            });
        });
    });

    if (!image) {
        return <Text>Image</Text>;
    }

    return <Image title={'Картинка'} file={`${image}`} />;
}

export function App() {
    return (
        <>
            <Text>Hello. Send your Image</Text>
            <ImageWatcher />
        </>
    );
}
