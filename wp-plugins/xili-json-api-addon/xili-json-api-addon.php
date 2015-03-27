<?php
/*
Plugin Name: xili-json-api-addon
Plugin URI: http://dev.xiligroup.com
Description: add functions (multilingual) and features to json (rest) api
Version: 0.9
Author: MS
Author URI: http://dev.xiligroup.com
Text Domain: xili_json_api_addon
Domain Path: /languages/
*/

// TODO: create class and define when to instantiate

// REST API JSON compat

function xili_rest_api_post_meta_add( $data, $post, $context ){
	//$data['meta'] = array_merge( $data['meta'], array('custom_fields' => get_post_custom( $post['ID']) ) ) ;
	$data['custom_fields'] = xili_get_post_custom( $post['ID']); // custom_fields like in previous json_api
	return $data;
}
// in class wp-json-posts.php
add_filter('json_prepare_post', 'xili_rest_api_post_meta_add', 10, 3);

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

?>
