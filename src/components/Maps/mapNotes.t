

const searchQuery = ref(''); // Reactive variable for the search input

 let geocoder; // Store the geocoder instance
     // const response = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address.value)}.json?access_token=${mapboxgl.accessToken}`);

// const setMapCenter = (lat, lng) => {
//     lngs.value = lng;
//     lats.value = lat;
//     console.log(lngs.value, lats.value);
//     if (map.value) {
//         console.log('entered setMapCenter');
//         // console.log(map.value);
//         // map.value.setCenter([lng, lat]);
//         // new mapboxgl.Marker().setLngLat([lng, lat]).addTo(map.value);
//         map.value.setCenter([lng, lat]); // Update map center

//         // Remove the previous marker if it exists
//         if (marker.value) {
//             marker.value.remove();
//         }

//         // Add a new marker at the updated location
//         marker.value = new mapboxgl.Marker().setLngLat([lng, lat]).addTo(map.value);
//     }
// };
 // Optional: Add navigation controls (zoom, rotate, etc.)
    // map.addControl(new mapboxgl.NavigationControl());

    // Initialize and add the geocoder control
    // map.value.setLngLat(lngs.value, lats.value).addTo(map);

 // map.value.onMounted('load', () => {
    //     setMapCenter();
    //     console.log(lngs.value);
    // });
    // geocoder = new MapboxGeocoder({
    //     accessToken: mapboxgl.accessToken,
    //     mapboxgl: mapboxgl,
    //     placeholder: 'Enter address', // Placeholder text
    //     marker: false // Optionally disable default marker
    // });
    // map.addControl(geocoder);

    // Optional: add a custom event for when a result is selected
    // geocoder.on('result', (event) => {
    //     console.log(event.result);
    //     // Pan the map to the selected location
    //     const [lng, lat] = event.result.geometry.coordinates;
    //     map.flyTo({ center: [lng, lat], zoom: 18.7 });
    //     console.log(procStore.$state.processinput[0].procData.address);
    // });

    // Clean up the map when the component is destroyed
    // onBeforeUnmount(() => {
    //     if (map) map.remove();
    //     if (geocoder) geocoder.clear(); // Clean up the geocoder
    // });

    // Function to search for an address manually using the search bar
    // const searchAddress = () => {
    //     if (searchQuery.value) {
    //         geocoder.query(searchQuery.value); // Use the geocoder to search
    //     }
    // };
