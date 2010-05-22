(function($) {
  module('$.googleMaps')
  test('mapControl', function() {
    equals($.googleMaps.mapControl('GLargeMapControl3D'), 'GLargeMapControl3D', "Returns Large 3D Map Control when specified");
  });

    // mapControl: function(control) {
      // switch (control) {
        // case 'GLargeMapControl3D' :
          // return new GLargeMapControl3D();
        // break;
        // case 'GLargeMapControl' :
          // return new GLargeMapControl();
        // break;
        // case 'GSmallMapControl' :
          // return new GSmallMapControl();
        // break;
        // case 'GSmallZoomControl3D' :
          // return new GSmallZoomControl3D();
        // break;
        // case 'GSmallZoomControl' :
          // return new GSmallZoomControl();
        // break;
        // case 'GScaleControl' :
          // return new GScaleControl();
        // break;
        // case 'GMapTypeControl' :
          // return new GMapTypeControl();
        // break;
        // case 'GHierarchicalMapTypeControl' :
          // return new GHierarchicalMapTypeControl();
        // break;
        // case 'GOverviewMapControl' :
          // return new GOverviewMapControl();
        // break;
        // case 'GNavLabelControl' :
          // return new GNavLabelControl();
        // break;
      // }
      // return;
    // },


})(jQuery);
