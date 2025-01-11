<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { setup } from '~/scripts/animation';

useSeoMeta({
    title: 'Aaron Mark | Portfolio',
    description: 'Personal portfolio of Aaron Mark',
    ogTitle: 'Aaron Mark | Portfolio',
    ogDescription: 'Personal portfolio of Aaron Mark',
    // ogImage: '',
    ogUrl: `http:localhost:3000`,
    twitterTitle: 'Aaron Mark | Portfolio',
    twitterDescription: 'Personal portfolio of Aaron Mark',
    // twitterImage: '',
    twitterCard: 'summary',
});

const canvasRef = ref<HTMLCanvasElement | null>(null);

onMounted(() => {
    const canvas = canvasRef.value as HTMLCanvasElement;
    if (canvas) {
        setup(canvas, (screen.width * screen.height) / 100 ** 2);
    }
});
</script>

<template>
    <div class="relative min-h-screen">
        <canvas ref="canvasRef" class="fixed inset-0"></canvas>
        <section class="relative z-10 flex items-center justify-center min-h-screen">
            <div class="mx-auto max-w-xl space-y-8 text-center">
                <div class="mb-5 space-y-8">
                    <h1 class="text-5xl font-bold tracking-tight text-white sm:text-6xl">
                        Hello, my name is
                        <span class="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-green-500">Aaron Mark</span>
                    </h1>
                    <div class="text-gray-300 p-2 shadow-xl">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit, est. Temporibus quia iste velit vero, consequuntur eius
                        dolores magnam nam tempora optio error aliquam officiis. Nam cupiditate earum labore voluptas?
                    </div>
                </div>
                <div class="buttons flex justify-center gap-8">
                    <button class="btn p-0.5 rounded-xl bg-gradient-to-r from-blue-500 to-green-500">
                        <span class="block px-4 py-2 rounded-xl bg-gray-950">Explore Projects </span>
                    </button>
                    <button class="btn px-4 py-2 rounded-xl bg-gradient-to-r text-gray-950 from-blue-500 to-green-500 font-extrabold">
                        Contact Me
                    </button>
                </div>
            </div>
        </section>
        <section>
            <div class="my-10">
                Hello Section

                <div class="my-20">1234</div>
                <div class="my-20">1234</div>
                <div class="my-20">1234</div>
                <div class="my-20">1234</div>
            </div>
        </section>
    </div>
</template>

<style scoped></style>
