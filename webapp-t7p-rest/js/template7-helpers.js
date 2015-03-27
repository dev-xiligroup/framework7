// helpers for web-app
// not in main file now (my-app.js)
// 2015-03-17

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

Template7.registerHelper('linkstopostinotherlang', function (custom_fields, options) {
  var arrindex = Template7.data.ID_to_index;
  //console.log(arrindex);
  //console.log(custom_fields);
  var languages = [ {'slug':'fr_fr', 'name':'french'}, {'slug':'en_us', 'name':'english'}, {'slug':'de_de', 'name':'german'}];
  var tag_before = ( typeof(options.hash.before) == 'undefined' ) ? '<li>' : options.hash.before;
  var tag_after = ( typeof(options.hash.after) == 'undefined' ) ? '</li>' : options.hash.after;
  var link_title = ( typeof(options.hash.link_title) == 'undefined' ) ? 'Same in' : options.hash.link_title;
  var output = '';

  if ( Object.keys(custom_fields).length > 0 ) {
    $$.each(custom_fields, function(key, one_field) {
      $$.each(languages, function( keyl, lang) {
      if ( key == 'lang-'+lang['slug']) {
        var index = arrindex[one_field[0]];
        output += tag_before + '<a href="post.html?version='+index+'" class="item-content item-link" data-context-name="posts.'+index+'">'+link_title+' '+lang['name']+'</a>'+tag_after;
      }
      });
    });
  }
  return output;
});
