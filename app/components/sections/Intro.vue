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

const handleClickButton = () => {
    alert('Resume is coming soon!');
};
</script>
<template>
    <section id="intro" class="relative min-h-screen overflow-hidden">
        <canvas ref="canvasRef" class="absolute inset-0 w-full h-full"></canvas>
        <div class="relative z-10 flex items-center justify-center min-h-screen px-2 sm:px-0">
            <div class="mx-auto max-w-xl w-full space-y-8 text-left px-6">
                <div class="mb-5 space-y-8">
                    <h1 class="text-3xl font-bold tracking-tight text-white sm:text-6xl leading-tight sm:leading-tight text-center">
                        Hey! I'm&nbsp;
                        <span class="text-4xl sm:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-amber-500 to-red-500"
                            >Aaron&nbsp;Mark</span
                        >
                    </h1>
                    <div class="text-zinc-300 rounded-xl shadow-xl text-base sm:text-lg bg-zinc-900/15 backdrop-blur-md text-justify px-3 py-2">
                        I'm currently a student studying <strong>Computer Science & Engineering</strong> at the University of Connecticut. I have a
                        passion for programming and learning how things work. I started learning how to code by reverse engineering web games, and
                        found a passion for the complex systems and underlying code that makes them up.
                    </div>
                </div>

                <div class="buttons flex flex-col sm:flex-row justify-center gap-4 sm:gap-8 w-full">
                    <button
                        @click="handleClickButton"
                        class="btn w-full sm:w-auto min-w-[150px] p-0.5 rounded-xl bg-gradient-to-r from-amber-500 to-red-500 transition-transform duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    >
                        <span class="flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-zinc-950">
                            <Icon name="mdi:download" size="20" />
                            See Resume
                        </span>
                    </button>
                    <a
                        href="https://linkedin.com/in/aaronmark05"
                        target="_blank"
                        class="btn w-full sm:w-auto min-w-[150px] px-4 py-2 rounded-xl bg-gradient-to-r text-zinc-950 from-amber-500 to-red-500 font-extrabold transition-transform duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-amber-500 flex items-center justify-center gap-2"
                        aria-label="LinkedIn"
                    >
                        <Icon name="mdi:linkedin" size="20" />
                        Let's Connect
                    </a>
                </div>
                <div class="buttons flex flex-col sm:flex-row justify-center gap-4 sm:gap-8 w-full">
                    <a href="https://github.com/aaron193" target="_blank" class="transition-transform duration-300 hover:scale-105">
                        <span class="flex items-center justify-center gap-2 px-4 text-sm py-2 rounded-xl underline">
                            <Icon name="mdi:github" size="20" />
                            Just look at the code!
                        </span>
                    </a>
                </div>
            </div>
        </div>
    </section>
</template>
