<?php
/**
 * @package Lazyload Vimeo
 */
class Lazy_Load_For_Videos_Vimeo {

	function __construct() {
		wp_enqueue_script( 'lazyload-vimeo-js', LL_URL . 'assets/js/lazyload-vimeo.js', null, SCRIPT_DEBUG ? null : LL_VERSION, true );
		wp_add_inline_script(
			'lazyload-vimeo-js',
			'window.llv_config=window.llv_config||{};window.llv_config.vimeo=' . json_encode($this->get_config()) . ';',
			'before'
		);
	}

	/**
	 * Lazy Load VIMEO Videos (Load vimeo script and video after clicking on the preview image)
	 * Lazy Load for Vimeo works with URLs that look like: [Any Path]/[Video ID]
	 * Examples:
	 * http://vimeo.com/channels/staffpicks/48851874
	 * http://vimeo.com/48851874
	 * http://vimeo.com/48851874/
	 */
	function get_config() {
		return apply_filters( 'llv_change_options', array(
			'buttonstyle'  => get_option( 'll_opt_button_style', '' ),
			'playercolour' => get_option( 'llv_opt_player_colour', '' ),
			'preroll'      => get_option( 'llv_opt_player_preroll', ''),
			'postroll'     => get_option( 'llv_opt_player_postroll', '' ),
			'show_title'   => get_option( 'llv_opt_title', false ) == true,
			'loadthumbnail'	 => $this->should_load_thumbnail(),
			'callback'     => '<!--VIMEO_CALLBACK-->'
		) );
	}

	function should_load_thumbnail() {
		$thumbnail = get_option('ll_opt_thumbnail_size');
		return $thumbnail == '' || $thumbnail == 'standard' || $thumbnail == 'cover';
	}

	/**
 	 * Callback
 	 * expects JavaScript code as string
 	 */
	function callback() {
		$js = apply_filters( 'llv_set_callback', '' );
		return $js;
	}

}
