"use client";

import Map from "./Map";
import Listing from "./Listing";
import { useEffect, useState } from "react";
import supabase from "@utils/supabase/client";
import { toast } from "sonner";

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
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-4 gap-y-2 px-4 lg:px-0">
      <div className="max-w-[1000px] bg-slate-100/50 max-h-[650px] overflow-y-auto">
        <Listing listing={listing} />
      </div>

      <div>
        <Map />
      </div>
    </div>
  );
};

export default ListingMapView;
