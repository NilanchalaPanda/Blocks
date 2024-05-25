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
import { Formik } from "formik";
import supabase from "@utils/supabase/client";
import { toast } from "sonner";

const PropertyDetails = ({ params }) => {
  const handleFormSubmit = async (formValue) => {
    const { data, error } = await supabase
      .from("listing")
      .update(formValue)
      .eq("id", params.propID)
      .select();

    if (data) {
      console.log(data);
      toast("Listing Updated Successfully");
    }

    if (error) {
      console.log(error);
    }
  };

  return (
    <div className="px-3 my-10 lg:px-36">
      <h1 className="font-bold text-2xl">
        Enter some more details more your listing
      </h1>

      <Formik
        initialValues={{}}
        onSubmit={(values) => {
          console.log(values);
          handleFormSubmit(values);
        }}
      >
        {({ values, handleChange, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <div className="px-5 py-8 mt-2 rounded-[9px] border-2 border-purple-200 shadow-xl space-y-2 md:space-y-6 md:shadow-md md:p-8">
              <div className="grid grid-cols-1 space-y-2 lg:grid-cols-3">
                {/* SELL OR RENT? */}
                <div className="flex flex-col gap-2">
                  {/* RENT OR SELL */}
                  <div className="text-[17px] md:text-xl text-slate-500">
                    Rent or Sell?
                  </div>
                  <RadioGroup
                    defaultValue="Sell"
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
                    name="propertyType"
                    onValueChange={(e) => (values.propertyType = e)}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue
                        className="text-[12px] md:text-[15px]"
                        placeholder="Select Property Type"
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
              <div className="grid grid-cols-1 space-y-2 lg:grid-cols-3">
                <div className="flex flex-col gap-2">
                  <div className="text-[17px] md:text-xl text-slate-500">
                    Bedroom
                  </div>
                  <Input
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
                    type="number"
                    placeholder="Ex: 1900 Sq.ft"
                    className="w-[90%]"
                    name="builtIn"
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Parking | Lot Size | Area */}
              <div className="grid grid-cols-1 lg:grid-cols-3 space-y-2 ">
                <div className="flex flex-col gap-2">
                  <div className="text-[17px] md:text-xl text-slate-500">
                    Parking
                  </div>
                  <Input
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
                    type="number"
                    placeholder="Ex: 1900 Sq.ft"
                    className="w-[90%]"
                    name="area"
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Price | HOA */}
              <div className="grid grid-cols-1 lg:grid-cols-3 space-y-2 ">
                <div className="flex flex-col gap-2">
                  <div className="text-[17px] md:text-xl text-slate-500">
                    Selling Price ($)
                  </div>
                  <Input
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
                  className="text-[15px]"
                  placeholder="Type your message here."
                  name="description"
                  onChange={handleChange}
                />
              </div>

              {/* IMAGES */}

              {/* SUBMIT THE WHOLE FORM BRO :) */}
              <div className="flex flex-row justify-end gap-x-2">
                <Button type="submit" variant="outline">
                  Save
                </Button>

                <Button>Save & Publish</Button>
              </div>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default PropertyDetails;
