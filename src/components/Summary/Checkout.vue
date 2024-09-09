<template>
    <div class="card">
        <Timeline :value="events" align="alternate" class="customized-timeline">
            <template #marker="slotProps">
                <span class="flex w-8 h-8 items-center justify-center text-white rounded-full z-10 shadow-sm" :style="{ backgroundColor: slotProps.item.color }">
                    <i :class="slotProps.item.icon"></i>
                </span>
            </template>
            <template #content="slotProps">
                <Card class="mt-4">
                    <template #title>
                        {{ slotProps.item.status }}
                    </template>
                    <template #subtitle>
                        {{ slotProps.item.date }}
                    </template>
                    <template #content>
                        <!-- <img v-if="slotProps.item.image" :src="`https://primefaces.org/cdn/primevue/images/product/${slotProps.item.image}`" :alt="slotProps.item.name" width="200" class="shadow-sm" /> -->
                        <p>The roof systems you selected</p>
                        <Button label="Read more" text></Button>
                    </template>
                </Card>
            </template>
        </Timeline>
    </div>
    <div class="rounded border border-surface-200 dark:border-surface-700 p-6 bg-surface-0 dark:bg-surface-900">
        <div class="flex mb-4">
            <Skeleton shape="circle" size="4rem" class="mr-2"></Skeleton>
            <div>
                <Skeleton width="10rem" class="mb-2"></Skeleton>
                <Skeleton width="5rem" class="mb-2"></Skeleton>
                <Skeleton height="2.5rem" width="30rem" v-model="dba">{{ db }}</Skeleton>
            </div>
        </div>
        <Skeleton width="100%" height="150px"></Skeleton>
        <div class="flex justify-between mt-4">
            <Skeleton width="4rem" height="2rem"></Skeleton>
            <Skeleton width="4rem" height="2rem"></Skeleton>
        </div>
    </div>
</template>

<script setup>
import { useGlobalState } from '@/stores/accountsStore';
import { useRoofListStore } from '@/stores/roofList';

import { onMounted, ref, watch } from 'vue';

const { accountUsers } = useGlobalState();

const dba = ref('');
const name = ref('');
const license = ref('');
const status = ref('');
function displayUserInfo() {
    accountUsers.value.forEach((item, index) => {
        console.log(item);
        dba.value = item.dba;
        console.log(dba.value);
    });
}

onMounted(() => {
    displayUserInfo();
});
watch(displayUserInfo, () => {});
console.log(accountUsers);
const store = useRoofListStore();
const roofType = ref(store.$state.roofList);
const events = ref([
    { status: 'RoofSystems', date: '15/10/2020 10:30', icon: 'pi pi-cog', color: '#9C27B0', image: '/src/assets/img/roofing_tile.jpg' },
    { status: 'Processing', date: '15/10/2020 14:00', icon: 'pi pi-cog', color: '#673AB7' }
    // { status: 'Shipped', date: '15/10/2020 16:15', icon: 'pi pi-shopping-cart', color: '#FF9800' },
    // { status: 'Delivered', date: '16/10/2020 10:00', icon: 'pi pi-check', color: '#607D8B' }
]);
</script>

<style lang="scss" scoped>
@media screen and (max-width: 960px) {
    ::v-deep(.customized-timeline) {
        .p-timeline-event:nth-child(even) {
            flex-direction: row;

            .p-timeline-event-content {
                text-align: left;
            }
        }

        .p-timeline-event-opposite {
            flex: 0;
        }
    }
}
</style>
