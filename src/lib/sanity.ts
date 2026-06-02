import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

// Fallback config if environment variables are not set
const sanityConfig = {
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID || 'dummy_id',
  dataset: import.meta.env.VITE_SANITY_DATASET || 'production',
  useCdn: true,
  apiVersion: '2023-05-03',
}

export const sanityClient = createClient(sanityConfig)

const builder = imageUrlBuilder(sanityClient)

export function urlFor(source: any) {
  return builder.image(source)
}

// Helper to determine if we should fall back to mock data
export const isSanityConfigured = () => {
  return (
    import.meta.env.VITE_SANITY_PROJECT_ID !== undefined &&
    import.meta.env.VITE_SANITY_PROJECT_ID !== ''
  )
}
