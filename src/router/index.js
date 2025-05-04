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
                    // path: '/',
                    // name: 'landing',
                    // component: () => import('@/views/pages/auth/OAuthGoogle.vue')

                    path: '/',
                    name: 'login',
                    component: () => import('@/views/pages/auth/Login.vue')
                    // component: () => import('@/views/pages/auth/Login.vue')
                    // component: () => import('@/views/pages/InitialPage.vue')
                    // path: '/',
                    // name: 'firstpage',
                    // component: () => import('@/views/pages/InitialPage.vue')
                },
                // {
                //     path: '/product',
                //     name: 'product',
                //     component: () => import('@/views/pages/InitialPage.vue')
                // },
                // {
                //     path: '/login',
                //     name: 'login',
                //     component: () => import('@/views/pages/auth/Login.vue')
                // },
                {
                    path: '/noc',
                    name: 'noc',
                    component: () => import('@/components/UserLanding/Noc.vue')
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
                {
                    path: '/userlanding',
                    name: 'userland',
                    component: () => import('@/components/UserLanding/UserDash.vue')
                },
                {
                    path: '/dynamicstepper',
                    name: 'dynamicstepper',
                    component: () => import('@/components/Stepper/DynamicStepper.vue')
                },
                {
                    path: '/doralapp',
                    name: 'doralapp',
                    component: () => import('@/components/Summary/DoralPermitApp.vue')
                },
                {
                    path: '/payment',
                    name: 'payment',
                    component: () => import('@/components/Summary/Paymentgateway.vue')
                },
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
                    path: '/summary',
                    name: 'summary',
                    component: () => import('@/components/Summary/Summarys.vue')
                },
                {
                    path: '/form',
                    name: 'form',
                    component: () => import('@/views/pages/auth/Signature-Form.vue')
                },
                {
                    path: '/scroll',
                    name: 'scroll',
                    component: () => import('@/views/pages/Scroll.vue')
                },
                {
                    path: '/mechanicaltile',
                    name: 'mechanical',
                    component: () => import('@/components/TileNoa/MechanicalTileNoa/TileMech.vue')
                },
                {
                    path: '/permitapp',
                    name: 'permitapp',
                    component: () => import('@/views/uikit/PermitApp.vue')
                },
                {
                    path: '/permitapplication',
                    name: 'permitapplication',
                    component: () => import('@/components/PermitApp/PermitApplication.vue')
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
                    component: () => import('@/views/pages/Scroll.vue')
                },
                {
                    path: '/map',
                    name: 'map',
                    component: () => import('@/components/Maps/Map.vue')
                },
                {
                    path: '/documentation',
                    name: 'documentation',
                    component: () => import('@/views/pages/Documentation.vue')
                }
            ]
        },
        // {
        //     path: '/landing',
        //     name: 'landing',
        //     component: () => import('@/views/pages/Landing.vue')
        // },
        {
            path: '/paymentprocessed',
            name: 'paymentprocessed',
            component: () => import('@/components/Summary/Paymentprocessed.vue')
        },

        {
            path: '/firstpage',
            name: 'firstpage',
            component: () => import('@/views/pages/Firstpage.vue')
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

router.beforeEach((to, from, next) => {
    if (to.name === 'Low Slope') {
        console.log('You are on the Low Slope Page');
    } else {
        console.log('Not on low slope');
    }
    next(); //always call next to allow navigation
});
export default router;
