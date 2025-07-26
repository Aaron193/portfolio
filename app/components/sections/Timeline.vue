<script setup lang="ts">
const timelineData = [
    {
        year: 'Nov 2024',
        title: 'Student Web Developer',
        content:
            'Developing modern web applications using the Laravel web framework for UConn <a class="text-zinc-300 underline" target="_blank" href="https://dxgroup.core.uconn.edu/">Internal Insights & Innovation.</a> Some of my contributions include <a class="text-zinc-300 underline" target="_blank" href="https://wellscan.io/">Wellscan.io</a> , MSIS Tool, and ROSSA.',
    },
    {
        year: 'Aug 2023',
        title: 'University of Connecticut',
        content:
            "Joined the Computer Science & Engineering Class of 2027, achieving <strong>Dean's List</strong> honors 4x in the College of Engineering with a GPA of <strong>3.97</strong>/4.0.",
    },
    {
        year: 'Winter 2020 & 2021',
        title: 'Ski Instructor',
        content:
            'Taught the fundamentals of skiing to children aged 4-14 at <a class="text-zinc-300 underline" target="blank" href="https://skisundown.com/">Ski Sundown</a>. Used progressional learning techniques while maintaining a fun and safe environment.',
    },
    {
        year: 'Winter 2020',
        title: 'My First Line of Code',
        content:
            'My first line of code was modifying a jQuery TamperMonkey script that altered some HTML on a webpage. Oh, if only I knew what I was getting into...',
    },
];
</script>

<template>
    <section id="timeline" class="flex flex-col items-center py-16 px-4">
        <div class="text-center mb-12">
            <h2 class="text-4xl font-extrabold leading-tight mb-3">My Timeline</h2>
            <p class="text-lg text-gray-500">A very scientific timeline of my life.</p>
        </div>
        <div class="w-full max-w-4xl relative">
            <!-- Vertical bar -->
            <div class="absolute left-4 md:left-1/2 h-full w-0.5 bg-amber-500"></div>

            <!-- Timeline items -->
            <div v-for="(event, index) in timelineData" :key="index">
                <!-- All events stack on the right side on mobile -->
                <div class="relative flex items-start mb-8">
                    <!-- Dot with glow -->
                    <div class="absolute left-4 md:left-1/2 -translate-x-[6.8005px] w-4 h-4 bg-amber-500 rounded-full"></div>

                    <!-- Content shifts right on mobile, alternates on desktop -->
                    <div
                        class="w-full md:w-5/12 ml-12 md:ml-0"
                        :class="{
                            'md:ml-auto md:text-left md:pl-8': index % 2 !== 0,
                            'md:mr-auto md:text-right md:pr-8': index % 2 === 0,
                        }"
                    >
                        <div class="text-base font-semibold text-amber-500">{{ event.year }}</div>
                        <h3 class="text-xl font-bold mt-1">{{ event.title }}</h3>
                        <p class="mt-2 text-zinc-400" v-html="event.content"></p>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
