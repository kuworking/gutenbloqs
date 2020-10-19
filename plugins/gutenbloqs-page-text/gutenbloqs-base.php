<?php

/**
 * Plugin Name:       gutenbloqs-page-text
 * Description:       A gutenbloq
 * Version:           0.0.1
 * Author:            kuworking
 * Author URI:        https://www.gutenbloqs.com
 */

namespace GutenBloqs\Base;

class Globals
{
    public $name = 'gutenbloqs_page_text';
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

    $asset_file = include ($g->local_route('build/gutenberg.asset.php'));
    wp_enqueue_script(
        $g->name . '_gutenberg',
        $g->http_route('build/gutenberg.js'),
        // ['wp-blocks', 'wp-polyfill', 'wp-element'],
        $asset_file['dependencies'],
        $asset_file['version']
    );
});

/** frontend part */
add_action('wp_enqueue_scripts', function () {
    $g = new Globals;

    $asset_file = include ($g->local_route('build/component.asset.php'));
    wp_enqueue_script(
        $g->name . '_component',
        $g->http_route('build/component.js'),
        // ['wp-polyfill', 'wp-element'],
        // dependencies doesn't work when using babel emotion plugin
        $asset_file['dependencies'],
        $asset_file['version'],
        true
    );
});

/** add style to override max-width theme class */
add_action('wp_enqueue_scripts', function () {
    $g = new Globals;

    wp_register_style('custom-styles', $g->http_route('/src/base.css'));
    wp_enqueue_style('custom-styles');
});

//     file_put_contents(plugin_dir_path(__FILE__) . '/DEBUGIMGUR2.log.json', json_encode($categories));
