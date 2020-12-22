var style = new ol.style.Style({
      image: new ol.style.Circle({
          radius: 10,
          stroke: new ol.style.Stroke({
            color: 'rgba(200,200,200,1.0)',
            width: 3,
          }),
          fill: new ol.style.Fill({
            color: 'rgba(255,0,0,1.0)'
          })
      }),
      text: new ol.style.Text({
          font: 'normal 13px "roboto", "Arial Unicode MS", "sans-serif"',
          placement: 'point',
          fill: new ol.style.Fill({color: '#ffffff'}),
          stroke: new ol.style.Stroke({color: '#000000', width: 3}),
      }),
  });

let url = window.location.href;
let filename = url.split('/').pop().split('?')[0];
var aargang = filename.split('.').shift();

var pointStyleFunction = function(feature) {
	if(aargang=="alt"){
		style.getText().setText(feature.get('name'));
		return style;
	}else{
		 if(feature.get('year')==aargang){
		  style.getText().setText(feature.get('name'));
		  return style;
		 }
	}
}
     
var map = new ol.Map({
  target: 'map',
  layers: [
    new ol.layer.Tile({
      source: new ol.source.XYZ({
        attributions: '<a href="http://kartverket.no/">Kartverket</a>',
        url: 'https://opencache.statkart.no/gatekeeper/gk/gk.open_gmaps?layers=topo4&zoom={z}&x={x}&y={y}'
		//url: 'https://opencache.statkart.no/gatekeeper/gk/gk.open_gmaps?layers=toporaster4&zoom={z}&x={x}&y={y}'
      })
    }),
    new ol.layer.Vector({
      source: new ol.source.Vector({
        attributions: 'Kevin Utap | <a href="https://creativecommons.org/licenses/by/4.0/">Creative Commons BY 4.0 (CC BY 4.0)</a> |',
        //url: 'https://overpass-api.de/api/interpreter?data=node[historic=charcoal_pile](59.67,10.05,60.34,11.46);out;',
		url: 'https://kevinutapgithub.github.io/kevin.geojson',
		//http://rcn.montana.edu/Resources/Converter.aspx
		//https://geojson.io/#map=17/59.97954/10.76419
        format: new ol.format.GeoJSON()
      }),
	  style: pointStyleFunction
    })
  ],
  view: new ol.View({
    center: ol.proj.fromLonLat([10.6,60.05]),
    zoom: 10
  })
});

function onClick(e) {
  var features = map.getFeaturesAtPixel(e.pixel);
  if (features && features.length > 0) {
    var coords = features[0].get("post");
    alert(ol.proj.transform(coords, "EPSG:3857", "EPSG:4326"));
  }
}
map.on("click", onClick);