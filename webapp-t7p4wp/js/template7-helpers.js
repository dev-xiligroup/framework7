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
