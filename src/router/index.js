import Vue from 'vue'
import VueRouter from 'vue-router'
import Library from '../views/library/Library.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Library',
    component: Library
  }
]

const router = new VueRouter({
  routes
})

export default router
