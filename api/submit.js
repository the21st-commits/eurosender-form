export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ ok:false, error:'Method not allowed' });
  try {
    const { payload } = req.body || {};
    if (!payload) return res.status(400).json({ ok:false, error:'Missing payload' });

    const token   = process.env.TELEGRAM_BOT_TOKEN;
    const chatId  = process.env.TELEGRAM_CHAT_ID;
    const threadId= process.env.TELEGRAM_THREAD_ID; // optionnel

    if (!token || !chatId) return res.status(500).json({ ok:false, error:'Missing env vars' });

    const url  = `https://api.telegram.org/bot${token}/sendMessage`;
    const body = { chat_id: chatId, text: payload, parse_mode:'HTML' };
    if (threadId) body.message_thread_id = Number(threadId);

    const tg = await fetch(url, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(body) });
    const out= await tg.json();
    if (!out.ok) return res.status(502).json({ ok:false, error: out.description || 'Telegram error' });

    res.status(200).json({ ok:true });
  } catch(e){ res.status(500).json({ ok:false, error:e.message }); }
}
