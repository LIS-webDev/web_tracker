import { createApp } from 'vue/dist/vue.esm-bundler'
import {createRouter, createWebHistory} from 'vue-router'
import { createStore } from 'vuex'
import { defineAsyncComponent } from 'vue'
import './assets/style.scss'
import ElementPlus from 'element-plus'
import ru from 'element-plus/dist/locale/ru.mjs'

window.createApp = createApp;

const store = createStore({
    state () {
        return {
            userId: 0,
            userLogin: "",
            addedProducts: {
                breakfast: [],
                lunch: [],
                dinner: [],
                snack: []
            },
            addedWater: 0,
            totalWaterCount: 0,
            totalCalorie: 0,
            addedCalorie: 0,
            burnedCalorie: 0,
            totalProtein: 0,
            addedProtein: 0,
            totalFat: 0,
            addedFat: 0,
            totalCarb: 0,
            addedCarb: 0,
        }
    },
    mutations: {
        addBreakfastProduct (state, product) {
            state.addedProducts.breakfast.push(product);
        },
        addLunchProduct (state, product) {
            state.addedProducts.lunch.push(product);
        },
        addDinnerProduct (state, product) {
            state.addedProducts.dinner.push(product);
        },
        addSnackProduct (state, product) {
            state.addedProducts.snack.push(product);
        },
        addWater(state,count) {
            state.addedWater += Number(count);
        },
        setTotalWaterCount(state,count) {
            state.totalWaterCount = Number(count);
        },
        setTotalCalorie(state,count) {
            state.totalCalorie = Number(count);
        },
        addCalorie(state,count) {
            state.addedCalorie += Number(count);
        },
        setTotalProtein(state,count) {
            state.totalProtein = Number(count);
        },
        setTotalFat(state,count) {
            state.totalFat = Number(count);
        },
        setTotalCarb(state,count) {
            state.totalCarb = Number(count);
        },
        addProtein(state,count) {
            state.addedProtein += Number(count);
        },
        addFat(state,count) {
            state.addedFat += Number(count);
        },
        addCarb(state,count) {
            state.addedCarb += Number(count);
        },
        addBurnedCalorie(state,count) {
            state.burnedCalorie += Number(count);
        },
        setUserLogin(state,login) {
            state.userLogin = login;
        },
        setUserID(state,id) {
            state.userId = id;
        },
    }
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
     created() {
        this.getUser();
        this.getUserData();
        this.getWaterData();
        this.getTodayStat();
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
                });
        },
        getUserData() {
            fetch('/api/user/get/')
                .then(response => response.json())
                .then(result => {
                    if (this.isAuth) {
                        this.$store.commit('setTotalCalorie', result.data.user_settings.UF_CALORIE);
                        this.$store.commit('setTotalWaterCount', result.data.user_settings.UF_WATER);
                        this.$store.commit('setTotalProtein', result.data.user_settings.UF_PROTEIN);
                        this.$store.commit('setTotalFat', result.data.user_settings.UF_FAT);
                        this.$store.commit('setTotalCarb', result.data.user_settings.UF_CARB);
                    }
                });
        },
        getWaterData() {
            fetch('/api/water/get/')
                .then(response => response.json())
                .then(result => {
                    if (this.isAuth) {
                        this.$store.commit('addWater', result.data.SUM_WATER);
                    }
                });
        },
        getTodayStat() {
            fetch('/api/stat/today/get/')
                .then(response => response.json())
                .then(result => {
                    if (this.isAuth) {
                        this.$store.commit('addCalorie', result.data.SUM_CALORIE);
                        this.$store.commit('addProtein', result.data.SUM_PROTEIN);
                        this.$store.commit('addFat', result.data.SUM_FAT);
                        this.$store.commit('addCarb', result.data.SUM_CARB);
                        this.$store.commit('addBurnedCalorie', result.data.SUM_BURN_CALORIE);
                    }
                });
        }
    },
    computed: {
        isAuth() {
            return this.$store.state.userId && this.$store.state.userLogin;
        },
        isInner() {
            return this.$route.path !== "/auth/" && this.$route.path !== "/register/";
        }
    }
}
const app = createApp(App);
app.use(store);
app.use(ElementPlus, {locale: ru,});
app.use(router).mount('#app');
