// app/instagram/route.ts
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')
  
  if (!code) {
    console.error('No code provided')
    return NextResponse.redirect('https://inspirecontent.onrender.com/dashboard/settings?error=no_code')
  }
  
  try {
    console.log('Received code:', code)
    
    const tokenResponse = await fetch('https://api.instagram.com/oauth/access_token', {
      method: 'POST',
      body: new URLSearchParams({
        client_id: process.env.CLIENT_ID || '',
        client_secret: process.env.APP_SECRET!,
        grant_type: 'authorization_code',
        redirect_uri: 'https://inspirecontent.onrender.com/instagram',
        code: code
      })
    })
    
    const responseText = await tokenResponse.text()
    console.log('Raw response:', responseText)
    
    let tokenData
    try {
      tokenData = JSON.parse(responseText)
    } catch (e) {
      console.error('Failed to parse response:', responseText)
      return NextResponse.redirect(
        'https://inspirecontent.onrender.com/dashboard/settings?error=invalid_response&message=' + encodeURIComponent(responseText)
      )
    }
    
    if (tokenData.error) {
      console.error('Token error:', tokenData.error)
      return NextResponse.redirect(
        'https://inspirecontent.onrender.com/dashboard/settings?error=' + encodeURIComponent(tokenData.error_message)
      )
    }
    
    // Get access token and user ID
    const token = tokenData.access_token
    const userId = tokenData.user_id
    
    // Get user info including username
    try {
      const userInfoResponse = await fetch(
        `https://graph.instagram.com/me?fields=id,username&access_token=${token}`
      )
      
      const userInfo = await userInfoResponse.json()
      console.log('User info:', userInfo)
      
      if (userInfo.username) {
        return NextResponse.redirect(
          `https://inspirecontent.onrender.com/dashboard/settings?success=true&token=${encodeURIComponent(token)}&userId=${encodeURIComponent(userInfo.id)}&username=${encodeURIComponent(userInfo.username)}`
        )
      }
    } catch (userInfoError) {
      console.error('Error fetching user info:', userInfoError)
    }
    
    // Fallback if username fetch fails
    return NextResponse.redirect(
      `https://inspirecontent.onrender.com/dashboard/settings?success=true&token=${encodeURIComponent(token)}&userId=${userId}`
    )
  } catch (error) {
    console.error('Instagram auth error:', error)
    return NextResponse.redirect(
      'https://inspirecontent.onrender.com/dashboard/settings?error=server_error'
    )
  }
}