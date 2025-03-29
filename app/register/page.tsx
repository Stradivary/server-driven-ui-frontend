"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { fetchUI } from "@/utils/fetchUI";
import Link from "next/link";

export default function Auth() {
  const router = useRouter();
  const [uiData, setUIData] = useState<any>(null);
  const [form, setForm] = useState<any>({ username: "", password: "" });

  useEffect(() => {
    fetchUI("register").then(setUIData);
  }, []);

  const handleRegister = async (action: any) => {
    console.log("MASUK REGISTER")
    const res = await fetch(action.endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    console.log("data", data)
    if (!!data?.user?.id) {
      router.push("/auth");
    } else {
      alert(data.message || "Authentication failed");
    }
  };

  if (!uiData) return <p>Loading...</p>;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-4">{uiData.title}</h1>
      <div className="w-[70%] md:w-80 flex flex-col gap-4 p-6 border rounded-lg shadow-lg bg-white">
        {uiData.fields.map((field: any, index: number) => (
          <Input
            key={index}
            type={field.secure ? "password" : "text"}
            placeholder={field.placeholder}
            value={form[field.name]}
            onChange={(e) => setForm({ ...form, [field.name]: e.target.value })}
          />
        ))}

        {uiData.actions.map((action: any, index: number) => (
          <Button className="cursor-pointer" key={index} onClick={() => handleRegister(action)}>{action.text}</Button>
        ))}

        <p className="text-center text-sm text-gray-600">
          {uiData.switchText} <Link href={uiData.switchRoute} className="text-blue-500 hover:underline">{uiData.switchLinkText}</Link>
        </p>
      </div>
    </div>
  );
}
