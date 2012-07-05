/*global QUnit:false, module:false, test:false, asyncTest:false, expect:false*/
/*global start:false, stop:false ok:false, equal:false, notEqual:false, deepEqual:false*/
/*global notDeepEqual:false, strictEqual:false, notStrictEqual:false, raises:false*/
(function($) {

  module('jQuery#tree');

  test('is chainable', function(){
    var elems = $('#qunit-fixture').children('.tree');
    strictEqual(elems.tree(), elems, 'should be chaninable');
  });

  test('branches are marked', function(){
    $('#tree-1').tree();
    strictEqual($('#tree-1 .branch').size(), 1, 'single branch should be marked');

    $('#tree-2').tree();
    strictEqual($('#tree-2 .branch').size(), 2, 'multiple branches should be marked');

    $('#tree-3').tree();
    strictEqual($('#tree-3 .branch').size(), 4, 'multiple nested branches should be marked');
  });

  test('marekd elements should be visible', function(){
    $('#tree-3').tree();
    equal($('#tree-3 ul.open').parents('ul').is(':visible'), true, 'branch is visible');
    equal($('#tree-3 li.open').parents('ul').is(':visible'), true, 'branch node is visible');
  });

  test('switch element should toggle branch', function(){
    $('#tree-4').tree();
    equal($('#tree-4 .branch ul:first').is(':visible'), false, 'branch should be hidden before click');
    $('#tree-4').find('.switch').click();
    equal($('#tree-4 .branch ul:first').is(':visible'), true, 'branch should be visible after click');
  });

  test('events should be attached', function(){
    $('#tree-5').tree({
      'events': {
        'click .branch a.add': function(e){
          $(e.target).closest('.branch').children('ul').append('<li class="new">New</li>');
        }
      }
    });
    $('#tree-5 .add').click();
    equal($('#tree-5 li.new').size(), 1, 'new node should be added');
  });

  test('if set switch elements should be attached', function(){
    $('#tree-6').tree({
      'auto_switch_add': function(node){ return node.prepend($('<i>').addClass('switch')); }
    });
    equal($('#tree-6 .switch').size(), 2, 'switch elements are attached to branches');
    var switchElement = $('#tree-6 .switch:first');
    switchElement.click();
    equal(switchElement.parents('li').children('ul').is(':visible'), true, 'attached switch should execute branch toggle');
  });

  test('tree.branch_toggle event should be triggered', function(){
    $('#tree-7').tree()
    state = false
    $('#tree-7 li.branch').on('tree.branch_toggle', function(e,data){
      state = data.visible;
    });
    $('#tree-7 .switch').click()
    equal(state, true, 'state for clicked branch should be true');
  });

}(jQuery));
