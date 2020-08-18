// eslint-disable-next-line import/no-extraneous-dependencies
import { addFilter } from '@wordpress/hooks';
// eslint-disable-next-line import/no-extraneous-dependencies
import { createHigherOrderComponent } from '@wordpress/compose';
import EmbedEdit, { EmbedEditProps } from './EmbedEdit';

type BlockEdit = (props: EmbedEditProps) => React.ReactElement;

const lazyLoadVideos = createHigherOrderComponent(
  (BlockEdit: BlockEdit) => (props: EmbedEditProps) => {
    const { name } = props;
    if (name === 'core-embed/youtube' || name === 'core-embed/vimeo') {
      // Custom styling and loading
      return <EmbedEdit {...props} />;
    }
    // Default embed handling
    return <BlockEdit {...props} />;
  },
  'lazyLoadVideos',
);

addFilter('editor.BlockEdit', 'kw/lazy-load-videos', lazyLoadVideos);
