<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { setup } from '~/scripts/animation';

const canvasRef = ref<HTMLCanvasElement | null>(null);

onMounted(() => {
    const canvas = canvasRef.value as HTMLCanvasElement;
    if (canvas) {
        setup(canvas, (screen.width * screen.height) / 100 ** 2);
    }
});
</script>

<template>
    <div class="font-Inter relative">
        <div class="fixed inset-0 overflow-hidden pointer-events-none">
            <!-- no tint dark background -->
            <div class="absolute inset-0 bg-slate-950"></div>

            <!-- canvas animation -->
            <canvas ref="canvasRef" class="absolute inset-0 w-full h-full opacity-70"></canvas>
            <!-- Left glow effect -->
            <div class="absolute left-0 top-0 h-full w-1/3">
                <div
                    class="absolute top-1/4 -left-32 w-64 h-64 md:w-96 md:h-96 bg-orange-500/25 md:bg-orange-500/25 rounded-full filter blur-3xl opacity-75 md:opacity-80 animate-blob"
                ></div>
                <div
                    class="absolute top-2/3 -left-24 w-48 h-48 md:w-64 md:h-64 bg-amber-500/18 md:bg-amber-500/20 rounded-full filter blur-2xl opacity-65 md:opacity-70 animate-blob animation-delay-2000"
                ></div>
                <div
                    class="absolute top-1/2 -left-40 w-56 h-56 md:w-80 md:h-80 bg-yellow-500/15 md:bg-yellow-500/15 rounded-full filter blur-3xl opacity-55 md:opacity-60 animate-blob animation-delay-4000"
                ></div>
            </div>

            <!-- Right glow effect -->
            <div class="absolute right-0 top-0 h-full w-1/3">
                <div
                    class="absolute top-1/3 -right-32 w-64 h-64 md:w-96 md:h-96 bg-orange-500/25 md:bg-orange-500/25 rounded-full filter blur-3xl opacity-75 md:opacity-80 animate-blob animation-delay-1000"
                ></div>
                <div
                    class="absolute top-3/4 -right-24 w-48 h-48 md:w-64 md:h-64 bg-amber-500/18 md:bg-amber-500/20 rounded-full filter blur-2xl opacity-65 md:opacity-70 animate-blob animation-delay-3000"
                ></div>
                <div
                    class="absolute top-1/6 -right-40 w-56 h-56 md:w-80 md:h-80 bg-yellow-500/15 md:bg-yellow-500/15 rounded-full filter blur-3xl opacity-55 md:opacity-60 animate-blob animation-delay-5000"
                ></div>
            </div>
        </div>

        <!-- Content -->
        <div class="relative z-10">
            <NuxtLayout>
                <NuxtPage />
            </NuxtLayout>
        </div>
    </div>
</template>

<style>
body {
    background-color: #030712;
    overflow-x: hidden;
}

@keyframes blob {
    0% {
        transform: translate(0px, 0px) scale(1);
    }
    33% {
        transform: translate(30px, -50px) scale(1.1);
    }
    66% {
        transform: translate(-20px, 20px) scale(0.9);
    }
    100% {
        transform: translate(0px, 0px) scale(1);
    }
}

.animate-blob {
    animation: blob 7s infinite;
}

.animation-delay-1000 {
    animation-delay: 1s;
}

.animation-delay-2000 {
    animation-delay: 2s;
}

.animation-delay-3000 {
    animation-delay: 3s;
}

.animation-delay-4000 {
    animation-delay: 4s;
}

.animation-delay-5000 {
    animation-delay: 5s;
}

.bg-grid-pattern {
    background-image: linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px);
    background-size: 50px 50px;
}

/* Additional glow effects */
@media (prefers-reduced-motion: no-preference) {
    .animate-blob {
        animation: blob 7s infinite;
    }
}

@media (prefers-reduced-motion: reduce) {
    .animate-blob {
        animation: none;
    }
}
</style>
