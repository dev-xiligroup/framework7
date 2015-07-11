# framework7
examples and tests with framework7 (from idangero.us) and WordPress

## Now all updated with F7 version 1.0.5

- first example (latest posts from a wp website) = in folder webapp-t7p4wp (see readme inside)
- second example (latest posts from a wp website) = in folder webapp-t7p-rest (with recent JSON REST API 1.2.0) (see readme inside)
- third example: same but with Basic Authentication - with F7 1.0.5 in folder webapp-t7p-rest-auth
- fourth example: same but with Basic Authentication only for JSON - only works with Apache Server and WP - with F7 1.0.5 in folder webapp-t7p-rest-auth-2
- wp plugins (to use to improve default json get from wp json plugin and provide Basic Auth for Json feed only)

## New tests with F7 version 1.0.7 and for WP REST API 2.0-beta3

(2015-07-11 - folder webapp-t7p-rest-v2)

- WP REST API 2.0 introduces very important changes in routes and WP_REST response needing changing way to request the remote WP.
	- examples of route/queries :
		- wp-json/wp/v2/posts?showposts=20
		- wp-json/wp/v2/posts?lang=fr_fr (with xili-language)
- Some new helpers were created.
- Because beta3, some collections in json response are faulty (_links).
- The WP plugin (xili-rest-api-addon) modifies the response to include meta and taxonomies per post.
- Tests are also done with a WP 4.2.2 multilingual with xili-language to create links between translation (helper) if both translation are in the REST response.
