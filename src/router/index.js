import Vue from 'vue'
import VueRouter from 'vue-router'
import Library from '../views/library/Library.vue'
import Adventures from '../views/adventure/Adventures.vue'
import flex from '../views/flex/flex.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Library',
    component: Library
  },
  {
    path: '/',
    name: 'flex',
    component: flex
  },
  {
    path: '/adventures',
    name: 'Adventures',
    component: Adventures
  }

]

const router = new VueRouter({
  routes
})

export default router
