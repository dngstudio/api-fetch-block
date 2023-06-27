<?php
/**
 * Plugin Name:       API Fetch Block
 * Description:       This plugin adds a Gutenberg block that fetches and displays API headers.
 * Requires at least: 5.9
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            Ivan Djukic
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       api-fetch-block
 *
 * @package           create-block
 */

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function create_block_api_fetch_block_block_init() {
	register_block_type( __DIR__ . '/build' );
}
add_action( 'init', 'create_block_api_fetch_block_block_init' );

class APIFetchWidget extends WP_Widget {
    public function __construct() {
        parent::__construct('api_fetch_widget', 'API Fetch Widget');
    }

    public function widget($args, $instance) {
        echo $args['before_widget'];

        // Define the cache key and duration
        $cache_key = 'api_fetch_data_cache';
        $cache_duration = 5 * MINUTE_IN_SECONDS;

        // Check if the data is already cached
        $cached_data = get_transient($cache_key);

        if ($cached_data === false) {
            // Data is not cached or expired, fetch the fresh data
            $response = wp_remote_get('https://httpbin.org/get');
            if (!is_wp_error($response) && $response['response']['code'] === 200) {
                $data = json_decode(wp_remote_retrieve_body($response), true);
                $headers = $data['headers'];

                // Cache the data for future use
                set_transient($cache_key, $headers, $cache_duration);
            } else {
                // Error handling or fallback content when API request fails
                $headers = false;
                echo 'Error fetching data from the API.';
            }
        } else {
            // Data is cached, retrieve it from the cache
            $headers = $cached_data;
        }

        // Access and display the headers
        if (!empty($headers)) {
            echo '<ul>';
            foreach ($headers as $name => $value) {
                echo '<li><strong>' . esc_html($name) . ':</strong> ' . esc_html($value) . '</li>';
            }
            echo '</ul>';
        } else {
            // Fallback content when headers are not available
            echo 'No headers found in the API response.';
        }

        echo $args['after_widget'];
    }
}

function register_api_fetch_widget() {
    register_widget('APIFetchWidget');
}
add_action('widgets_init', 'register_api_fetch_widget');

