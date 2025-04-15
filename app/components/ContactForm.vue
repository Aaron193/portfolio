<template>
    <form action="https://formsubmit.co/6fe480b5c0d14b78c24a12e9175db874" method="POST" class="flex flex-col gap-4">
        <h1 class="text-3xl font-bold text-white">Contact Me</h1>
        <input
            type="text"
            name="Name"
            placeholder="Your name"
            required
            class="p-3 text-white bg-gray-800 rounded-lg border border-gray-700 focus:outline-none transition-colors"
        />
        <input
            type="email"
            name="Email"
            placeholder="your@email.com"
            required
            class="p-3 text-white bg-gray-800 rounded-lg border border-gray-700 focus:outline-none transition-colors"
        />
        <textarea
            name="Message"
            placeholder="Enter your message"
            rows="4"
            class="p-3 text-white bg-gray-800 w-full rounded-lg border border-gray-700 focus:outline-none transition-colors resize-vertical min-h-[100px]"
        ></textarea>
        <button
            type="submit"
            class="w-full bg-blue-600 hover:bg-blue-700 transition-colors px-4 py-2 rounded-xl bg-gradient-to-r text-gray-950 from-blue-500 to-green-500 font-extrabold"
        >
            Send
        </button>
    </form>
</template>
