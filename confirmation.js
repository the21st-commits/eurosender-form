(function(){
  const params = new URLSearchParams(window.location.search);
  const orderId = params.get('order') || '';
  const orderEl = document.getElementById('orderId');
  if(orderEl) orderEl.textContent = orderId;
  const yearEl = document.getElementById('year');
  if(yearEl) yearEl.textContent = new Date().getFullYear();
  window.open('https://wa.me/message/I77OHUE4I7XSF1','_blank');
})();
