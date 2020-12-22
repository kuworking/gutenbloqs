<?php

/**
 * Plugin Name:       gutenbloqs-author
 * Description:       A gutenbloq
 * Version:           0.1.0
 * Author:            kuworking
 * Author URI:        https://www.gutenbloqs.com
 */

namespace GutenBloqs\Author;

class Globals
{
    public $name = 'gutenbloqs_author';
    public function http_route($loc)
    {
        return plugins_url($loc, __FILE__);
    }
    public function local_route($loc)
    {
        return plugin_dir_path(__FILE__) . '/' . $loc;
    }
    public function log($content = '', $loc = 'default.log.json')
    {
        file_put_contents(plugin_dir_path(__FILE__) . '/' . $loc, json_encode($content));
        return true;
    }
}

// Exit if accessed directly.
defined('ABSPATH') || exit;

/** Add a category for gutenberg blocks */
add_filter('block_categories', function ($categories, $post) {
    $category_slugs = wp_list_pluck($categories, 'slug');
    return (in_array('gutenbloqs', $category_slugs, true)) ? $categories : array_merge(
        [
            [
                'slug' => 'gutenbloqs',
                'title' => 'gutenbloqs',
                'icon' => '',
            ],
        ],
        $categories
    );
}, 10, 2);

/** gutenberg part */
add_action('enqueue_block_editor_assets', function () {
    $g = new Globals;

    $asset_file = include($g->local_route('build/gutenberg.asset.php'));
    wp_enqueue_script(
        $g->name . '_gutenberg',
        $g->http_route('build/gutenberg.js'),
        // ['wp-blocks', 'wp-polyfill', 'wp-element'],
        $asset_file['dependencies'],
        $asset_file['version']
    );
});

//     file_put_contents(plugin_dir_path(__FILE__) . '/DEBUG.log.json', json_encode($categories));
