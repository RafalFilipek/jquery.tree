# jquery.tree
# https://github.com/RafalFilipek/jquery.tree
#
# Copyright (c) 2012 Rafał Filipek
# Licensed under the MIT license.

(($)->
	$.fn.tree = (options = {})->
		options = $.extend({
			'branch': 'ul'
			'node': 'li'
			'branch_class': 'branch'
			'auto_switch_add': false
			'switch': '.switch'
			'auto_open_class': 'open'
			'events': {}
		}, options)

		@.each(->
			tree = $(@)

			branchNodes = tree
				.find(options.node)
					.find(options.branch)
					.hide()
				.end()
				.has('ul')
				.addClass(options.branch_class)

			if $.isFunction(options.auto_switch_add) is true
				switchElement = options.auto_switch_add()
				branchNodes.prepend(switchElement)

			tree.find(".#{options.auto_open_class}").parents(options.branch).not(tree).show()

			tree.on('click', "#{options.switch}", (e)->
				node = $(@).closest(options.node)
				subtree = node.children('ul')
				subtree.toggle() if subtree.size() is 1
			)

			$.each(options.events, (def, fnc)->
				parts = def.split(' ')
				events = parts.shift().replace(',', ' ')
				selector = parts.join(' ')
				tree.on(events, selector, fnc) unless selector is undefined
			)
		)
)(jQuery)
