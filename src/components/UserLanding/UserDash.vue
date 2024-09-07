<template>
    <div class="card">
        <Tabs value="/dashboard">
            <TabList>
                <Tab v-for="tab in items" :key="tab.label" :value="tab.route">
                    <router-link v-if="tab.route" v-slot="{ href, navigate }" :to="tab.route" custom>
                        <a v-ripple :href="href" @click="navigate" class="flex items-center gap-2 text-inherit">
                            <i :class="tab.icon" />
                            <span>{{ tab.label }}</span>
                        </a>
                    </router-link>
                </Tab>
            </TabList>
        </Tabs>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const items = ref([
    { route: '/dock', label: 'Dashboard', icon: 'pi pi-home' },
    { route: '/projects', label: 'Projects', icon: 'pi pi-chart-line' },
    { route: '/dashboard', label: 'Start a Permit', icon: 'pi pi-list' },
    { route: '/status', label: 'status', icon: 'pi pi-inbox' }
]);
</script>
