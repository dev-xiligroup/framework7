// Let's register Template7 helper so we can pass json string in links
Template7.registerHelper('json_stringify', function (context) {
    return JSON.stringify(context);
});

// Export selectors engine
var $$ = Dom7;
var mainView ;

/* two helpers "if_filled_object" & "joinindex" used in post.html
    <li>{{#if_filled_object categories}}<b>Categories: </b>{{joinindex categories delimeter=" | " indexname="title"}}{{else}}<em>Uncategorized yet...</em>{{/if_filled_object}}</li>
*/

Template7.registerHelper('joinindex', function (arr, options) {
  // First we need to check is the passed arr argument is function
  if (typeof arr === 'function') arr = arr.call(this);

  arrmapped = arr.map(function(a){return a[options.hash.indexname]});
  /*
    Passed delimeter is in the options.hash object:
    console.log(options.hash) -> {delimeter: ', '}
  */
    //console.log(options.hash);
  // And return joined array
  return arrmapped.join(options.hash.delimeter);
});

Template7.registerHelper('if_filled_object', function (condition, options) {
  // "this" in function context is equal to the expression execution context
  // "condition" argument contains passed context/condition
  /*
    @options contains object with the wollowing properties and methods:
    "hash" - contains passed hash object with parameters
    "fn" - method to pass helper block content further to compilier
    "inverse" - method to pass helper block inverse ({{else}}) content further to compilier
    "data" - contains additional expression data, like @index for arrays or @key for object
  */
//console.log(options.data);
  // First we need to check is the passed context is function
  if (typeof condition === 'function') condition = condition.call(this);

  // If context condition - here json return an empty object named categories - the basic if dont test if empty
  if (typeof condition === 'object' && Object.keys(condition).length > 0 ) {
    // We need to pass block content further to compilier with the same context and the same data:
    return options.fn(this, options.data);
  }
  else {
    // We need to pass block inverse ({{else}}) content further to compilier with the same context and the same data:
    return options.inverse(this, options.data);
  }
});



// Initialize your app
var myApp = new Framework7({
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
var counter = document.getElementById('counter').innerHTML;
function get_latest_posts() {
  $$.getJSON ('http://michel-i5-imac.local:8888/wp_svn42/json/get_posts/',  function (json) {

      Template7.data.posts = json['posts'];
      Template7.data.counter = { count: json['count'], total_count: json['count_total'] };


      // compile it with Template7

      // Add main View
      mainView = myApp.addView('.view-main', {
          // Enable dynamic Navbar
          dynamicNavbar: true,
          domCache: true
      });

      var compiledTemplate = Template7.compile(counter);
      document.getElementById('posts_count').innerHTML = compiledTemplate(Template7.data.counter);
  });
};
get_latest_posts();

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
  }, 100);
});


