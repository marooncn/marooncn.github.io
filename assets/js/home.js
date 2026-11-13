// 主页配图点击放大：点击任意配图打开原图，点击遮罩或按 Esc 关闭
(function () {
  function close() {
    var box = document.querySelector('.lightbox');
    if (box) box.remove();
    document.removeEventListener('keydown', onKey);
  }
  function onKey(e) { if (e.key === 'Escape') close(); }

  document.addEventListener('click', function (e) {
    var img = e.target.closest('.media img');
    if (!img) return;
    var box = document.createElement('div');
    box.className = 'lightbox';
    var big = document.createElement('img');
    big.src = img.currentSrc || img.src;
    big.alt = img.alt;
    box.appendChild(big);
    var cap = img.closest('figure') && img.closest('figure').querySelector('figcaption');
    if (cap) {
      var p = document.createElement('p');
      p.textContent = cap.textContent;
      box.appendChild(p);
    }
    box.addEventListener('click', close);
    document.addEventListener('keydown', onKey);
    document.body.appendChild(box);
  });
})();
