"use client";
import React, { useState, useContext } from "react";
import { TEMPLATE } from "../../_components/TemplateListSection";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2Icon } from "lucide-react";

interface PROPS {
  selectedTemplate?: TEMPLATE;
  userFormInput: (formData: any) => void;
  loading: boolean;
}

function FormSection({ selectedTemplate, userFormInput, loading }: PROPS) {
  const [formData, setFormData] = useState<any>();

  const handleFormSubmit = (e: any) => {
    e.preventDefault();
    userFormInput(formData);
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="p-5 shadow-md border rounded-lg dark:bg-gray-700 bg-white">
      <div className="flex flex-row items-center gap-4 mb-2">
        {/* @ts-ignore */}
        <Image src={selectedTemplate?.icon} alt="icon" width={60} height={60} />
        <h2 className="font-bold text-2xl dark:text-white text-primary">
          {selectedTemplate?.name}
        </h2>
      </div>
      <p className="text-gray-500 dark:text-gray-300 text-sm">{selectedTemplate?.description}</p>
      <form className="mt-4" onSubmit={handleFormSubmit}>
        {selectedTemplate?.form?.map((item, index) => (
          <div key={index} className="my-2 flex flex-col gap-2 mb-7">
            <label className="font-bold">{item.label}</label>
            {item.field === "input" ? (
              <Input
                name={item.name}
                required={item?.required}
                onChange={handleInputChange}
              />
            ) : item.field === "textarea" ? (
              <Textarea
                name={item.name}
                required={item?.required}
                onChange={handleInputChange}
              />
            ) : null}
          </div>
        ))}
        <Button type="submit" className="w-full dark:text-white py-6 text-lg flex gap-2" disabled={loading}>
          {loading && <Loader2Icon width={32} className="animate-spin" />}
          Generate
        </Button>
      </form>
    </div>
  );
}

export default FormSection;