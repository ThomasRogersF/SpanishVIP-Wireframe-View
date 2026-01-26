/**
 * Service Worker for SpanishVIP Campus
 * 
 * Provides offline support with cache-first strategy for static assets
 * and network-first strategy for API calls.
 * 
 * Features:
 * - Precaches critical assets during installation
 * - Cache-first for static assets (JS, CSS, fonts, images)
 * - Network-first for API calls
 * - Offline fallback page
 */

const CACHE_NAME = 'spanishvip-v1'
const STATIC_CACHE = 'spanishvip-static-v1'
const DYNAMIC_CACHE = 'spanishvip-dynamic-v1'

// Assets to precache during installation
const PRECACHE_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/favicon.svg',
  '/favicon-16x16.png',
  '/favicon-32x32.png',
  '/apple-touch-icon.png',
  '/icon-192x192.png',
  '/icon-512x512.png'
]

// Cache duration in seconds
const CACHE_DURATION = {
  static: 60 * 60 * 24 * 365, // 1 year for static assets
  dynamic: 60 * 60 * 24 * 7   // 1 week for dynamic content
}

/**
 * Install event - precache critical assets
 */
self.addEventListener('install', (event) => {
  console.log('[SW] Installing service worker...')
  
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log('[SW] Precaching critical assets')
        return cache.addAll(PRECACHE_ASSETS)
      })
      .then(() => {
        // Skip waiting to activate immediately
        return self.skipWaiting()
      })
      .catch((error) => {
        console.error('[SW] Precaching failed:', error)
      })
  )
})

/**
 * Activate event - clean up old caches
 */
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating service worker...')
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((name) => {
              // Delete old cache versions
              return name.startsWith('spanishvip-') && 
                     name !== STATIC_CACHE && 
                     name !== DYNAMIC_CACHE
            })
            .map((name) => {
              console.log('[SW] Deleting old cache:', name)
              return caches.delete(name)
            })
        )
      })
      .then(() => {
        // Claim all clients immediately
        return self.clients.claim()
      })
  )
})

/**
 * Fetch event - handle network requests with caching strategies
 */
self.addEventListener('fetch', (event) => {
  const { request } = event
  const url = new URL(request.url)
  
  // Skip non-GET requests
  if (request.method !== 'GET') {
    return
  }
  
  // Skip cross-origin requests except for fonts
  if (url.origin !== location.origin && !url.href.includes('fonts.googleapis.com')) {
    return
  }
  
  // Skip SDK and API requests
  if (url.pathname.startsWith('/_sdk') || url.pathname.startsWith('/api')) {
    return
  }
  
  // Determine caching strategy based on request type
  if (isStaticAsset(url.pathname)) {
    // Cache-first for static assets
    event.respondWith(cacheFirst(request, STATIC_CACHE))
  } else if (isNavigationRequest(request)) {
    // Network-first for navigation, with offline fallback
    event.respondWith(networkFirstWithOfflineFallback(request))
  } else {
    // Network-first for everything else
    event.respondWith(networkFirst(request, DYNAMIC_CACHE))
  }
})

/**
 * Check if request is for a static asset
 */
function isStaticAsset(pathname) {
  const staticExtensions = [
    '.js', '.css', '.woff', '.woff2', '.ttf', '.eot', '.otf',
    '.png', '.jpg', '.jpeg', '.gif', '.svg', '.ico', '.webp', '.avif'
  ]
  return staticExtensions.some((ext) => pathname.endsWith(ext))
}

/**
 * Check if request is a navigation request
 */
function isNavigationRequest(request) {
  return request.mode === 'navigate' || 
         request.destination === 'document'
}

/**
 * Cache-first strategy
 * Returns cached response if available, otherwise fetches from network
 */
async function cacheFirst(request, cacheName) {
  const cachedResponse = await caches.match(request)
  
  if (cachedResponse) {
    // Return cached response and update cache in background
    updateCache(request, cacheName)
    return cachedResponse
  }
  
  // Fetch from network and cache
  try {
    const networkResponse = await fetch(request)
    
    if (networkResponse.ok) {
      const cache = await caches.open(cacheName)
      cache.put(request, networkResponse.clone())
    }
    
    return networkResponse
  } catch (error) {
    console.error('[SW] Cache-first fetch failed:', error)
    throw error
  }
}

/**
 * Network-first strategy
 * Tries network first, falls back to cache
 */
async function networkFirst(request, cacheName) {
  try {
    const networkResponse = await fetch(request)
    
    if (networkResponse.ok) {
      const cache = await caches.open(cacheName)
      cache.put(request, networkResponse.clone())
    }
    
    return networkResponse
  } catch (error) {
    console.log('[SW] Network failed, falling back to cache')
    const cachedResponse = await caches.match(request)
    
    if (cachedResponse) {
      return cachedResponse
    }
    
    throw error
  }
}

/**
 * Network-first with offline fallback for navigation requests
 */
async function networkFirstWithOfflineFallback(request) {
  try {
    const networkResponse = await fetch(request)
    
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE)
      cache.put(request, networkResponse.clone())
    }
    
    return networkResponse
  } catch (error) {
    console.log('[SW] Navigation failed, checking cache')
    
    // Try to return cached page
    const cachedResponse = await caches.match(request)
    if (cachedResponse) {
      return cachedResponse
    }
    
    // Return cached index.html for SPA navigation
    const indexResponse = await caches.match('/index.html')
    if (indexResponse) {
      return indexResponse
    }
    
    // Return offline fallback response
    return new Response(
      `<!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Offline - SpanishVIP</title>
        <style>
          body {
            font-family: Inter, -apple-system, BlinkMacSystemFont, sans-serif;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            margin: 0;
            background: #F3F4F6;
            color: #111827;
            text-align: center;
            padding: 20px;
          }
          h1 { color: #0AA6A6; margin-bottom: 16px; }
          p { color: #6B7280; max-width: 400px; }
          button {
            margin-top: 24px;
            padding: 12px 24px;
            background: #0AA6A6;
            color: white;
            border: none;
            border-radius: 12px;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
          }
          button:hover { background: #099494; }
        </style>
      </head>
      <body>
        <h1>📵 You're Offline</h1>
        <p>It looks like you've lost your internet connection. Please check your connection and try again.</p>
        <button onclick="location.reload()">Try Again</button>
      </body>
      </html>`,
      {
        headers: { 'Content-Type': 'text/html' },
        status: 503,
        statusText: 'Service Unavailable'
      }
    )
  }
}

/**
 * Update cache in background (stale-while-revalidate pattern)
 */
async function updateCache(request, cacheName) {
  try {
    const networkResponse = await fetch(request)
    
    if (networkResponse.ok) {
      const cache = await caches.open(cacheName)
      await cache.put(request, networkResponse)
    }
  } catch (error) {
    // Silently fail - we have cached version
  }
}

/**
 * Message handler for cache management
 */
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting()
  }
  
  if (event.data && event.data.type === 'CLEAR_CACHE') {
    event.waitUntil(
      caches.keys().then((names) => {
        return Promise.all(names.map((name) => caches.delete(name)))
      })
    )
  }
})
