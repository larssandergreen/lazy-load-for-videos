import '../shared/styles.scss';
import jQueryBindFirst from '../shared-utils/jQueryBindFirst';
import onReady from '../shared-utils/onReady';
import lazyloadYoutube from './lazyloadYoutube';

onReady(() => {
  jQueryBindFirst();
  lazyloadYoutube(window.llv_config.youtube);
});
