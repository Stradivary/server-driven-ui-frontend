"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { fetchUI } from "@/utils/fetchUI";

export default function Home() {
  const router = useRouter();
  const [uiData, setUIData] = useState<any>(null);

  useEffect(() => {
    fetchUI("home").then(setUIData);
  }, []);

  if (!uiData) return <p>Loading...</p>;

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100">
      {/* Navbar */}
      <nav className="w-full bg-white shadow-md p-4 flex justify-center">
        <div className="w-[70%] flex justify-between items-center">
          <div
            onClick={() => router.push("/")}
            className="flex flex-row items-center cursor-pointer"
          >
            <img className="w-[40px] mr-2" src={uiData.logo} />
            <h1 className="text-2xl font-bold text-blue-600">
              {uiData.navTitle}
            </h1>
          </div>
          <div className="flex gap-4">
            {uiData?.navLinks?.map((link: any, index: number) => (
              <Button
                className="cursor-pointer"
                key={index}
                variant="ghost"
                onClick={() => router.push(link.route)}
              >
                {link.text}
              </Button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="w-[70%] flex flex-col items-center text-center mt-16">
        <h1 className="text-4xl font-bold text-gray-900">{uiData.title}</h1>
        <p className="text-gray-600 mt-2 text-lg">{uiData.description}</p>
        <div className="mt-6 flex gap-4">
          {uiData.components.map((component: any, index: number) =>
            component.type === "button" ? (
              <Button
                className="cursor-pointer"
                key={index}
                size="lg"
                onClick={() => router.push(component.route)}
              >
                {component.text}
              </Button>
            ) : null
          )}
        </div>
      </div>
    </div>
  );
}
