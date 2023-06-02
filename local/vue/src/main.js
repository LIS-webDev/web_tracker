import { createApp } from 'vue/dist/vue.esm-bundler'
import {createRouter, createWebHistory} from 'vue-router'
import { defineAsyncComponent } from 'vue'
import './assets/style.scss'




window.createApp = createApp;
// eslint-disable-next-line
const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            name: 'HomeView',
            path: '/',
            component: () => import("./components/Home/HomeView.vue"),
            props: {
                userLogin: ""
            }
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
        }
    ]
});


const App = {
    data() {
        return {
            userLogin: ""
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
        HomeView: defineAsyncComponent({
            loader: () => import('./components/Home/HomeView'),
        }),
    }
}
const app = createApp(App);
app.use(router).mount('#app');
