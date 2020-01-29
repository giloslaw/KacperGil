mapa1 = document.getElementById("mapa1");
mapa2 = document.getElementById("mapa2");
mapa3 = document.getElementById("mapa3");


// require (["esri/Map", "esri/views/MapView"],
//    function(Map, MapView)
//    {
//     let map1 = new Map({basemap:"topo"});
    
     
//    })
   mapa1 = document.getElementById("mapa1");
mapa2 = document.getElementById("mapa2");
mapa3 = document.getElementById("mapa3");



require([
   "esri/Map",
   "esri/views/MapView",
   "esri/widgets/BasemapToggle",
   "esri/widgets/BasemapGallery",
   "esri/layers/GraphicsLayer",
   "esri/widgets/Sketch",
 "esri/layers/FeatureLayer"

 ], function(Map, MapView, BasemapToggle, BasemapGallery, GraphicsLayer, Sketch) {

   var map1 = new Map({
     basemap: "topo-vector"
   });

   let mapContainer = new MapView({
        container: "map1",  // miejsce gdzie chcemy osadzić mapę (bierzemy klasę z pliku html //
        map: map1  //czyli nasza zmienna z mapą bazową zdefiniowana wcześniej //
        , zoom:16,
        center: [9.1240,45.4781],
     });

   // var view = new MapView({
   //   container: "m",
   //   map: map,
   //   center: [22.57, 51.25],
   //   zoom: 16
   // });

   //  var basemapToggle = new BasemapToggle({
   //      view: view,
   //      nextBasemap: "satellite"
   //  });

   //  view.ui.add(basemapToggle, "bottom-right");
   //  var basemapGallery = new BasemapGallery({
   //      view: view,
   //      source: {
   //      portal: {
   //          url: "https://www.arcgis.com",
   //          useVectorBasemaps: true  // Load vector tile basemaps
   //      }
   //      }
   //  });
  
    var basemapGallery = new BasemapGallery({
        view: mapContainer,
        source: {
          portal: {
            url: "https://www.arcgis.com",
            //*** ADD ***//
            useVectorBasemaps: false  // Load raster tile basemaps
          }
        }
    });
    mapContainer.ui.add(basemapGallery, "top-right");
    var graphicsLayer = new GraphicsLayer();

    var sketch = new Sketch({
        view: mapContainer,
        layer: graphicsLayer
    });

    mapContainer.ui.add(sketch, "top-right");
        var stroke = {
            color: [255,0,0],
            width: 1
            }
    var fillColor = [255,255,255,.5];
    
    var pointSymbol = sketch.viewModel.pointSymbol;
    pointSymbol.color = fillColor;
    pointSymbol.outline = stroke;
    pointSymbol.size = 8;
    
    var polylineSymbol = sketch.viewModel.polylineSymbol;
    polylineSymbol.color = stroke.color;
    polylineSymbol.width = stroke.width;
    
    var polygonSymbol = sketch.viewModel.polygonSymbol;
    polygonSymbol.color = fillColor;
    polygonSymbol.outline = stroke;
    sketch.on("create", function(event) {
        if (event.state === "complete") {
            var attributes = {
                name: "My Graphic",
                type: event.graphic.geometry.type
            }
            event.graphic.attributes = attributes;

            var popupTemplate = {
                title: "{name}",
                content: "I am a {type}."
            }
            event.graphic.popupTemplate = popupTemplate;
        }
    });
//     var trailheadsLayer = new FeatureLayer({
//       url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trailheads/FeatureServer/0"
//   });

//   map.add(trailheadsLayer);
    
//     // Trails feature layer (lines)
//   var trailsLayer = new FeatureLayer({
//       url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trails/FeatureServer/0"
//   });

//   map.add(trailsLayer, 0);

//     // Parks and open spaces (polygons)
//   var parksLayer = new FeatureLayer({
//       url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/ArcGIS/rest/services/USA%20States/FeatureServer/0"
//   });

//   map.add(parksLayer, 0);

 });
   
   