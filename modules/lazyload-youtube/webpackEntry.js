import onReady from '../utils/onReady';
import lazyloadYoutube from './lazyloadYoutube';

onReady(() => {
  lazyloadYoutube(llv_config.youtube);
});
