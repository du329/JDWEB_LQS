import { createRouter, createWebHashHistory } from 'vue-router'
// import { ElMessage } from 'element-plus'

const Login = () => import(/* webpackChunkName: "Login" */ '../views/Login/Login')
const Register = () => import(/* webpackChunkName: "Register" */ '../views/Register/Register')
const Home = () => import(/* webpackChunkName: "Home" */ '../views/Home/Home')
const Cart = () => import(/* webpackChunkName: "Cart" */ '../views/Cart/Cart')
const Shop = () => import(/* webpackChunkName: "Shop" */ '../views/Shop/Shop')
const Order = () => import(/* webpackChunkName: "Order" */ '../views/Order/Order')
const ConfirmOrder = () => import(/* webpackChunkName: "ConfirmOrder" */ '../views/Order/ConfirmOrder')
const Mine = () => import(/* webpackChunkName: "Mine" */ '../views/Mine/Mine')
const CreateAddress = () => import(/* webpackChunkName: "CreateAddress" */ '../views/Address/CreateAddress')
const EditAddress = () => import(/* webpackChunkName: "EditAddress" */ '../views/Address/EditAddress')
const MangeAddress = () => import(/* webpackChunkName: "MangeAddress" */ '../views/Address/MangeAddress')
const SelectAddress = () => import(/* webpackChunkName: "SelectAddress" */ '../views/Order/SelectAddress')
const Search = () => import(/* webpackChunkName: "SelectAddress" */ '../views/Search/Search')
const SearchList = () => import(/* webpackChunkName: "SelectAddress" */ '../views/Search/SearchList')

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
    // 后端 session or token验证

    // 独享守卫：
    // beforeEnter(to, from, next) {
    //   if (localStorage.isLogin) {
    //     next({ name: 'Home' });
    //     alert('您已成功登录！');
    //   } else {
    //     next();
    //   }
    // }
  }, {
    path: '/Register',
    name: 'Register',
    component: Register,
  }, {
    path: '/Home',
    name: 'Home',
    component: Home,
  }, {
    path: '/Search',
    name: 'Search',
    component: Search,
  }, {
    path: '/SearchList',
    name: 'SearchList',
    component: SearchList,
  }, {
    path: '/Shop/:id',
    name: 'Shop',
    component: Shop,
    // beforeEnter(to, from, next) {
    //   if (localStorage.isExpire) {
    //     ElMessage.warning('身份过期,请登录!')
    //     next({ name: 'Login' });
    //   } else {
    //     next();
    //   }
    // }
  }, {
    path: '/Cart',
    name: 'Cart',
    component: Cart,

  }, {
    path: '/Order',
    name: 'Order',
    component: Order,

  }, {
    path: '/ConfirmOrder/:id',
    name: 'ConfirmOrder',
    component: ConfirmOrder,

  }, {
    path: '/Mine',
    name: 'Mine',
    component: Mine,

  }, {
    path: '/CreateAddress',
    name: 'CreateAddress',
    component: CreateAddress,
  }, {
    path: '/EditAddress',
    name: 'EditAddress',
    component: EditAddress,
  }, {
    path: '/MangeAddress',
    name: 'MangeAddress',
    component: MangeAddress,
  }, {
    path: '/SelectAddress',
    name: 'SelectAddress',
    component: SelectAddress,
  }]

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

// 全局守卫：
// router.beforeEach((to, from, next) => {
//   // 已登录或前往Login
//   if(localStorage.isLogin || to.name === "Login" || to.name === "Register") {
//     next();
//   } else {
//     // 未登录
//     alert('请先登录！');
//     next({ name: 'Login' });
//     // 游览器历史记录
//   }
// });

// 组件守卫：通过路由规则，路由之间切换Enter | leave
export default router;

// vue的路由懒加载配置
// 在引入组件的过程中，通过懒加载分割组件的代码，用chunkName来命名js文件的名称
// 最后打包工具打包不会将 About.vue组件中的内容打包进app.js中，
// 它会单独打包成一个新的about.js文件，并在页面加载完成后异步加载，从而达到懒加载效果
// 缺点就是，如果客户不想看About页面，但是还是会下载数据，导致----偷跑流量
// 解决的方法：彻底懒加载，这个方法只有当客户访问About页面时，才开始下载数据
/* webpackChunkName: "about" */ //这个注释必须有，这个为将来打包命名

  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }