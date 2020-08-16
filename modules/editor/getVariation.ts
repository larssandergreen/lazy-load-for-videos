/* eslint-disable import/no-extraneous-dependencies */
import { __, _x } from '@wordpress/i18n';
import { embedContentIcon, embedYouTubeIcon, embedVimeoIcon } from './icons';

export type ProviderName = 'youtube' | 'vimeo';

const variations = {
  youtube: {
    title: 'YouTube',
    icon: embedYouTubeIcon,
    keywords: [__('music'), __('video')],
    description: __('Embed a YouTube video.'),
    patterns: [
      /^https?:\/\/((m|www)\.)?youtube\.com\/.+/i,
      /^https?:\/\/youtu\.be\/.+/i,
    ],
    attributes: { providerNameSlug: 'youtube', responsive: true },
  },
  vimeo: {
    title: 'Vimeo',
    icon: embedVimeoIcon,
    keywords: [__('video')],
    description: __('Embed a Vimeo video.'),
    patterns: [/^https?:\/\/(www\.)?vimeo\.com\/.+/i],
    attributes: { providerNameSlug: 'vimeo', responsive: true },
  },
  default: {
    title: _x('Embed', 'block title'),
    icon: embedContentIcon,
  },
};

export default function getVariation(provider: ProviderName) {
  return variations[provider] || variations.default;
}
