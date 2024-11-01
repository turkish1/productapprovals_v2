<template>
    <div class="columns-1 ...">
        <div class="w-1/2 p-grid mt-6 p-dir-col">
            <h2>User Dashboard</h2>
            <SpeedDial :model="items" :radius="80" type="circle" :style="{ position: 'right' }" :buttonProps="{ severity: 'warn', rounded: true }" />

            <!-- Top statistics row -->
            <div class="p-grid">
                <div class="p-col-12 p-md-4">
                    <Card title="Total Users"> </Card>
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
        </div>
        <div class="gap-5 columns-2">
            <div class="card">
                <div :style="{ position: 'relative', height: '200px' }" class="flex items-center justify-center">
                    <div class="w-1/2 card flex justify-right">
                        <PanelMenu :model="itemsNext">
                            <template #item="{ item }">
                                <a v-ripple class="flex items-center px-4 py-2 cursor-pointer group">
                                    <span :class="[item.icon, 'text-primary group-hover:text-inherit']" />
                                    <span :class="['ml-2', { 'font-semibold': item.items }]">{{ item.label }}</span>
                                    <Badge v-if="item.badge" class="ml-auto" :value="item.badge" />
                                    <span v-if="item.shortcut" class="ml-auto border border-surface rounded bg-emphasis text-muted-color text-xs p-1">{{ item.shortcut }}</span>
                                </a>
                            </template>
                        </PanelMenu>
                    </div>

                    <Toast />
                </div>
            </div>
            <Map></Map>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
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

const itemsNext = ref([
    {
        label: 'Mail',
        icon: 'pi pi-envelope',
        badge: 5,
        items: [
            {
                label: 'Compose',
                icon: 'pi pi-file-edit',
                shortcut: '⌘+N'
            },
            {
                label: 'Inbox',
                icon: 'pi pi-inbox',
                badge: 5
            },
            {
                label: 'Sent',
                icon: 'pi pi-send',
                shortcut: '⌘+S'
            },
            {
                label: 'Trash',
                icon: 'pi pi-trash',
                shortcut: '⌘+T'
            }
        ]
    },
    {
        label: 'Reports',
        icon: 'pi pi-chart-bar',
        shortcut: '⌘+R',
        items: [
            {
                label: 'Projects',
                icon: 'pi pi-chart-line',
                badge: 3
            },
            {
                label: 'Products',
                icon: 'pi pi-list',
                badge: 6
            }
        ]
    },
    {
        label: 'Profile',
        icon: 'pi pi-user',
        shortcut: '⌘+W',
        items: [
            {
                label: 'Settings',
                icon: 'pi pi-cog',
                shortcut: '⌘+O'
            },
            {
                label: 'Privacy',
                icon: 'pi pi-shield',
                shortcut: '⌘+P'
            }
        ]
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
