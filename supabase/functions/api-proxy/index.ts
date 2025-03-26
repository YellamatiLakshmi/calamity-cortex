
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

// Get environment variables
const GEMINI_API_KEY = Deno.env.get('GEMINI_API_KEY') || '';
const NASA_FLOOD_API_KEY = Deno.env.get('NASA_FLOOD_API_KEY') || '';
const OPENWEATHERMAP_API_KEY = Deno.env.get('OPENWEATHERMAP_API_KEY') || '';
const NEWS_API_KEY = Deno.env.get('NEWS_API_KEY') || '';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { service, endpoint, params } = await req.json();
    
    let apiUrl = '';
    let apiKey = '';
    let headers = {};
    let method = 'GET';
    let body = null;

    // Route request based on service
    switch (service) {
      case 'gemini':
        apiUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';
        apiKey = GEMINI_API_KEY;
        method = 'POST';
        body = JSON.stringify(params);
        headers = {
          'Content-Type': 'application/json',
        };
        break;
        
      case 'nasa':
        apiUrl = `https://api.nasa.gov/${endpoint}`;
        apiKey = NASA_FLOOD_API_KEY;
        break;
        
      case 'weather':
        apiUrl = `https://api.openweathermap.org/data/2.5/${endpoint}`;
        apiKey = OPENWEATHERMAP_API_KEY;
        break;
        
      case 'news':
        apiUrl = `https://newsapi.org/v2/${endpoint}`;
        apiKey = NEWS_API_KEY;
        break;
        
      default:
        throw new Error('Unknown service requested');
    }

    // Add API key to URL or headers as needed
    if (method === 'GET') {
      const separator = apiUrl.includes('?') ? '&' : '?';
      
      // Different APIs expect the API key in different parameter names
      if (service === 'gemini') {
        apiUrl += `${separator}key=${apiKey}`;
      } else if (service === 'nasa') {
        apiUrl += `${separator}api_key=${apiKey}`;
      } else if (service === 'weather') {
        apiUrl += `${separator}appid=${apiKey}`;
      } else if (service === 'news') {
        apiUrl += `${separator}apiKey=${apiKey}`;
      }
      
      // Add any additional params
      if (params) {
        for (const [key, value] of Object.entries(params)) {
          apiUrl += `&${key}=${encodeURIComponent(String(value))}`;
        }
      }
    } else if (service === 'gemini') {
      // For POST requests to Gemini, add the API key to the URL
      apiUrl += `?key=${apiKey}`;
    }

    console.log(`Making ${method} request to: ${apiUrl}`);
    
    // Make the actual API call
    const response = await fetch(apiUrl, {
      method,
      headers,
      body,
    });

    const data = await response.json();
    
    // Return the data from the external API
    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: response.status,
    });
  } catch (error) {
    console.error('Error in api-proxy function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
