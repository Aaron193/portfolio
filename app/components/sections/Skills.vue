<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed, watch } from 'vue';
import type { ComputedRef, Ref } from 'vue';

interface CarouselItem {
    name: string;
    icon: string;
    desc: string;
}

interface CarouselConfig {
    key: string;
    title: string;
    color: string;
    icon: string;
    direction: 'ltr' | 'rtl';
    items: CarouselItem[];
}

interface SmoothCarousel {
    displayItems: ComputedRef<CarouselItem[]>;
    getTranslate: ComputedRef<number>;
    getCenterIndex: ComputedRef<number>;
    isHovered: Ref<boolean>;
    hoveredIndex: Ref<number | null>;
    onMouseEnter: (idx: number) => void;
    onMouseLeave: () => void;
    itemWidth: number;
    items: CarouselItem[];
    center: ComputedRef<number>;
    containerRef: Ref<HTMLElement | null>;
    visibleCount: Ref<number>;
}

const carousels: CarouselConfig[] = [
    {
        key: 'languages',
        title: 'Languages',
        color: 'amber',
        icon: 'mdi:web',
        direction: 'ltr',
        items: [
            { name: 'TypeScript', icon: 'logos:typescript-icon', desc: 'Strongly typed superset of JavaScript' },
            { name: 'JavaScript', icon: 'logos:javascript', desc: 'Versatile scripting language for the web' },
            { name: 'Python', icon: 'logos:python', desc: 'Popular for data science and automation' },
            { name: 'C', icon: 'logos:c', desc: 'Low-level systems programming language' },
            { name: 'C++', icon: 'logos:c-plusplus', desc: 'Powerful language for system and application development' },
            { name: 'Java', icon: 'logos:java', desc: 'Widely used for enterprise applications' },
            { name: 'PHP', icon: 'devicon:php', desc: 'Server-side scripting for web development' },
            { name: 'HTML', icon: 'logos:html-5', desc: 'Markup language for web pages' },
            { name: 'CSS', icon: 'logos:css-3', desc: 'Style sheet language for web design' },
        ],
    },
    {
        key: 'technologies',
        title: 'Technologies',
        color: 'orange',
        icon: 'mdi:cube-outline',
        direction: 'rtl',
        items: [
            { name: 'Node.js', icon: 'logos:nodejs-icon', desc: 'JavaScript runtime for server-side applications' },
            { name: 'Vue.js', icon: 'logos:vue', desc: 'Progressive JavaScript framework' },
            { name: 'Laravel', icon: 'logos:laravel', desc: 'PHP framework for web artisans' },
            { name: 'MongoDB', icon: 'logos:mongodb-icon', desc: 'NoSQL database for modern apps' },
            { name: 'MySQL', icon: 'logos:mysql-icon', desc: 'Relational database management system' },
            { name: 'Webpack', icon: 'logos:webpack', desc: 'Module bundler for JavaScript' },
            { name: 'Tailwind CSS', icon: 'logos:tailwindcss-icon', desc: 'Utility-first CSS framework' },
            { name: 'Bootstrap', icon: 'logos:bootstrap', desc: 'Popular CSS framework' },
        ],
    },
    {
        key: 'tools',
        title: 'Tools',
        color: 'red',
        icon: 'mdi:tools',
        direction: 'ltr',
        items: [
            { name: 'Git', icon: 'mdi:git', desc: 'Distributed version control system' },
            { name: 'GitHub', icon: 'mdi:github', desc: 'Code hosting platform for version control' },
            { name: 'Docker', icon: 'logos:docker-icon', desc: 'Containerization platform' },
            { name: 'VS Code', icon: 'logos:visual-studio-code', desc: 'Popular code editor' },
            { name: 'Linode', icon: 'logos:linode', desc: 'Cloud hosting provider' },
            { name: 'Linux', icon: 'mdi:linux', desc: 'Open-source operating system' },
        ],
    },
];

function useSmoothCarousel(items: CarouselItem[], defaultVisibleCount = 7, direction: 'ltr' | 'rtl' = 'ltr') {
    const position = ref(0);
    const isHovered = ref(false);
    const hoveredIndex = ref<number | null>(null);
    let animationFrame: number | null = null;
    const speed = 0.4;
    const itemWidth = 72; // px (icon + gap)

    const containerRef = ref<HTMLElement | null>(null);
    const visibleCount = ref(defaultVisibleCount);
    const center = computed(() => Math.floor(visibleCount.value / 2));

    function updateVisibleCount() {
        if (containerRef.value) {
            const width = containerRef.value.offsetWidth;
            visibleCount.value = Math.max(3, Math.floor(width / itemWidth));
        }
    }

    onMounted(() => {
        updateVisibleCount();
        window.addEventListener('resize', updateVisibleCount);
        animationFrame = requestAnimationFrame(animate);
    });
    onUnmounted(() => {
        if (animationFrame) cancelAnimationFrame(animationFrame);
        window.removeEventListener('resize', updateVisibleCount);
    });

    const displayItems = computed(() => [...items, ...items, ...items]);

    const getTranslate = computed(() => {
        let pos = position.value % items.length;
        if (pos < 0) pos += items.length;
        // Center based on visibleCount
        return -((pos + items.length) * itemWidth) + center.value * itemWidth;
    });

    const getCenterIndex = computed(() => {
        let pos = position.value % items.length;
        if (pos < 0) pos += items.length;
        return ((Math.round(pos) % items.length) + items.length) % items.length;
    });

    let then = performance.now();
    function animate() {
        const now = performance.now();
        const delta = (now - then) / 1000; // in seconds
        then = now;
        if (!isHovered.value) {
            position.value += (direction === 'rtl' ? -1 : 1) * speed * delta;
        }
        animationFrame = requestAnimationFrame(animate);
    }

    const onMouseEnter = (idx: number) => {
        isHovered.value = true;
        hoveredIndex.value = idx % items.length;
    };
    const onMouseLeave = () => {
        isHovered.value = false;
        hoveredIndex.value = null;
    };

    return {
        displayItems,
        getTranslate,
        getCenterIndex,
        isHovered,
        hoveredIndex,
        onMouseEnter,
        onMouseLeave,
        itemWidth,
        items,
        center,
        containerRef,
        visibleCount,
    };
}

const smoothCarousels: SmoothCarousel[] = carousels.map(c => useSmoothCarousel(c.items, 7, c.direction));

function getSmoothCarousel(idx: number): SmoothCarousel {
    return smoothCarousels[idx]!;
}

// have to do this because tailwind tweaking
const colorTextClass: Record<string, string> = {
    amber: 'text-amber-400',
    orange: 'text-orange-400',
    red: 'text-red-400',
};
const colorBgClass: Record<string, string> = {
    amber: 'bg-amber-500/10',
    orange: 'bg-orange-500/10',
    red: 'bg-red-500/10',
};
const colorIconClass: Record<string, string> = {
    amber: 'text-amber-500',
    orange: 'text-orange-500',
    red: 'text-red-500',
};
</script>

<template>
    <section class="py-16">
        <div class="container mx-auto">
            <div class="text-center mb-12">
                <h2 class="text-4xl font-extrabold leading-tight mb-3">My Skills & Technologies</h2>
                <p class="text-lg text-gray-500">A showcase of the languages, frameworks, and tools I work with.</p>
            </div>
            <div v-for="(carousel, idx) in carousels" :key="carousel.key" class="space-y-2 mb-8">
                <div class="flex items-center gap-4 justify-center">
                    <div :class="['w-10 h-10 flex items-center justify-center rounded-lg', colorBgClass[carousel.color]]">
                        <Icon :name="carousel.icon" :class="colorIconClass[carousel.color]" size="25" />
                    </div>
                    <h3 :class="['text-xl font-semibold', colorTextClass[carousel.color]]">{{ carousel.title }}</h3>
                </div>
                <div class="flex items-center justify-center gap-4 min-w-0">
                    <div
                        class="flex gap-4 overflow-x-hidden relative w-full max-w-[504px]"
                        style="height: 72px"
                        :ref="el => (getSmoothCarousel(idx).containerRef.value = el as HTMLElement)"
                    >
                        <div
                            class="flex transition-transform duration-0"
                            :style="{
                                width: getSmoothCarousel(idx).displayItems.value.length * getSmoothCarousel(idx).itemWidth + 'px',
                                transform: `translateX(${getSmoothCarousel(idx).getTranslate.value}px)`,
                            }"
                        >
                            <div
                                v-for="(item, i) in getSmoothCarousel(idx).displayItems.value"
                                :key="i"
                                class="flex-shrink-0 cursor-pointer transition-all duration-300"
                                :class="[
                                    (getSmoothCarousel(idx).isHovered &&
                                        getSmoothCarousel(idx).hoveredIndex.value === i % getSmoothCarousel(idx).items.length) ||
                                    (!getSmoothCarousel(idx).isHovered &&
                                        i % getSmoothCarousel(idx).items.length === getSmoothCarousel(idx).getCenterIndex.value)
                                        ? 'scale-125 z-10'
                                        : i % getSmoothCarousel(idx).items.length === getSmoothCarousel(idx).getCenterIndex.value
                                        ? 'scale-110 z-10'
                                        : 'scale-100 opacity-60',
                                ]"
                                @mouseenter="getSmoothCarousel(idx).onMouseEnter(i)"
                                @mouseleave="getSmoothCarousel(idx).onMouseLeave"
                                style="width: 64px; height: 64px; display: flex; align-items: center; justify-content: center; margin-right: 8px"
                            >
                                <Icon
                                    :name="item.icon!"
                                    :size="
                                        (getSmoothCarousel(idx).isHovered &&
                                            getSmoothCarousel(idx).hoveredIndex.value === i % getSmoothCarousel(idx).items.length) ||
                                        (!getSmoothCarousel(idx).isHovered &&
                                            i % getSmoothCarousel(idx).items.length === getSmoothCarousel(idx).getCenterIndex.value)
                                            ? 36
                                            : i % getSmoothCarousel(idx).items.length === getSmoothCarousel(idx).getCenterIndex.value
                                            ? 32
                                            : 28
                                    "
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="flex flex-col items-center text-center min-h-[2.5em] text-zinc-400 text-sm mb-6">
                    <Transition name="fade-desc" mode="out-in" :duration="250">
                        <span
                            class="text-zinc-300 text-base"
                            :key="
                                getSmoothCarousel(idx).isHovered && getSmoothCarousel(idx).hoveredIndex.value !== null
                                    ? 'hover-' + getSmoothCarousel(idx).hoveredIndex.value
                                    : 'center-' + getSmoothCarousel(idx).getCenterIndex.value
                            "
                        >
                            {{
                                getSmoothCarousel(idx).isHovered &&
                                getSmoothCarousel(idx).hoveredIndex.value !== null &&
                                carousel.items[getSmoothCarousel(idx).hoveredIndex.value!]
                                    ? carousel.items[getSmoothCarousel(idx).hoveredIndex.value!]?.name ?? ''
                                    : carousel.items[getSmoothCarousel(idx).getCenterIndex.value]?.name ?? ''
                            }}
                        </span>
                    </Transition>
                    <Transition name="fade-desc" mode="out-in" :duration="250">
                        <span
                            :key="
                                getSmoothCarousel(idx).isHovered && getSmoothCarousel(idx).hoveredIndex.value !== null
                                    ? 'hover-' + getSmoothCarousel(idx).hoveredIndex.value
                                    : 'center-' + getSmoothCarousel(idx).getCenterIndex.value
                            "
                        >
                            {{
                                getSmoothCarousel(idx).isHovered &&
                                getSmoothCarousel(idx).hoveredIndex.value !== null &&
                                carousel.items[getSmoothCarousel(idx).hoveredIndex.value!]
                                    ? carousel.items[getSmoothCarousel(idx).hoveredIndex.value!]?.desc ?? ''
                                    : carousel.items[getSmoothCarousel(idx).getCenterIndex.value]?.desc ?? ''
                            }}
                        </span>
                    </Transition>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
.fade-desc-enter-active,
.fade-desc-leave-active {
    transition: opacity 0.3s;
}
.fade-desc-enter-from,
.fade-desc-leave-to {
    opacity: 0;
}
.fade-desc-enter-to,
.fade-desc-leave-from {
    opacity: 1;
}
</style>
