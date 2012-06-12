/*
 * jQuery Plugin: Auto Input Size
 * Version 0.1.0
 * Heavily influenced by this jsfiddle: http://jsfiddle.net/9BFQ8/77/
 *
 * Copyright (c) 2012 Christoph Lupprich (http://carbonative.com)
 * Licensed jointly under the GPL and MIT licenses,
 * choose which one suits your project best!
 *
 */
 
(function($) {
  
  measureText = function(text, font, fontSize) {
    var id = 'text-width-tester',
      $tag = $('#' + id);
      
    if (!$tag.length) {
      $tag = $('<span id="' + id + '" style="display:none;">' + text + '</span>');
      $tag.css({ 'font': font, 'font-size': fontSize });
      $('body').append($tag);
    } else {
      $tag.css({ 'font': font, 'font-size': fontSize }).html(text);
    }
    
    return {
      width: $tag.width(),
      height: $tag.height()
    }
  }
  
  shrinkToFit = function(el) {
    var text = el.val(),
      maxWidth = el.width() + 10;
      
    font = el.css('font');
    fontSize = parseInt(el.data('original-font-size'));
      
    var textWidth = measureText(text, font, fontSize).width;

    if (textWidth > maxWidth) {
      fontSize = fontSize * maxWidth / textWidth * .9;
      el.css('font-size', fontSize + "px");
    } else {
      el.css('font-size', el.data('original-font-size'));
    }
  }
  
  setWidthAndHeight = function(el) {
    el.css({ 'width': el.width() + 'px', 'height': el.height() + 'px'});
    el.data('original-font-size', el.css('font-size'));
  }
  
  $(document).ready(function() {
    $('input.autoinputsize').each(function(i, el) {
      setWidthAndHeight($(this));
      shrinkToFit($(this));
    })
    .on('keyup', function() {
      shrinkToFit($(this));
    });
    
  });
  
})(jQuery);