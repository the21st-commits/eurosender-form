(function(){
  const $ = id => document.getElementById(id);
  const orderEl = $('orderId');
  const whatsappBtn = $('whatsappBtn');
  const yearEl = document.querySelector('#year');
  const WHATSAPP_URL = 'https://wa.me/message/I77OHUE4I7XSF1';
  const params = new URLSearchParams(window.location.search);
  const order = params.get('order');
  if(orderEl && order) orderEl.textContent = '#' + order;
  if(whatsappBtn) whatsappBtn.href = WHATSAPP_URL;
  if(yearEl) yearEl.textContent = new Date().getFullYear();
  alert('للتأكيد أو المساعدة تواصل معنا عبر واتساب');
  window.open(WHATSAPP_URL, '_blank');
})();
