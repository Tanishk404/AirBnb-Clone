document.addEventListener("DOMContentLoaded", () => {
  const mapConfigs = [
    { id: "map", color: "red" },
    { id: "map2", color: "red" },
    { id: "map3", color: "red" },
  ];

mapConfigs.forEach(({id, color}) => {
  console.log(id)
  const el = document.getElementById(id);
  if(!el) return;
  mapboxgl.accessToken = MapToken;
  const map = new mapboxgl.Map({
    container: id,
    style: "mapbox://styles/mapbox/streets-v12",
    projection: "globe",
    zoom: 10,
    center: coordinates,
  });
  
  map.addControl(new mapboxgl.NavigationControl());
  map.scrollZoom.disable();
  
  const marker1 = new mapboxgl.Marker({ color }).setLngLat(coordinates).addTo(map);


    map.on("style.load", () => {
      map.setFog({});
    });

    map.on("load", () => {
      map.resize();
    });
  
  
  
})

})


