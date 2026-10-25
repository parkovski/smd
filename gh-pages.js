import { publish } from 'gh-pages';

publish('build', {
  branch: 'gh-pages',
  dotfiles: true,
  history: false,
  nojekyll: true,
  cname: 'www.shadowmtndigital.com'
});
