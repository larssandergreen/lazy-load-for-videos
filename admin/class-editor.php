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
			'lazyload_editor_js',
			LL_URL . 'assets/js/editor.js',
			[ 'wp-blocks', 'wp-element', 'wp-editor', 'wp-components', 'lodash' ]
		);
	}
}

new Lazy_Load_For_Videos_Editor();
