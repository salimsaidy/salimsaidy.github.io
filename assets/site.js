'use strict';

const menu = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
if (menu && navigation) {
  menu.addEventListener('click', () => {
    const expanded = menu.getAttribute('aria-expanded') === 'true';
    menu.setAttribute('aria-expanded', String(!expanded));
    navigation.classList.toggle('is-open', !expanded);
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') {
      menu.setAttribute('aria-expanded', 'false');
      navigation.classList.remove('is-open');
      menu.focus();
    }
  });
}

const search = document.querySelector('#publication-search');
if (search) {
  const papers = [...document.querySelectorAll('[data-publication]')];
  const topics = [...document.querySelectorAll('input[name="topic"]')];
  const count = document.querySelector('#publication-count');
  const empty = document.querySelector('#no-publications');
  const updatePublications = () => {
    const query = search.value.toLocaleLowerCase().trim();
    const selected = topics.find(input => input.checked)?.value || 'all';
    let visible = 0;
    for (const paper of papers) {
      const matches = (selected === 'all' || paper.dataset.topic === selected) &&
        paper.dataset.search.includes(query);
      paper.hidden = !matches;
      if (matches) visible++;
    }
    count.textContent = `${visible} publication${visible === 1 ? '' : 's'}${query || selected !== 'all' ? ' matching your selection' : ' · 5 journal articles and 3 book chapters'}`;
    empty.hidden = visible !== 0;
  };
  search.addEventListener('input', updatePublications);
  topics.forEach(input => input.addEventListener('change', updatePublications));
}

// Preserve the existing portfolio's Analytics connection on GitHub Pages.
// Preview sessions never send visitor events to the production property.
if (location.hostname.endsWith('.github.io')) {
  window.dataLayer = window.dataLayer || [];
  window.gtag = function () { window.dataLayer.push(arguments); };
  window.gtag('js', new Date());
  window.gtag('config', 'G-5VKQJWN3JM');
  const tag = document.createElement('script');
  tag.async = true;
  tag.src = 'https://www.googletagmanager.com/gtag/js?id=G-5VKQJWN3JM';
  document.head.append(tag);
}
