// Blog 交互：文章目录、标题锚点、代码复制、回到顶部
(function () {
  'use strict';
  const content = document.querySelector('.post-content');

  // ---------- 标题锚点 + 目录（基于 h2/h3 生成） ----------
  if (content) {
    const headings = Array.from(content.querySelectorAll('h2, h3'));
    headings.forEach((h, i) => {
      if (!h.id) h.id = 'section-' + i;
      const a = document.createElement('a');
      a.className = 'anchor';
      a.href = '#' + encodeURIComponent(h.id);
      a.setAttribute('aria-hidden', 'true');
      a.textContent = '#';
      h.prepend(a);
    });

    const toc = document.getElementById('toc');
    if (toc && headings.length >= 2) {
      const top = document.createElement('ul');
      let currentSub = null;
      headings.forEach((h) => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = '#' + encodeURIComponent(h.id);
        // 去掉锚点 "#" 后的标题文本
        a.textContent = h.textContent.replace(/^#/, '').trim();
        li.appendChild(a);
        if (h.tagName === 'H3' && top.lastElementChild) {
          if (!currentSub) {
            currentSub = document.createElement('ul');
            top.lastElementChild.appendChild(currentSub);
          }
          currentSub.appendChild(li);
        } else {
          top.appendChild(li);
          currentSub = null;
        }
      });
      toc.querySelector('.inner').appendChild(top);
      toc.hidden = false;
    }

    // ---------- 代码块复制按钮 ----------
    content.querySelectorAll('div.highlight').forEach((block) => {
      const btn = document.createElement('button');
      btn.className = 'copy-code';
      btn.textContent = 'copy';
      btn.addEventListener('click', async () => {
        const code = block.querySelector('code');
        try {
          await navigator.clipboard.writeText(code ? code.innerText : block.innerText);
          btn.textContent = 'copied!';
        } catch (e) {
          btn.textContent = 'failed';
        }
        setTimeout(() => { btn.textContent = 'copy'; }, 2000);
      });
      block.appendChild(btn);
    });
  }

  // ---------- 回到顶部 ----------
  const topLink = document.getElementById('top-link');
  if (topLink) {
    const onScroll = () => {
      topLink.classList.toggle('visible', window.scrollY > 800);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

})();
