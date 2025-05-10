<template>
  <UCard>
    <template #header>
      <div class="flex items-center gap-2">
        <div class="i-lucide-database text-primary" />
        <h3 class="text-lg font-semibold">Directus Connection Status</h3>
      </div>
    </template>

    <div class="space-y-4">
      <div v-if="loading" class="flex justify-center">
        <UButton :loading="true">Checking connection...</UButton>
      </div>
      
      <div v-else-if="error" class="p-4 border border-red-200 rounded-lg bg-red-50 dark:bg-red-950 dark:border-red-800">
        <p class="text-red-600 dark:text-red-400">
          <span class="font-bold">Error connecting to Directus:</span> {{ error }}
        </p>
        <p class="mt-2 text-sm">
          Make sure your Directus server is running at: {{ directusUrl }}
        </p>
      </div>
      
      <div v-else-if="connected" class="p-4 border border-green-200 rounded-lg bg-green-50 dark:bg-green-950 dark:border-green-800">
        <p class="text-green-600 dark:text-green-400">
          <span class="font-bold">✓</span> Successfully connected to Directus server
        </p>
        <p class="mt-2 text-sm">
          Server URL: {{ directusUrl }}
        </p>
      </div>
    </div>

    <template #footer>
      <div class="flex justify-end">
        <UButton
          v-if="!loading" 
          @click="checkConnection"
          variant="soft"
          color="gray"
          icon="i-lucide-refresh-cw"
        >
          Refresh Connection
        </UButton>
      </div>
    </template>
  </UCard>
</template>

<script setup lang="ts">
const { $directus } = useNuxtApp();
const config = useRuntimeConfig();
const directusUrl = config.public.directusUrl as string;

const connected = ref(false);
const loading = ref(true);
const error = ref<string | null>(null);

// Function to check connection to Directus
async function checkConnection() {
  loading.value = true;
  error.value = null;
  connected.value = false;
  
  try {
    // Try to access the Directus server
    // Here we get the client to make a simple request
    const client = $directus.getClient();
    await client.request('/server/ping');
    
    connected.value = true;
    error.value = null;
  } catch (err: any) {
    connected.value = false;
    error.value = err.message || 'Unknown error connecting to Directus';
  } finally {
    loading.value = false;
  }
}

// Check connection when component mounts
onMounted(() => {
  checkConnection();
});
</script>
