<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { createDirectusClient } from '../../directus-sdk/src/index'
import type { DirectusSchema } from '../../directus-sdk/src/types'

// Initialize Directus client
const directusUrl = import.meta.env.VITE_DIRECTUS_URL || 'http://localhost:8055'
const directusToken = import.meta.env.VITE_DIRECTUS_TOKEN || ''
const client = createDirectusClient(directusUrl, directusToken)

// Type-safe state
type Post = DirectusSchema['posts'][number]
const posts = ref<Post[]>([])
const loading = ref(true)
const error = ref<string | null>(null)

// Fetch posts from Directus
const fetchPosts = async () => {
  loading.value = true
  error.value = null
  
  try {
    // Use direct fetch approach for compatibility
    const response = await fetch(`${directusUrl}/items/posts`, {
      headers: {
        'Content-Type': 'application/json',
        ...(directusToken ? { 'Authorization': `Bearer ${directusToken}` } : {})
      }
    })
    
    if (!response.ok) {
      throw new Error(`Failed to fetch posts: ${response.statusText}`)
    }
    
    const data = await response.json()
    posts.value = data.data as Post[]
  } catch (err) {
    console.error('Error fetching posts:', err)
    error.value = err instanceof Error ? err.message : 'Unknown error'
  } finally {
    loading.value = false
  }
}

// Load posts on component mount
onMounted(fetchPosts)
</script>

<template>
  <div class="posts-list">
    <h1 class="text-2xl font-bold mb-6">Blog Posts</h1>
    
    <UAlert v-if="error" type="danger" :title="error" icon="i-heroicons-exclamation-triangle" />
    
    <div v-if="loading" class="flex justify-center my-8">
      <ULoader size="lg" />
    </div>
    
    <div v-else-if="posts.length === 0" class="text-center my-8 p-8 border border-gray-200 rounded-lg">
      <h3 class="text-lg font-medium text-gray-500">No posts found</h3>
      <p class="mt-2 text-sm text-gray-400">
        Create some posts in your Directus instance to see them here.
      </p>
    </div>
    
    <div v-else class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <UCard 
        v-for="post in posts" 
        :key="post.id"
        :ui="{ 
          body: { padding: 'sm p-4' },
          ring: '', 
          divide: 'divide-y divide-gray-100'
        }"
      >
        <template #header>
          <div class="relative h-48 w-full overflow-hidden rounded-t-lg">
            <img 
              v-if="post.featured_image" 
              :src="`${directusUrl}/assets/${post.featured_image}`" 
              :alt="post.title"
              class="h-full w-full object-cover"
            />
            <div v-else class="h-full w-full bg-gray-100 flex items-center justify-center">
              <div class="text-gray-400">No image</div>
            </div>
          </div>
        </template>
        
        <div class="p-4">
          <h3 class="text-lg font-medium">{{ post.title }}</h3>
          <p v-if="post.excerpt" class="mt-2 text-sm text-gray-600 line-clamp-3">
            {{ post.excerpt }}
          </p>
          
          <div class="mt-4 flex items-center justify-between">
            <UBadge v-if="post.status" :color="post.status === 'published' ? 'green' : 'yellow'">
              {{ post.status }}
            </UBadge>
            <span v-if="post.date_published" class="text-xs text-gray-500">
              {{ new Date(post.date_published).toLocaleDateString() }}
            </span>
          </div>
        </div>
        
        <template #footer>
          <UButton
            block
            color="gray"
            variant="ghost"
            label="View Post"
            icon="i-heroicons-arrow-right"
            :to="`/posts/${post.slug}`"
            target="_blank"
          />
        </template>
      </UCard>
    </div>
  </div>
</template>
