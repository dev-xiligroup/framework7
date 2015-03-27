# framework7
examples and tests with framework7 (from idangero.us) and WordPress

## 2 - Template7 Pages for WordPress and JSON REST API

This example is the result of tests to learn famous Framework7 with WordPress.
This is based on examples available in http://www.idangero.us/framework7/examples/
This example is published to open discussion and improvements...

### Prerequisites

A (local or not) WordPress website as json server (needs json plugin https://wordpress.org/plugins/json-rest-api/ version 1.2.0).
This plugin is able to deliver json file that will be incorporated in latest posts page of webapp.
To collect custom fields use plugin named xili-json-api-addon (in this same repository)

URI must be adapted to your config in function  $$.getJSON of my-app.js - now via Settings popup form

The webApp uses Framework7 v. 1.0.4 (March 21th, 2015)

Tested also with an iPad Air retina (via browser or as webapp installed in iPad homepage)

### installation

- install the folder in a (local) server
- modify the URI of the WP website to keep json (verify that the apache server is ready to deliver json for IP client - .htaccess)

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

michelwppi dev.xiligroup 2015-03-27