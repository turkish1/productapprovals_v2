import AppLayout from '@/layout/AppLayout.vue';
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
    history: createWebHistory(),
    linkActiveClass: 'active',
    routes: [
        {
            path: '/:id',
            props: true,
            component: AppLayout,
            props: (route) => ({ page: parseInt(route.query.page) || 1 }),
            children: [
                {
                    path: '/',
                    name: 'login',
                    component: () => import('@/views/pages/auth/Login.vue')
                },
                {
                    path: '/registration',
                    name: 'registration',
                    component: () => import('@/views/uikit/RegistrationForm.vue')
                },
                {
                    path: '/dock',
                    name: 'dock',
                    component: () => import('@/views/uikit/Dock.vue')
                },
                {
                    path: '/dashboard',
                    name: 'dashboard',
                    component: () => import('@/views/Dashboard.vue')
                },
                // {
                //     path: '/useaxios',
                //     name: 'useaxios',
                //     component: () => import('@/components/UseAxios.vue')
                // },

                {
                    path: '/uikit/formlayout',
                    name: 'formlayout',
                    component: () => import('@/views/uikit/FormLayout.vue')
                },

                {
                    path: '/roofsystem',
                    name: 'roofsystem',
                    component: () => import('@/views/uikit/RoofSystem.vue')
                },
                {
                    path: '/roofinputsection',
                    name: 'roofinputsection',
                    component: () => import('@/views/uikit/RoofInputSection.vue')
                },
                {
                    path: '/shingles',
                    name: 'shingles',
                    component: () => import('@/components/Shingles.vue')
                },
                {
                    path: '/lowslope',
                    name: 'lowslope',
                    component: () => import('@/components/LowSlope.vue')
                },
                {
                    path: '/tile',
                    name: 'tile',
                    component: () => import('@/components/Tile.vue')
                },
                {
                    path: '/permitapp',
                    name: 'permitapp',
                    component: () => import('@/views/uikit/PermitApp.vue')
                },
                {
                    path: '/generalpage',
                    name: 'generalpage',
                    component: () => import('@/views/uikit/GeneralPage.vue')
                },

                {
                    path: '/uikit/panel',
                    name: 'panel',
                    component: () => import('@/views/uikit/PanelsDoc.vue')
                },

                // {
                //     path: '/uikit/overlay',
                //     name: 'overlay',
                //     component: () => import('@/views/uikit/OverlayDoc.vue')
                // },

                {
                    path: '/uikit/file',
                    name: 'file',
                    component: () => import('@/views/uikit/FileDoc.vue')
                },
                {
                    path: '/uikit/menu',
                    name: 'menu',
                    component: () => import('@/views/uikit/MenuDoc.vue')
                },

                {
                    path: '/uikit/timeline',
                    name: 'timeline',
                    component: () => import('@/views/uikit/TimelineDoc.vue')
                },
                {
                    path: '/pages/empty',
                    name: 'empty',
                    component: () => import('@/views/pages/Empty.vue')
                },
                // {
                //     path: '/pages/crud',
                //     name: 'crud',
                //     component: () => import('@/views/pages/Crud.vue')
                // },
                {
                    path: '/documentation',
                    name: 'documentation',
                    component: () => import('@/views/pages/Documentation.vue')
                }
            ]
        },
        {
            path: '/landing',
            name: 'landing',
            component: () => import('@/views/pages/Landing.vue')
        },
        {
            path: '/pages/notfound',
            name: 'notfound',
            component: () => import('@/views/pages/NotFound.vue')
        },

        // {
        //     path: '/auth/login',
        //     name: 'login',
        //     component: () => import('@/views/pages/auth/Login.vue')
        // },
        {
            path: '/auth/access',
            name: 'accessDenied',
            component: () => import('@/views/pages/auth/Access.vue')
        },
        {
            path: '/auth/error',
            name: 'error',
            component: () => import('@/views/pages/auth/Error.vue')
        }
    ]
});

export default router;
