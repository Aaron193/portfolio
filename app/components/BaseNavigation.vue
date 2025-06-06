<script setup lang="ts">
const isScrollingDown = ref(false);
const isMobileMenuOpen = ref(false);
let lastScrollTop = 0;

const handleScroll = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    isScrollingDown.value = scrollTop > lastScrollTop;
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
};

const toggleMobileMenu = () => {
    isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

const closeMobileMenu = () => {
    isMobileMenuOpen.value = false;
};

onMounted(() => {
    window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
});
</script>

<template>
    <header
        :class="{ '-translate-y-full': isScrollingDown, 'translate-y-0': !isScrollingDown }"
        class="z-[1000] py-2 flex justify-center fixed w-full transition-transform duration-300"
    >
        <!-- Desktop Navigation -->
        <nav class="relative items-center px-5 py-3 rounded-xl hidden md:inline-flex">
            <div class="absolute inset-0 rounded-xl bg-gradient-to-r from-amber-500 to-red-500 p-0.5">
                <div class="w-full h-full bg-zinc-950 rounded-xl"></div>
            </div>
            <ul class="relative flex gap-6 text-sm capitalize text-zinc-200 items-center">
                <li>
                    <NuxtLink to="#intro" class="gradient-underline">Home</NuxtLink>
                </li>
                <li>
                    <NuxtLink to="#timeline" class="gradient-underline">Timeline</NuxtLink>
                </li>
                <li>
                    <NuxtLink to="#skills" class="gradient-underline">Skills</NuxtLink>
                </li>
                <li>
                    <NuxtLink to="#projects" class="gradient-underline">Projects</NuxtLink>
                </li>
                <li>
                    <a href="https://github.com/aaron193" target="_blank" aria-label="GitHub" class="hover:text-amber-500 transition-colors">
                        <Icon name="mdi:github" size="22" />
                    </a>
                </li>
                <li>
                    <a
                        href="https://linkedin.com/in/aaronmark05"
                        target="_blank"
                        aria-label="LinkedIn"
                        class="hover:text-amber-500 transition-colors"
                    >
                        <Icon name="mdi:linkedin" size="22" />
                    </a>
                </li>
                <li>
                    <a href="mailto:aaron.mark@uconn.edu" aria-label="Email" class="hover:text-amber-500 transition-colors">
                        <Icon name="mdi:email" size="22" />
                    </a>
                </li>
            </ul>
        </nav>

        <!-- Mobile Menu Button -->
        <div class="md:hidden fixed top-4 right-4 z-[1100]">
            <button @click="toggleMobileMenu" class="relative inline-flex items-center p-3 rounded-xl" aria-label="Toggle mobile menu">
                <div class="absolute inset-0 rounded-xl bg-gradient-to-r from-amber-500 to-red-500 p-0.5">
                    <div class="w-full h-full bg-zinc-950 rounded-xl"></div>
                </div>
                <span class="relative text-zinc-200 hover:text-amber-500 transition-colors">
                    <svg v-if="isMobileMenuOpen" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                        <path
                            d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"
                            fill="white"
                        />
                    </svg>
                    <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                        <path d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z" fill="white" />
                    </svg>
                </span>
            </button>
        </div>

        <!-- Mobile Menu -->
        <div v-if="isMobileMenuOpen" class="md:hidden fixed inset-0 z-[900]" @click="closeMobileMenu">
            <div class="absolute top-20 right-4 w-64 rounded-xl bg-gradient-to-r from-amber-500 to-red-500 p-0.5" @click.stop>
                <div class="w-full h-full bg-zinc-950 rounded-xl p-6">
                    <ul class="flex flex-col gap-4 text-sm capitalize text-zinc-200">
                        <li>
                            <NuxtLink
                                to="#intro"
                                class="block py-2 px-3 rounded-lg hover:bg-zinc-900 transition-colors gradient-underline"
                                @click="closeMobileMenu"
                            >
                                Home
                            </NuxtLink>
                        </li>
                        <li>
                            <NuxtLink
                                to="#timeline"
                                class="block py-2 px-3 rounded-lg hover:bg-zinc-900 transition-colors gradient-underline"
                                @click="closeMobileMenu"
                            >
                                Timeline
                            </NuxtLink>
                        </li>
                        <li>
                            <NuxtLink
                                to="#skills"
                                class="block py-2 px-3 rounded-lg hover:bg-zinc-900 transition-colors gradient-underline"
                                @click="closeMobileMenu"
                            >
                                Skills
                            </NuxtLink>
                        </li>
                        <li>
                            <NuxtLink
                                to="#projects"
                                class="block py-2 px-3 rounded-lg hover:bg-zinc-900 transition-colors gradient-underline"
                                @click="closeMobileMenu"
                            >
                                Projects
                            </NuxtLink>
                        </li>
                        <li class="border-t border-zinc-700 pt-4 mt-4">
                            <div class="flex gap-4 justify-center">
                                <a
                                    href="https://github.com/aaron193"
                                    target="_blank"
                                    aria-label="GitHub"
                                    class="hover:text-amber-500 transition-colors"
                                >
                                    <Icon name="mdi:github" size="24" />
                                </a>
                                <a
                                    href="https://linkedin.com/in/aaronmark05"
                                    target="_blank"
                                    aria-label="LinkedIn"
                                    class="hover:text-amber-500 transition-colors"
                                >
                                    <Icon name="mdi:linkedin" size="24" />
                                </a>
                                <a href="mailto:aaron.mark@uconn.edu" aria-label="Email" class="hover:text-amber-500 transition-colors">
                                    <Icon name="mdi:email" size="24" />
                                </a>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </header>
</template>

<style scoped>
.gradient-underline {
    position: relative;
}

.gradient-underline::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -2px;
    width: 100%;
    height: 2px;
    background: linear-gradient(to right, #fd9a00, #fb2c36);
    transform: scaleX(0);
    transform-origin: bottom right;
    transition: transform 0.3s ease;
}

.gradient-underline:hover::after {
    transform: scaleX(1);
    transform-origin: bottom left;
}

header {
    transition: transform 0.3s ease-in-out;
}
</style>
