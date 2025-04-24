"use client";

import React, { useEffect, useState } from "react";
import Templates from "@/app/(data)/Templates";
import { Button } from "@/components/ui/button";
import { db } from "@/utils/DB";
import { AIOutput } from "@/utils/Schema";
import { desc, eq } from "drizzle-orm";
import Image from "next/image";
import { TEMPLATE } from "../_components/TemplateListSection";
import { useUser } from "@clerk/nextjs";
import { Loader2Icon, Copy, Link } from "lucide-react";

export interface HISTORY {
  id: Number;
  formData: string;
  aiResponse: string;
  templateSlug: string;
  createdBy: string;
  createdAt: string;
  imageData?: string; // Cloudinary URL
}

function History() {
  const {user} = useUser();
  const [loading, setLoading] = useState<boolean>(true);
  const [history, setHistory] = useState<HISTORY[]>([]);

  useEffect(() => {
    user && getUserHistory();
  }, [user]);

  const getUserHistory = async () => {
    setLoading(true);
    // @ts-ignore
    const result: HISTORY[] = await db
      .select()
      .from(AIOutput)
      // @ts-ignore
      .where(eq(AIOutput.createdBy, user?.primaryEmailAddress?.emailAddress))
      .orderBy(desc(AIOutput.id));
    setHistory(result);
    setLoading(false);
  };

  const getTemplateName = (slug: string) => {
    const template: TEMPLATE | any = Templates.find((template) => template.slug === slug);
    return template;
  };

  return (
    <div className="m-5 p-5 border rounded-lg dark:bg-gray-700 bg-white">
      <h2 className="font-bold text-3xl">History</h2>
      <p className="text-gray-500 dark:text-gray-300 pt-2">
        Search your previously generated AI content
      </p>
      <div className="grid grid-cols-4 gap-2 sm:grid-cols-7 font-bold rounded-lg dark:text-darkSecondary bg-slate-100 mt-5 p-3">
        <h2 className="col-span-2">TEMPLATE</h2>
        <h2 className="sm:col-span-2">🤖 AI</h2>
        <h2 className="hidden sm:block">DATE</h2>
        <h2 className="hidden sm:block">WORDS</h2>
        <h2>ACTIONS</h2>
      </div>
      {loading ? <div className="flex items-center justify-center pt-5"><Loader2Icon width={72} className="animate-spin" /></div> : history.map((item: HISTORY, index: number) => (
        <div key={index}>
          <div className="grid grid-cols-4 gap-2 sm:grid-cols-7 my-5 p-3">
            <h2 className="col-span-2 flex gap-2 text-sm sm:text-md items-center">
              <Image
                src={String(getTemplateName(item?.templateSlug)?.icon)}
                alt="template"
                width={25}
                height={25}
              />
              {getTemplateName(item?.templateSlug)?.name}
            </h2>
            <h2 className="sm:col-span-2 text-sm sm:text-md line-clamp-3">{item?.aiResponse}</h2>
            <h2 className="hidden sm:block">{item.createdAt}</h2>
            <h2 className="hidden sm:block">{item?.aiResponse.length}</h2>
            <h2>
              <Button
                variant="ghost"
                className="text-primary"
                onClick={() => {
                  navigator.clipboard.writeText(item?.aiResponse);
                }}
              >
                Copy
              </Button>
            </h2>
          </div>
          
          {/* Display image URL if available */}
          {item.imageData && (
            <div className="ml-10 mb-5 p-3 border-l-2 border-gray-200 dark:border-gray-600">
              <div className="flex items-center gap-2 text-sm">
                <Link className="w-4 h-4 text-primary" />
                <span className="font-medium">Image URL:</span>
              </div>
              <div className="flex mt-2 items-center">
                <p className="text-xs text-gray-500 dark:text-gray-300 truncate max-w-lg">{item.imageData}</p>
                <Button
                  variant="ghost"
                  className="text-primary ml-2"
                  onClick={() => {
                    navigator.clipboard.writeText(item.imageData || '');
                  }}
                >
                  Copy URL
                </Button>
              </div>
            </div>
          )}
          
          <hr className="my-5 border" />
        </div>
      ))}
    </div>
  );
}

export default History;