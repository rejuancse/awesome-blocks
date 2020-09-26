<?php
namespace AWEGB\blocks;

defined( 'ABSPATH' ) || exit;

class Awesome_Countdown{
    
    public function __construct(){
        $this->register_awesome_countdown();
    }

    public function register_awesome_countdown(){
        register_block_type(
            'awesome-blocks/awesomecountdown',
            array(
                'attributes' => array(

                    'endDate'       => array (
                        'type'      => 'number',
                        'default'       => ''
                    ),

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

        $endDate            = isset( $att['endDate'] ) ? $att['endDate'] : '';

        $timeLeft   = $endDate - time();
        $seconds    = $timeLeft % 60;
        $minutes    = (($timeLeft - $seconds) % 3600) / 60;
        $hours      = (($timeLeft - $minutes * 60 - $seconds) % 86400) / 3600;
        $minute     = ($minutes == '0') ? 1 : $minutes;
        $days       = (int)(($timeLeft - $hours / 3600 / $minute * 60 - $seconds) / 86400 );
        
        
        $html .= '<div class="awesome-blocks-countdown">';
            $html .= '<div class="awesome-blocks-wrapper" data-enddate='.$endDate.'>';
                $html .= '<div class="countdown-item">';
                    $html .= '<div class="number"><h4>'.$days.'</h4></div>';
                    $html .= '<div class="text"><h5>days</h5></div>';
                $html .= '</div>';
                $html .= '<div class="countdown-item">';
                    $html .= '<div class="number"><h4 class="hours">'.$hours.'</h4></div>';
                    $html .= '<div class="text"><h5>Hours</h5></div>';
                $html .= '</div>';
                $html .= '<div class="countdown-item">';
                    $html .= '<div class="number"><h4 class="minutes">'.$minutes.'</h4></div>';
                    $html .= '<div class="text"><h5>Minutes</h5></div>';
                $html .= '</div>';
                $html .= '<div class="countdown-item">';
                    $html .= '<div class="number"><h4 class="second">'.$seconds.'</h4></div>';
                    $html .= '<div class="text"><h5>Seconds</h5></div>';
                $html .= '</div>';
            $html .= '</div>';     
        $html .= '</div>';

        return $html;
    }
}