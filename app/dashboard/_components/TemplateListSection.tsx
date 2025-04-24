import Templates from "@/app/(data)/Templates";
import React, { useEffect, useState } from "react";
import TemplateCard from "./TemplateCard";

export interface TEMPLATE {
  name: string;
  description: string;
  icon: string;
  category: string;
  slug: string;
  premium?: boolean;
  aiPrompt: string;
  form?: FORM[];
  outputType?: string;
}

export interface FORM {
  label: string;
  field: string;
  name: string;
  required?: boolean;
}

function TemplateListSection({ searchInput }: any) {
  const [templateList, setTemplateList] = useState<TEMPLATE[]>(Templates);

  useEffect(() => {
    if (searchInput) {
      const filteredTemplates = Templates.filter((template: TEMPLATE) =>
        template.name.toLowerCase().includes(searchInput.toLowerCase())
      );
      setTemplateList(filteredTemplates);
    } else {
      setTemplateList(Templates);
    }
  }, [searchInput]);

  return (
    <div className="dark:bg-darkPrimary grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 p-5 sm:p-10">
      {templateList.map((item: TEMPLATE, index: number) => (
        <TemplateCard key={index} {...item} />
      ))}
    </div>
  );
}

export default TemplateListSection;
