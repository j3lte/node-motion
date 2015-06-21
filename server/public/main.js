(function($) {
  var domain = document.domain;
  var $image = $('.stream');
  if ($image) {
   $image.attr('src', '//' + domain + ':' + $image.data('port') + '/stream.mjpeg');
  }
})(jQuery);
