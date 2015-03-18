// Let's register Template7 helper so we can pass json string in links
Template7.registerHelper('json_stringify', function (context) {
    return JSON.stringify(context);
});

// Export selectors engine
var $$ = Dom7;
var mainView ;


// Initialize your app
var myApp = new Framework7({
  debug: false,
  animateNavBackIcon: true,
// Enable templates auto precompilation
  precompileTemplates: true,
// Enabled pages rendering using Template7
  template7Pages: true,
  template7Data: {

        about: {
                name: 'Michel',
                age: 62,
                position: 'Data Designer',
                company: 'xiligroup v 0.3',
                interests: ['garden', 'music', 'JavaScript', 'iMac', 'iOS apps', 'walk on snow']
              },
        'page:contacts': {
              email: 'contact@xiligroup.com',
              city: 'Lyon',
               country: 'Europe'
           }
      }
});
// Add main View
mainView = myApp.addView('.view-main', {
    // Enable dynamic Navbar
    dynamicNavbar: true,
    domCache: true
});

var counter = document.getElementById('counter').innerHTML; // keep script

var t7p4wpDataCount = localStorage.t7p4wpDataCount ? JSON.parse(localStorage.t7p4wpDataCount) : [0,0];

function get_latest_posts() {
  //$$.getJSON('http://michel-i6-imac.local:8888/wp_svn42/json/get_posts/' , function (json, status, xhr) {
  // to manage errors (? better)
    $$.ajax ({
      url: 'http://michel-i5-imac.local:8888/wp_svn42/json/get_posts/',
      dataType: 'json',
      timeout:2500,
      success: function(json, status, xhr) {

        console.log('inside ' + status);

        if( status == 200 ) {
          Template7.data.posts = json['posts'];

          localStorage.t7p4wpData = JSON.stringify(Template7.data.posts); // as in todo7 example

          Template7.data.counter = { count: json['count'], total_count: json['count_total'] };

          var compiledTemplate = Template7.compile(counter);
          $$('#posts_count').html(compiledTemplate(Template7.data.counter)); // not set in Safari of iPad but ok in WebApp (HTML5 iOS home screen)
          Template7.data.counter['saved'] = '*'; // to indicate local storage
          localStorage.t7p4wpDataCount = JSON.stringify(Template7.data.counter);

        } else {
            //
            console.log(xhr.status);
            console.log(xhr.response);
            console.log(xhr.responseText)
            console.log(xhr.statusText);
        }
      },

      error: function( jqXHR, status, error ) { // activated in iPad Safari as 200 ? w/o snd params
        console.log('error ' + jqXHR.statusText);
      }
  });
};
//console.log(typeof (localStorage.t7p4wpData));

if ( typeof (localStorage.t7p4wpData)  == 'undefined' || localStorage.t7p4wpData == '' ) {
    get_latest_posts();
} else {
    Template7.data.posts = JSON.parse (localStorage.t7p4wpData); // as in todo7 example
    Template7.data.counter = t7p4wpDataCount;
    var compiledTemplate = Template7.compile(counter);
    document.getElementById('posts_count').innerHTML = compiledTemplate(Template7.data.counter); // not set in Safari of iPad but ok in WebApp (HTML5 iOS home screen)
}

// Select Pull to refresh content
var ptrContent = $$('.pull-to-refresh-content');

// On refresh
ptrContent.on('refresh', function (e) {
  // Emulate 1s loading
  setTimeout(function () {
  //console.log('refreshing');
    // Execute get_latest_posts to get new Posts
    get_latest_posts();

  myApp.pullToRefreshDone();
  }, 1000);
});


