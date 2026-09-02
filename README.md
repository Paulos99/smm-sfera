# СММ СФЕРА

Сайт маркетингового агентства **СММ СФЕРА** (версия дизайнера Димы).

Архив предыдущего HTML-лендинга: [github.com/Paulos99/smm](https://github.com/Paulos99/smm)

## Локально

```bash
npm install
copy public\config.example.js public\config.js
npm run dev
```

Открыть [http://localhost:3000](http://localhost:3000)

Для проверки GitHub Pages локально:

```bash
set NEXT_PUBLIC_BASE_PATH=/smm-sfera
npm run build
npx serve out
```

## Публикация

GitHub Pages: **https://paulos99.github.io/smm-sfera/**

Форма заявок отправляет сообщение в Telegram. Скопируйте `public/config.example.js` в `public/config.js` (файл в git не попадает) и укажите `BOT_TOKEN` и `CHAT_ID`.
