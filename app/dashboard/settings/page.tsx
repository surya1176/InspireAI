'use client'  // This marks the component as a Client Component

import { UserProfile } from '@clerk/nextjs';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

function Settings() {
  const searchParams = useSearchParams();
  
  // State variables for Instagram integration
  // Explicitly set the types for the state variables
  const [instagramToken, setInstagramToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Get data from localStorage
    const storedToken = localStorage.getItem('instagram_token');
    const storedUserId = localStorage.getItem('instagram_user_id');
    const storedUsername = localStorage.getItem('instagram_username');

    if (storedToken && storedUserId) {
      setInstagramToken(storedToken);
      setUserId(storedUserId);
      if (storedUsername) setUsername(storedUsername);
    }

    // Check URL parameters
    const token = searchParams.get('token');
    const userId = searchParams.get('userId');
    const username = searchParams.get('username');
    const error = searchParams.get('error');

    if (token) {
      setInstagramToken(token);
      localStorage.setItem('instagram_token', token);
    }
    if (userId) {
      setUserId(userId);
      localStorage.setItem('instagram_user_id', userId);
    }
    if (username) {
      setUsername(username);
      localStorage.setItem('instagram_username', username);
    }
    if (error) {
      setError(error);
    }
  }, [searchParams]);

  const handleInstagramLogin = () => {
    const instagramAuthUrl = `https://www.instagram.com/oauth/authorize?enable_fb_login=0&force_authentication=1&client_id=1127789685264306&redirect_uri=https://inspirecontent.onrender.com/instagram&response_type=code&scope=instagram_business_basic%2Cinstagram_business_manage_messages%2Cinstagram_business_manage_comments%2Cinstagram_business_content_publish%2Cinstagram_business_manage_insights`;
    window.location.href = instagramAuthUrl;
  };

  const handleDisconnect = () => {
    localStorage.removeItem('instagram_token');
    localStorage.removeItem('instagram_user_id');
    localStorage.removeItem('instagram_username');
    setInstagramToken(null);
    setUserId(null);
    setUsername(null);
    setError(null);
  };

  return (
    <div className='flex flex-col items-center h-full p-5'>
      {/* Instagram Connection Card - Centered with same width as Clerk normally uses */}
      <div className="w-full max-w-md mb-6 bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="rounded-full w-8 h-8 flex items-center justify-center bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <circle cx="12" cy="12" r="4"></circle>
                <circle cx="18" cy="6" r="1.5"></circle>
              </svg>
            </div>
            <span className="font-medium">Instagram</span>
          </div>
          
          {instagramToken ? (
            <div className="flex items-center">
              {username && (
                <span className="text-sm text-gray-600 mr-3">@{username}</span>
              )}
              <button
                onClick={handleDisconnect}
                className="text-sm bg-red-100 hover:bg-red-200 text-red-700 px-3 py-1 rounded"
              >
                Disconnect
              </button>
            </div>
          ) : (
            <button
              onClick={handleInstagramLogin}
              className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
            >
              Connect
            </button>
          )}
        </div>
        
        {error && (
          <div className="mt-2 text-sm text-red-600">
            Error: {error}
          </div>
        )}
      </div>
      
      {/* Clerk UserProfile - Center aligned */}
      <div className="flex justify-center w-full">
        <UserProfile routing='hash' />
      </div>
    </div>
  );
}

export default Settings;