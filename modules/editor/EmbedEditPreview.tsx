/* eslint-disable import/no-extraneous-dependencies */
import classnames from 'classnames';
import { __, sprintf } from '@wordpress/i18n';
import { Placeholder } from '@wordpress/components';
import { RichText, BlockIcon } from '@wordpress/block-editor';
import { createBlock } from '@wordpress/blocks';

export type EmbedEditPreviewProps = {
  preview: React.ReactElement;
  url: string;
  caption: string;
  onCaptionChange: Function;
  isSelected: boolean;
  className: string;
  icon: React.ReactElement | { foreground: string; src: React.ReactNode };
  label: string;
  insertBlocksAfter: Function;
};

export default function EmbedEditPreview({
  preview,
  url,
  caption,
  onCaptionChange,
  isSelected,
  className,
  icon,
  label,
  insertBlocksAfter,
}: EmbedEditPreviewProps) {
  const parsedHost = new URL(url).host.split('.');
  const parsedHostBaseUrl = parsedHost
    .splice(parsedHost.length - 2, parsedHost.length - 1)
    .join('.');

  return (
    <figure
      className={classnames(className, 'wp-block-embed', 'is-type-video')}
    >
      {preview || (
        <Placeholder icon={<BlockIcon icon={icon} showColors />} label={label}>
          <p className="components-placeholder__error">
            <a href={url}>{url}</a>
          </p>
          <p className="components-placeholder__error">
            {sprintf(
              /* translators: %s: host providing embed content e.g: www.youtube.com */
              __("Embedded content from %s can't be previewed in the editor."),
              parsedHostBaseUrl,
            )}
          </p>
        </Placeholder>
      )}
      {(!RichText.isEmpty(caption) || isSelected) && (
        <RichText
          tagName="figcaption"
          placeholder={__('Write caption…')}
          value={caption}
          onChange={onCaptionChange}
          inlineToolbar
          __unstableOnSplitAtEnd={() => insertBlocksAfter(createBlock('core/paragraph'))
          }
        />
      )}
    </figure>
  );
}
