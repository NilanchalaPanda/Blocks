"use client";

// FORM IMPORT STATEMENTS -
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

// OTHER IMPORT STATEMENTS
import { Formik } from "formik";
import supabase from "@utils/supabase/client";
import { toast } from "sonner";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import FileUpload from "../_components/FileUpload";
import { Loader, X } from "lucide-react";
import Image from "next/image";

const PropertyDetails = ({ params }) => {
  // HANLDE IMAGE UPLOAD
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [listing, setListing] = useState([]);

  const [previewPhoto, setPreviewPhoto] = useState([]);

  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    user && verifyUserRecord();
  }, [user]);

  const verifyUserRecord = async () => {
    console.log(user);
    console.log(params);
    const { data, error } = await supabase
      .from("listing")
      .select(
        `*, listingImages(
        listing_id, url
      )`
      )
      .eq("createdBy", user?.primaryEmailAddress.emailAddress)
      .eq("id", params.propID);

    console.log("DATA - ", data);

    if (data) {
      setListing(data[0]);
      setPreviewPhoto(data[0]?.listingImages);
    }
    if (data?.length <= 0) {
      toast("Not Authorized to access this property");
      router.push("/");
    }

    if (error) {
      console.log(error);
    }
  };

  const handleFormSubmit = async (formValue) => {
    setLoading(true);
    const { data, error } = await supabase
      .from("listing")
      .update(formValue)
      .eq("id", params.propID)
      .select();

    if (data) {
      console.log(data);
      toast("Listing Updated Successfully");
    }

    for (let i = 0; i < images.length; i++) {
      console.log(images);
      console.log(images[i].name);
      const fileName = Date.now().toString();

      const { data, error } = await supabase.storage
        .from("listingImages")
        .upload(fileName, images[i], {
          contentType: images[i].type,
          upsert: false,
        });

      if (error) {
        setLoading(false);
        toast("Error while uploading image");
      } else {
        const imageURL =
          process.env.NEXT_PUBLIC_SUPABASE_IMAGE_URL + "/" + fileName;

        const { data, error } = await supabase
          .from("listingImages")
          .insert([
            {
              url: imageURL,
              listing_id: params?.propID,
            },
          ])
          .select();

        if (error) {
          setLoading(false);
        }
      }
    }
    setLoading(false);
    router.push("/");
    if (error) {
      console.log(error);
    }
  };

  const PublishButtonHandler = async () => {
    setLoading(false);
    const { data, error } = await supabase
      .from("listing")
      .update({ active: true })
      .eq("id", params.propID)
      .select();

    if (data) {
      toast("Listing Published");
      setLoading(false);
    }
    if (error) {
      toast("Error occured while publishing");
      setLoading(false);
    }
  };

  return (
    <div className="px-3 my-10 lg:px-36">
      <h1 className="px-3 font-bold text-2xl lg:text-3xl">
        Enter more details for your listing
      </h1>

      <Formik
        initialValues={{
          profileImage: user?.imageUrl,
          fullName: user?.fullName,
        }}
        onSubmit={(values) => {
          // console.log(values);
          handleFormSubmit(values);
        }}
      >
        {({ values, handleChange, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <div className="px-5 py-8 mt-2 rounded-[9px] border-2 border-purple-200 shadow-xl space-y-2 md:space-y-6 md:shadow-md md:p-8">
              <div className="grid grid-cols-1 space-y-2 lg:grid-cols-3 lg:space-y-0">
                {/* SELL OR RENT? */}
                <div className="flex flex-col gap-2">
                  <div className="text-[17px] md:text-xl text-slate-500">
                    Rent or Sell?
                  </div>
                  <RadioGroup
                    defaultValue={listing?.type || "Sell"}
                    onValueChange={(e) => (values.type = e)}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Sell" type="Sell" id="Sell" />
                      <Label htmlFor="Sell" className="text-[15px]">
                        Sell
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Rent" type="Rent" id="Rent" />
                      <Label htmlFor="Rent" className="text-[15px]">
                        Rent
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* PROPERTY TYPE */}
                <div className="flex flex-col gap-2">
                  <div className="text-[17px] md:text-xl text-slate-500">
                    Property Type
                  </div>
                  <Select
                    defaultValue={
                      listing?.propertyType || "Select Property Type"
                    }
                    name="propertyType"
                    onValueChange={(e) => (values.propertyType = e)}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue
                        className="text-[12px] md:text-[15px]"
                        placeholder={
                          listing
                            ? listing?.proprtyType
                            : "Select Property Type"
                        }
                      />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem
                        className="text-[14px] md:text-[15px]"
                        value="Single Family House"
                        type="Single Family House"
                      >
                        Single Family House
                      </SelectItem>
                      <SelectItem
                        className="text-[14px] md:text-[15px]"
                        value="Town House"
                        type="Town House"
                      >
                        Town House
                      </SelectItem>
                      <SelectItem
                        className="text-[14px] md:text-[15px]"
                        value="Condo"
                        type="Condo"
                      >
                        Condo
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Bedroom | Bathroom | Built In */}
              <div className="grid grid-cols-1 space-y-2 lg:grid-cols-3 lg:space-y-0">
                <div className="flex flex-col gap-2">
                  <div className="text-[17px] md:text-xl text-slate-500">
                    Bedroom
                  </div>
                  <Input
                    defaultValue={listing?.bedroom}
                    type="number"
                    placeholder="Ex: 3"
                    className="w-[90%]"
                    name="bedroom"
                    onChange={handleChange}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <div className="text-[17px] md:text-xl text-slate-500">
                    Bathroom
                  </div>
                  <Input
                    defaultValue={listing?.bathroom}
                    type="number"
                    placeholder="Ex: 2"
                    className="w-[90%]"
                    name="bathroom"
                    onChange={handleChange}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <div className="text-[17px] md:text-xl text-slate-500">
                    Built In
                  </div>
                  <Input
                    defaultValue={listing?.builtIn}
                    type="number"
                    placeholder="Ex: 1900 Sq.ft"
                    className="w-[90%]"
                    name="builtIn"
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Parking | Lot Size | Area */}
              <div className="grid grid-cols-1 lg:grid-cols-3 space-y-2 lg:space-y-0">
                <div className="flex flex-col gap-2">
                  <div className="text-[17px] md:text-xl text-slate-500">
                    Parking
                  </div>
                  <Input
                    defaultValue={listing?.parking}
                    type="number"
                    placeholder="Ex: 3"
                    className="w-[90%]"
                    name="parking"
                    onChange={handleChange}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <div className="text-[17px] md:text-xl text-slate-500">
                    Lot Size (Sq.ft)
                  </div>
                  <Input
                    defaultValue={listing?.lotSize}
                    type="number"
                    placeholder="Ex: 2"
                    className="w-[90%]"
                    name="lotSize"
                    onChange={handleChange}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <div className="text-[17px] md:text-xl text-slate-500">
                    Area (Sq.ft)
                  </div>
                  <Input
                    defaultValue={listing?.area}
                    type="number"
                    placeholder="Ex: 1900 Sq.ft"
                    className="w-[90%]"
                    name="area"
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Price | HOA */}
              <div className="grid grid-cols-1 lg:grid-cols-3 space-y-2 lg:space-y-0">
                <div className="flex flex-col gap-2">
                  <div className="text-[17px] md:text-xl text-slate-500">
                    Selling Price ($)
                  </div>
                  <Input
                    defaultValue={listing?.price}
                    type="number"
                    placeholder="Ex: 3"
                    className="w-[90%]"
                    name="price"
                    onChange={handleChange}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <div className="text-[17px] md:text-xl text-slate-500">
                    HOA (Per Month - $)
                  </div>
                  <Input
                    defaultValue={listing?.hoa}
                    type="number"
                    placeholder="Ex: 2"
                    className="w-[90%]"
                    name="hoa"
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <div className="text-[17px] md:text-xl text-slate-500">
                  Description
                </div>
                <Textarea
                  defaultValue={listing?.description}
                  className="text-[15px]"
                  placeholder="Type your message here."
                  name="description"
                  onChange={handleChange}
                />
              </div>

              {/* IMAGES */}
              <div>
                <h1 className="text-[17px] md:text-xl text-slate-500">
                  Upload Your Property Images
                </h1>
                <FileUpload setImages={setImages} />

                <div className="px-4 pt-5 grid grid-cols-3 lg:grid-cols-6 xl:grid-cols-10 gap-3">
                  {previewPhoto.length > 0 &&
                    previewPhoto.map((image) => (
                      <div key={image} className="relative">
                        <Image
                          src={image?.url}
                          alt={`image`}
                          width={100}
                          height={100}
                          className="rounded-sm border border-black"
                        />
                        <button
                          type="button"
                          className="bg-red-300 p-[1px] rounded-sm absolute -top-2 -right-2 hover:cursor-pointer lg:p-[3px] ld:rounded-lg"
                        >
                          <X size={15} color="red" />
                        </button>
                      </div>
                    ))}
                </div>
              </div>

              {/* SUBMIT THE WHOLE FORM BRO :) */}
              <div className="flex flex-row justify-end gap-x-2">
                <Button
                  variant="outline"
                  className="text-primary bg-primary"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? <Loader className="animate-spin" /> : "Save"}
                </Button>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button type="button">Save & Publish</Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Ready to publish?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Do you really want to publish the listing.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => PublishButtonHandler()}>
                        {loading ? (
                          <Loader className="animate-spin" />
                        ) : (
                          "Publish"
                        )}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default PropertyDetails;
