import { createApp } from 'vue/dist/vue.esm-bundler'
import {createRouter, createWebHistory} from 'vue-router'
import { createStore } from 'vuex'
import { defineAsyncComponent } from 'vue'
import './assets/style.scss'

window.createApp = createApp;

const store = createStore({
    state () {
        return {
            userId: 0,
            userLogin: "",
        }
    },
});

// eslint-disable-next-line
const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            name: 'HomeView',
            path: '/',
            component: () => import("./components/Home/HomeView.vue"),
        },
        {
            name: 'RegisterProfile',
            path: '/register/',
            component: () => import("./components/Profile/EditRegisterProfile.vue")
        },
        {
            name: 'AuthUser',
            path: '/auth/',
            component: () => import("./components/Profile/AuthUser.vue")
        },
        {
            name: 'EditProfile',
            path: '/profile/',
            component: () => import("./components/Profile/EditProfile.vue")
        },
        {
            name: 'ProductView',
            path: '/add_product/',
            component: () => import("./components/Main/ProductView.vue")
        },
        {
            name: 'StatView',
            path: '/statistic/',
            component: () => import("./components/Main/StatView.vue")
        },
        {
            name: 'WaterView',
            path: '/add_water/',
            component: () => import("./components/Main/WaterView.vue")
        },
        {
            name: 'CalorieView',
            path: '/burn_calories/',
            component: () => import("./components/Main/CalorieView.vue")
        },
        {
            name: 'LogoutUser',
            path: '/logout/',
            component: () => import("./components/Profile/LogoutUser.vue")
        },
    ]
});




const App = {
    data() {
        return {
        }
    },
    components: {
        AsideMenu : defineAsyncComponent({
            loader: () => import('./components/Menu/AsideMenu'),
        }),
        EditRegisterProfile: defineAsyncComponent({
            loader: () => import('./components/Profile/EditRegisterProfile'),
        }),
        AuthUser: defineAsyncComponent({
            loader: () => import('./components/Profile/AuthUser'),
        }),
        LogoutUser: defineAsyncComponent({
            loader: () => import('./components/Profile/LogoutUser'),
        }),
        HomeView: defineAsyncComponent({
            loader: () => import('./components/Home/HomeView'),
        }),
        EditProfile: defineAsyncComponent({
            loader: () => import('./components/Profile/EditProfile'),
        }),
        ProductView: defineAsyncComponent({
            loader: () => import('./components/Main/ProductView'),
        }),
        StatView: defineAsyncComponent({
            loader: () => import('./components/Main/StatView'),
        }),
        WaterView: defineAsyncComponent({
            loader: () => import('./components/Main/WaterView'),
        }),
        CalorieView: defineAsyncComponent({
            loader: () => import('./components/Main/CalorieView'),
        }),
    },
     mounted() {
        this.getUser();
    },
    methods: {
          getUser() {
             fetch('/api/user/check_auth/')
                .then(response => response.json())
                .then(result => {
                    if (result.success && result.data.isAuth) {
                        this.$store.state.userId = result.data.user_id;
                        this.$store.state.userLogin = result.data.login;
                    } else {
                        this.$router.push({name: 'HomeView'});
                    }
                    console.log(result);
                });
        }
    },
    computed: {
        isAuth() {
            return this.$store.state.userId && this.$store.state.userLogin;
        },
        isInner() {
            return this.$route.path !== "/" && this.$route.path !== "/auth/" && this.$route.path !== "/register/";
        }
    }
}
const app = createApp(App);
app.use(store);
app.use(router).mount('#app');
