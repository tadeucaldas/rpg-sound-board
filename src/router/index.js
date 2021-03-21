import Vue from 'vue'
import VueRouter from 'vue-router'
import Library from '../views/library/Library.vue'
import Adventure from '../views/adventure/Adventure.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Library',
    component: Library
  },
  {
    path: '/adventure',
    name: 'Adventure',
    component: Adventure
  }

]

const router = new VueRouter({
  routes
})

export default router
