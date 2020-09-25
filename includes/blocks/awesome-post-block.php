<?php
namespace AWEGB\blocks;

defined( 'ABSPATH' ) || exit;

class Awesome_Post_Plock{
    
    public function __construct(){
        $this->register_awesome_post_block();
    }

    public function register_awesome_post_block(){
        register_block_type(
            'awesome-blocks/awesomepostblock',
            array(
                'attributes' => array(
                    'formAlign' => array(
                        'type'      => 'string',
                        'default'   => 'left'
                    ),
                    'formSize'   => array(
                        'type'      => 'string',
                        'default'   => 'small'
                    ),
                    'bgColorpalette'    => array(
                        'type'          => 'string',
                        'default'       => '#0073a8',
                    ),
                    'titleColor'    => array(
                        'type'          => 'string',
                        'default'       => '#ffffff',
                    ),
                    'fontSize'    => array(
                        'type'          => 'number',
                        'default'       => 16,
                    ),
                    'fontWeight'    => array(
                        'type'          => 'number',
                        'default'       => 400,
                    ),
                    'SearchfontSize' => array(
                        'type'          => 'number',
                        'default'       => 14,
                    ),
                ),
                'render_callback' => array( $this, 'post_block_callback' ),
            )
        );
    }

    public function post_block_callback( $att ){
        
        $html = '';
        $columns        = isset( $att['columns']) ? $att['columns'] : 3;
        $numbers        = isset( $att['numbers']) ? $att['numbers'] : 6;
        $orderby        = isset( $att['orderby']) ? $att['orderby'] : 'ASC';
        $fontSize       = isset( $att['fontSize']) ? $att['fontSize'] : '14';
        $lineheight     = isset( $att['lineheight']) ? $att['lineheight'] : '24';
        $fontWeight     = isset( $att['fontWeight']) ? $att['fontWeight'] : '400';
        $blogStyle      = isset( $att['blogStyle']) ? $att['blogStyle'] : 'style1';
        $colorpalette   = isset( $att['colorpalette']) ? $att['colorpalette'] : '#212127';
        $selectedCategory = isset( $att['selectedCategory']) ? $att['selectedCategory'] : 'all';
        $bgColor            = isset( $att['bgColorpalette']) ? $att['bgColorpalette'] : 'all';
        
        
        if($selectedCategory == 'all') {
            $args = array(
                'post_type'         => 'post',
                'posts_per_page'    => $numbers,
                'order'             => $orderby,
                'status'            => 'publish',
            );
        }else {
            $args = array(
                'post_type' => 'post',
                'order'     => $orderby,
                'tax_query' => array(
                    array(
                        'taxonomy' => 'category',
                        'field'    => 'id',
                        'terms'    => esc_attr($selectedCategory),
                        ),
                    ),
                'posts_per_page'    => esc_attr($numbers),
            );
        }
        $query = new \WP_Query( $args );

        # The Loop. 
        $count = 0;
        $html = '';
        if ( $query->have_posts() ) {
            $html .= '<div class="postblock-wrapper"">';
            while ( $query->have_posts() ) {
                $query->the_post();

                $id = get_post_thumbnail_id();
                $src = wp_get_attachment_image_src($id, 'full');

                if($blogStyle == 'style1') {
                    $html .= '<div class="col-md-'.$columns.'">'; 
                        $html .= '<div class="post-content-wrapper" style="background: '.$bgColor.'">';
                            $html .= '<a href="'.esc_url(get_the_permalink()).'">';
                            $html .= '<img src="' . $src[0] . '" class="img-responsive" />';
                            $html .= '</a>';
                            $the_date = get_the_date();
                            $html .= '<div class="content">';
                            $html .= '<span>'. date_i18n("d M, Y", strtotime($the_date)) .'</span>';
                            $html .= '<h2 style="font-size: '.$fontSize.'px; font-weight: '.$fontWeight.'; line-height: '.$lineheight.'px"><a href="'.esc_url(get_the_permalink()).'" style="color: '.$colorpalette.'">'.get_the_title().'</a></h2>';
                            $html .= '</div>';
                        $html .= '</div>';
                    $html .= '</div>';
                } else {

                    if($count == 0) {
                        $html .= '<div class="col-md-6">'; 
                            $html .= '<div class="post-content-wrapper">';
                                $html .= '<a href="'.esc_url(get_the_permalink()).'">';
                                $html .= '<img src="' . $src[0] . '" class="img-responsive" />';
                                $html .= '</a>';
                                $html .= '<h2 style="font-size: '.$fontSize.'px; font-weight: '.$fontWeight.'; line-height: '.$lineheight.'px">
                                <a href="'.esc_url(get_the_permalink()).'" style="color: '.$colorpalette.'">'.get_the_title().'</a>
                                </h2>';
                                $html .= get_the_excerpt();
                            $html .= '</div>';
                        $html .= '</div>';
                    }else {
                        if($count == 1) {
                            $html .= '<div class="col-md-6 '.$blogStyle.'">';}
                                $html .= '<div class="post-content-wrapper">';
                                    $html .= '<div class="content-img">';
                                        $html .= '<a href="'.esc_url(get_the_permalink()).'">';
                                        $html .= '<img src="' . $src[0] . '" class="img-responsive" />';
                                        $html .= '</a>';
                                    $html .= '</div>';

                                    $the_date = get_the_date();
                                    $html .= '<div class="content-wrap">';
                                    $html .= '<span>'. date_i18n("d M, Y", strtotime($the_date)) .'</span>';
                                    $html .= '<h2 style="font-size: '.$fontSize.'px; font-weight: '.$fontWeight.'; line-height: '.$lineheight.'px"><a href="'.esc_url(get_the_permalink()).'" style="color: '.$colorpalette.'">'.get_the_title().'</a></h2>';
                                    $html .= '</div>';
                                $html .= '</div>';
                        $count_nbr = $count + 1;
                        if($count_nbr == $numbers) {
                            $html .= '</div>';
                        }
                    }
                    $count++;
                }

            }
            $html .= '</div>';
            wp_reset_postdata();
        } 
        return $html;
    }
}