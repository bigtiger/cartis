/*
 ### Cartis: a jQuery Google Maps Plugin v1.03 ###
 * BasedOn: http://www.mayzes.org/googlemaps.jquery.html
 *
 * Dual licensed under the MIT and GPL licenses.
 *   http://www.gnu.org/licenses/gpl.html
 *   http://www.opensource.org/licenses/mit-license.php
 ###
*/
(function($) {
  $.fn.cartis = function(options) {

    if (!window.GBrowserIsCompatible || !GBrowserIsCompatible())  {
       return this;
    }

    var googleOpts = {
      center: ($.cartis.mapLatLong($.cartis.defaults.latitude, $.cartis.defaults.longitude)),

    };

    var opts = $.extend({}, $.cartis.defaults, googleOpts, options);

    return this.each(function() {
      // Create Map
      $.cartis.gMap = new google.maps.Map(this, opts);
      $.cartis.mapsConfiguration(opts);
    });
  };

  $.cartis = {

    // Returns the visible rectangular region of the map view in
    // geographical coordinates.
    bounds: function() {
      return $.cartis.gMap.getBounds();
    },

    mapsConfiguration: function(opts) {
      // GEOCODE
      if ( opts.geocode ) {
        geocoder = new GClientGeocoder();
        geocoder.getLatLng(opts.geocode, function(center) {
          if (!center) {
            alert(address + " not found");
          } else {
            $.cartis.gMap.setCenter(center, opts.depth);
            $.cartis.latitude = center.x;
            $.cartis.longitude = center.y;
          }
        });
      } else {
        // Latitude & Longitude Center Point
        var center = $.cartis.mapLatLong(opts.latitude, opts.longitude);
        // Set the center of the Map with the new Center Point and Depth
        $.cartis.gMap.setCenter(center, opts.depth);
      }

      // POLYLINE
      if ( opts.polyline ) {
        // Draw a PolyLine on the Map
        $.cartis.gMap.addOverlay($.cartis.mapPolyLine(opts.polyline));
      }
      // GEODESIC
      if ( opts.geodesic ) {
        $.cartis.mapGeoDesic(opts.geodesic);
      }
      // PAN
      if ( opts.pan ) {
        // Set Default Options
        opts.pan = $.cartis.mapPanOptions(opts.pan);
        // Pan the Map
        window.setTimeout(function() {
          $.cartis.gMap.panTo($.cartis.mapLatLong(opts.pan.panLatitude, opts.pan.panLongitude));
        }, opts.pan.timeout);
      }

      // LAYER
      if ( opts.layer ) {
        // Set the Custom Layer
        $.cartis.gMap.addOverlay(new GLayer(opts.layer));
      }

      // MARKERS
      if ( opts.markers ) {
        $.cartis.addMapMarkers(opts.markers);
      }

      // CONTROLS
      if ( opts.controls.type || opts.controls.zoom ||  opts.controls.mapType ) {
        $.cartis.mapControls(opts.controls);
      } else {
        if ( !opts.controls.hide ) {
          $.cartis.gMap.setUIToDefault();
        }
      }

      // SCROLL
      if ( opts.scroll ) {
        $.cartis.gMap.enableScrollWheelZoom();
      } else {
        if ( !opts.scroll ) {
          $.cartis.gMap.disableScrollWheelZoom();
        }
      }

      // LOCAL SEARCH
      if ( opts.controls.localSearch ) {
        $.cartis.gMap.enableGoogleBar();
      } else {
        $.cartis.gMap.disableGoogleBar();
      }

      // FEED (RSS/KML)
      if ( opts.feed ) {
        $.cartis.gMap.addOverlay(new GGeoXml(opts.feed));
      }

      // TRAFFIC INFO
      if ( opts.trafficInfo ) {
        var trafficOptions = {incidents:true};
        trafficInfo = new GTrafficOverlay(trafficOptions);
        $.cartis.gMap.addOverlay(trafficInfo);
      }

      // DIRECTIONS
      if ( opts.directions ) {
        $.cartis.directions = new GDirections($.cartis.gMap, opts.directions.panel);
        $.cartis.directions.load(opts.directions.route);
      }

      if ( opts.streetViewOverlay ) {
        svOverlay = new GStreetviewOverlay();
      $.cartis.gMap.addOverlay(svOverlay);
      }
    },

    mapGeoDesic: function(options) {
      // Default GeoDesic Options
      geoDesicDefaults = {
        startLatitude:	37.4419,
        startLongitude: -122.1419,
        endLatitude:	37.4519,
        endLongitude:	-122.1519,
        color:          '#ff0000',
        pixels:         2,
        opacity:        10
      }
      // Merge the User & Default Options
      options = $.extend({}, geoDesicDefaults, options);
      var polyOptions = {geodesic:true};
      var polyline = new GPolyline([
        new GLatLng(options.startLatitude, options.startLongitude),
        new GLatLng(options.endLatitude, options.endLongitude)],
        options.color, options.pixels, options.opacity, polyOptions
      );
      $.cartis.gMap.addOverlay(polyline);
    },

    localSearchControl: function(options) {
      var controlLocation = $.cartis.mapControlsLocation(options.location);
      $.cartis.gMap.addControl(
        new $.cartis.gMap.LocalSearch(),
        new GControlPosition(
          controlLocation,
          new GSize(options.x,options.y)
        )
      );
    },

    getLatitude: function() {
      return $.cartis.latitude;
    },

    getLongitude: function() {
      return $.cartis.longitude;
    },

    directions: {},
    latitude: '',
    longitude: '',
    latlong: {},
    maps: {},
    marker: {},
    gMap: {},
    defaults: {
      // Default Map Options
      latitude: 37.4419,
      longitude: -122.1419,
      depth: 13,
      scroll: true,
      trafficInfo: false,
      streetViewOverlay: false,
      controls: {
        hide: false,
        localSearch: false,
        zoom: {
          minimum: 0, // lowest, the entire world on one map
          maximum: 19, // highest, down to individual buildings
        }
      },
      layer: null
    },

    mapPolyLine: function(options) {
      // Default PolyLine Options
      polylineDefaults = {
        startLatitude:	37.4419,
        startLongitude: -122.1419,
        endLatitude:	37.4519,
        endLongitude:	-122.1519,
        color:          '#ff0000',
        pixels:         2
      }
      // Merge the User & Default Options
      options = $.extend({}, polylineDefaults, options);
      //Return the New Polyline
      return new GPolyline([
        $.cartis.mapLatLong(options.startLatitude, options.startLongitude),
        $.cartis.mapLatLong(options.endLatitude, options.endLongitude)],
        options.color,
        options.pixels
      );
    },

    mapLatLong: function(latitude, longitude) {
      return new google.maps.LatLng(latitude, longitude);
    },

    mapPanOptions: function(options) {
      // Returns Panning Options
      var panDefaults = {
        panLatitude:  37.4569,
        panLongitude: -122.1569,
        timeout:      0
      }
      return options = $.extend({}, panDefaults, options);
    },

    mapMarkersOptions: function(icon) {
      var gIcon = new GIcon(G_DEFAULT_ICON);
      if ( icon.image ) {
        gIcon.image = icon.image;
      }
      if ( icon.shadow ) {
        gIcon.shadow = icon.shadow;
      }
      if ( icon.iconSize ) {
        gIcon.iconSize = new GSize(icon.iconSize);
      }
      if ( icon.shadowSize ) {
        gIcon.shadowSize = new GSize(icon.shadowSize);
      }
      if ( icon.iconAnchor ) {
        gIcon.iconAnchor = new GPoint(icon.iconAnchor);
      }
      if ( icon.infoWindowAnchor ) {
        gIcon.infoWindowAnchor = new GPoint(icon.infoWindowAnchor);
      }
      if ( icon.dragCrossImage ) {
        gIcon.dragCrossImage = icon.dragCrossImage;
      }
      if ( icon.dragCrossSize ) {
        gIcon.dragCrossSize = new GSize(icon.dragCrossSize);
      }
      if ( icon.dragCrossAnchor ) {
        gIcon.dragCrossAnchor = new GPoint(icon.dragCrossAnchor);
      }
      if ( icon.maxHeight ) {
        gIcon.maxHeight = icon.maxHeight;
      }
      if ( icon.PrintImage ) {
        gIcon.PrintImage = icon.PrintImage;
      }
      if ( icon.mozPrintImage ) {
        gIcon.mozPrintImage = icon.mozPrintImage;
      }
      if ( icon.PrintShadow ) {
        gIcon.PrintShadow = icon.PrintShadow;
      }
      if ( icon.transparent ) {
        gIcon.transparent = icon.transparent;
      }
      return gIcon;
    },

    addMapMarker: function(marker) {
      var gIcon = null;
      var gMarker = null;

      if ( marker.icon ) {
        gIcon = $.cartis.mapMarkersOptions(marker.icon);
      }

      if ( marker.latitude && marker.longitude ) {
        center = $.cartis.mapLatLong(marker.latitude, marker.longitude);
        gMarker = new GMarker(center, {draggable: marker.draggable, icon: gIcon});
      }

      $.cartis.gMap.addOverlay(gMarker);

      if (marker.geocode) {
        var geocoder = new GClientGeocoder();
        geocoder.getLatLng(marker.geocode, function(center) {
          if (!center) {
            alert(address + " not found");
          } else {
            gMarker = new GMarker(center, {draggable: marker.draggable, icon: gIcon});
          }
        });
      } else {
        if ( marker.info ) {
          $(marker.info.layer).hide();
          if ( marker.info.popup ) {
            gMarker.openInfoWindowHtml($(marker.info.layer).html());
          } else {
            gMarker.bindInfoWindowHtml(
              $(marker.info.layer).html().toString()
            );
          }
        }
      }
      return gMarker;
    },

    addMapMarkers: function(markers) {
      var gMarkers = [];

      $.each(markers, function(i) {
        var marker = markers[i];
        gMarkers.push($.cartis.addMapMarker(marker));
      });
      return gMarkers;
    },

    mapMarkers: function(markers) {
      console.log("DEPRECATION WARNING: mapMarkers will be removed in the 1.1 release");
      return addMapMarkers(markers);
    },

    click: function(gObject, click_function) {
      GEvent.addListener(gObject, 'click', click_function);
    },

    hover: function(gObject, mouseover_function, mouseout_function) {
      GEvent.addListener(gObject, 'mouseover', mouseover_function);
      GEvent.addListener(gObject, 'mouseout', mouseout_function);
    },

    mapControlsLocation: function(location) {
      switch (location) {
        case 'G_ANCHOR_TOP_RIGHT' :
          return G_ANCHOR_TOP_RIGHT;
        break;
        case 'G_ANCHOR_BOTTOM_RIGHT' :
          return G_ANCHOR_BOTTOM_RIGHT;
        break;
        case 'G_ANCHOR_TOP_LEFT' :
          return G_ANCHOR_TOP_LEFT;
        break;
        case 'G_ANCHOR_BOTTOM_LEFT' :
          return G_ANCHOR_BOTTOM_LEFT;
        break;
      }
      return;
    },

    mapControl: function(control) {
      switch (control) {
        case 'GLargeMapControl3D' :
          return new GLargeMapControl3D();
        break;
        case 'GLargeMapControl' :
          return new GLargeMapControl();
        break;
        case 'GSmallMapControl' :
          return new GSmallMapControl();
        break;
        case 'GSmallZoomControl3D' :
          return new GSmallZoomControl3D();
        break;
        case 'GSmallZoomControl' :
          return new GSmallZoomControl();
        break;
        case 'GScaleControl' :
          return new GScaleControl();
        break;
        case 'GMapTypeControl' :
          return new GMapTypeControl();
        break;
        case 'GHierarchicalMapTypeControl' :
          return new GHierarchicalMapTypeControl();
        break;
        case 'GOverviewMapControl' :
          return new GOverviewMapControl();
        break;
        case 'GNavLabelControl' :
          return new GNavLabelControl();
        break;
      }
      return;
    },

    mapTypeControl: function(type) {
      switch ( type ) {
        case 'ROADMAP' :
          return MapTypeId.ROADMAP;
        break;
        case 'SATELLITE' :
          return MapTypeId.SATELLITE;
        break;
        case 'HYBRID' :
          return MapTypeId.HYBRID;
        break;
        case 'TERRAIN' :
          return MapTypeId.TERRAIN;
        break;
      }
      return;
    },

    mapControls: function(options) {
      // Default Controls Options
      controlsDefaults = {
        type: {
          location: 'G_ANCHOR_TOP_RIGHT',
          x: 10,
          y: 10,
          control: 'GMapTypeControl'
        },
        zoom: {
          location: 'G_ANCHOR_TOP_LEFT',
          x: 10,
          y: 10,
          control: 'GLargeMapControl3D'
        }
      };
      // Merge the User & Default Options
      options = $.extend({}, controlsDefaults, options);
      options.type = $.extend({}, controlsDefaults.type, options.type);
      options.zoom = $.extend({}, controlsDefaults.zoom, options.zoom);

      if ( options.type ) {
        var controlLocation = $.cartis.mapControlsLocation(options.type.location);
        var controlPosition = new GControlPosition(controlLocation, new GSize(options.type.x, options.type.y));
        $.cartis.gMap.addControl($.cartis.mapControl(options.type.control), controlPosition);
      }
      if ( options.mapType ) {
        if ( options.mapType.length >= 1 ) {
          for ( i = 0; i<options.mapType.length; i++) {
            if ( options.mapType[i].remove ) {
              $.cartis.gMap.removeMapType($.cartis.mapTypeControl(options.mapType[i].remove));
            }
            if ( options.mapType[i].add ) {
              $.cartis.gMap.addMapType($.cartis.mapTypeControl(options.mapType[i].add));
            }
          }
        }
        else {
          if ( options.mapType.add ) {
            $.cartis.gMap.addMapType($.cartis.mapTypeControl(options.mapType.add));
          }
          if ( options.mapType.remove ) {
            $.cartis.gMap.removeMapType($.cartis.mapTypeControl(options.mapType.remove));
          }
        }
      }
      if ( options.zoom ) {
        var controlLocation = $.cartis.mapControlsLocation(options.zoom.location);
        var controlPosition = new GControlPosition(controlLocation, new GSize(options.zoom.x, options.zoom.y))
        var mapTypes = $.cartis.gMap.getMapTypes()

        $.cartis.gMap.addControl($.cartis.mapControl(options.zoom.control), controlPosition);

        $.each(mapTypes, function(mapType) {
          var mapType = mapTypes[mapType];
          if (options.zoom.minimum) {
            mapType.getMinimumResolution = function() {
              return options.zoom.minimum;
            }
          }
          if (options.zoom.maximum) {
            mapType.getMaximumResolution = function() {
              return options.zoom.maximum;
            }
          }
        });
      }
    },

    geoCode: function(options) {
      geocoder = new GClientGeocoder();

      geocoder.getLatLng(options.address, function(point) {
        if (!point) {
          alert(address + " not found");
        } else {
          $.cartis.gMap.setCenter(point, options.depth);
        }
      });
    }
  };
})(jQuery);
