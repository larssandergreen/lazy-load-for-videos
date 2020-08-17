import '../shared/styles.scss';
import jQueryBindFirst from '../shared-utils/jQueryBindFirst';
import onReady from '../shared-utils/onReady';
import lazyloadVimeo from './lazyloadVimeo';

onReady(() => {
  jQueryBindFirst();
  lazyloadVimeo(window.llv_config.vimeo);
});
