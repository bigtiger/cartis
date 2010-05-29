(function($) {
  module('$.cartis.defaults')
  test('latitude', function() {
    ok(typeof($.cartis.defaults.latitude) == 'number', "is a number");
    ok($.cartis.defaults.latitude <= 180, "is less than or equal to the max latitude");
    ok($.cartis.defaults.latitude >= -180, "is greater than or equal to the minimum latitude");
  });

  test('longitude', function() {
    ok(typeof($.cartis.defaults.longitude) == 'number', "Default longitude is a number");
    ok($.cartis.defaults.longitude <= 180, "Default longitude is less than or equal to the max longitude");
    ok($.cartis.defaults.longitude >= -180, "Default longitude is greater than or equal to the minimum longitude");
  });

  test('depth', function() {
    ok(typeof($.cartis.defaults.depth) == 'number', "is a number");
    ok($.cartis.defaults.depth >= 0 && $.cartis.defaults.depth <= 18, "is within the valid range (0-18)");
  });

  test('scroll', function() {
    equals($.cartis.defaults.scroll, true, 'is enabled by default');
  });

  test('trafficInfo', function() {
    equals($.cartis.defaults.trafficInfo, false, 'is false (disabled) by default');
  });

  test('streetViewOverlay', function() {
    equals($.cartis.defaults.streetViewOverlay, false, "is false (disabled) by default");
  });

  test('layer', function() {
    equals($.cartis.defaults.layer, null, "is null by default");
  });

  module('$.cartis.defaults.controls');
  test('hide', function() {
    equals($.cartis.defaults.controls.hide, false, "is false (set to display) by default");
  });

  test('localSearchControl', function() {
    equals($.cartis.defaults.controls.localSearch, false, "is false (do not display) by default");
  });

  module('$.cartis.defaults.controls.zoom');
  test('zoom', function() {
    ok(typeof($.cartis.defaults.controls.zoom.minimum) == 'number', "is a number");
    ok($.cartis.defaults.controls.zoom.minimum >= 0 && $.cartis.defaults.controls.zoom.minimum <= 18, "is within the valid range (0-18)");
  });

})(jQuery);
