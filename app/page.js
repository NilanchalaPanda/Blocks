import { Button } from "@components/ui/button";
import Image from "next/image";
import ListingMapView from "./_components/ListingMapView";

export default function Home() {
  return (
    <div>
      {/* HOMEPAGE */}
      <div className="flex flex-col justify-center items-center px-5 lg:flex-row lg:px-32 lg:h-[80vh] lg:gap-x-16">
        <div className="w-full lg:w-1/2">
          <h1 className="lg:text-4xl">
            WELCOME TO{" "}
            <span className="font-bold text-gradient-to-b from-purple-200 to-purple-800">
              BLOCKS
            </span>
          </h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. At,
            dolores. Quibusdam dolorem, vero laborum ducimus rerum officiis
            dolores et praesentium alias temporibus eos soluta laudantium
            dignissimos labore beatae accusantium, molestiae similique
            voluptatem neque aliquid hic tempora! Alias ducimus reiciendis
            explicabo!
          </p>
          <Button className="rounded-xl text-white">See Our Work</Button>
        </div>
        <div className="w-full md:w-1/2">
          <Image
            alt="HERO SECTION"
            src={"/hero.jpeg"}
            width={600}
            height={400}
          />
        </div>{" "}
      </div>

      {/* ABOUT */}

      {/* CONTACT */}

      {/* FOOTER */}
    </div>
  );
}
