import Image from "next/image";
import GoogleAddressSearch from "./GoogleAddressSearch";
import { BathIcon, BedDouble, MapPin, Ruler } from "lucide-react";

const Listing = ({ listing }) => {
  return (
    <div>
      <GoogleAddressSearch />

      <div className="grid grid-cols-1 lg:grid-cols-2">
        {listing.length > 0
          ? listing.map((singleProp) => {
              const propAdd = singleProp?.address.substring(0, 70);
              console.log(singleProp?.address);

              return (
                <div className="p-2" key={singleProp?.address}>
                  <div className="transition-all ease-in-out duration-100 p-3 rounded-xl group hover:bg-primary/10">
                    <Image
                      src={singleProp?.listingImages[0]?.url}
                      width={800}
                      height={200}
                      className="w-auto rounded-lg object-cover h-[200px] group-hover:shadow-xl"
                    />
                    <div className="flex flex-col gap-2 mt-2">
                      <h2 className="font-bold text-xl">
                        ${singleProp?.price}
                      </h2>
                      <h2 className="flex text-[15px] text-gray-500 gap-2">
                        <MapPin className="h-8 w-8" />
                        <span
                          className="text-ellipsis"
                          title={singleProp?.address}
                        >
                          {`${propAdd}...`}
                        </span>
                      </h2>

                      {/* BED ICONS */}
                      <div className="grid grid-cols-3 gap-6 px-2">
                        <h2 className="flex font-bold text-[16px] justify-center shadow-md gap-2 text-slate-500 bg-slate-100 group-hover:text-primary group-hover:bg-primary/10 rounded-md p-2">
                          <BedDouble />
                          {singleProp?.bedroom}
                        </h2>
                        <h2 className="flex font-bold text-[16px] justify-center shadow-md gap-2 text-slate-500 bg-slate-100 group-hover:text-primary group-hover:bg-primary/10 rounded-md p-2">
                          <BathIcon />
                          {singleProp?.bathroom}
                        </h2>
                        <h2 className="flex font-bold text-[16px] justify-center shadow-md gap-2 text-slate-500 bg-slate-100 group-hover:text-primary group-hover:bg-primary/10 rounded-md p-2">
                          <Ruler />
                          {singleProp?.area}
                        </h2>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          : // LOADER EFFECT
            [1, 2, 3, 4, 5, 6].map((item, index) => (
              <div className="p-3">
                <div
                  key={index}
                  className="animate-pulse bg-slate-300 w-full h-[350px] rounded-lg"
                ></div>
              </div>
            ))}
      </div>
    </div>
  );
};

export default Listing;
