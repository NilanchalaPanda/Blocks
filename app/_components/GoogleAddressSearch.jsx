"use client";

import { MapPin } from "lucide-react";
import GooglePlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-google-places-autocomplete";

const GoogleAddressSearch = ({ setSelectedAddress, setCoordinates }) => {
  return (
    <div className="flex items-center w-full">
      <MapPin className="h-9 w-10 p-2 rounded-l-[8px] text-primary bg-purple-200 lg:h-10" />
      <GooglePlacesAutocomplete
        apiKey={process.env.NEXT_PUBLIC_GOOGLE_PUBLIC_API_KEY}
        selectProps={{
          placeholder: "Search your property address",
          isClearable: true,
          className: "w-full",
          onChange: (place) => {
            console.log(place);
            setSelectedAddress(place);
            geocodeByAddress(place?.label)
              .then((results) => getLatLng(results[0]))
              .then(({ lat, lng }) => setCoordinates({ lat, lng }));
          },
        }}
      />
    </div>
  );
};

export default GoogleAddressSearch;
