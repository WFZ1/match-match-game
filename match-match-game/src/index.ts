import Router from './components/router/router';

const main = document.createElement('main');

const router = new Router({
  mode: 'history',
  root: '/',
});

router
  .add('', () => {
    main.innerText = 'Welcome in about page!';
  })
  .add('score', () => {
    main.innerText = 'Welcome in best score page!';
  })
  .add('settings', () => {
    main.innerText = 'Welcome in game settings page!';
  });

const getContainEl = (
  target: HTMLElement,
  selector: string,
  container: HTMLElement,
) => {
  const el: HTMLLinkElement | null = target.closest(selector);
  return !el || !container.contains(el) ? 0 : el;
};

const header = document.createElement('header');
const nav = document.createElement('nav');
const ul = document.createElement('ul');

ul.addEventListener('click', (e): void => {
  e.preventDefault();
  const link: HTMLLinkElement | 0 = getContainEl(
    e.target as HTMLElement,
    'a',
    ul,
  );

  if (link) {
    const index = link.href.lastIndexOf('/') + 1;
    const pageName = link.href.slice(index);

    router.navigate(pageName);
  }
});

header.append(nav);
nav.append(ul);

const navLinkList = [
  {
    url: '/',
    text: 'About Game',
  },
  {
    url: 'score',
    text: 'Best Score',
  },
  {
    url: 'settings',
    text: 'Game Settings',
  },
];

navLinkList.forEach((obj) => {
  const li = document.createElement('li');
  const a = document.createElement('a');

  a.href = obj.url;
  a.innerText = obj.text;

  li.append(a);
  ul.append(li);
});

document.body.append(header);
document.body.append(main);
