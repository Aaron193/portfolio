<script setup lang="ts">
interface Props {
    class?: string;
    glowColor?: string;
    glowOpacity?: number;
    glowIntensity?: number;
    borderIntensity?: number;
    mouseGlowColor?: string;
    mouseGlowOpacity?: number;
}

const props = withDefaults(defineProps<Props>(), {
    class: '',
    glowColor: '245, 158, 11',
    glowOpacity: 0.2,
    glowIntensity: 0.15,
    borderIntensity: 0.8,
    mouseGlowColor: '245, 158, 11',
    mouseGlowOpacity: 0.5,
});

import { ref, onMounted, onBeforeUnmount } from 'vue';
const mouseGlow = ref<HTMLElement | null>(null);
const wrapper = ref<HTMLElement | null>(null);
const borderGlow = ref<HTMLElement | null>(null);

function handleMouseMove(e: MouseEvent) {
    if (!wrapper.value || !mouseGlow.value || !borderGlow.value) return;
    const rect = wrapper.value.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    mouseGlow.value.style.opacity = String(props.mouseGlowOpacity);
    mouseGlow.value.style.background = `radial-gradient(300px circle at ${x}px ${y}px, rgba(${props.mouseGlowColor},${props.mouseGlowOpacity}) 0%, transparent 80%)`;
    borderGlow.value.style.background = `radial-gradient(400px circle at ${x}px ${y}px, rgba(${props.mouseGlowColor},${
        props.borderIntensity
    }) 0%, rgba(${props.mouseGlowColor},${props.borderIntensity * 0.75}) 25%, rgba(${props.mouseGlowColor},${
        props.borderIntensity * 0.5
    }) 50%, transparent 70%)`;
}

onMounted(() => {
    if (wrapper.value) {
        wrapper.value.addEventListener('mousemove', handleMouseMove);
        wrapper.value.addEventListener('mouseleave', () => {
            if (mouseGlow.value) mouseGlow.value.style.opacity = '0';
            if (borderGlow.value) borderGlow.value.style.background = '';
        });
    }
});
onBeforeUnmount(() => {
    if (wrapper.value) wrapper.value.removeEventListener('mousemove', handleMouseMove);
});
</script>

<template>
    <div
        ref="wrapper"
        :class="['glow-card-wrapper', props.class]"
        :style="{
            '--glow-color': props.glowColor,
            '--glow-opacity': props.glowOpacity,
            '--glow-intensity': props.glowIntensity,
            '--border-intensity': props.borderIntensity,
        }"
    >
        <div ref="borderGlow" class="card-border"></div>
        <div class="glow-card bg-slate-800/60 backdrop-blur-sm rounded-xl overflow-hidden relative">
            <div class="card-glow"></div>
            <div ref="mouseGlow" class="mouse-glow pointer-events-none absolute inset-0 z-20" style="opacity: 0"></div>
            <div class="relative z-10">
                <slot />
            </div>
        </div>
    </div>
</template>

<style scoped>
.glow-card-wrapper {
    transition: transform 0.3s ease;
    position: relative;
}

.glow-card {
    position: relative;
    z-index: 100;
}

.card-glow {
    display: block;
    position: absolute;
    inset: 0;
    border-radius: 0.75rem;
    pointer-events: none;
    background: radial-gradient(
        600px circle at 50% 100%,
        rgba(var(--glow-color), var(--glow-opacity, 0.7)) 0%,
        rgba(var(--glow-color), calc(var(--glow-opacity, 0.7) * 0.67)) 30%,
        rgba(var(--glow-color), calc(var(--glow-opacity, 0.7) * 0.33)) 50%,
        transparent 70%
    );
    opacity: 1;
    z-index: 1;
    transition: none;
}

.mouse-glow {
    pointer-events: none;
    position: absolute;
    inset: 0;
    border-radius: 0.75rem;
    z-index: 20;
    transition: opacity 0.2s;
}

.card-border {
    display: block;
    position: absolute;
    inset: -2px;
    border-radius: 0.875rem;
    pointer-events: none;
    background: radial-gradient(
        800px circle at 50% 100%,
        rgba(var(--glow-color), var(--border-intensity)) 0%,
        rgba(var(--glow-color), calc(var(--border-intensity) * 0.75)) 25%,
        rgba(var(--glow-color), calc(var(--border-intensity) * 0.5)) 50%,
        transparent 70%
    );
    opacity: 1;
    z-index: 0;
    filter: blur(1px);
    transition: none;
}
</style>
