import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

export default new VueRouter({
  base: '/',
  routes: [{
      path: '/',
      name: 'Home',
      component: () => import('./components/MainPage')
    },
    {
      path: '/coffee-list',
      name: 'CoffeeList',
      component: () => import('./components/CoffeeList')
    },
    {
      path: '/sweets',
      name: 'Sweets',
      component: () => import('./components/Sweets')
    },
  ]
})