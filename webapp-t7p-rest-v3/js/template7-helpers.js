// helpers for web-app
// not in main file now (my-app.js)
// 2015-03-17

/* two helpers "if_filled_object" & "joinindex" used in post.html
    <li>{{#if_filled_object categories}}<b>Categories: </b>{{joinindex categories delimeter=" | " indexname="title"}}{{else}}<em>Uncategorized yet...</em>{{/if_filled_object}}</li>
*/
// var termarray = "version-history";
 var termseries = "http://v2.wp-api.org/term";


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

Template7.registerHelper('termsarray', function ( arr, options) {
  var output = [];
  var thedelimiter = ( typeof(options.hash.delimiter) == 'undefined' ) ? ' | ' : options.hash.delimiter;
  //console.log('---- ' + JSON.stringify( arr[termseries] ));
  // console.log('---- ' + JSON.stringify( arr.self ));
  $$.each( arr[termseries], function(key, one_taxonomy) {
    output.push(one_taxonomy.taxonomy);
  });

  return output.join( thedelimiter );

});

Template7.registerHelper('taxonomiesarray', function ( arr, options) {
  var output = '';
//console.log('---- ' + JSON.stringify( arr.self ));
  $$.each( arr[termseries], function(key, one_taxonomy) {
    if (one_taxonomy.taxonomy == options.hash.taxonomy ) {
      output = one_taxonomy.embeddable ;
    }
  });
  return output;
});

Template7.registerHelper('taxonomylist', function ( arr, options) {
  var output = '';
  var listoutput = [];
  var thedelimiter = ( typeof(options.hash.delimiter) == 'undefined' ) ? ' | ' : options.hash.delimiter;
  var element = options.hash.taxonomy;
  //console.log(element + ' ---- ' + JSON.stringify( arr ));
  if ( arr[element] ) {
    $$.each( arr[element] , function(key, one_taxonomy) {
      if ( element == 'language')
        listoutput.push(one_taxonomy.description);
      else
        listoutput.push(one_taxonomy.name);
    });
    output = listoutput.join( thedelimiter );
  }
  return output;
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
  if (typeof condition === 'array' && condition.length > 0 ) {
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
  console.log( JSON.stringify( arrindex) );
  //console.log( '---> ' + JSON.stringify( custom_fields ) );
  var languages = [ {'slug':'fr_fr', 'name':'french'}, {'slug':'en_us', 'name':'english'}, {'slug':'de_de', 'name':'german'}];
  var tag_before = ( typeof(options.hash.before) == 'undefined' ) ? '<li>' : options.hash.before;
  var tag_after = ( typeof(options.hash.after) == 'undefined' ) ? '</li>' : options.hash.after;
  var link_title = ( typeof(options.hash.link_title) == 'undefined' ) ? 'Same in' : options.hash.link_title;
  var output = '';

  if ( Object.keys(custom_fields).length > 0 ) {
    $$.each(custom_fields, function(key, one_field) {
      $$.each(languages, function( keyl, lang) { console.log(arrindex[one_field[0]]);
      if ( typeof(arrindex[one_field[0]])!='undefined' && key == 'lang-'+lang['slug']) {
        var index = arrindex[one_field[0]];
        output += tag_before + '<a href="post.html?version='+index+'" class="item-content item-link" data-context-name="posts.'+index+'">'+link_title+' '+lang['name']+'</a>'+tag_after;
      }
      });
    });
  }
  return output;
});
