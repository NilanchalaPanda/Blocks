"use client";

import Map from "./Map";
import Listing from "./Listing";
import { useEffect, useState } from "react";
import supabase from "@utils/supabase/client";

const ListingMapView = ({ type }) => {
  const [listing, setListing] = useState([]);

  useEffect(() => {
    getLatestListing();
  }, []);

  const getLatestListing = async () => {
    const { data, error } = await supabase
      .from("listing")
      .select(`*, listingImages(listing_id, url)`)
      .eq("active", true)
      .eq("type", type);

    if (data) {
      console.log("DATA - ", data);
      setListing(data);
    }

    if (error) {
      console.log(error);
      toast(error.message);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2">
      <div className="max-w-[1000px]">
        <Listing listing={listing} />
      </div>

      <div>
        <Map />
      </div>
    </div>
  );
};

export default ListingMapView;
