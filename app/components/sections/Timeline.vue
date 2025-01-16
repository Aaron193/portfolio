<script setup lang="ts">
const timelineData = [
    {
        year: 'Nov 2024',
        title: 'Student Web Developer',
        content:
            'Developing modern web applications using the Laravel web framework for UConn <a class="text-gray-300 underline" target="_blank" href="https://dxgroup.core.uconn.edu/">Internal Insights & Innovation.</a>',
    },
    {
        year: 'Aug 2023',
        title: 'University of Connecticut',
        content:
            "Joined the Computer Science & Engineering Class of 2027, achieving <strong>Dean's List</strong> honors three times in the College of Engineering.",
    },
    {
        year: 'Winter 2021',
        title: 'Ski Instructor',
        content:
            'Taught the fundamentals of skiing to children aged 4-14 at <a class="text-gray-300 underline" target="blank" href="https://skisundown.com/">Ski Sundown</a>. Used progressional learning techniques while maintaining a fun and safe environment.',
    },
    {
        year: 'Oct 2020',
        title: 'Some Random Event',
        content: 'lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit, est. Nam cupiditate earum labore voluptas?',
    },
];
</script>

<template>
    <div class="flex flex-col items-center px-4">
        <h1 class="text-4xl md:text-5xl font-bold py-8 md:py-12">Timeline</h1>

        <div class="w-full max-w-4xl relative">
            <!-- Vertical bar -->
            <div class="absolute left-4 md:left-1/2 h-full w-0.5 bg-cyan-500"></div>

            <!-- Timeline items -->
            <div v-for="(event, index) in timelineData" :key="index">
                <!-- All events stack on the right side on mobile -->
                <div class="relative flex items-start mb-8">
                    <!-- Dot with glow -->
                    <div
                        class="absolute left-4 md:left-1/2 -translate-x-1/2 w-4 h-4 bg-cyan-500 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.7)]"
                    ></div>

                    <!-- Content shifts right on mobile, alternates on desktop -->
                    <div
                        class="w-full md:w-5/12 ml-12 md:ml-0"
                        :class="{
                            'md:ml-auto md:text-left md:pl-8': index % 2 !== 0,
                            'md:mr-auto md:text-right md:pr-8': index % 2 === 0,
                        }"
                    >
                        <div class="text-base font-semibold text-cyan-500">{{ event.year }}</div>
                        <h3 class="text-xl font-bold mt-1">{{ event.title }}</h3>
                        <p class="mt-2 text-gray-400" v-html="event.content"></p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
