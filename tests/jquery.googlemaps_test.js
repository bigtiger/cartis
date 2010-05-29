(function($) {
  module('$.cartis')
  test('mapControl', function() {
    equals($.cartis.mapControl('GLargeMapControl3D'), 'GLargeMapControl3D', "Returns Large 3D Map Control when specified");
  });
})(jQuery);
