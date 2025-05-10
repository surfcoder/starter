<script setup lang="ts">
definePageMeta({
  title: 'Blog Posts',
  description: 'Browse all blog posts from our Directus CMS'
})
</script>

<template>
  <UContainer>
    <UPageHeader
      title="Blog Posts"
      description="Content from our Directus CMS"
      class="mb-8"
    >
      <template #right>
        <UButton
          to="/"
          color="gray"
          variant="ghost"
          label="Back to Home"
          icon="i-heroicons-home"
        />
      </template>
    </UPageHeader>
    
    <PostsList />
  </UContainer>
</template>
