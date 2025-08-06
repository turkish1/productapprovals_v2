<!-- DeckSwiper.vue -->
<script setup>
// import StackCard from '@/components/Summary/StackCard.vue';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { ref } from 'vue';

const cards = ref([
    {
        icon: 'pi-check',
        title: 'Card 1',
        items: [{ label: 'Label: ', value: 'Value 1' }]
    },
    {
        icon: 'pi-star',
        title: 'Card 2',
        items: [{ label: 'Label: ', value: 'Value 2' }]
    },
    {
        icon: 'pi-heart',
        title: 'Card 3',
        items: [{ label: 'Label: ', value: 'Value 3' }]
    }
]);

// function onSlideChange(swiper) {
//     if (swiper.activeIndex === 0) return; // do nothing if first card

//     const swipedCard = cards.value.shift(); // remove first
//     cards.value.push(swipedCard); // push it to the end

//     // Reset swiper to first slide again without animation
//     swiper.slideTo(0, 0);
// }
</script>

<template>
    <Swiper :slides-per-view="1" :space-between="10" @slideChangeTransitionEnd="onSlideChange" class="w-full max-w-md mx-auto">
        <SwiperSlide v-for="(card, index) in cards" :key="index">
            <!-- <StackCard v-bind="card" /> -->
        </SwiperSlide>
    </Swiper>
</template>
