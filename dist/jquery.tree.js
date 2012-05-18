/*! jQuery Tree - v0.1.0 - 2012-05-18
* https://github.com/RafalFilipek/jquery.tree
* Copyright (c) 2012 Rafał Filipek; Licensed MIT */

// Generated by CoffeeScript 1.3.3

(function($) {
  return $.fn.tree = function(options) {
    if (options == null) {
      options = {};
    }
    options = $.extend({
      'branch': 'ul',
      'node': 'li',
      'branch_class': 'branch',
      'auto_switch_add': false,
      'switch': '.switch',
      'auto_open_class': 'open',
      'events': {}
    }, options);
    return this.each(function() {
      var branchNodes, switchElement, tree;
      tree = $(this);
      branchNodes = tree.find(options.node).find(options.branch).hide().end().has('ul').addClass(options.branch_class);
      if ($.isFunction(options.auto_switch_add) === true) {
        switchElement = options.auto_switch_add();
        branchNodes.prepend(switchElement);
      }
      tree.find("." + options.auto_open_class).parents(options.branch).not(tree).show();
      tree.on('click', "" + options["switch"], function(e) {
        var node, subtree;
        node = $(this).closest(options.node);
        subtree = node.children('ul');
        if (subtree.size() === 1) {
          subtree.toggle();
        }
        return node.trigger('tree.branch_toggle', {
          'visible': subtree.is(':visible')
        });
      });
      return $.each(options.events, function(def, fnc) {
        var events, parts, selector;
        parts = def.split(' ');
        events = parts.shift().replace(',', ' ');
        selector = parts.join(' ');
        if (selector !== void 0) {
          return tree.on(events, selector, fnc);
        }
      });
    });
  };
})(jQuery);
