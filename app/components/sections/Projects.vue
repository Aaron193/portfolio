<script setup lang="ts">
const projects = [
    {
        title: 'HuskyLoop',
        description:
            'HuskyLoop is an online marketplace for students at UConn to buy, sell, or donate items. Built with a focus on user experience and simplicity, HuskyLoop aims to create a safe platform for students to connect and trade goods within their community.',
        image: '/project7.png',
        image_pos: 'top',
        technologies: ['Laravel', 'PHP', 'PostgreSQL', 'Supabase'],
        github: '',
        demo: 'https://huskyloop.com/',
        tag: '2025',
    },
    {
        title: 'Puzzle Rush',
        description:
            "Puzzle Rush is a web-based puzzle game that was designed for the 2023 Technology Student Association's annual Game-Design competition. The game was developed by a team of dedicated artists and coders, ultimately winning 2nd place.",
        image: '/project3.png',
        technologies: ['Node.js', 'Typescript', 'Express', 'HTML', 'CSS'],
        github: 'https://github.com/Aaron193/puzzle-rush',
        demo: 'https://aaron193.github.io/puzzle-rush/',
        tag: '2023',
    },
    {
        title: 'C++ Multiplayer Game',
        description:
            'A real-time multiplayer game built with a C++ server and TypeScript client, including binary compressed packets, physics simulation, and client-side interpolation.',
        image: '/project8.gif',
        placeholder: '/project8.png',
        technologies: ['C++', 'uWebSockets', 'EnTT', 'Box2d', 'TypeScript'],
        github: 'https://github.com/Aaron193/cpp-server',
        demo: '',
        tag: '2025',
    },
    // {
    //     title: 'Asteroids',
    //     description:
    //         'Asteroids is a multiplayer web-based game that is very early in development. I began this project with the goal of creating a simple, yet addictive game that can be played with friends. I also wanted to provide an open-source resource for others who want to learn the basics of multiplayer development.',
    //     image: '/project5.png',
    //     technologies: ['Node.js', 'TypeScript', 'uWebSockets', 'bitecs (ECS)', 'Box2D (Physics)'],
    //     github: 'https://github.com/Aaron193/asteroids',
    //     demo: '',
    //     tag: '2025',
    // },
    {
        title: 'Multiplayer Survival Game',
        description:
            'A multiplayer survival game years in the making. This project is closed source, and has yet to been released. Some development features include: bit-level packet serialization, entity interpolation, spatial partitioning, network view culling, and <strong>much</strong> more.',
        image: '/project1.jpg',
        technologies: ['Node.js', 'Typescript', 'WebSockets', 'HTML', 'CSS'],
        github: '',
        demo: '',
        tag: '2022 - now',
    },
    // {
    //     title: 'Flashcard Studying App',
    //     description:
    //         'This project is a web-based studying application that allows users to create flashcard sets. This app was built in order to fulfill my High School mastery experience requirement, and is one of the first websites I have built.',
    //     image: '/project4.png',
    //     technologies: ['Node.js', 'JavaScript', 'Express', 'HTML', 'CSS'],
    //     github: 'https://github.com/Aaron193/flashcard-study-website',
    //     demo: 'https://aaron193.github.io/flashcard-study-website/',
    //     tag: '2022',
    // },
    {
        title: 'A* Pathfinding Visualizer',
        description:
            'A web-based pathfinding visualizer for the A* search algorithm. Users are able to create a grid of obstacles and watch the algorithm in action. This project was built as a group project for my Algorithms and Complexity class.',
        image: '/project6.png',
        technologies: ['DSA', 'TypeScript', 'Bootstrap'],
        github: 'https://github.com/Aaron193/CSE-3500-Group-Project',
        demo: 'https://aaron193.github.io/CSE-3500-Group-Project/',
        tag: '2025',
    },
    {
        title: 'GGui.js',
        description:
            'GGui.js is a bare-bones GUI library built on TypeScript to simplify the process of creating graphical user interfaces for the web. With GGui.js, you can easily create folders and add components such as buttons, checkboxes, sliders and more, to organize and enhance your web interface.',
        image: '/project2.png',
        technologies: ['Typescript', 'HTML', 'CSS'],
        github: 'https://github.com/Aaron193/GGui.js',
        demo: '',
        tag: '2024',
    },
];
</script>

<template>
    <section id="projects" class="py-16 px-4">
        <div class="max-w-6xl mx-auto">
            <div class="text-center mb-12">
                <h2 class="text-4xl font-extrabold leading-tight mb-3">My Personal Projects</h2>
                <p class="text-lg text-gray-500">A collection of some the projects I've worked on over the years.</p>
            </div>

            <div class="columns-1 md:columns-2 lg:columns-3 gap-6 pb-8">
                <GlowCard
                    v-for="project in projects"
                    :key="project.title"
                    class="mb-6"
                    :glow-color="'9, 9, 11'"
                    :glow-opacity="1"
                    :glow-intensity="0.15"
                    :border-intensity="0.6"
                    :mouse-glow-color="'245, 74, 0'"
                    :mouse-glow-opacity="0.4"
                >
                    <!-- Project Image -->
                    <div class="relative h-48 overflow-hidden">
                        <NuxtImg
                            :src="project.image"
                            :alt="project.title"
                            :placeholder="project.placeholder"
                            class="w-full h-full filter"
                            :class="project.image_pos === 'top' ? 'object-cover object-top' : 'object-cover'"
                            loading="lazy"
                        />
                        <span class="absolute top-2 left-2 bg-amber-800 text-white text-base px-2 py-1 rounded font-bold">{{ project.tag }}</span>
                    </div>

                    <!-- Project Info -->
                    <div class="p-6 space-y-4">
                        <h3 class="text-xl font-bold">{{ project.title }}</h3>
                        <p class="text-zinc-400" v-html="project.description"></p>

                        <!-- Technologies -->
                        <div class="flex flex-wrap gap-2">
                            <span v-for="tech in project.technologies" class="px-3 py-1 text-sm rounded-full bg-slate-700/80 text-amber-400">
                                {{ tech }}
                            </span>
                        </div>

                        <!-- Links -->
                        <div v-if="project.github || project.demo" class="flex justify-between mt-auto">
                            <a
                                v-if="project.github"
                                :href="project.github"
                                target="_blank"
                                class="flex items-center gap-2 text-amber-500 hover:text-amber-400"
                            >
                                <Icon name="mdi:github" size="20" />
                                <span>GitHub</span>
                            </a>
                            <a
                                v-if="project.demo"
                                :href="project.demo"
                                target="_blank"
                                class="flex items-center gap-2 text-red-500 hover:text-red-400"
                            >
                                <Icon name="mdi:web" size="20" />
                                <span>Website</span>
                            </a>
                        </div>
                    </div>
                </GlowCard>
            </div>
        </div>
    </section>
</template>
