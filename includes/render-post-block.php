<?php
/**
 * Post Block Renderer
 *
 * @package Awesome_Blocks
 */

if (! defined('ABSPATH')) {
    exit;
}

/**
 * Render Post Block
 *
 * @param array $attributes Block attributes.
 * @return string HTML output.
 */
function ab_render_post_block($attributes)
{
    // Get attributes
    $posts_to_show    = isset($attributes['postsToShow']) ? intval($attributes['postsToShow']) : 3;
    $order            = isset($attributes['order']) ? sanitize_text_field($attributes['order']) : 'desc';
    $order_by         = isset($attributes['orderBy']) ? sanitize_text_field($attributes['orderBy']) : 'date';
    $columns          = isset($attributes['columns']) ? intval($attributes['columns']) : 3;
    $display_title    = isset($attributes['displayTitle']) ? (bool) $attributes['displayTitle'] : true;
    $display_excerpt  = isset($attributes['displayExcerpt']) ? (bool) $attributes['displayExcerpt'] : true;
    $display_date     = isset($attributes['displayDate']) ? (bool) $attributes['displayDate'] : true;
    $display_author   = isset($attributes['displayAuthor']) ? (bool) $attributes['displayAuthor'] : false;
    $display_thumbnail = isset($attributes['displayThumbnail']) ? (bool) $attributes['displayThumbnail'] : true;
    $thumbnail_size   = isset($attributes['thumbnailSize']) ? sanitize_text_field($attributes['thumbnailSize']) : 'medium';
    $categories       = isset($attributes['categories']) ? $attributes['categories'] : [];

    // Query arguments
    $args = [
        'post_type'      => 'post',
        'post_status'    => 'publish',
        'posts_per_page' => $posts_to_show,
        'order'          => $order,
        'orderby'        => $order_by,
        'ignore_sticky_posts' => 1,
    ];

    // Filter by categories
    if (! empty($categories) && is_array($categories)) {
        $args['category__in'] = $categories;
    }

    $query = new WP_Query($args);

    if (! $query->have_posts()) {
        return '<p>' . esc_html__('No posts found.', 'awesome-blocks') . '</p>';
    }

    // Start output
    ob_start();

    echo '<ul class="ab-posts-grid columns-' . esc_attr($columns) . '">';

    while ($query->have_posts()) {
        $query->the_post();

        echo '<li class="ab-post-item">';

        // Display thumbnail
        if ($display_thumbnail && has_post_thumbnail()) {
            echo '<div class="ab-post-thumbnail">';
            echo '<a href="' . esc_url(get_permalink()) . '">';
            the_post_thumbnail($thumbnail_size);
            echo '</a>';
            echo '</div>';
        }

        echo '<div class="ab-post-content">';

        // Display meta
        if ($display_date || $display_author) {
            echo '<div class="ab-post-meta">';

            if ($display_date) {
                echo '<span class="ab-post-date">';
                echo esc_html(get_the_date());
                echo '</span>';
            }

            if ($display_author) {
                echo '<span class="ab-post-author">';
                echo esc_html__('By ', 'awesome-blocks') . esc_html(get_the_author());
                echo '</span>';
            }

            echo '</div>';
        }

        // Display title
        if ($display_title) {
            echo '<h3 class="ab-post-title">';
            echo '<a href="' . esc_url(get_permalink()) . '">';
            echo esc_html(get_the_title());
            echo '</a>';
            echo '</h3>';
        }

        // Display excerpt
        if ($display_excerpt) {
            echo '<div class="ab-post-excerpt">';
            echo wp_kses_post(get_the_excerpt());
            echo '</div>';
        }

        // Read more link
        echo '<a href="' . esc_url(get_permalink()) . '" class="ab-post-read-more">';
        echo esc_html__('Read More', 'awesome-blocks');
        echo '</a>';

        echo '</div>'; // .ab-post-content
        echo '</li>'; // .ab-post-item
    }

    echo '</ul>';

    wp_reset_postdata();

    return ob_get_clean();
}

/**
 * Register render callback
 */
add_action('rest_api_init', function () {
    register_rest_field('post-block', 'rendered', [
        'get_callback' => function ($post) {
            return ab_render_post_block([]);
        },
    ]);
});
