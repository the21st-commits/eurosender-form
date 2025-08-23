(function(){
  const params = new URLSearchParams(window.location.search);
  const order = params.get('order');
  const tracking = order || Math.floor(100000 + Math.random() * 900000);
  const orderEl = document.getElementById('orderId');
  if(orderEl) orderEl.textContent = '#' + tracking;
  const yearEl = document.getElementById('year');
  if(yearEl) yearEl.textContent = new Date().getFullYear();
  const WHATSAPP_URL = 'https://wa.me/447412807758?text=' +
    encodeURIComponent('مرحباً، رقم تتبعي هو #' + tracking);
  const whatsappBtn = document.getElementById('whatsappBtn');
  if(whatsappBtn) whatsappBtn.href = WHATSAPP_URL;
  alert('سيتم تحويلك تلقائيًا إلى واتساب خلال دقيقتين للتواصل مع خدمة العملاء.');
  setTimeout(() => { window.location.href = WHATSAPP_URL; }, 120000);
})();
