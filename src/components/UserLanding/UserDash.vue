<!-- <template>
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
</script> -->
<template>
    <div class="w-1/2 p-grid mt-6 p-dir-col">
        <h2>User Dashboard</h2>

        <!-- Top statistics row -->
        <div class="p-grid">
            <div class="p-col-12 p-md-4">
                <Card title="Total Users">
                    <span>{{ totalUsers }}</span>
                </Card>
            </div>
            <div class="p-col-12 p-md-4">
                <Card title="Active Users">
                    <span>{{ activeUsers }}</span>
                </Card>
            </div>
            <div class="p-col-12 p-md-4">
                <Card title="Revenue">
                    <span>${{ revenue }}</span>
                </Card>
            </div>
        </div>

        <div class="card">
            <div :style="{ position: 'relative', height: '500px' }" class="flex items-center justify-center">
                <SpeedDial :model="items" :radius="80" type="circle" :style="{ position: 'absolute' }" :buttonProps="{ severity: 'warn', rounded: true }" />
                <Toast />
            </div>
        </div>

        <!-- Recent Activities -->
        <!-- <div class="p-col-12">
            <DataTable :value="activities">
                <Column field="user" header="User" />
                <Column field="activity" header="Activity" />
                <Column field="date" header="Date" />
            </DataTable>
        </div> -->
    </div>
</template>

<script setup>
// import { Column } from 'primevue/column';
// import { DataTable } from 'primevue/datatable';
import { onMounted, ref } from 'vue';

// Sample data
const totalUsers = ref(1000);
const activeUsers = ref(120);
const revenue = ref(5000);

const activities = ref([]);

const items = ref([
    {
        label: 'Add',
        icon: 'pi pi-pencil',
        command: () => {
            toast.add({ severity: 'info', summary: 'Add', detail: 'Data Added', life: 3000 });
        }
    },
    {
        label: 'Update',
        icon: 'pi pi-refresh',
        command: () => {
            toast.add({ severity: 'success', summary: 'Update', detail: 'Data Updated', life: 3000 });
        }
    },
    {
        label: 'Delete',
        icon: 'pi pi-trash',
        command: () => {
            toast.add({ severity: 'error', summary: 'Delete', detail: 'Data Deleted', life: 3000 });
        }
    },
    {
        label: 'Upload',
        icon: 'pi pi-upload',
        command: () => {
            router.push('/fileupload');
        }
    },
    {
        label: 'Vue Website',
        icon: 'pi pi-external-link',
        command: () => {
            window.location.href = 'https://vuejs.org/';
        }
    }
]);
onMounted(() => {
    // Simulated API call
    activities.value = [
        { user: 'John Doe', activity: 'Logged in', date: '2024-09-01' },
        { user: 'Jane Smith', activity: 'Purchased Item', date: '2024-09-02' },
        { user: 'Bob Johnson', activity: 'Logged out', date: '2024-09-03' }
    ];
});
</script>

<style>
.p-grid {
    margin-bottom: 2rem;
}

.p-col-12 {
    padding: 1rem;
}

.p-md-4 {
    padding: 1rem;
}
</style>
