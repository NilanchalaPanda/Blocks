import { Button } from "@components/ui/button";
import Image from "next/image";
import { LucideArrowRight, LucideMail } from "lucide-react"; // Importing Lucide icons

export default function Home() {
  return (
    <div className="relative">
      {/* Global Background Elements */}
      <div className="absolute inset-0 overflow-hidden -z-20">
        <div className="absolute top-1 left-1 w-[500px] h-[500px] bg-gradient-to-r from-purple-200 to-purple-400 rounded-full opacity-50 transform -translate-x-1/2 -translate-y-1/2 blur-lg"></div>
        <div className="absolute top-3/4 right-1/4 w-[200px] h-[200px] bg-gradient-to-t from-yellow-300 to-yellow-500 rounded-full opacity-50 transform -translate-x-1/2 -translate-y-1/2 blur-lg"></div>
        <div className="absolute bottom-1/4 left-3/4 w-[250px] h-[250px] bg-gradient-to-l from-green-200 to-green-400 rounded-full opacity-50 transform -translate-x-1/2 -translate-y-1/2 blur-lg"></div>
      </div>

      {/* HOMEPAGE HERO SECTION */}
      <div className="flex flex-col justify-center pt-10 items-center px-5 lg:flex-row lg:mt-0 lg:px-32 lg:h-[80vh] lg:gap-x-16 relative">
        <div className="w-full lg:w-1/2">
          <h1 className="text-5xl lg:text-[4rem]">
            WELCOME TO
            <p className="font-bold mt-3 text-gradient-to-b from-purple-200 to-purple-800">
              BLOCKS
            </p>
          </h1>
          <p className="mt-4 text-gray-700">
            Discover the best properties in your desired locations. Whether
            you're buying, selling, or renting, BLOCKS is your ultimate real
            estate partner. Join us to find your perfect home with ease and
            confidence.
          </p>

          <div className="mt-6 flex gap-x-6 items-center">
            <Button className="rounded-xl text-white bg-purple-700 hover:bg-purple-800">
              See Our Work <LucideArrowRight className="ml-2" />
            </Button>
            <div className="flex items-center">
              <LucideMail className="text-purple-700" />
              <span className="ml-2 text-gray-700">Connect with Us</span>
            </div>
          </div>
        </div>

        <div className="w-full md:w-1/2 mt-6 lg:mt-0">
          <Image
            alt="HERO SECTION"
            src={"/hero.jpeg"}
            width={600}
            height={400}
            className="rounded-lg shadow-md"
          />
        </div>
      </div>

      {/* SMALL HORIZONTAL CARDS SECTION */}
      <div className="mt-16 px-5 lg:px-32 relative">
        <h1 className="text-3xl font-bold text-center">PROPERTIES</h1>
        <p className="text-gray-400 font-semibold text-center mb-5">
          Thinking what is inside BLOCKS?
        </p>
        <div className="flex flex-col lg:flex-row justify-center items-center gap-6">
          <div className="bg-gradient-to-r from-purple-300 to-purple-500 text-white p-6 rounded-lg shadow-lg flex items-center w-full lg:w-1/3">
            <div className="ml-4">
              <h3 className="font-bold text-xl">Modern Villas</h3>
              <p className="mt-2">
                Experience luxury living with modern amenities and spacious
                designs.
              </p>
            </div>
          </div>
          <div className="bg-gradient-to-r from-green-300 to-green-500 text-white p-6 rounded-lg shadow-lg flex items-center w-full lg:w-1/3">
            <div className="ml-4">
              <h3 className="font-bold text-xl">Cozy Apartments</h3>
              <p className="mt-2">
                Find comfort and convenience in our selection of well-located
                apartments.
              </p>
            </div>
          </div>
          <div className="bg-gradient-to-r from-blue-300 to-blue-500 text-white p-6 rounded-lg shadow-lg flex items-center w-full lg:w-1/3">
            <div className="ml-4">
              <h3 className="font-bold text-xl">Charming Cottages</h3>
              <p className="mt-2">
                Enjoy the rustic charm and cozy atmosphere of our beautiful
                cottages.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FEATURE CARDS IN ZIG-ZAG FORMAT */}
      

      {/* CONTACT INFO SECTION */}
      <section className="py-20">
        <h1 className="text-3xl font-bold text-center">CONTACT US</h1>
        <p className="text-gray-400 font-semibold text-center mb-5">
          Want to <span className="font-bold">KNOW</span> more?
        </p>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="bg-[#7f1790] rounded-2xl p-8 xl:p-11">
            <h2 className="font-manrope text-4xl text-white text-center font-bold mb-4">
              Subscribe to the latest offer
            </h2>
            <p className="text-indigo-200 text-center mb-11 max-lg:max-w-2xl mx-auto">
              Join our community of subscribers and receive regular updates
              about PROPERTIES delivered straight to your inbox. It's quick,
              easy, and free.
            </p>
            <div className="max-w-md mx-auto lg:bg-transparent lg:border border-gray-300 rounded-3xl max-lg:py-3 lg:rounded-full lg:h-12 lg:p-1.5 lg:flex-row gap-6 lg:gap-0 flex-col flex items-center justify-between">
              <input
                type="text"
                name="email"
                className="py-2 px-6 bg-transparent rounded-full max-lg:border border-gray-300 text-gray-100 max-lg:text-center placeholder:text-gray-400 focus:outline-none flex-1 w-full lg:w-auto lg:py-2 lg:px-6 lg:bg-transparent"
                placeholder="Enter your email.."
              />
              <button
                type="submit"
                className="py-2 px-5 text-sm bg-purple-500 shadow-md rounded-full text-white font-semibold hover:bg-purple-700"
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-white py-10 mt-10">
        <div className="flex flex-col items-center justify-between px-5 lg:flex-row lg:px-32">
          <p className="text-sm">&copy; 2024 BLOCKS. All rights reserved.</p>
          <div className="flex gap-4 mt-2 lg:mt-0">
            <a href="#" className="text-gray-400 hover:text-white">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              Terms of Service
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              Contact Us
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
