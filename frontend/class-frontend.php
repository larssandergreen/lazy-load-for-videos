<?php
require_once( LL_PATH . 'admin/class-editor.php' );

/**
 * @package Frontend
 */
class Lazy_Load_For_Videos_Frontend {

	function __construct() {
		$should_load_scripts = apply_filters( 'lazyload_videos_should_scripts_be_loaded', $this->should_scripts_be_loaded());

		if ($should_load_scripts) {
			$this->initStyles();
			$this->initScripts();
		}
	}

	/**
	 * Don't load scripts in specific circumstances
	 */
	function should_scripts_be_loaded() {
		if (
			( get_option('ll_opt_load_scripts') != '1' ) ||	// Option "Only load CSS/JS when needed" is NOT checked
			( get_option('lly_opt_support_for_widgets') == true ) // Always load scripts if widgets need lazy load support (Youtube only)
		) {
			return true;
		}
		
		global $lazyload_videos_general;
		if (is_singular()) {
			$post_id = absint(get_the_ID());
			return $lazyload_videos_general->has_post_or_page_embed($post_id);
		}
		
		// For pages with multiple posts (e.g. homepage and archives),
		// iterate over all posts to see if any of them includes an embed.
		global $posts;
		if (is_array($posts)) {
			foreach($posts as $post) {
				$has_post_embed = $lazyload_videos_general->has_post_or_page_embed($post->ID);
				if ($has_post_embed) return true;
			};
		}

		return false;
	}

	function initScripts() {
		$isYoutubeEnabled = get_option('lly_opt') !== '1';
		$isVimeoEnabled = get_option('llv_opt') !== '1';

		if ($isYoutubeEnabled || $isVimeoEnabled) {
			wp_enqueue_script( 'lazyload-video-js', LL_URL . 'public/js/lazyload-shared.js', null, SCRIPT_DEBUG ? null : LL_VERSION, true );
		}

		if ($isYoutubeEnabled) {
			require_once( LL_PATH . 'frontend/class-youtube.php' );
			new Lazy_Load_For_Videos_Youtube();	
		}
		
		if ($isVimeoEnabled) {
			require_once( LL_PATH . 'frontend/class-vimeo.php' );
			new Lazy_Load_For_Videos_Vimeo();
		}
	}

	function initStyles() {
		wp_enqueue_style( 'lazyload-video-css', LL_URL . 'public/css/lazyload-shared.css', null, SCRIPT_DEBUG ? null : LL_VERSION );
		
		echo '<style type="text/css">';
		
		$this->load_lazyload_css_thumbnail_size();
		$this->load_lazyload_css_video_titles();
		$this->load_lazyload_css_button_style();
		$this->load_lazyload_css_custom();

		echo '</style>';
	}

	/**
	 * Add Custom CSS
	 */
	function load_lazyload_css_custom() {
		if (stripslashes(get_option('ll_opt_customcss')) != '') {
			echo stripslashes(get_option('ll_opt_customcss'));
		}
	}

	/**
	 * Add CSS for thumbnails
	 */
	function load_lazyload_css_thumbnail_size() {
		$thumbnail = get_option('ll_opt_thumbnail_size');
		$classlist = '.entry-content a.lazy-load-youtube, a.lazy-load-youtube, .lazy-load-vimeo';

		if ($thumbnail == 'standard') {
			echo $classlist . '{ background-size: contain; }';
		} else if ($thumbnail == 'pattern-dots') {
				echo $classlist . '{
					background-color: #000;
					background-image: radial-gradient(#333 15%, transparent 16%),
					radial-gradient(#333 15%, transparent 16%);
					background-size: 50px 50px;
				background-position: 0 0, 25px 25px;
				}';
			} else if ($thumbnail == 'pattern-light-s') {
				echo $classlist . '{
					background-color: #ccc;
					background-image:
					radial-gradient(circle at 100% 150%, #ccc 24%, white 25%, white 28%, #ccc 29%, #ccc 36%, white 36%, white 40%, transparent 40%, transparent),
					radial-gradient(circle at 0 150%, #ccc 24%, white 25%, white 28%, #ccc 29%, #ccc 36%, white 36%, white 40%, transparent 40%, transparent),
					radial-gradient(circle at 50% 100%, white 10%, #ccc 11%, #ccc 23%, white 24%, white 30%, #ccc 31%, #ccc 43%, white 44%, white 50%, #ccc 51%, #ccc 63%, white 64%, white 71%, transparent 71%, transparent),
					radial-gradient(circle at 100% 50%, white 5%, #ccc 6%, #ccc 15%, white 16%, white 20%, #ccc 21%, #ccc 30%, white 31%, white 35%, #ccc 36%, #ccc 45%, white 46%, white 49%, transparent 50%, transparent),
					radial-gradient(circle at 0 50%, white 5%, #ccc 6%, #ccc 15%, white 16%, white 20%, #ccc 21%, #ccc 30%, white 31%, white 35%, #ccc 36%, #ccc 45%, white 46%, white 49%, transparent 50%, transparent);
					background-size:100px 50px;
				}';
			} else if ($thumbnail == 'pattern-carbon') {
				echo $classlist . '{
					background:
					linear-gradient(27deg, #151515 5px, transparent 5px) 0 5px,
					linear-gradient(207deg, #151515 5px, transparent 5px) 10px 0px,
					linear-gradient(27deg, #222 5px, transparent 5px) 0px 10px,
					linear-gradient(207deg, #222 5px, transparent 5px) 10px 5px,
					linear-gradient(90deg, #1b1b1b 10px, transparent 10px),
					linear-gradient(#1d1d1d 25%, #1a1a1a 25%, #1a1a1a 50%, transparent 50%, transparent 75%, #242424 75%, #242424);
					background-color: #131313;
					background-size: 20px 20px;
				}';
			} else if ($thumbnail == 'none') {
				// No background, no thumbnail
			} else {
				echo $classlist . '{ background-size: cover; }';
			}
	}

	/**
	 * Add CSS to hide Video titles
	 */
	function load_lazyload_css_video_titles() {
		// Hide Youtube titles with CSS
		if ( get_option('lly_opt_title') == false ) {
			echo '.titletext.youtube { display: none; }';
		}
	}

	/**
	 * Change play button style
	 */
	function load_lazyload_css_button_style() {
		if ( get_option('ll_opt_button_style') == 'youtube_button_image' ) {
			// Display youtube button image
			echo '.lazy-load-div { background: url('.plugin_dir_url( __FILE__ ).'../public/play-youtube.png) center center no-repeat; }';
		}
		else if ( get_option('ll_opt_button_style') == 'youtube_button_image_red' ) {
			// Display RED youtube button image
			echo '.lazy-load-div { background: url('.plugin_dir_url( __FILE__ ).'../public/play-y-red.png) center center no-repeat; }';
		}
		else if (
				get_option('ll_opt_button_style') == 'css_black'
				|| get_option('ll_opt_button_style') == 'css_black_pulse'
			) {
			// Display black CSS-only play button
			echo '.lazy-load-div:before { content: "\25B6"; color: #000 }';
		} else {
			// Display white CSS-only play button
			echo '.lazy-load-div:before { content: "\25B6"; text-shadow: 0px 0px 60px rgba(0,0,0,0.8); }';
		}
	}
}

// Fires after enqueuing block assets for both editor and front-end.
add_action( 'enqueue_block_assets', function() {
	new Lazy_Load_For_Videos_Frontend();
} );
