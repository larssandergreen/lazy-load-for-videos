import onReady from '../utils/onReady';
import lazyloadVimeo from './lazyloadVimeo';

onReady(() => {
  lazyloadVimeo(llv_config.vimeo);
});
