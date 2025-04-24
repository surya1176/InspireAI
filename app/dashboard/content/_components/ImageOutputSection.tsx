import React from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

interface PROPS {
  imageData: string;
}

function ImageOutputSection({ imageData }: PROPS) {
  const handleDownload = () => {
    if (!imageData) return;
    
    // Create a temporary link
    const link = document.createElement("a");
    link.href = `data:image/png;base64,${imageData}`;
    link.download = `generated-image-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-white dark:bg-gray-700 shadow-lg border rounded-lg z-5">
      <div className="flex justify-between items-center p-5">
        <h2 className="font-medium text-lg">Your Generated Image</h2>
        <Button 
          className="flex gap-2 dark:text-white" 
          onClick={handleDownload}
          disabled={!imageData}
        >
          <Download />
          Download
        </Button>
      </div>
      <div className="p-5 flex justify-center items-center min-h-[450px]">
        {imageData ? (
          <img 
            src={`data:image/png;base64,${imageData}`} 
            alt="Generated Image" 
            className="max-w-full max-h-[450px]" 
          />
        ) : (
          <div className="text-gray-500 dark:text-gray-300">
            Your generated image will appear here...
          </div>
        )}
      </div>
    </div>
  );
}

export default ImageOutputSection;