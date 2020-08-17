<?php
/**
 * @package Admin
 */

class Lazy_Load_For_Videos_Editor {

	function __construct() {
		if (!function_exists('register_block_type')) {
			// Gutenberg isn't supported
			return;
		}

		add_action( 'enqueue_block_editor_assets', array( $this, 'enqueue' ) );
	}

	function enqueue() {
		wp_enqueue_script(
			'lazyload-editor-js',
			LL_URL . 'assets/js/editor.js',
			[ 'wp-blocks', 'wp-element', 'wp-editor', 'wp-components', 'lodash' ],
			SCRIPT_DEBUG ? null : LL_VERSION
		);
	}
}

new Lazy_Load_For_Videos_Editor();

// function ree_youtube_player( $block_content, $block ) {
// 	if( "core-embed/youtube" === $block['blockName'] ) {
// 	  $not_embedded = $block['attrs']['url'];
// 	  $block_content = str_replace( $not_embedded, wp_oembed_get($not_embedded), $block_content );
// 	}
// 	return $not_embedded;
//   }
//   add_filter( 'render_block', 'ree_youtube_player', 10, 3);