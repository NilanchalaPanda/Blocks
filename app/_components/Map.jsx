import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { useCallback, useState } from "react";

const containerStyle = {
  width: "720px",
  height: "650px",
  borderRadius: "10px",
};

const center = {
  lat: 19.076,
  lng: 72.8777,
};

const Map = () => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_PUBLIC_API_KEY,
  });

  const [map, setMap] = useState(null);

  const onLoad = useCallback(function callback(map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);
  return isLoaded ? (
    <div className="flex flex-col justify-center items-center overflow-hidden px-4 mb-10 xl:p-0">
      <h1 className="items-start text-lg lg:text-2xl text-primary/70">View your Location right into the Map</h1>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        {/* Child components, such as markers, info windows, etc. */}
        <></>
      </GoogleMap>
    </div>
  ) : (
    [1].map(() => (
      <div className="w-full h-[720px] bg-slate-200 flex rounded-xl justify-center items-center">
        <div
          className="w-10 h-10 border-4 border-dashed rounded-full animate-spin border-primary/30"
          role="status"
        ></div>
      </div>
    ))
  );
};

export default Map;
