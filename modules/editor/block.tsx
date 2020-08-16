/* eslint-disable import/no-extraneous-dependencies */
import { addFilter } from '@wordpress/hooks';
import { createHigherOrderComponent } from '@wordpress/compose';
import EmbedEdit, { EmbedEditProps } from './EmbedEdit';

type BlockEdit = (props: EmbedEditProps) => React.ReactElement;

// Based on https://github.com/WordPress/gutenberg/blob/master/packages/block-library/src/embed/*
const lazyLoadVideos = createHigherOrderComponent(
  (BlockEdit: BlockEdit) => (props: EmbedEditProps) => {
    const { name } = props;
    if (name === 'core-embed/youtube' || name === 'core-embed/vimeo') {
      // Custom styling
      return <EmbedEdit {...props} />;
    }
    // Default embed handling
    return <BlockEdit {...props} />;
  },
  'lazyLoadVideos',
);

addFilter('editor.BlockEdit', 'kw/lazy-load-videos', lazyLoadVideos);
