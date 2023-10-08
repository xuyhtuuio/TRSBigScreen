import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routers';

Vue.use(VueRouter);
const baseUrl = process.env.BASE_URL || '/';
const router = new VueRouter({
  mode: 'hash',
  base: baseUrl,
  routes,
});
const originalPush = router.push;
router.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};

export default router;
