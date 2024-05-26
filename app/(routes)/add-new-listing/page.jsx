"use client";

import GoogleAddressSearch from "@app/_components/GoogleAddressSearch";
import { useUser } from "@clerk/nextjs";
import { Button } from "@components/ui/button";
import supabase from "@utils/supabase/client";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const AddNewListing = () => {
  const [selectedAddress, setSelectedAddress] = useState();
  const [coordinates, setCoordinates] = useState();
  const [loader, setLoader] = useState(false);

  const router = useRouter();

  const { user } = useUser();

  const nextHandler = async () => {
    console.log(coordinates, selectedAddress);

    try {
      setLoader(true);
      const { data, error } = await supabase
        .from("listing")
        .insert([
          {
            address: selectedAddress.label,
            coordinates: coordinates,
            createdBy: user?.primaryEmailAddress?.emailAddress,
          },
        ])
        .select();

      if (data) {
        setLoader(false);
        // console.log(data);
        toast("New address added for listing");
        router.push(`/edit-listing/${data[0].id}`);
      }

      if (error) {
        setLoader(false);
        console.log(error);
        toast("Something went wrong");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="p-2 flex flex-col justify-center items-center gap-5 lg:p-10">
      <h1 className="font-bold text-2xl">Add New Listing</h1>

      <div className="px-2 py-8 shadow-lg shadow-purple-200 border rounded-xl flex flex-col md:w-[70%] lg:w-[50%] lg:px-20 lg:py-8">
        <h2 className="font-medium text-gray-500 text-center mb-2">
          Enter address which you want to list
        </h2>
        <GoogleAddressSearch
          setSelectedAddress={setSelectedAddress}
          setCoordinates={setCoordinates}
        />
        <Button
          disabled={!selectedAddress || !coordinates || loader}
          onClick={nextHandler}
          className="rounded-[5px] mt-3 mx-auto text-white w-[40%]"
        >
          {loader ? <Loader className="animate-spin" /> : "Next"}
        </Button>
      </div>
    </div>
  );
};

export default AddNewListing;
