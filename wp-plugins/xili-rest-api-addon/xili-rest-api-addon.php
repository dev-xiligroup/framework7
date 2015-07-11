<?php
/*
Plugin Name: xili-rest-api-addon
Plugin URI: http://dev.xiligroup.com
Description: add functions (multilingual) and features to rest api v2
Version: 0.9.0
Author: MS
Author URI: http://dev.xiligroup.com
Text Domain: xili_json_api_addon
Domain Path: /languages/
*/

// TO DO: create class and define when to instantiate

// REST API JSON compat v2-beta3

function xili_rest_api_post_meta_add( $data, $post, $context ){
	//$data['meta'] = array_merge( $data['meta'], array('custom_fields' => get_post_custom( $post['ID']) ) ) ;

	$data->data['custom_fields'] = xili_get_post_custom( $post->ID); // custom_fields like in previous json_api

	$data->data['selected_taxonomies'] = xili_get_post_selected_taxonomies( $post->ID, array ('category', 'post_tag', 'language') );

	return $data;
}
// in class WP_REST_Posts_Controller
add_filter('rest_prepare_post', 'xili_rest_api_post_meta_add', 10, 3);


/**
 * test if JSON REST QUERY and dont insert lang tag after root url (permalinks class ) in wp_json links
 *
 */
function xili_json_dont_insert_lang_tag_root ( $false, $url, $path, $orig_scheme, $blog_id ){
	global $wp_query;
		if ( isset( $wp_query->query_vars['json_route']) )return true; // no insertion
		return $false;
}
add_filter('xili_json_dont_insert_lang_tag_root', 'xili_json_dont_insert_lang_tag_root', 10, 5 ); // filter since XL 2.16.6

/**
 * don't select _key (invisible $key)
 *
 */
function xili_get_post_custom ( $post_ID ) {
	$raw_customs = get_post_custom( $post_ID );
	$customs = array();
	if ( $raw_customs ) {
		foreach ($raw_customs as $key => $meta ) {
			if ( substr($key, 0, 1) != '_' ) {
				$customs[$key] = $meta;
			}
		}
	}
	return $customs;
}

function xili_get_post_selected_taxonomies( $post_ID, $taxonomies = array ( 'category', 'post_tag' ) ) {
	$terms_of_post = array();
	foreach ( $taxonomies as $taxonomy ) {
		$result = get_the_terms( $post_ID, $taxonomy );
		if ( !is_wp_error ( $result ) )
			$terms_of_post[$taxonomy] = $result ;
	}
	return $terms_of_post;
}

?>