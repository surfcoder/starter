<template>
  <div>
    <UPageHero
      title="Directus + Nuxt UI Pro"
      description="A modern headless CMS paired with a beautiful UI framework to create powerful web applications."
      :links="[{
        label: 'Get started',
        to: 'https://ui.nuxt.com/getting-started/installation/pro/nuxt',
        target: '_blank',
        trailingIcon: 'i-lucide-arrow-right',
        size: 'xl'
      }, {
        label: 'Directus Docs',
        to: 'https://docs.directus.io',
        target: '_blank',
        icon: 'i-lucide-database',
        size: 'xl',
        color: 'neutral',
        variant: 'subtle'
      }]"
    />

    <!-- Directus Connection Status Card -->
    <UContainer class="mt-12">
      <h2 class="text-3xl font-bold mb-6">Directus Connection</h2>
      <DirectusStatus />
    </UContainer>

    <UPageSection
      id="features"
      title="The best of both worlds"
      description="Combine the power of Directus as a headless CMS with the beautiful UI components from Nuxt UI Pro to create modern web applications quickly."
      :features="[{
        icon: 'i-lucide-database',
        title: 'Headless CMS',
        description: 'Directus provides a flexible content management system with a powerful API to manage your content.'
      }, {
        icon: 'i-lucide-layout-dashboard',
        title: 'Beautiful UI Components',
        description: 'Nuxt UI Pro offers premium components that make it easy to build beautiful and responsive interfaces.'
      }, {
        icon: 'i-lucide-code',
        title: 'Developer Experience',
        description: 'TypeScript support, auto-imports, and a well-documented API make development a breeze.'
      }]"
    />

    <UPageSection>
      <UPageCTA
        title="Build your next project with Directus and Nuxt UI Pro"
        description="Get started quickly with this powerful combination of headless CMS and beautiful UI components."
        variant="subtle"
        :links="[{
          label: 'Directus Documentation',
          to: 'https://docs.directus.io',
          target: '_blank',
          icon: 'i-lucide-database',
          color: 'neutral'
        }, {
          label: 'Nuxt UI Pro',
          to: 'https://ui.nuxt.com/pro',
          target: '_blank',
          trailingIcon: 'i-lucide-sparkles',
          color: 'neutral',
          variant: 'subtle'
        }]"
      />
    </UPageSection>
  </div>
</template>
