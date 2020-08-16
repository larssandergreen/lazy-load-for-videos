import onReady from '../utils/onReady';
import lazyloadVimeo from './lazyloadVimeo';

onReady(() => {
  lazyloadVimeo(window.llv_config.vimeo);
});
