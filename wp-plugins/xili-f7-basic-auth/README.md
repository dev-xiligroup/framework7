# Json Basic Authentication handler
This plugin adds Basic Authentication to a WordPress site - only for the AJAX / JSON feed

Inspired from this plugin : https://github.com/WP-API/Basic-Auth
(need that all site was blocked by Basic Auth)

Note that this plugin requires sending your username and password with every
request, and should only be used for development and testing. We strongly
recommend using the [OAuth 1.0a][oauth] authentication handler for production.

## Installing
1. Download the plugin into your plugins directory
2. Enable in the WordPress admin

## Prerequisite

1. A Apache server (to keep headers of request)

## Using

See F7 example in this xili gitHub : https://github.com/dev-xiligroup/framework7


## Sources

[oauth]: https://github.com/WP-API/OAuth1
[RFC2617]: https://tools.ietf.org/html/rfc2617
