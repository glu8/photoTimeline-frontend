(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{36:function(e,t,n){e.exports=n(97)},43:function(e,t,n){},45:function(e,t,n){},49:function(e,t,n){},73:function(e,t,n){},75:function(e,t,n){},95:function(e,t,n){},97:function(e,t,n){"use strict";n.r(t);var o=n(1),i=n.n(o),a=n(33),r=n.n(a);n(43),n(45),n(3),n(0),n(47),n(34),n(49),n(5);n(35),n(73);n(75);var l=n(20);Object(l.GoogleApiWrapper)({apiKey:"AIzaSyCQQQZKC99E52XiY4bd1eZI_VOG2RFqsJ8"})(function(e){var t={lat:e.timelineData[0].latitude,lng:e.timelineData[0].longitude};return Object(o.useEffect)(function(){e.setCoordinates(t)},[]),i.a.createElement(l.Map,{google:e.google,onChange:function(t){var n=t.center,o=t.zoom;e.setCoordinates(n),e.setZoom(o)},zoom:e.zoom,style:{width:"100%",height:"100%"},initialCenter:e.coordinates,center:e.coordinates,streetViewControl:!1,fullscreenControl:!1,options:{styles:[{stylers:[{saturation:50},{gamma:.5}]}]}},e.timelineData.map(function(t,n){return t.imageMetadata.map(function(t,o){return console.log(t),i.a.createElement(l.Marker,{key:t._id+"_marker",id:t._id+"_marker",position:{lat:t.latitude,lng:t.longitude},onClick:function(){e.setCoordinates({lat:t.latitude,lng:t.longitude}),e.setZoom(e.standardZoom),e.scrollTimelineItemIntoView(n)},style:{backgroundColor:"blue"}})})}))});n(7);n(95);var c=function(){return i.a.createElement("div",null,"Hello World!")},u=function(e){e&&e instanceof Function&&n.e(1).then(n.bind(null,98)).then(function(t){var n=t.getCLS,o=t.getFID,i=t.getFCP,a=t.getLCP,r=t.getTTFB;n(e),o(e),i(e),a(e),r(e)})};r.a.createRoot(document.getElementById("root")).render(i.a.createElement(c,null)),u()}},[[36,3,2]]]);
//# sourceMappingURL=main.a1467569.chunk.js.map