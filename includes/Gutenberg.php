<?php
namespace AWEGB;

defined( 'ABSPATH' ) || exit;

class Gutenberg{


    protected static $_instance = null;
    public static function instance(){
        if (is_null(self::$_instance)){
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    public function __construct(){
        add_action( 'init', array( $this, 'blocks_init' ));
        add_action( 'enqueue_block_editor_assets', array( $this, 'post_editor_assets' ) );
        add_action( 'enqueue_block_assets', array( $this, 'awesome_block_assets_frontend' ) );
        add_filter( 'block_categories', array( $this, 'block_categorie_callback'), 1 , 2 );
    }
    
    /** 
     * Blocks Init
     */
    public function blocks_init(){
        require_once AWEGB_DIR_PATH . 'includes/blocks/awesome-post-block.php';
        require_once AWEGB_DIR_PATH . 'includes/blocks/countdown.php';

        new \AWEGB\blocks\Awesome_Post_Plock();
        new \AWEGB\blocks\Awesome_Countdown();
    }

    /**
     * All Block Assets (Frontend & Backend)
     */
    public function awesome_block_assets_frontend() {
        # Styles.
        wp_enqueue_style(
            'awesome-block-style', # Handle.
            plugins_url( 'assets/css/awesome-block-front.css', dirname( __FILE__ ) ), 
            array( 'wp-editor' )
        );
        # Build style
        wp_enqueue_style(
            'awesome-block-front',
            AWEGB_DIR_URL . 'assets/css/blocks.style.build.css',
            array( 'wp-edit-blocks' ),
            false
        );
        # CSS
        wp_enqueue_style(
            'magnific-popup',
            AWEGB_DIR_URL . 'assets/css/magnific-popup.css',
            array( 'wp-edit-blocks' ),
            false
        );
        
        # JS
        wp_enqueue_script(
            'countdown-script', 
            AWEGB_DIR_URL . 'assets/js/awesome-block-front.js', 
            array('jquery')
        );  
        wp_enqueue_script(
            'magnific-popup', 
            AWEGB_DIR_URL . 'assets/js/jquery.magnific-popup.min.js', 
            array('jquery')
        ); 

    }

    /**
     * Only for the Gutenberg Editor(Backend Only)
     */
    public function post_editor_assets(){
        # Scripts
        wp_enqueue_script(
            'awesome-block-script-js',
            AWEGB_DIR_URL . 'assets/js/blocks.min.js', 
            array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor' ),
            false,
            true
        );

        # Localize Scripts
        wp_localize_script( 'awesome-block-script-js', 'plugin_option', array(
            'plugin'    => AWEGB_DIR_URL,
            'name'      => 'awesomeblock'
        ) ); 
    }

    /**
     * Block Category Add
     */
    public function block_categorie_callback( $categories, $post ){
        return array_merge(
            $categories,
            array(
                array(
                    'slug' 	=> 'awesome-blocks',
                    'title' => __( 'Awesome Blocks', 'awesome-blocks' ),
                )
            )
        );
    }
}

