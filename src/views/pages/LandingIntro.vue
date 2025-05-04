<!-- components/LandingIntro.vue -->
<template>
    <section class="intro" style="margin-top: 150px">
        <h1>{{ heading }}</h1>
        <p>{{ tagline }}</p>
        <!-- justify-items-stretch  -->
        <div class="grid grid-flow-col justify-items-start ..." style="margin-left: 100px">
            <img src="/public/demo/images/landing/shingles_new.png" />

            <div class="grid grid-flow-col justify-items-center...">
                <article class="text-wrap">
                    <!-- style="margin-bottom: 500px; margin-left: 450px" -->
                    <!-- style="margin-left: 450px" -->
                    <h3>Roofing & Building Code Experts</h3>
                    <p>Our system will automate your permit submittal and approvals.</p>
                </article>
            </div>
        </div>
    </section>
</template>

<script setup>
defineProps({
    heading: { type: String, required: true },
    tagline: String
});
</script>
