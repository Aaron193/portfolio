<script setup lang="ts">
const languages = [
    { name: 'TypeScript', icon: 'logos:typescript-icon' },
    { name: 'JavaScript', icon: 'logos:javascript' },
    { name: 'Python', icon: 'logos:python' },
    { name: 'C', icon: 'logos:c' },
    { name: 'Java', icon: 'logos:java' },
    { name: 'PHP', icon: 'devicon:php' },
    { name: 'HTML', icon: 'logos:html-5' },
    { name: 'CSS', icon: 'logos:css-3' },
];

const technologies = [
    { name: 'Node.js', icon: 'logos:nodejs-icon' },
    { name: 'Vue.js', icon: 'logos:vue' },
    { name: 'Laravel', icon: 'logos:laravel' },
    { name: 'MongoDB', icon: 'logos:mongodb-icon' },
    { name: 'MySQL', icon: 'logos:mysql-icon' },
    { name: 'Webpack', icon: 'logos:webpack' },
    { name: 'Tailwind CSS', icon: 'logos:tailwindcss-icon' },
    { name: 'Bootstrap', icon: 'logos:bootstrap' },
];

const tools = [
    { name: 'Git', icon: 'mdi:git' },
    { name: 'GitHub', icon: 'mdi:github' },
    { name: 'Docker', icon: 'logos:docker-icon' },
    { name: 'VS Code', icon: 'logos:visual-studio-code' },
    { name: 'Linode', icon: 'logos:linode' },
    { name: 'Linux', icon: 'mdi:linux' },
];
</script>

<template>
    <section id="skills" class="py-16 px-4 bg-gray-950">
        <div class="max-w-6xl mx-auto">
            <h1 class="text-4xl md:text-5xl font-bold text-center mb-12">Skills</h1>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <!-- Frontend Category -->
                <div class="bg-gray-900/50 rounded-xl p-6 hover:bg-gray-900/70 transition-all duration-300">
                    <div class="flex items-center gap-4 mb-4">
                        <div class="w-12 h-12 flex items-center justify-center bg-blue-500/10 rounded-lg">
                            <Icon name="mdi:web" class="text-blue-500" size="24" />
                        </div>
                        <h3 class="text-2xl font-semibold text-blue-400">Languages</h3>
                    </div>
                    <div v-for="language in languages" class="space-y-3">
                        <div class="flex items-center gap-2 text-gray-300">
                            <div class="w-6 flex-shrink-0">
                                <Icon :name="language.icon" size="20" />
                            </div>
                            <span>{{ language.name }}</span>
                        </div>
                    </div>
                </div>

                <!-- Backend Category -->
                <div class="bg-gray-900/50 rounded-xl p-6 hover:bg-gray-900/70 transition-all duration-300">
                    <div class="flex items-center gap-4 mb-4">
                        <div class="w-12 h-12 flex items-center justify-center bg-green-500/10 rounded-lg">
                            <Icon name="mdi:cube-outline" class="text-green-500" size="24" />
                        </div>
                        <h3 class="text-2xl font-semibold text-green-400">Technologies</h3>
                    </div>
                    <div v-for="technology in technologies" class="space-y-3">
                        <div class="flex items-center gap-2 text-gray-300">
                            <div class="w-6 flex-shrink-0">
                                <Icon :name="technology.icon" size="20" />
                            </div>
                            <span>{{ technology.name }}</span>
                        </div>
                    </div>
                </div>

                <!-- Tools Category -->
                <div class="bg-gray-900/50 rounded-xl p-6 hover:bg-gray-900/70 transition-all duration-300">
                    <div class="flex items-center gap-4 mb-4">
                        <div class="w-12 h-12 flex items-center justify-center bg-purple-500/10 rounded-lg">
                            <Icon name="mdi:tools" class="text-purple-500" size="24" />
                        </div>
                        <h3 class="text-2xl font-semibold text-purple-400">Tooling</h3>
                    </div>
                    <div v-for="tool in tools" class="space-y-3">
                        <div class="flex items-center gap-2 text-gray-300">
                            <div class="w-6 flex-shrink-0">
                                <Icon :name="tool.icon" size="20" />
                            </div>
                            <span>{{ tool.name }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
