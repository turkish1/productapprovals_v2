<script setup>
import { ref } from 'vue';

import AppMenuItem from './AppMenuItem.vue';

const model = ref([
    {
        label: 'Home',
        items: [{ label: 'login', icon: 'pi pi-fw pi-home', to: '/' }]
    },
    {
        label: 'UI Components',
        items: [
            { label: 'Dashboard', icon: 'pi pi-fw pi-id-card', to: '/dashboard' },
            // { label: 'Form Layout', icon: 'pi pi-fw pi-id-card', to: '/uikit/formlayout' },
            { label: 'Registration Form', icon: 'pi pi-fw pi-id-card', to: '/registration' },
            { label: 'General Page', icon: 'pi pi-fw pi-id-card', to: '/generalpage' },
            { label: 'Roof System', icon: 'pi pi-fw pi-clone', to: '/roofsystem' },
            { label: 'Permit Application', icon: 'pi pi-fw pi-clone', to: '/permitapp' },
            { label: 'Roof Input Section', icon: 'pi pi-fw pi-clone', to: '/roofinputsection' },
            { label: 'Shingles', icon: 'pi pi-fw pi-circle', to: '/shingles' },
            { label: 'Tile', icon: 'pi pi-fw pi-list', to: '/tile' },
            { label: 'Lowslope', icon: 'pi pi-fw pi-check-square', to: '/lowslope' }
            // { label: 'UseAxios', icon: 'pi pi-fw pi-check-square', to: '/useaxios' }

            // { label: 'Panel', icon: 'pi pi-fw pi-tablet', to: '/uikit/panel' },
            // { label: 'Overlay', icon: 'pi pi-fw pi-clone', to: '/uikit/overlay' },
            // { label: 'Menu', icon: 'pi pi-fw pi-bars', to: '/uikit/menu' },
            // { label: 'File', icon: 'pi pi-fw pi-file', to: '/uikit/file' },
            // { label: 'Timeline', icon: 'pi pi-fw pi-calendar', to: '/uikit/timeline' },
        ]
    },
    {
        label: 'Pages',
        icon: 'pi pi-fw pi-briefcase',
        to: '/pages',
        items: [
            // {
            //     label: 'Landing',
            //     icon: 'pi pi-fw pi-globe',
            //     to: '/landing'
            // },
            {
                label: 'Auth',
                icon: 'pi pi-fw pi-user',
                items: [
                    {
                        label: 'Login',
                        icon: 'pi pi-fw pi-sign-in',
                        to: '/auth/login'
                    },
                    {
                        label: 'Error',
                        icon: 'pi pi-fw pi-times-circle',
                        to: '/auth/error'
                    },
                    {
                        label: 'Access Denied',
                        icon: 'pi pi-fw pi-lock',
                        to: '/auth/access'
                    }
                ]
            },
            // {
            //     label: 'Crud',
            //     icon: 'pi pi-fw pi-pencil',
            //     to: '/pages/crud'
            // },
            {
                label: 'Not Found',
                icon: 'pi pi-fw pi-exclamation-circle',
                to: '/pages/notfound'
            },
            {
                label: 'Empty',
                icon: 'pi pi-fw pi-circle-off',
                to: '/pages/empty'
            }
        ]
    }
    // {
    //     label: 'Hierarchy',
    //     items: [
    //         {
    //             label: 'Submenu 1',
    //             icon: 'pi pi-fw pi-bookmark',
    //             items: [
    //                 {
    //                     label: 'Submenu 1.1',
    //                     icon: 'pi pi-fw pi-bookmark',
    //                     items: [
    //                         { label: 'Submenu 1.1.1', icon: 'pi pi-fw pi-bookmark' },
    //                         { label: 'Submenu 1.1.2', icon: 'pi pi-fw pi-bookmark' },
    //                         { label: 'Submenu 1.1.3', icon: 'pi pi-fw pi-bookmark' }
    //                     ]
    //                 },
    //                 {
    //                     label: 'Submenu 1.2',
    //                     icon: 'pi pi-fw pi-bookmark',
    //                     items: [{ label: 'Submenu 1.2.1', icon: 'pi pi-fw pi-bookmark' }]
    //                 }
    //             ]
    //         },
    //         {
    //             label: 'Submenu 2',
    //             icon: 'pi pi-fw pi-bookmark',
    //             items: [
    //                 {
    //                     label: 'Submenu 2.1',
    //                     icon: 'pi pi-fw pi-bookmark',
    //                     items: [
    //                         { label: 'Submenu 2.1.1', icon: 'pi pi-fw pi-bookmark' },
    //                         { label: 'Submenu 2.1.2', icon: 'pi pi-fw pi-bookmark' }
    //                     ]
    //                 },
    //                 {
    //                     label: 'Submenu 2.2',
    //                     icon: 'pi pi-fw pi-bookmark',
    //                     items: [{ label: 'Submenu 2.2.1', icon: 'pi pi-fw pi-bookmark' }]
    //                 }
    //             ]
    //         }
    //     ]
    // },
    // {
    //     label: 'Get Started',
    //     items: [
    //         {
    //             label: 'Documentation',
    //             icon: 'pi pi-fw pi-book',
    //             to: '/documentation'
    //         },
    //         {
    //             label: 'View Source',
    //             icon: 'pi pi-fw pi-github',
    //             url: 'https://github.com/primefaces/sakai-vue',
    //             target: '_blank'
    //         }
    //     ]
    // }
]);
</script>

<template>
    <ul class="layout-menu">
        <template v-for="(item, i) in model" :key="item">
            <app-menu-item v-if="!item.separator" :item="item" :index="i"></app-menu-item>
            <li v-if="item.separator" class="menu-separator"></li>
        </template>
    </ul>
</template>

<style lang="scss" scoped></style>
