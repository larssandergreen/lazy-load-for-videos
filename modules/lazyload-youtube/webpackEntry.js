import onReady from '../utils/onReady';
import lazyloadYoutube from './lazyloadYoutube';

onReady(() => {
  lazyloadYoutube(window.llv_config.youtube);
});
