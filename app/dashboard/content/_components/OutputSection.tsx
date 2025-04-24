import React, { useEffect, useRef } from "react";
import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/react-editor";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";

interface PROPS {
  aiResponse: string;
}

function OutputSection({ aiResponse }: PROPS) {
  const editorRef = useRef<any>(null);

  useEffect(() => {
    const editor = editorRef.current.getInstance();
    editor.setMarkdown(aiResponse);
  }, [aiResponse]);

  const handleCopy = () => {
    navigator.clipboard.writeText(aiResponse);
  }

  return (
    <div className="bg-white dark:bg-gray-700 shadow-lg border rounded-lg z-5">
      <div className="flex justify-between item-center p-5">
        <h2 className="font-medium text-lg">Your Result</h2>
        <Button className="flex gap-2 dark:text-white" onClick={handleCopy}>
          <Copy />
          Copy
        </Button>
      </div>
      <Editor
        ref={editorRef}
        initialValue="Your AI generated content will appear here..."
        height="450px"
        initialEditType="wysiwyg"
        useCommandShortcut={true}
        onChange={() => {}}
      />
    </div>
  );
}

export default OutputSection;