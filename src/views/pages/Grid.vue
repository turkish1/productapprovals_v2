<!-- components/FeatureGrid.vue -->
<template>
    <section class="features" style="margin-top: 550px">
        <div class="grid grid-flow-col justify-items-start ..." style="margin-left: 100px">
            <img src="/public/demo/images/landing/AdhesiveTile_new.png" />

            <div class="grid grid-flow-col justify-items-center...">
                <article class="text-wrap">
                    <p class="underline decoration-1">Enter the respective parameters and have your permit in no time.</p>
                </article>
            </div>
        </div>
    </section>
</template>

<script setup>
defineProps({
    features: { type: String }
});
</script>
