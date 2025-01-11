<script setup lang="ts"></script>
<template>
    <header class="z-20 py-3 flex justify-center fixed w-full">
        <nav class="relative inline-flex items-center px-5 py-3 rounded-xl">
            <div class="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500 to-green-500 p-0.5">
                <div class="w-full h-full bg-gray-950 rounded-xl"></div>
            </div>
            <ul class="relative flex gap-6 text-sm capitalize text-gray-200">
                <li>
                    <NuxtLink to="/" class="gradient-underline">Home</NuxtLink>
                </li>
                <li>
                    <NuxtLink to="/projects" class="gradient-underline">Projects</NuxtLink>
                </li>
                <li>
                    <NuxtLink to="/about" class="gradient-underline">About</NuxtLink>
                </li>
                <li>
                    <NuxtLink to="/contact" class="gradient-underline">Contact</NuxtLink>
                </li>
            </ul>
        </nav>
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
    background: linear-gradient(to right, #3b82f6, #10b981);
    transform: scaleX(0);
    transform-origin: bottom right;
    transition: transform 0.3s ease;
}

.gradient-underline:hover::after {
    transform: scaleX(1);
    transform-origin: bottom left;
}
</style>
