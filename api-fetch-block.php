<?php
/**
 * Plugin Name:       API Fetch Block
 * Description:       Example static block scaffolded with Create Block tool.
 * Requires at least: 5.9
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            The WordPress Contributors
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

        // Fetch data from the API
        $response = wp_remote_get('https://httpbin.org/get');
        if (!is_wp_error($response) && $response['response']['code'] === 200) {
            $data = json_decode(wp_remote_retrieve_body($response), true);
            $headers = $data['headers'];

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
        } else {
            // Error handling or fallback content when API request fails
            echo 'Error fetching data from the API.';
        }

        echo $args['after_widget'];
    }

}



function register_api_fetch_widget() {
    register_widget('APIFetchWidget');
}
add_action('widgets_init', 'register_api_fetch_widget');