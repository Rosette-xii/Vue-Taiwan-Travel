import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
// const originalPush = VueRouter.prototype.push;
// const originalReplace = VueRouter.prototype.replace
// VueRouter.prototype.push = function push(location, onResolve, onReject) {
//   if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
//   return originalPush.call(this, location).catch(err => err)
// }
// VueRouter.prototype.replace = function push(location, onResolve, onReject) {
//   if (onResolve || onReject) return originalReplace.call(this, location, onResolve, onReject)
//   return originalReplace.call(this, location).catch(err => err)
// }

const routes = [
  {
    path: '/',
    name: 'Index',
    component: () => import('@/views/index')
  },
  {
    path: '/attractions',
    name: 'Attractions',
    component: () => import('@/views/attractions')
  },
  {
    path: '/events',
    name: 'Events',
    component: () => import('@/views/events')
  }
]

const router = new VueRouter({
  routes
})

export default router
