<script setup lang="ts">
useSeoMeta({
    title: 'Aaron Mark | Personal Portfolio',
    description: 'Personal portfolio of Aaron Mark',
    ogTitle: 'Aaron Mark | Personal Portfolio',
    ogDescription: 'Personal portfolio of Aaron Mark',
    // ogImage: '',
    ogUrl: `http:localhost:3000`,
    twitterTitle: 'Aaron Mark | Personal Portfolio',
    twitterDescription: 'Personal portfolio of Aaron Mark',
    // twitterImage: '',
    twitterCard: 'summary',
});
</script>

<template>
    <SectionsIntro />
    <SectionsTimeline />
    <SectionsProjects />
</template>

<style scoped></style>
