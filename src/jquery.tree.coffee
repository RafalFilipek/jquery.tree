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

			tree.off('.tree')

			branchNodes = tree
				.find(options.node)
					.find(options.branch)
					.hide()
				.end()
				.has(options.branch)
				.addClass(options.branch_class)

			if $.isFunction(options.auto_switch_add) is true
				options.auto_switch_add(branchNodes)

			tree.find(".#{options.auto_open_class}").parents(options.branch).not(tree).show()

			tree.on('click.tree', "#{options.switch}", (e)->
				e.stopPropagation()
				node = $(@).closest(options.node)
				subtree = node.children(options.branch)
				subtree.toggle() if subtree.size() is 1
				method = if subtree.is(':visible') then 'show' else 'hide'
				subtree.find("#{options.node}.#{options.branch_class}")[method]()
				node.trigger('tree.branch_toggle', {'visible':subtree.is(':visible')})
			)

			$.each(options.events, (def, fnc)->
				parts = def.split(' ')
				events = parts.shift().split(',')
				events = $.each(events, (event)->event + '.tree').join(' ')
				selector = parts.join(' ')
				tree.on(events, selector, fnc) unless selector is undefined
			)
		)
)(jQuery)
