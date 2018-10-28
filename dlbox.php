<?php
/*
Plugin Name:dlbox
Description: 在wordpress原生编辑器上注册一个“下载信息”的按钮，只需按照相应提示填写，就可以获得一个规整的下载面板
Version: 1.1
Author:HJ
*/
function hj_my_add_mce_button()
{
    add_filter('mce_external_plugins', 'hj_my_add_tinymce_plugin');
    add_filter('mce_buttons', 'hj_my_register_mce_button');
}
add_action('admin_head', 'hj_my_add_mce_button');
add_action('wp_head', 'hj_my_add_mce_button');
function hj_my_add_tinymce_plugin($plugin_array)
{
    $plugin_array['specs_code_plugin'] = plugin_dir_url(__FILE__) . '/js/dlbox.js';
    return $plugin_array;
}
function hj_my_register_mce_button($buttons)
{
    array_push($buttons, 'specs_code_plugin');
    return $buttons;
}
function plugincss() {       
    wp_register_style( 'plugin', plugins_url( 'css/dlbox.css' , __FILE__ ) );  
    if ( !is_admin() ) {           
        wp_enqueue_style( 'plugin' );  
    }  
}  
add_action( 'init', 'plugincss' );
function hj_dlbox($atts, $content = null)
{
    extract(shortcode_atts(array('b' => '', 'c' => '', 'd' => '', 'e' => '', 'f' => ''), $atts));
    $out = '<span style="font-size: 12pt;"><div class="hjdl" id="hjdl"><div class="dl-title">下载信息</div>
<div class="dl-detail">
<p class="dl-ordinary"><i class="fa fa-clock-o" aria-hidden="true"></i>
更新日期：' . $c . '</p>
<p class="dl-price">
文件来源：<span>' . $b . '</span></p>
<p class="dl-tip">
文件信息：' . $f . ' ' . $d . '</p>
<div class="dl-link">
下载链接：<div class="dl-item">' . $content . '</div></div></div><div class="clear"></div></div></span>';
    
if ( is_user_logged_in() ) {
return $out;
} else {
     $logout = '<span style="font-size: 12pt;"><div class="hjdl" id="hjdl"><div class="dl-title">下载信息</div>
<div class="dl-detail">
<p class="dl-ordinary"><i class="fa fa-clock-o" aria-hidden="true"></i>
更新日期：登录可见</p>
<p class="dl-price">
文件来源：登录可见</p>
<p class="dl-tip">
文件信息：登录可见</p>
<p class="dl-link">
下载链接：登录可见</div><div class="clear"></div></div></span>';
    return $logout;
} 
   



}
add_shortcode('hj_dlbox', 'hj_dlbox');
