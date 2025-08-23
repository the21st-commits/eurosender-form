(function(){
  const $ = id => document.getElementById(id);
  const form = $('otpForm');
  const otp = $('otp');
  const loading = $('loading');
  const confirmation = $('confirmation');
  const orderIdEl = $('orderId');
  const verifyBtn = $('verifyBtn');
  const yearEl = document.querySelector('#year');
  if(yearEl) yearEl.textContent = new Date().getFullYear();

  form.addEventListener('submit', function(e){
    e.preventDefault();
    if(!otp.value.trim()) return;
    loading.style.display='block';
    verifyBtn.disabled=true;
    setTimeout(function(){
      loading.style.display='none';
      form.style.display='none';
      confirmation.style.display='block';
      orderIdEl.textContent = '#' + Math.floor(100000 + Math.random()*900000);
    }, 1200);
  });
})();
