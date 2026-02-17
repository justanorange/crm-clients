import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/clients',
    name: 'ClientsList',
    component: () => import('@/pages/clients-list/ui/ClientsListPage.vue'),
    meta: {
      title: 'Клиенты',
    },
  },
  {
    path: '/clients/new',
    name: 'ClientCreate',
    component: () => import('@/pages/client-create/ui/ClientCreatePage.vue'),
    meta: {
      title: 'Новый клиент',
    },
  },
  {
    path: '/clients/:id/edit',
    name: 'ClientEdit',
    component: () => import('@/pages/client-edit/ui/ClientEditPage.vue'),
    meta: {
      title: 'Редактирование клиента',
    },
  },
  {
    path: '/',
    redirect: '/clients',
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/clients',
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, _, next) => {
  const title = to.meta.title as string | undefined;

  if (title) {
    document.title = `${title} | CRM`;
  } else {
    document.title = 'CRM';
  }
  next();
});

export default router;
