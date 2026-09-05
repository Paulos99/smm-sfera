# Web Legal & Compliance Report

## Project

Лендинг маркетингового агентства СММ СФЕРА (версия дизайнера Димы).  
Стек: Next.js static export, GitHub Pages `https://paulos99.github.io/smm-sfera/`.  
Канонический домен: `https://smmsfera.ru`.  
Форма заявки (имя, телефон, опционально компания / Telegram / задача) → mailto. Политики: `/policies`.

WEB PROJECT: да.

## Audit date

2026-09-05

Проверка норм, зависящих от актуального законодательства: 2026-09-05.  
Ориентиры: ст. 22 Федерального закона от 27.07.2006 № 152-ФЗ; формы уведомлений — приказ Роскомнадзора от 28.10.2022 № 180.

Технический compliance-аудит обновлён по решениям клиента. Юридическая проверка требуется для пунктов LEGAL_REVIEW_REQUIRED / OPEN.

**Status:** READY_WITH_WARNINGS

Это не юридическое заключение.

## Сделано (2026-09-05)

- Канонические контакты на лендинге и в политиках: +7 (996) 026-35-09, smmsfera@mail.ru; офис Шереметевский пр-т, 1.
- Старые телефоны/почты (+79109980000, +7 (920) 365-61-33, smmsfera2026@mail.ru) и primary info@chinaprobiz.ru убраны с контактных поверхностей.
- Политика/согласие выровнены под общую политику оператора для smmsfera.ru: без GetCourse UI, без cookie-баннера «Принять», без рекламной рассылки, без Метрики/пикселей/оплаты на этом лендинге; без нейрошкола-claims.
- Форма: mailto на smmsfera@mail.ru; Telegram bot config убран из layout; secrets в public не кладём.
- Hiring CTA «Стать частью спецагентства» удалён.
- Чекбокс согласия — только обработка ПД (не реклама); submit неактивен без согласия.
- Нет аналитики, платёжного шлюза, cookie-баннера на лендинге.

## РКН

Статус записи оператора: **UNKNOWN / verification pending** (клиент сверяет). См. `RKN_CHANGES.md`. ОГРНИП в текстах не выдуман — оставлен из прежних документов, сверка ожидается.

## Issues

LC-001  
Risk: HIGH  
Category: Personal Data / RKN  
Issue: Не подтверждена карточка оператора в реестре РКН.  
Action: Клиент ищет себя по ФИО в реестре и присылает карточку / номер.  
Owner: Client + Legal  
Status: OPEN  
Required before production: YES

LC-002  
Risk: MEDIUM  
Category: Contacts  
Issue: Канонические контакты подтверждены клиентом и применены.  
Status: RESOLVED (2026-09-05)

LC-003  
Risk: HIGH  
Category: Document consistency  
Issue: Политика/согласие переписаны под фактический лендинг + общую политику smmsfera.ru без ложных механизмов.  
Status: RESOLVED technically (2026-09-05) — рекомендуется LEGAL_REVIEW  
LEGAL_REVIEW_REQUIRED

LC-004  
Risk: HIGH  
Category: Personal Data  
Issue: Telegram-токен в public больше не используется; lead path = mailto.  
Status: RESOLVED (2026-09-05)

LC-005  
Risk: MEDIUM  
Category: IP  
Issue: Шрифты Impact и Argent CF. Лицензия на веб-встраивание не подтверждена.  
Action: Юрист / дизайнер подтверждают лицензии.  
Owner: Legal  
Status: OPEN  
LEGAL_REVIEW_REQUIRED

## До публикации

1. Подтвердить РКН (карточка / уведомление) — OPEN.
2. Сверить ОГРНИП — OPEN (не менять без подтверждения).
3. Подтвердить лицензии шрифтов — OPEN.
4. Желательна финальная юр. вычитка privacy/consent.
