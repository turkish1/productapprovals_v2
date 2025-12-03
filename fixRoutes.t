 // src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth' // Pinia example, or your own auth logic

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/LoginView.vue')
  },
  {
    path: '/',
    component: () => import('@/layouts/DefaultLayout.vue'),
    meta: { requiresAuth: true }, // ← this marks protected routes
    children: [
      { path: '', name: 'Home', component: () => import('@/views/HomeView.vue') },
      { path: '/dashboard', name: 'Dashboard', component: () => import('@/views/Dashboard.vue') },
      { path: '/profile', name: 'Profile', component: () => import('@/views/Profile.vue') },
      // ... all your protected routes
    ]
  },
  // 404
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: () => import('@/views/NotFound.vue') }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Global navigation guard
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()

  // If you're using Pinia + persisted state, you might need to wait for it
  if (to.meta.requiresAuth) {
    // Option 1: Simple check (if token is in store/memory)
    if (!authStore.isLoggedIn) {
      // Redirect to login + remember where user wanted to go
      return next({
        name: 'Login',
        query: { redirect: to.fullPath }
      })
    }
  }

  // Allow access
  next()
})

export default router
s
