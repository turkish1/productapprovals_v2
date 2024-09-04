<script setup>
import { useRoofListStore } from '@/stores/roofList';
import { storeToRefs } from 'pinia';
const store = useRoofListStore();

const { roofList } = storeToRefs(store);

const { toggleCompleted } = storeToRefs(store);
</script>
<template>
    <div v-for="roof in roofList" :key="roof.id" class="item">
        <div class="content">
            <span :class="{ completed: roof.completed }">{{ roof.item }} : {{ roof.dim1 }} : {{ roof.dim2 }}</span>
            <!-- <span :class="{ completed: roof.completed }">{{ roof.dim1 }}</span> -->
            <span @click.stop="toggleCompleted(roof.id)">&#10004;</span>
        </div>
    </div>
</template>

<style scoped>
.completed {
    text-decoration: line-through;
}
</style>
