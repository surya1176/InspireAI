import ThemeToggle from "@/components/custom/ThemeToggle";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Settings2,
  TabletSmartphone,
  Users,
  WandSparkles,
} from "lucide-react";
import Link from "next/link";

export default function Home() {

  return (
    <>
      <header className="border-b py-4 px-4 sm:px-10 dark:bg-darkSecondary bg-white tracking-wide relative z-50">
        <div className="max-w-7xl w-full mx-auto flex flex-wrap items-center gap-4">
          <Link
            href="/"
            className="flex gap-1 items-center justify-center font-bold text-lg"
          >
            <img src="/logo.png" alt="logo" className="w-12" />
            <span>Inspire AI</span>
          </Link>
          <div className="flex gap-4 items-center ml-auto">
            <ThemeToggle />
            <Link href="/dashboard">
              <Button
                variant="outline"
                className="flex items-center gap-2 transition-all text-md font-semibold rounded-md px-2 py-5"
              >
                SignIn
                <ArrowRight size={24} />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="flex flex-col items-center dark:bg-darkPrimary bg-white">
        <div className="relative pt-28 pb-12">
          <div className="absolute inset-0">
            <img
              src="https://preline.co/assets/svg/examples/polygon-bg-element.svg"
              alt="Background Image"
              className="w-full h-full object-cover dark:hidden"
            />
            <img
              src="https://preline.co/assets/svg/examples-dark/polygon-bg-element.svg"
              alt="Background Image"
              className="w-full h-full object-cover hidden dark:block"
            />
          </div>

          <div className="relative flex flex-col items-center max-w-screen-xl mx-auto px-8 z-10 text-center">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
              Inspire AI:{" "}
              <span className="bg-gradient-to-br from-purple-500 to to-blue-600 text-transparent bg-clip-text">
                Content Generator
              </span>
            </h1>
            <p className="text-lg max-w-2xl text-center md:text-xl mb-12">
              Revolutionize your content creation with our AI-powered app,
              delivering engaging and high-quality text in seconds.
            </p>
            <Link href="/dashboard">
            <Button
              type="button"
              className="text-lg px-4 py-6 gap-2 bg-gradient-to-br dark:text-white from-purple-500 to to-blue-600 hover:scale-105 transition-all duration-300"
            >
              Get Started
              <ArrowRight size={24} className="hover:animate-spin" />
            </Button>
            </Link>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 md:grid-cols-2 max-w-7xl mx-auto gap-6 px-4 my-12">
          <div className="hover:bg-gray-100 dark:hover:bg-gray-700 p-6 rounded-md hover:scale-105 transition-all duration-300 cursor-pointer">
            <Settings2
              size={48}
              className="mb-3 inline-block bg-primary text-white p-2 rounded-md"
            />
            <h3 className="text-xl font-bold mb-2 dark:text-white text-gray-800">
              Customizable
            </h3>
            <p className="text-md dark:text-gray-300 text-gray-600">
              Customize your content to suit your needs and preferences
            </p>
            <a
              href="/"
              className="text-purple-600 font-bold inline-block text-sm mt-4"
            >
              Learn more
            </a>
          </div>
          <div className="hover:bg-gray-100 dark:hover:bg-gray-700 p-6 rounded-md hover:scale-105 transition-all duration-300 cursor-pointer">
            <TabletSmartphone
              size={48}
              className="mb-3 inline-block bg-primary text-white p-2 rounded-md"
            />
            <h3 className="text-xl font-bold mb-2 dark:text-white text-gray-800">
              25+ Templates
            </h3>
            <p className="text-md dark:text-gray-300 text-gray-600">
              Tailoured templates to suit your needs and preferences
            </p>
            <a
              href="/"
              className="text-purple-600 font-bold inline-block text-sm mt-4"
            >
              Learn more
            </a>
          </div>
          <div className="hover:bg-gray-100 dark:hover:bg-gray-700 p-6 rounded-md hover:scale-105 transition-all duration-300 cursor-pointer">
            <WandSparkles
              size={48}
              className="mb-3 inline-block bg-primary text-white p-2 rounded-md"
            />
            <h3 className="text-xl font-bold mb-2 dark:text-white text-gray-800">
              Free to Use
            </h3>
            <p className="text-md dark:text-gray-300 text-gray-600">
              Experience free and blazing-fast performance with our product
            </p>
            <a
              href="/"
              className="text-purple-600 font-bold inline-block text-sm mt-4"
            >
              Learn more
            </a>
          </div>
          <div className="hover:bg-gray-100 dark:hover:bg-gray-700 p-6 rounded-md hover:scale-105 transition-all duration-300 cursor-pointer">
            <Users
              size={48}
              className="mb-3 inline-block bg-primary text-white p-2 rounded-md"
            />
            <h3 className="text-xl font-bold mb-2 dark:text-white text-gray-800">
              24/7 Support
            </h3>
            <p className="text-md dark:text-gray-300 text-gray-600">
              24/7 customer support for all your inquiries
            </p>
            <a
              href="/"
              className="text-purple-600 font-bold inline-block text-sm mt-4"
            >
              Learn more
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
