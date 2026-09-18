import leadMail from '@/data/lead-mail.json';

export function leadInbox(): string {
  return String(leadMail.to || '').trim();
}

export function officialContactEmail(): string {
  return String(leadMail.official || 'smm.sfera@mail.ru').trim();
}

function formatLeadEmailFields(payload: {
  name: string;
  phone: string;
  company?: string;
  username?: string;
  message?: string;
}) {
  const time = new Intl.DateTimeFormat('ru-RU', {
    timeZone: 'Europe/Moscow',
    day: 'numeric',
    month: 'long',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date());

  return {
    _subject: `СММ СФЕРА: заявка — ${payload.name}`,
    _template: 'table',
    _captcha: 'false',
    Имя: payload.name,
    Телефон: payload.phone,
    Компания: payload.company || '—',
    'Telegram/VK': payload.username || '—',
    Задача: payload.message || '—',
    Согласие: 'получено',
    Источник: 'сайт СММ СФЕРА',
    Время: `${time} МСК`,
  };
}

/** Same path as Eslavia: FormSubmit → inbox (works on static GitHub Pages). */
export async function submitLead(payload: {
  name: string;
  phone: string;
  company?: string;
  username?: string;
  message?: string;
}): Promise<{ ok: boolean; error?: string }> {
  const to = leadInbox();
  if (!to) {
    return { ok: false, error: 'Не удалось отправить заявку' };
  }

  try {
    const fields = formatLeadEmailFields(payload);
    const res = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(to)}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(fields),
    });
    const data = (await res.json().catch(() => ({}))) as {
      success?: boolean | string;
      message?: string;
    };
    if (data.success === true || data.success === 'true') return { ok: true };
    const message = String(data.message || '').toLowerCase();
    if (message.includes('activation')) {
      return {
        ok: true,
        error: 'На почту штаба ушло письмо Activate от FormSubmit — откройте smm.sfera@mail.ru и подтвердите форму.',
      };
    }
    if (res.status === 429 || message.includes('rate limit')) {
      return { ok: false, error: 'Слишком много попыток. Подождите 10–15 минут и отправьте ещё раз.' };
    }
    if (!res.ok) {
      return { ok: false, error: 'Не удалось отправить заявку. Проверьте Activate на smm.sfera@mail.ru.' };
    }
    return { ok: false, error: 'Не удалось отправить заявку' };
  } catch {
    return { ok: false, error: 'Не удалось отправить заявку. Проверьте интернет и попробуйте снова.' };
  }
}
