(function(){
  const params = new URLSearchParams(window.location.search);
  const order = params.get('order');
  // Generate tracking ID when order parameter is missing or invalid
  const tracking = (order && order !== 'undefined')
    ? order
    : Math.floor(100000 + Math.random()*900000);
  const orderEl = document.getElementById('orderId');
  if(orderEl) orderEl.textContent = '#' + tracking;
  const yearEl = document.getElementById('year');
  if(yearEl) yearEl.textContent = new Date().getFullYear();
  window.open('https://wa.me/message/I77OHUE4I7XSF1','_blank');
})();
