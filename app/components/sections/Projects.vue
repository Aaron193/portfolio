<script setup lang="ts">
const projects = [
    {
        title: 'Multiplayer Survival Game',
        description:
            'A multiplayer survival game over two years in the making. This project is closed source, and has yet to been released. Some development features include: bit-level packet serialization, entity interpolation, spatial partitioning, network view culling, and more.',
        image: '/project1.jpg',
        technologies: ['Node.js', 'Typescript', 'uWebSockets', 'HTML', 'CSS', 'closed-source'],
        github: '',
        demo: '',
        date: '2022 - now',
    },
    {
        title: 'GGui.js',
        description:
            'GGui.js is a bare-bones GUI library built on TypeScript to simplify the process of creating graphical user interfaces for the web. With GGui.js, you can easily create folders and add components such as buttons, checkboxes, sliders and more, to organize and enhance your web interface.',
        image: '/project2.png',
        technologies: ['Typescript', 'HTML', 'CSS'],
        github: 'https://github.com/Aaron193/GGui.js',
        demo: '',
        date: '2024',
    },
    {
        title: 'Puzzle Rush',
        description:
            "Puzzle Rush is a web-based puzzle game that was designed for the 2023 Technology Student Association's annual Game-Design competition. The game was developed by a team of dedicated artists and coders, ultimately winning 2nd place.",
        image: '/project3.png',
        technologies: ['Node.js', 'Typescript', 'Express', 'HTML', 'CSS'],
        github: 'https://github.com/Aaron193/puzzle-rush',
        demo: 'https://aaron193.github.io/puzzle-rush/',
        date: '2023',
    },
    {
        title: 'Flashcard Studying App',
        description:
            'This project is a web-based flashcard studying application that allows users to create, edit, and study flashcards. This app was built in order to fulfill my High School mastery experience requirement, and is one of the first websites I have built.',
        image: '/project4.png',
        technologies: ['Node.js', 'JavaScript', 'Express', 'HTML', 'CSS'],
        github: 'https://github.com/Aaron193/flashcard-study-website',
        demo: 'https://aaron193.github.io/flashcard-study-website/',
        date: '2022',
    },
    {
        title: 'Asteroids',
        description:
            'Asteroids is a multiplayer web-based game that is very early in development. I began this project with the goal of creating a simple, yet addictive game that can be played with friends. I also wanted to provide an open-source resource for others who want to learn the basics of multiplayer development.',
        image: '/project5.png',
        technologies: ['Node.js', 'TypeScript', 'uWebSockets', 'bitecs (ECS)', 'Box2D (Physics)'],
        github: 'https://github.com/Aaron193/asteroids',
        demo: '',
        date: '2025',
    },
];
</script>

<template>
    <section id="projects" class="py-16 px-4 bg-gray-950">
        <div class="max-w-6xl mx-auto">
            <h1 class="text-4xl md:text-5xl font-bold text-center mb-12">Projects</h1>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <!-- Project Card -->
                <div
                    v-for="project in projects"
                    class="bg-gray-900 rounded-xl overflow-hidden transition-transform hover:-translate-y-2 duration-300 shadow-[0_0_15px_rgba(209,213,219,0.25)]"
                >
                    <!-- Project Image -->
                    <div class="relative h-48 overflow-hidden">
                        <NuxtImg :src="project.image" :alt="project.title" class="w-full h-full object-cover filter" loading="lazy" />
                        <span class="absolute top-2 left-2 bg-gray-800 text-white text-base px-2 py-1 rounded font-bold">{{ project.date }}</span>
                    </div>

                    <!-- Project Info -->
                    <div class="p-6 space-y-4">
                        <h3 class="text-xl font-bold">{{ project.title }}</h3>
                        <p class="text-gray-400">{{ project.description }}</p>

                        <!-- Technologies -->
                        <div class="flex flex-wrap gap-2">
                            <span v-for="tech in project.technologies" class="px-3 py-1 text-sm rounded-full bg-gray-800 text-blue-400">
                                {{ tech }}
                            </span>
                        </div>

                        <!-- Links -->
                        <div class="flex gap-4 pt-4">
                            <a
                                v-if="project.github"
                                :href="project.github"
                                target="_blank"
                                class="flex items-center gap-2 text-blue-500 hover:text-blue-400"
                            >
                                <Icon name="mdi:github" size="20" />
                                <span>GitHub</span>
                            </a>
                            <a
                                v-if="project.demo"
                                :href="project.demo"
                                target="_blank"
                                class="flex items-center gap-2 text-green-500 hover:text-green-400"
                            >
                                <Icon name="mdi:web" size="20" />
                                <span>Live Demo</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
