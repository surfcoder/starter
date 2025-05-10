import { createDirectusClient } from 'directus-sdk';

export default defineNuxtPlugin(() => {
  // Get Directus URL from runtime config
  const config = useRuntimeConfig();
  const directusUrl = config.public.directusUrl as string || 'http://localhost:8055';
  
  // Create Directus client
  const directusClient = createDirectusClient(directusUrl);
  
  return {
    provide: {
      directus: directusClient
    }
  };
});
