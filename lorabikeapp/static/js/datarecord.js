$(document).ready(function() {
  // create map instance
  let map = new BMap.Map("track-map");
  // create a central point
  const minDisplayLevel = 3;
  const maxDisplayLevel = 19;

  let x_nums = $('.x-num').map(function() {
    return parseFloat($(this).text());
  });
  let y_nums = $('.y-num').map(function() {
    return parseFloat($(this).text());
  });
  let la_nums = $('.la-num').map(function() {
    return parseFloat($(this).text());
  });  
  let tr_nums = $('.tr-num').map(function() {
    return $(this).text();
  });
  let fr_nums = $('.fr-num').map(function() {
    return parseInt($(this).text());
  });
  
  let setZoom = function(points) {
    console.log('setZoom');
    map.centerAndZoom(points[0], maxDisplayLevel);
    map.enableScrollWheelZoom(true);
    map.addControl(new BMap.NavigationControl());
  };

  let showPath = function(startPoint, EndPoint) {
    let walking = new BMap.WalkingRoute(map, { 
      renderOptions: {map: map, autoViewport: true},
      onPolylinesSet: function(routes) {
        map.addOverlay(routes[0].getPolyline());
      },
      onMarkersSet: function(routes) {
        map.removeOverlay(routes[0].marker);
        map.removeOverlay(routes[1].marker);
      },
    });
    walking.search(startPoint, EndPoint);
    /*
    walking.setSearchCompleteCallback(function (rs) {
      const pts = walking.getResults().getPlan(0).getRoute(0).getPath();
      map.addOverlay(new BMap.Polyline(pts, { strokeColor: "green", strokeWeight: 2, strokeOpacity: 1 }));
    });
    */
  };

  let infos = [];
  let points = [];

  let displayLocation = function() {
    for (let index = 0; index < la_nums.length; index++) {
      if (la_nums[index] != 0) {
        infos.push({tr: tr_nums[index], fr: fr_nums[index]});
        points.push(new BMap.Point(y_nums[index], x_nums[index]));
      }
    }
    setZoom(points);
    // const polyline = new BMap.Polyline(points, {strokeColor:"red", strokeWeight:6, strokeOpacity:0.5});
    // map.addOverlay(polyline);
    for (let index = 0; index < points.length - 1; index++) {
      showPath(points[index], points[index + 1]);
    }
    points.forEach(function(value, index) {
      let marker = new BMap.Marker(value);
      const infoWin = new BMap.InfoWindow('time: ' + infos[index].tr + '\ncount: ' + infos[index].fr,
                                          {enableMessage: false, width: 30, height: 20});
      marker.addEventListener("click", function() {
        this.openInfoWindow(infoWin);
      });
      map.addOverlay(marker);
      // console.log(index);
    });
  };

  window.setTimeout(displayLocation, 5000);

});