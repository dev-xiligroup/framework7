<?php
/**
 * Plugin Name: xili F7 basic auth
 * Description: Basic Authentication handler only for the JSON API, used for development and debugging purposes
 * Author: michelwppi, MS dev.xiligroup, WordPress API Team
 * Author URI: https://github.com/dev-xiligroup/
 * Version: 0.1
 * Plugin URI: https://github.com/dev-xiligroup/framework7
 */

function json_basic_auth_handler( $user ) {
	global $wp_json_basic_auth_error;

// Don't authenticate twice
	if ( ! empty( $user ) ) {
		return $user;
	}

	$headers = apache_request_headers();

	//error_log(serialize($headers));
	$wp_json_basic_auth_error = null;

	if ( isset($headers['Authorization']) ) {
		if ( strpos(strtolower($headers['Authorization']),'basic') === 0 ) {
	          list($username2,$password2) = explode(':',base64_decode(substr($headers['Authorization'], 6)));
	      //error_log('Authorization user = ' . $username2);
	      //error_log('Authorization pswd = ' . $password2);

	    	remove_filter( 'determine_current_user', 'json_basic_auth_handler', 20 );

			$user = wp_authenticate( $username2, $password2 );

			add_filter( 'determine_current_user', 'json_basic_auth_handler', 20 );

			if ( is_wp_error( $user ) ) {
				$wp_json_basic_auth_error = $user;
				return null;
			}
			$wp_json_basic_auth_error = true;

			return $user->ID;

	  	} else {

	  		$json_error_obj = new WP_Error( 'json_encode_error', 'wp_json_basic_auth_error: header Authorization but no basic', array( 'status' => 500 ) );
			$wp_json_basic_auth_error = $json_error_obj;
			return null;
	  	}
	} else {
		$json_error_obj = new WP_Error( 'json_encode_error', 'wp_json_basic_auth_error: no header Authorization', array( 'status' => 500 ) );
		$wp_json_basic_auth_error = $json_error_obj;
		return null;
	}
}
add_filter( 'determine_current_user', 'json_basic_auth_handler', 20 );


function json_basic_auth_error( $error ) {
	// Passthrough other errors
	if ( ! empty( $error ) ) {
		return $error;
	}

	global $wp_json_basic_auth_error;
	return $wp_json_basic_auth_error;
}
add_filter( 'json_authentication_errors', 'json_basic_auth_error' );
