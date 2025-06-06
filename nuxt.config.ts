// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    srcDir: 'app',
    compatibilityDate: '2025-01-06',

    app: {
        baseURL: '/portfolio/',
        cdnURL: '/portfolio/',
    },

    image: {
        domains: [],
        baseURL: '/portfolio',
    },

    nitro: {
        prerender: {
            failOnError: false,
        },
        preset: 'github_pages',
    },

    future: {
        compatibilityVersion: 4,
    },

    experimental: {
        scanPageMeta: 'after-resolve',
        sharedPrerenderData: false,
        compileTemplate: true,
        resetAsyncDataToUndefined: true,
        templateUtils: true,
        relativeWatchPaths: true,
        normalizeComponentNames: false,
        spaLoadingTemplateLocation: 'within',
        defaults: {
            useAsyncData: {
                deep: true,
            },
        },
    },

    features: {
        inlineStyles: true,
    },

    unhead: {
        renderSSRHeadOptions: {
            omitLineBreaks: false,
        },
    },

    devtools: { enabled: true },
    modules: ['@nuxtjs/tailwindcss', '@nuxtjs/google-fonts', '@nuxt/icon', '@nuxt/image'],

    googleFonts: {
        families: {
            Inter: [100, 200, 300, 400, 500, 600, 700, 800, 900],
        },
    },
});
