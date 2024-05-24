import GooglePlacesAutocomplete from "react-google-places-autocomplete";

const AddNewListing = () => {
  return (
    <div className="p-10 flex flex-col justify-center items-center gap-5">
      <h1 className="font-bold text-2xl">Add New Listing</h1>

      <div>
        <h2 className="font-medium text-gray-500">
          Enter address which you want to list
        </h2>
        <GooglePlacesAutocomplete
        apiKey="*****" />
      </div>
    </div>
  );
};

export default AddNewListing;
