import React from 'react'
import ReactDOM from 'react-dom/client'
import CssBaseline from '@mui/material/CssBaseline'
import App from './App.jsx'

/**
 * Report Web Vitals metrics
 * Tracks Core Web Vitals: LCP, FID, CLS, FCP, TTFB
 * 
 * In development: logs to console
 * In production: can be extended to send to analytics
 * 
 * @param {Function} onPerfEntry - Callback function to handle metrics
 */
const reportWebVitals = (onPerfEntry) => {
  if (onPerfEntry && typeof onPerfEntry === 'function') {
    // Dynamic import to avoid adding to initial bundle
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry)
      getFID(onPerfEntry)
      getFCP(onPerfEntry)
      getLCP(onPerfEntry)
      getTTFB(onPerfEntry)
    }).catch(() => {
      // web-vitals not available, silently ignore
      console.debug('web-vitals not available')
    })
  }
}

/**
 * Log performance metrics in development
 * In production, this can be extended to send to analytics service
 */
const logMetric = (metric) => {
  if (import.meta.env.DEV) {
    // Development: log to console with color coding
    const colors = {
      CLS: '#10B981', // Green for layout shift
      FID: '#3B82F6', // Blue for interactivity
      FCP: '#F59E0B', // Amber for first paint
      LCP: '#EF4444', // Red for largest paint
      TTFB: '#8B5CF6'  // Purple for time to first byte
    }
    
    console.log(
      `%c[Web Vitals] ${metric.name}: ${metric.value.toFixed(2)}${metric.name === 'CLS' ? '' : 'ms'}`,
      `color: ${colors[metric.name] || '#6B7280'}; font-weight: bold;`
    )
    
    // Log rating for quick assessment
    const rating = metric.rating // 'good', 'needs-improvement', or 'poor'
    if (rating) {
      const ratingColors = {
        good: '#10B981',
        'needs-improvement': '#F59E0B',
        poor: '#EF4444'
      }
      console.log(
        `%c  Rating: ${rating}`,
        `color: ${ratingColors[rating]}; font-size: 0.9em;`
      )
    }
  } else {
    // Production: send to analytics (extend as needed)
    // Example: send to Google Analytics
    // if (window.gtag) {
    //   window.gtag('event', metric.name, {
    //     event_category: 'Web Vitals',
    //     value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
    //     event_label: metric.id,
    //     non_interaction: true
    //   })
    // }
    
    // Example: send to custom analytics endpoint
    // navigator.sendBeacon?.('/api/analytics', JSON.stringify({
    //   name: metric.name,
    //   value: metric.value,
    //   rating: metric.rating,
    //   id: metric.id,
    //   navigationType: metric.navigationType
    // }))
  }
}

// Create React root and render app
const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <React.StrictMode>
    <CssBaseline />
    <App />
  </React.StrictMode>
)

// Initialize Web Vitals tracking
reportWebVitals(logMetric)

// Log app initialization in development
if (import.meta.env.DEV) {
  console.log(
    '%c🚀 SpanishVIP Campus initialized',
    'color: #0AA6A6; font-weight: bold; font-size: 1.2em;'
  )
  console.log(
    '%c📊 Web Vitals tracking enabled - metrics will appear as they are measured',
    'color: #6B7280; font-size: 0.9em;'
  )
}

// Register service worker in production (if available)
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('SW registered:', registration.scope)
        
        // Check for updates
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing
          if (newWorker) {
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                // New content available, notify user
                console.log('New content available, refresh to update')
                // Could dispatch custom event for UI notification
                window.dispatchEvent(new CustomEvent('sw-update-available'))
              }
            })
          }
        })
      })
      .catch((error) => {
        console.log('SW registration failed:', error)
      })
  })
}
