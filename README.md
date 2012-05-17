# jQuery Tree

Tree plugin for jQuery

## Getting Started
Download the [production version][min] or the [development version][max].

[min]: https://raw.github.com/RafalFilipek/jquery.tree/master/dist/jquery.tree.min.js
[max]: https://raw.github.com/RafalFilipek/jquery.tree/master/dist/jquery.tree.js

In your web page:

```html
<ul id="tree">
  <li>
    <span class="switch">+</span>Folder1
    <ul>
      <li><span class="switch">+</span>Folder1.1
        <ul>
          <li>Folder1.1.1</li>
        </ul>
      </li>
      <li>Folder1.2</li>
    </ul>
  </li>
</ul>
<script src="jquery.js"></script>
<script src="dist/jquery.tree.min.js"></script>
<script>
jQuery(function($) {
  $('#tree').tree()
});
</script>
```

## Documentation
`jQuery Tree` is a **simple** plugin. Keep in mind that you will never find here fancy animations, themes and things like that. It was created to toggle branches of your `tree`.
This plugin will not change your html code unless you want to.

However you still have some configuration options:

 * `branch` : By default, `ul` element inside `root` node.
 * `node` : By default, `li` element.
 * `branch_class` : This class will be added to node elements that contains another branch.
 * `auto_switch_add` : Default `false`. You can specify this option as a function. That returns jQuery object witch will be prepended into all node elements that contains another branch.
 * `switch` : By default, `.switch`. This selector defines element which will toggle subbranch for specified node. If your're using `auto_switch_add` option remember to add this class to element.
 * `auto_open_class`: By default, `open`. If you will add this class to any node or branch it will be visible after initialization.
 * `events` : By default its a `{}` ( empty object ). Here you can specify all events for any element of your tree. Keys defiens events names and selected and values is a function that will be executed. You can find some examples in _Examples_ section.

## Examples

```javascript
//Dynamic switch
$('#tree').tree({
  'auto_switch_add': function(){ return $('<i>').addClass('switch icon-plus'); },
});

// Custom event
$('#tree').tree({
  'events': {
    'click .branch a.add': function(e){
      $(e.target).closest('.branch').children('ul').append('<li class="new">New</li>');
    }
  }
});
// Multiple custom events
$('#tree').tree({
  'events': {
    'dblclick,click .branch': function(e){
      console.log e.type
    }
  }
});
```

- - -

By default its up to you to if you want to create switch element or not.
Also in this example,  `li` element with `open` class will by visibile by default.

```html
<ul id="tree">
  <li>
    <span class="switch">+</span>Folder1
    <ul>
      <li><span class="switch">+</span>Folder1.1
        <ul>
          <!--- This element will be visible by default -->
          <li class="open">Folder1.1.1</li>
        </ul>
      </li>
      <li>Folder1.2</li>
    </ul>
  </li>
</ul>
```

You can also look for some examples in `test/jquery.tree_test.js` file.

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [grunt](https://github.com/cowboy/grunt).

_Also, please don't edit files in the "dist" subdirectory as they are generated via grunt. You'll find source code in the "src" subdirectory!_

## Release History
_(Nothing yet)_

## License
Copyright (c) 2012 Rafał Filipek
Licensed under the MIT license.
