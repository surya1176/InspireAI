// File: app/api/upload-to-cloudinary/route.js
import { NextResponse } from 'next/server';
import cloudinary from 'cloudinary';

// Configure Cloudinary
cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

export async function POST(request) {
  try {
    const { image } = await request.json();
    
    if (!image) {
      return NextResponse.json(
        { error: 'Image data is required' },
        { status: 400 }
      );
    }
    
    // Upload the image to Cloudinary
    // The image is expected to be a base64 string
    const uploadResponse = await new Promise((resolve, reject) => {
      cloudinary.v2.uploader.upload(
        image, 
        { folder: 'instagram_posts' },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
    });
    
    return NextResponse.json({
      success: true,
      secureUrl: uploadResponse.secure_url,
      publicId: uploadResponse.public_id
    });
    
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    return NextResponse.json(
      { error: 'Failed to upload image to Cloudinary' },
      { status: 500 }
    );
  }
}