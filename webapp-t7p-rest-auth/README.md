# framework7
examples and tests with framework7 (from idangero.us) and WordPress

## 2 - Template7 Pages for WordPress and JSON REST API and Basic Authentication

This example is the result of tests to learn famous Framework7 with WordPress.
This is based on examples available in http://www.idangero.us/framework7/examples/
This example is published to open discussion and improvements...

### Prerequisites

A (local or not) WordPress website as json server (needs json plugin https://wordpress.org/plugins/json-rest-api/ version 1.2.0).
This plugin is able to deliver json file that will be incorporated in latest posts page of webapp.
To collect custom fields use plugin named xili-json-api-addon (in this same repository)

URI must be adapted to your config in now via Settings popup form, Authentication Password is in my-app.js  (today: only works with Safari - issue with headers on chrome)

The webApp uses Framework7 v. 1.0.5 (March 28th, 2015)

Tested also with an iPad Air retina (via browser or as webapp installed in iPad homepage)

### installation

- install the folder in a (local) server
- modify the URI of the WP website to keep json (verify that the apache server is ready to deliver json for IP client - .htaccess)

Example of .htaccess (modify paths)
```
Header set Access-Control-Allow-Origin "http://michel-i5-imac.local"
Header set Access-Control-Allow-Credentials "true"
Header set Access-Control-Allow-Headers "x-requested-with, Content-Type, origin, authorization, accept, client-security-token"
Header set Access-Control-Request-Method "GET, OPTIONS, POST"
# Only if not OPTIONS
<LimitExcept OPTIONS>
    AuthType Basic
AuthName "Prototype F7 WP"
AuthUserFile "/Applications/MAMP/htdocs/wp_svn41/.htpasswd"
require valid-user
</LimitExcept>

# BEGIN WordPress
<IfModule mod_rewrite.c>
RewriteEngine On
RewriteBase /wp_svn41/
RewriteRule ^index\.php$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /wp_svn41/index.php [L]
</IfModule>

# END WordPress
```
WP server must use plugin named JSON Basic Authentication (same login/passwd in htpasswd and in WP user)

### Done

- form to choose URI of WP server
- caching of Json Datas
- insertion of thumbnail_images if available
- better var

### Pending issues

- full off line
- doc

### Projects

- more integration with WordPress themes
- ...

- french speaking references tips and tricks website

michelwppi dev.xiligroup 2015-04-10