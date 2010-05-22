(function($) {
  module('$.googleMaps.defaults')
  test('latitude', function() {
    ok(typeof($.googleMaps.defaults.latitude) == 'number', "is a number");
    ok($.googleMaps.defaults.latitude <= 180, "is less than or equal to the max latitude");
    ok($.googleMaps.defaults.latitude >= -180, "is greater than or equal to the minimum latitude");
  });

  test('longitude', function() {
    ok(typeof($.googleMaps.defaults.longitude) == 'number', "Default longitude is a number");
    ok($.googleMaps.defaults.longitude <= 180, "Default longitude is less than or equal to the max longitude");
    ok($.googleMaps.defaults.longitude >= -180, "Default longitude is greater than or equal to the minimum longitude");
  });

  test('depth', function() {
    ok(typeof($.googleMaps.defaults.depth) == 'number', "is a number");
    ok($.googleMaps.defaults.depth >= 0 && $.googleMaps.defaults.depth <= 18, "is within the valid range (0-18)");
  });

  test('scroll', function() {
    equals($.googleMaps.defaults.scroll, true, 'is enabled by default');
  });

  test('trafficInfo', function() {
    equals($.googleMaps.defaults.trafficInfo, false, 'is false (disabled) by default');
  });

  test('streetViewOverlay', function() {
    equals($.googleMaps.defaults.streetViewOverlay, false, "is false (disabled) by default");
  });

  test('layer', function() {
    equals($.googleMaps.defaults.layer, null, "is null by default");
  });

  module('$.googleMaps.defaults.controls');
  test('hide', function() {
    equals($.googleMaps.defaults.controls.hide, false, "is false (set to display) by default");
  });

  test('localSearchControl', function() {
    equals($.googleMaps.defaults.controls.localSearch, false, "is false (do not display) by default");
  });

  module('$.googleMaps.defaults.controls.zoom');
  test('zoom', function() {
    ok(typeof($.googleMaps.defaults.controls.zoom.minimum) == 'number', "is a number");
    ok($.googleMaps.defaults.controls.zoom.minimum >= 0 && $.googleMaps.defaults.controls.zoom.minimum <= 18, "is within the valid range (0-18)");
  });

})(jQuery);
