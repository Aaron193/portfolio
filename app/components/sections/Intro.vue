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
    alert('This button has not been programmed yet, sorry :(');
};

const contactModalOpen = ref(false);

const showContactModal = () => {
    contactModalOpen.value = true;
};

const closeContactModal = () => {
    contactModalOpen.value = false;
};
</script>
<template>
    <section id="intro" class="relative min-h-screen">
        <canvas ref="canvasRef" class="absolute inset-0 w-full h-full"></canvas>
        <div class="relative z-10 flex items-center justify-center min-h-screen">
            <div class="mx-auto max-w-xl space-y-8 text-center">
                <div class="text-red-500 flex justify-center space-x-2 font-bold">
                    <span class="text-red-300"> This website is currently under construction</span>
                </div>
                <div class="mb-5 space-y-8">
                    <h1 class="text-5xl font-bold tracking-tight text-white sm:text-6xl">
                        Hello, my name is
                        <span class="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-green-500">Aaron&nbsp;Mark</span>
                    </h1>
                    <div class="text-gray-300 p-2 shadow-xl">
                        I'm currently a student studying <strong>Computer Science & Engineering</strong> at the University of Connecticut. I have a
                        passion for programming and learning how things work. I started learning how to code by reverse engineering web games, and
                        found a passion for the complex systems and underlying code that makes them up.
                    </div>
                </div>

                <div class="buttons flex justify-center gap-8">
                    <button @click="handleClickButton" class="btn min-w-[150px] p-0.5 rounded-xl bg-gradient-to-r from-blue-500 to-green-500">
                        <span class="block px-4 py-2 rounded-xl bg-gray-950">See Resume</span>
                    </button>
                    <button
                        @click="showContactModal"
                        class="btn min-w-[150px] px-4 py-2 rounded-xl bg-gradient-to-r text-gray-950 from-blue-500 to-green-500 font-extrabold"
                    >
                        Let's talk
                    </button>

                    <Modal v-if="contactModalOpen" @close="closeContactModal">
                        <template v-slot:body>
                            <ContactForm />
                        </template>
                    </Modal>
                </div>

                <!-- Social buttons -->
                <div class="flex items-center justify-center space-x-4">
                    <a
                        href="https://github.com/aaron193"
                        class="w-12 h-12 rounded-full border-2 border-cyan-500 flex items-center justify-center hover:bg-cyan-950"
                        target="_blank"
                    >
                        <Icon name="mdi:github" size="24" />
                    </a>
                    <a
                        href="https://linkedin.com/in/aaronmark05"
                        class="w-12 h-12 rounded-full border-2 border-cyan-500 flex items-center justify-center hover:bg-cyan-950"
                        target="_blank"
                    >
                        <Icon name="mdi:linkedin" size="24" />
                    </a>
                </div>
            </div>
        </div>
    </section>
</template>
