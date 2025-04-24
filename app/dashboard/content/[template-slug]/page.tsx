"use client";
import React, { useContext, useState, useEffect } from "react";
import FormSection from "../_components/FormSection";
import OutputSection from "../_components/OutputSection";
import ImageOutputSection from "../_components/ImageOutputSection";
import { TEMPLATE } from "../../_components/TemplateListSection";
import Templates from "@/app/(data)/Templates";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Instagram, AlertCircle, X, Cloud, Send } from "lucide-react";
import Link from "next/link";
import { chatSession } from "@/utils/AiModels";
import { db } from "@/utils/DB";
import { AIOutput, UserSubscription } from "@/utils/Schema";
import { useUser } from "@clerk/nextjs";
import moment from "moment";
import { TotalUsageContext } from "../../../(context)/TotalUsageContext";
import { useRouter } from "next/navigation";
import { UserSubscriptionContext } from "../../../(context)/UserSubscriptionContext";
import { UpdateCreditUsageContext } from "../../../(context)/UpdateCreditUsageContext";
import { generateImage } from "@/utils/Aimodel";
import axios from 'axios';

interface PROPS {
  params: {
    "template-slug": string;
  };
}

interface AlertProps {
  message: string;
  type: "success" | "error";
  onClose: () => void;
}

const Alert = ({ message, type, onClose }: AlertProps) => {
  return (
    <div className={`fixed top-4 right-4 z-50 flex items-center gap-2 p-4 rounded-md shadow-md transition-all duration-300 ${
      type === "error" ? "bg-red-100 border border-red-300 text-red-700" : "bg-green-100 border border-green-300 text-green-700"
    }`}>
      {type === "error" ? <AlertCircle size={18} /> : <span className="text-lg">✓</span>}
      <p>{message}</p>
      <button onClick={onClose} className="ml-2" aria-label="Close">
        <X size={16} />
      </button>
    </div>
  );
};

function CreateNewContent(props: PROPS) {
  const [loading, setLoading] = useState<boolean>(false);
  const [postingToInstagram, setPostingToInstagram] = useState<boolean>(false);
  const [uploadingToCloudinary, setUploadingToCloudinary] = useState<boolean>(false);
  const [aiResponse, setAiResponse] = useState<string>("");
  const [imageData, setImageData] = useState<string>("");
  const [cloudinaryUrl, setCloudinaryUrl] = useState<string>("");
  const [userprompt,setUserprompt] = useState<string>("");
  const [instagramConnected, setInstagramConnected] = useState<boolean>(false);
  const [inputPrompt,setInputprompt] = useState<string>("");
  // Alert state
  const [alert, setAlert] = useState<{
    show: boolean;
    message: string;
    type: "success" | "error";
  }>({ 
    show: false, 
    message: "", 
    type: "success" 
  });
  const [instagramData, setInstagramData] = useState({
    token: "",
    userId: "",
    username: ""
  });
  const { totalUsage, setTotalUsage } = useContext(TotalUsageContext);
  const { userSubscription, setUserSubscription } = useContext(UserSubscriptionContext);
  const { updateCreditUsage, setUpdateCreditUsage } = useContext(UpdateCreditUsageContext);

  const { user } = useUser();
  const router = useRouter();

  const selectedTemplate: TEMPLATE | undefined = Templates?.find(
    (template) => template.slug === props.params["template-slug"]
  );
  
  // Function to show alert
  const showAlert = (message: string, type: "success" | "error" = "success") => {
    setAlert({ show: true, message, type });
    // Auto-hide after 5 seconds
    setTimeout(() => {
      setAlert({ show: false, message: "", type: "success" });
    }, 5000);
  };
  useEffect(() => {
    // Only run on client side
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('instagram_token');
      const userId = localStorage.getItem('instagram_user_id');
      const username = localStorage.getItem('instagram_username');
      
      if (token && userId) {
        setInstagramConnected(true);
        setInstagramData({
          token,
          userId,
          username: username || ""
        });
      } else {
        setInstagramConnected(false);
      }
    }
  }, []);
  const SaveOutput = async (formData: any, slug: any, aiResponse: string, imageUrl?: string) => {
    const result = await db.insert(AIOutput).values({
      formData: formData,
      templateSlug: slug,
      aiResponse: aiResponse,
      imageData: imageUrl || null, // Store the Cloudinary URL instead of base64 data
      createdBy: user?.primaryEmailAddress?.emailAddress,
      createdAt: moment().format("YYYY-MM-DD"),
    });
    
    console.log(result);
  };
  
  /**
   * Used to generate content from AI
   * @param formData 
   * @returns 
   */
  const generateAIContent = async (formData: any) => {
    if (totalUsage >= 10000 && !userSubscription) {
      router.push("/dashboard/billing");
      return;
    }
    setUserprompt(JSON.stringify(formData));
    setLoading(true);
    
    if (selectedTemplate?.outputType === "image") {
      // Handle image generation
      const prompt = selectedTemplate?.aiPrompt;
      setUserprompt(JSON.stringify(formData));
      const finalPrompt = JSON.stringify(formData) + ", " + prompt;
      try {
        const imageBase64 = await generateImage(finalPrompt);
        setImageData(imageBase64);
        
        // Upload to Cloudinary immediately after generation
        const cloudinaryUrl = await uploadToCloudinary(imageBase64);
        
        // Save output with the Cloudinary URL, not the base64 data
      } catch (error) {
        console.error("Error generating image:", error);
        setAiResponse("Error generating image. Please try again.");
        showAlert("Error generating image. Please try again.", "error");
      }
    } else {
      // Handle text generation (default)
      const prompt = selectedTemplate?.aiPrompt;
      const finalPrompt = JSON.stringify(formData) + ", " + prompt;
      const result = await chatSession.sendMessage(finalPrompt);
      setAiResponse(result?.response.text());
      await SaveOutput(
        JSON.stringify(formData),
        selectedTemplate?.slug,
        result?.response.text()
      );
    }
    
    setLoading(false);
    setUpdateCreditUsage(Date.now());
  };
  
  // Function to redirect to Instagram login if not connected
  const handleConnectInstagram = () => {
    router.push('/dashboard/settings');
  };
  
  // Updated function to accept imageData parameter
  const uploadToCloudinary = async (imgData = null) => {
    // Use provided imageData or component state
    const imageToUpload = imgData || imageData;
    if (!imageToUpload) return null;
    
    setUploadingToCloudinary(true);
    try {
      // Call your backend API to handle the Cloudinary upload
      const response = await fetch('/api/upload-to-cloudinary', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          image: `data:image/png;base64,${imageToUpload}`
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to upload to Cloudinary');
      }
      
      const data = await response.json();
      console.log(data);
      setCloudinaryUrl(data.secureUrl);
      showAlert("Image uploaded to Cloudinary successfully");
      return data.secureUrl;
      
    } catch (error) {
      console.error("Error uploading to Cloudinary:", error);
      showAlert("Error uploading to Cloudinary. Please try again.", "error");
      return null;
    } finally {
      setUploadingToCloudinary(false);
    }
  };
  
  const postToInstagram = async (caption: string = "Check out this amazing content!") => {
    if (!imageData || !instagramConnected) return;
  
    setPostingToInstagram(true);
    console.log("Starting Instagram post with caption:", caption);
  
    try {
      // Ensure the image is uploaded to Cloudinary
      let imageUrl = cloudinaryUrl;
      console.log("Cloudinary URL:", imageUrl);
      
      if (!imageUrl) {
        imageUrl = await uploadToCloudinary();
        if (!imageUrl) {
          throw new Error("Failed to upload image to Cloudinary");
        }
      }
      
      // Step 1: Create Instagram media container
      console.log("Creating media with caption:", caption);
      const mediaResponse = await axios.post(
        `https://graph.instagram.com/v12.0/${instagramData.userId}/media`,
        null,
        {
          params: {
            image_url: imageUrl,
            caption: caption, // Make sure caption is passed here
            access_token: instagramData.token
          }
        }
      );
  
      if (!mediaResponse.data || !mediaResponse.data.id) {
        throw new Error("Failed to create media container");
      }
  
      console.log("Media container created:", mediaResponse.data);
  
      // Step 2: Publish the media to Instagram
      const mediaId = mediaResponse.data.id;
      const publishResponse = await axios.post(
        `https://graph.instagram.com/v12.0/${instagramData.userId}/media_publish`,
        null,
        {
          params: {
            creation_id: mediaId,
            access_token: instagramData.token
          }
        }
      );
  
      console.log("Published to Instagram successfully:", publishResponse.data);
  
      // Show success message
      showAlert("Your image has been posted to Instagram successfully!");
      if (cloudinaryUrl) {
        await SaveOutput(
          userprompt,
          selectedTemplate?.slug,
          caption,
          cloudinaryUrl
        );
      }      
  
    } catch (error: unknown) {    
      let errorMessage = "Something went wrong";
    
      if (error instanceof Error) {
        errorMessage = error.message;
      }
    
      if (typeof error === "object" && error !== null && "response" in error) {
        const errObj = error as { response?: { data?: { error?: { message?: string } } } };
        errorMessage = errObj.response?.data?.error?.message || errorMessage;
      }
    
      showAlert("Error posting to Instagram. Try logging in again");
    } finally {
      setPostingToInstagram(false);
    }
  };
// Function to get caption from AI for Instagram post
const generateInstagramCaption = async () => {
  try {
    // Create a more detailed prompt based on the template and formData
    // const templatePrompt = selectedTemplate?.aiPrompt || "";
    const prompt = `Generate a brief, engaging Instagram caption (max 50 words) for the prompt: ${userprompt}`;
    
    console.log("Caption generation prompt:", prompt);
    const result = await chatSession.sendMessage(prompt);
    console.log(result)
    const caption = result?.response.text() || "Check out this amazing content!";
    console.log("Generated caption:", caption);
    return caption;
  } catch (error) {
    console.error("Error generating caption:", error);
    return "Check out this amazing content!";
  }
};

// Post with auto-generated caption
const postWithAutoCaption = async () => {
  setLoading(true);
  try {
    const caption = await generateInstagramCaption();
    console.log("Caption before posting:", caption);
    // Call postToInstagram with the generated caption
    await postToInstagram(caption);
  } catch (error) {
    console.error("Error in postWithAutoCaption:", error);
    showAlert("Failed to generate caption", "error");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="flex flex-col p-5 h-full dark:bg-darkPrimary bg-slate-100">
      {alert.show && (
        <Alert 
          message={alert.message} 
          type={alert.type} 
          onClose={() => setAlert({ show: false, message: "", type: "success" })} 
        />
      )}
      <div className="w-5">
        <Link href="/dashboard">
          <Button className="flex gap-2 dark:text-white">
            <ArrowLeft />
            Back
          </Button>
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-10 py-5">
        <FormSection
          selectedTemplate={selectedTemplate}
          userFormInput={(v: any) => {
            generateAIContent(v);
          }}
          loading={loading}
        />
        <div className="md:col-span-2 lg:col-span-2">
          {selectedTemplate?.outputType === "image" ? (
            <div className="flex flex-col">
              <ImageOutputSection imageData={imageData} />
              
              {imageData && (
                <div className="mt-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                  <h3 className="text-lg font-medium mb-3">Share to Instagram</h3>
                  
                  {!instagramConnected ? (
                    <div className="flex flex-col items-center gap-2 p-3 border border-yellow-300 bg-yellow-50 dark:bg-yellow-900/20 dark:border-yellow-700 rounded-md">
                      <div className="flex items-center gap-2">
                        <AlertCircle className="h-5 w-5 text-yellow-500" />
                        <p className="text-sm">You need to connect your Instagram account first</p>
                      </div>
                      <Button 
                        onClick={handleConnectInstagram}
                        className="flex items-center gap-2 bg-pink-600 hover:bg-pink-700"
                      >
                        <Instagram size={18} />
                        Connect Instagram
                      </Button>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-3">
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Connected as: <span className="font-medium">@{instagramData.username}</span>
                      </p>
                      
                      <div className="flex flex-col space-y-2">
                        
                        <div className="flex flex-wrap gap-2">
                          <Button 
                            onClick={() => postToInstagram()}
                            disabled={postingToInstagram || !cloudinaryUrl}
                            className="flex items-center gap-2 bg-pink-600 hover:bg-pink-700"
                          >
                            <Instagram size={18} />
                            {postingToInstagram ? "Posting..." : "2. Post to Instagram"}
                          </Button>
                          
                          <Button 
                            onClick={postWithAutoCaption}
                            disabled={postingToInstagram || !cloudinaryUrl}
                            variant="outline"
                            className="flex items-center gap-2"
                          >
                            <Send size={18} />
                            Post with AI Caption
                          </Button>
                        </div>
                      </div>
                      
                      {!cloudinaryUrl && (
                        <p className="text-xs text-amber-600 dark:text-amber-400">
                        </p>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          ) : (
            <OutputSection aiResponse={aiResponse} />
          )}
        </div>
      </div>
    </div>
  );
}

export default CreateNewContent;