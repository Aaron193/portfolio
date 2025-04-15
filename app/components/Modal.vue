<script lang="ts">
export default {
    name: 'Modal',
    emits: ['close'],
    methods: {
        close() {
            this.$emit('close');
        },
    },
};
</script>

<template>
    <transition name="modal-fade">
        <div class="fixed inset-0 flex items-center justify-center z-50">
            <div class="absolute inset-0 bg-black opacity-50" @click="close"></div>
            <div
                class="relative bg-gray-900 rounded-xl shadow-[0_0_15px_rgba(209,213,219,0.25)] max-w-3xl w-full mx-4 p-6 text-white"
                role="dialog"
                aria-describedby="modalDescription"
            >
                <button class="absolute top-3 right-3 text-white hover:text-gray-400 p-1 rounded-full" @click="close" aria-label="Close Modal">
                    <Icon name="heroicons:x-mark-20-solid" size="24" />
                </button>

                <section id="modalDescription">
                    <slot name="body"> </slot>
                </section>
            </div>
        </div>
    </transition>
</template>

<style></style>
