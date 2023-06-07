/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.array.push.js */ \"./node_modules/core-js/modules/es.array.push.js\");\n/* harmony import */ var core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var vue_dist_vue_esm_bundler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vue */ \"./node_modules/vue/dist/vue.esm-bundler.js\");\n/* harmony import */ var vue_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! vue-router */ \"./node_modules/vue-router/dist/vue-router.mjs\");\n/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! vuex */ \"./node_modules/vuex/dist/vuex.esm-bundler.js\");\n/* harmony import */ var _assets_style_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./assets/style.scss */ \"./src/assets/style.scss\");\n/* harmony import */ var _assets_style_scss__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_assets_style_scss__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var element_plus__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! element-plus */ \"./node_modules/element-plus/es/defaults.mjs\");\n/* harmony import */ var element_plus_dist_locale_ru_mjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! element-plus/dist/locale/ru.mjs */ \"./node_modules/element-plus/dist/locale/ru.mjs\");\n\n\n\n\n\n\n\n\nwindow.createApp = vue_dist_vue_esm_bundler__WEBPACK_IMPORTED_MODULE_1__.createApp;\nconst store = (0,vuex__WEBPACK_IMPORTED_MODULE_3__.createStore)({\n  state() {\n    return {\n      userId: 0,\n      userLogin: \"\",\n      addedProducts: {\n        breakfast: [],\n        lunch: [],\n        dinner: [],\n        snack: []\n      },\n      addedWater: 0,\n      totalWaterCount: 0\n    };\n  },\n  mutations: {\n    addBreakfastProduct(state, product) {\n      state.addedProducts.breakfast.push(product);\n    },\n    addLunchProduct(state, product) {\n      state.addedProducts.lunch.push(product);\n    },\n    addDinnerProduct(state, product) {\n      state.addedProducts.dinner.push(product);\n    },\n    addSnackProduct(state, product) {\n      state.addedProducts.snack.push(product);\n    },\n    addWater(state, count) {\n      state.addedWater += Number(count);\n    },\n    setTotalWaterCount(state, count) {\n      state.totalWaterCount = Number(count);\n    }\n  }\n});\n\n// eslint-disable-next-line\nconst router = (0,vue_router__WEBPACK_IMPORTED_MODULE_4__.createRouter)({\n  history: (0,vue_router__WEBPACK_IMPORTED_MODULE_4__.createWebHistory)(),\n  routes: [{\n    name: 'HomeView',\n    path: '/',\n    component: () => __webpack_require__.e(/*! import() */ \"src_components_Home_HomeView_vue\").then(__webpack_require__.bind(__webpack_require__, /*! ./components/Home/HomeView.vue */ \"./src/components/Home/HomeView.vue\"))\n  }, {\n    name: 'RegisterProfile',\n    path: '/register/',\n    component: () => __webpack_require__.e(/*! import() */ \"src_components_Profile_EditRegisterProfile_vue\").then(__webpack_require__.bind(__webpack_require__, /*! ./components/Profile/EditRegisterProfile.vue */ \"./src/components/Profile/EditRegisterProfile.vue\"))\n  }, {\n    name: 'AuthUser',\n    path: '/auth/',\n    component: () => __webpack_require__.e(/*! import() */ \"src_components_Profile_AuthUser_vue\").then(__webpack_require__.bind(__webpack_require__, /*! ./components/Profile/AuthUser.vue */ \"./src/components/Profile/AuthUser.vue\"))\n  }, {\n    name: 'EditProfile',\n    path: '/profile/',\n    component: () => __webpack_require__.e(/*! import() */ \"src_components_Profile_EditProfile_vue\").then(__webpack_require__.bind(__webpack_require__, /*! ./components/Profile/EditProfile.vue */ \"./src/components/Profile/EditProfile.vue\"))\n  }, {\n    name: 'ProductView',\n    path: '/add_product/',\n    component: () => __webpack_require__.e(/*! import() */ \"src_components_Main_ProductView_vue\").then(__webpack_require__.bind(__webpack_require__, /*! ./components/Main/ProductView.vue */ \"./src/components/Main/ProductView.vue\"))\n  }, {\n    name: 'StatView',\n    path: '/statistic/',\n    component: () => __webpack_require__.e(/*! import() */ \"src_components_Main_StatView_vue\").then(__webpack_require__.bind(__webpack_require__, /*! ./components/Main/StatView.vue */ \"./src/components/Main/StatView.vue\"))\n  }, {\n    name: 'WaterView',\n    path: '/add_water/',\n    component: () => __webpack_require__.e(/*! import() */ \"src_components_Main_WaterView_vue\").then(__webpack_require__.bind(__webpack_require__, /*! ./components/Main/WaterView.vue */ \"./src/components/Main/WaterView.vue\"))\n  }, {\n    name: 'CalorieView',\n    path: '/burn_calories/',\n    component: () => __webpack_require__.e(/*! import() */ \"src_components_Main_CalorieView_vue\").then(__webpack_require__.bind(__webpack_require__, /*! ./components/Main/CalorieView.vue */ \"./src/components/Main/CalorieView.vue\"))\n  }, {\n    name: 'LogoutUser',\n    path: '/logout/',\n    component: () => __webpack_require__.e(/*! import() */ \"src_components_Profile_LogoutUser_vue\").then(__webpack_require__.bind(__webpack_require__, /*! ./components/Profile/LogoutUser.vue */ \"./src/components/Profile/LogoutUser.vue\"))\n  }]\n});\nconst App = {\n  data() {\n    return {};\n  },\n  components: {\n    AsideMenu: (0,vue_dist_vue_esm_bundler__WEBPACK_IMPORTED_MODULE_1__.defineAsyncComponent)({\n      loader: () => __webpack_require__.e(/*! import() */ \"src_components_Menu_AsideMenu_vue\").then(__webpack_require__.bind(__webpack_require__, /*! ./components/Menu/AsideMenu */ \"./src/components/Menu/AsideMenu.vue\"))\n    }),\n    EditRegisterProfile: (0,vue_dist_vue_esm_bundler__WEBPACK_IMPORTED_MODULE_1__.defineAsyncComponent)({\n      loader: () => __webpack_require__.e(/*! import() */ \"src_components_Profile_EditRegisterProfile_vue\").then(__webpack_require__.bind(__webpack_require__, /*! ./components/Profile/EditRegisterProfile */ \"./src/components/Profile/EditRegisterProfile.vue\"))\n    }),\n    AuthUser: (0,vue_dist_vue_esm_bundler__WEBPACK_IMPORTED_MODULE_1__.defineAsyncComponent)({\n      loader: () => __webpack_require__.e(/*! import() */ \"src_components_Profile_AuthUser_vue\").then(__webpack_require__.bind(__webpack_require__, /*! ./components/Profile/AuthUser */ \"./src/components/Profile/AuthUser.vue\"))\n    }),\n    LogoutUser: (0,vue_dist_vue_esm_bundler__WEBPACK_IMPORTED_MODULE_1__.defineAsyncComponent)({\n      loader: () => __webpack_require__.e(/*! import() */ \"src_components_Profile_LogoutUser_vue\").then(__webpack_require__.bind(__webpack_require__, /*! ./components/Profile/LogoutUser */ \"./src/components/Profile/LogoutUser.vue\"))\n    }),\n    HomeView: (0,vue_dist_vue_esm_bundler__WEBPACK_IMPORTED_MODULE_1__.defineAsyncComponent)({\n      loader: () => __webpack_require__.e(/*! import() */ \"src_components_Home_HomeView_vue\").then(__webpack_require__.bind(__webpack_require__, /*! ./components/Home/HomeView */ \"./src/components/Home/HomeView.vue\"))\n    }),\n    EditProfile: (0,vue_dist_vue_esm_bundler__WEBPACK_IMPORTED_MODULE_1__.defineAsyncComponent)({\n      loader: () => __webpack_require__.e(/*! import() */ \"src_components_Profile_EditProfile_vue\").then(__webpack_require__.bind(__webpack_require__, /*! ./components/Profile/EditProfile */ \"./src/components/Profile/EditProfile.vue\"))\n    }),\n    ProductView: (0,vue_dist_vue_esm_bundler__WEBPACK_IMPORTED_MODULE_1__.defineAsyncComponent)({\n      loader: () => __webpack_require__.e(/*! import() */ \"src_components_Main_ProductView_vue\").then(__webpack_require__.bind(__webpack_require__, /*! ./components/Main/ProductView */ \"./src/components/Main/ProductView.vue\"))\n    }),\n    StatView: (0,vue_dist_vue_esm_bundler__WEBPACK_IMPORTED_MODULE_1__.defineAsyncComponent)({\n      loader: () => __webpack_require__.e(/*! import() */ \"src_components_Main_StatView_vue\").then(__webpack_require__.bind(__webpack_require__, /*! ./components/Main/StatView */ \"./src/components/Main/StatView.vue\"))\n    }),\n    WaterView: (0,vue_dist_vue_esm_bundler__WEBPACK_IMPORTED_MODULE_1__.defineAsyncComponent)({\n      loader: () => __webpack_require__.e(/*! import() */ \"src_components_Main_WaterView_vue\").then(__webpack_require__.bind(__webpack_require__, /*! ./components/Main/WaterView */ \"./src/components/Main/WaterView.vue\"))\n    }),\n    CalorieView: (0,vue_dist_vue_esm_bundler__WEBPACK_IMPORTED_MODULE_1__.defineAsyncComponent)({\n      loader: () => __webpack_require__.e(/*! import() */ \"src_components_Main_CalorieView_vue\").then(__webpack_require__.bind(__webpack_require__, /*! ./components/Main/CalorieView */ \"./src/components/Main/CalorieView.vue\"))\n    })\n  },\n  created() {\n    this.getUser();\n    this.getUserData();\n  },\n  methods: {\n    getUser() {\n      fetch('/api/user/check_auth/').then(response => response.json()).then(result => {\n        if (result.success && result.data.isAuth) {\n          this.$store.state.userId = result.data.user_id;\n          this.$store.state.userLogin = result.data.login;\n        } else {\n          this.$router.push({\n            name: 'HomeView'\n          });\n        }\n      });\n    },\n    getUserData() {\n      fetch('/api/user/get/').then(response => response.json()).then(result => {\n        console.log(result);\n      });\n    }\n  },\n  computed: {\n    isAuth() {\n      return this.$store.state.userId && this.$store.state.userLogin;\n    },\n    isInner() {\n      return this.$route.path !== \"/auth/\" && this.$route.path !== \"/register/\";\n    }\n  }\n};\nconst app = (0,vue_dist_vue_esm_bundler__WEBPACK_IMPORTED_MODULE_1__.createApp)(App);\napp.use(store);\napp.use(element_plus__WEBPACK_IMPORTED_MODULE_5__[\"default\"], {\n  locale: element_plus_dist_locale_ru_mjs__WEBPACK_IMPORTED_MODULE_6__[\"default\"]\n});\napp.use(router).mount('#app');\n\n//# sourceURL=webpack://vue/./src/main.js?");

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-24.use[1]!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-24.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-24.use[3]!./src/assets/style.scss":
/*!*********************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-24.use[1]!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-24.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-24.use[3]!./src/assets/style.scss ***!
  \*********************************************************************************************************************************************************************************************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/noSourceMaps.js */ \"./node_modules/css-loader/dist/runtime/noSourceMaps.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);\n// Imports\n\n\nvar ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));\n// Module\n___CSS_LOADER_EXPORT___.push([module.id, \".stat__title {\\n  margin-bottom: 2rem;\\n}\\n.stat__date-picker-wrapper {\\n  margin-bottom: 1.5rem;\\n}\\n\\n[v-cloak] {\\n  display: none;\\n}\\n\\nbody {\\n  background-color: #E9EAFC;\\n}\\n\\n.app {\\n  height: 100vh;\\n  width: 100%;\\n  position: relative;\\n}\\n\\n.main {\\n  height: inherit;\\n}\\n.main__content {\\n  padding: 2rem 1rem 2rem 14rem;\\n  height: inherit;\\n  display: flex;\\n  flex-direction: column;\\n  align-items: center;\\n  justify-content: center;\\n}\\n.main__content.inner {\\n  align-items: flex-start;\\n  justify-content: flex-start;\\n}\\n\\n.aside {\\n  position: fixed;\\n  width: 210px;\\n  height: 100%;\\n  top: 0;\\n  left: 0;\\n  transform: translateX(-160px);\\n  transition: transform 0.3s linear;\\n  display: flex;\\n}\\n.aside__content-wrapper {\\n  flex: 1 1 auto;\\n  background-color: #fff;\\n}\\n.aside__menu-list li {\\n  cursor: pointer;\\n  text-align: center;\\n  text-transform: uppercase;\\n  margin-bottom: 50px;\\n}\\n.aside__menu-list li:hover {\\n  text-decoration: underline;\\n}\\n.aside__menu-list li a {\\n  color: #000000;\\n  line-height: 20px;\\n}\\n\\n.aside.open {\\n  transform: translateX(0);\\n}\\n\\n.aside__control {\\n  width: 50px;\\n  height: 100%;\\n  background-color: #6B78BC;\\n  padding-top: 50px;\\n}\\n\\n.aside__content {\\n  width: 100%;\\n  height: 100%;\\n  display: flex;\\n  flex-direction: column;\\n  align-items: center;\\n}\\n\\n.aside__logo {\\n  width: 100px;\\n  height: 100px;\\n}\\n\\n.aside__logo img {\\n  width: 100%;\\n  height: 100%;\\n}\\n\\n.aside__menu-list {\\n  flex: 1 1 auto;\\n  padding-top: 90px;\\n}\\n\\n.aside__burger {\\n  cursor: pointer;\\n  margin: 0 auto;\\n  position: relative;\\n  width: 28px;\\n  height: 24px;\\n}\\n\\n.aside__burger.close span {\\n  transform: scaleY(0);\\n}\\n.aside__burger.close::after {\\n  bottom: 50%;\\n  transform: translateY(50%) rotate(-45deg);\\n}\\n.aside__burger.close::before {\\n  top: 50%;\\n  transform: translateY(-50%) rotate(45deg);\\n}\\n\\n.aside__burger::after,\\n.aside__burger::before {\\n  content: \\\"\\\";\\n}\\n\\n.aside__burger span,\\n.aside__burger::after,\\n.aside__burger::before {\\n  border: 0;\\n  position: absolute;\\n  width: 100%;\\n  height: 3px;\\n  left: 0;\\n  background-color: #fff;\\n}\\n\\n.aside__burger::after {\\n  bottom: 0;\\n  transition: all 0.4s ease-in-out;\\n}\\n\\n.aside__burger span {\\n  top: 50%;\\n  transform: translateY(-50%);\\n  transition: transform 0.2s ease-in-out;\\n}\\n\\n.aside__burger::before {\\n  top: 0;\\n  transition: all 0.4s ease-in-out;\\n}\\n\\n.register__title {\\n  margin-bottom: 40px;\\n}\\n.register__sub-title {\\n  margin-bottom: 1.5rem;\\n  text-align: center;\\n}\\n.register__sub-title span {\\n  font-size: 10px;\\n}\\n.register__wrapper {\\n  display: flex;\\n  flex-direction: column;\\n  align-items: center;\\n}\\n.register__submit-btn {\\n  display: block;\\n}\\n.register__btns {\\n  display: flex;\\n  justify-content: space-between;\\n  margin: 0 -1rem;\\n}\\n\\n.title {\\n  font-size: 35px;\\n  font-weight: 700;\\n}\\n\\n.sub-title {\\n  font-size: 12px;\\n}\\n\\n.default__input-row {\\n  margin-bottom: 30px;\\n  display: flex;\\n  justify-content: space-between;\\n}\\n.default__input-row label {\\n  padding-right: 1rem;\\n}\\n\\n.default__input-row.justify-start {\\n  justify-content: flex-start;\\n}\\n.default__input-row.justify-start label {\\n  padding-right: 2rem;\\n}\\n\\n.default-label {\\n  font-size: 22px;\\n}\\n\\n.default-input {\\n  font-size: 22px;\\n  padding: 0 5px;\\n  background-color: transparent;\\n  border-bottom: 1px solid #000;\\n}\\n.default-input:focus {\\n  box-shadow: 0px 7px 5px -4px rgba(0, 0, 0, 0.75);\\n  -webkit-box-shadow: 0px 7px 5px -4px rgba(0, 0, 0, 0.75);\\n  -moz-box-shadow: 0px 7px 5px -4px rgba(0, 0, 0, 0.75);\\n}\\n\\n.default-submit-btn {\\n  display: block;\\n  cursor: pointer;\\n  font-size: 20px;\\n  background-color: transparent;\\n  border: 1px solid #6B78BC;\\n  border-radius: 20px;\\n  padding: 10px 20px;\\n  transition: background-color 0.3s ease, color 0.3s ease;\\n}\\n.default-submit-btn:hover {\\n  background-color: rgba(107, 120, 188, 0.5);\\n  color: #fff;\\n}\\n\\n.center-btn {\\n  margin: 0 auto;\\n}\\n\\n.default-select {\\n  background-color: transparent;\\n  font-size: 16px;\\n  display: flex;\\n  align-items: center;\\n}\\n\\n.profile__title {\\n  margin-bottom: 2.5rem;\\n}\\n.profile__content {\\n  display: flex;\\n  margin: 0 -2.5rem;\\n  height: 100%;\\n}\\n.profile__column {\\n  padding: 0 2.5rem;\\n}\\n.profile__column:last-child {\\n  border-left: 1px solid #000;\\n}\\n.profile__count {\\n  font-size: 20px;\\n  margin-bottom: 1rem;\\n}\\n\\n.hide {\\n  opacity: 0;\\n  visibility: hidden;\\n}\\n\\n.none {\\n  display: none;\\n}\\n\\n.main-banner {\\n  position: absolute;\\n  top: 0;\\n  left: 0;\\n  width: 100%;\\n  height: 100vh;\\n  z-index: -1;\\n}\\n.main-banner img {\\n  width: 100%;\\n  height: 100%;\\n}\\n\\n.product__title {\\n  margin-bottom: 2.5rem;\\n}\\n.product__content {\\n  display: flex;\\n  margin: 0 -2.5rem;\\n  height: 100%;\\n}\\n.product__column {\\n  padding: 0 2.5rem;\\n}\\n.product__column:last-child {\\n  border-left: 1px solid #000;\\n}\\n.product__column .column-item {\\n  margin-bottom: 1rem;\\n}\\n.product__sub-title {\\n  margin-bottom: 1.5rem;\\n}\\n\\n.water__title {\\n  margin-bottom: 2.5rem;\\n}\\n.water__progress-bar {\\n  margin-bottom: 2rem;\\n}\\n\\n.calorie-burn__title {\\n  margin-bottom: 2.5rem;\\n}\\n.calorie-burn__progress-bar {\\n  margin-bottom: 2rem;\\n}\", \"\"]);\n// Exports\n/* harmony default export */ __webpack_exports__[\"default\"] = (___CSS_LOADER_EXPORT___);\n\n\n//# sourceURL=webpack://vue/./src/assets/style.scss?./node_modules/css-loader/dist/cjs.js??clonedRuleSet-24.use%5B1%5D!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-24.use%5B2%5D!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-24.use%5B3%5D");

/***/ }),

/***/ "./src/assets/style.scss":
/*!*******************************!*\
  !*** ./src/assets/style.scss ***!
  \*******************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

eval("// style-loader: Adds some css to the DOM by adding a <style> tag\n\n// load the styles\nvar content = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-24.use[1]!../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-24.use[2]!../../node_modules/sass-loader/dist/cjs.js??clonedRuleSet-24.use[3]!./style.scss */ \"./node_modules/css-loader/dist/cjs.js??clonedRuleSet-24.use[1]!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-24.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-24.use[3]!./src/assets/style.scss\");\nif(content.__esModule) content = content.default;\nif(typeof content === 'string') content = [[module.id, content, '']];\nif(content.locals) module.exports = content.locals;\n// add the styles to the DOM\nvar add = (__webpack_require__(/*! !../../node_modules/vue-style-loader/lib/addStylesClient.js */ \"./node_modules/vue-style-loader/lib/addStylesClient.js\")[\"default\"])\nvar update = add(\"e4ac80c4\", content, false, {\"sourceMap\":false,\"shadowMode\":false});\n// Hot Module Replacement\nif(false) {}\n\n//# sourceURL=webpack://vue/./src/assets/style.scss?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	!function() {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = function(result, chunkIds, fn, priority) {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var chunkIds = deferred[i][0];
/******/ 				var fn = deferred[i][1];
/******/ 				var priority = deferred[i][2];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every(function(key) { return __webpack_require__.O[key](chunkIds[j]); })) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/ensure chunk */
/******/ 	!function() {
/******/ 		__webpack_require__.f = {};
/******/ 		// This file contains only the entry chunk.
/******/ 		// The chunk loading function for additional chunks
/******/ 		__webpack_require__.e = function(chunkId) {
/******/ 			return Promise.all(Object.keys(__webpack_require__.f).reduce(function(promises, key) {
/******/ 				__webpack_require__.f[key](chunkId, promises);
/******/ 				return promises;
/******/ 			}, []));
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/get javascript chunk filename */
/******/ 	!function() {
/******/ 		// This function allow to reference async chunks
/******/ 		__webpack_require__.u = function(chunkId) {
/******/ 			// return url for filenames based on template
/******/ 			return "js/" + chunkId + ".js";
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	!function() {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/load script */
/******/ 	!function() {
/******/ 		var inProgress = {};
/******/ 		var dataWebpackPrefix = "vue:";
/******/ 		// loadScript function to load a script via script tag
/******/ 		__webpack_require__.l = function(url, done, key, chunkId) {
/******/ 			if(inProgress[url]) { inProgress[url].push(done); return; }
/******/ 			var script, needAttach;
/******/ 			if(key !== undefined) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				for(var i = 0; i < scripts.length; i++) {
/******/ 					var s = scripts[i];
/******/ 					if(s.getAttribute("src") == url || s.getAttribute("data-webpack") == dataWebpackPrefix + key) { script = s; break; }
/******/ 				}
/******/ 			}
/******/ 			if(!script) {
/******/ 				needAttach = true;
/******/ 				script = document.createElement('script');
/******/ 		
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.setAttribute("data-webpack", dataWebpackPrefix + key);
/******/ 				script.src = url;
/******/ 			}
/******/ 			inProgress[url] = [done];
/******/ 			var onScriptComplete = function(prev, event) {
/******/ 				// avoid mem leaks in IE.
/******/ 				script.onerror = script.onload = null;
/******/ 				clearTimeout(timeout);
/******/ 				var doneFns = inProgress[url];
/******/ 				delete inProgress[url];
/******/ 				script.parentNode && script.parentNode.removeChild(script);
/******/ 				doneFns && doneFns.forEach(function(fn) { return fn(event); });
/******/ 				if(prev) return prev(event);
/******/ 			}
/******/ 			var timeout = setTimeout(onScriptComplete.bind(null, undefined, { type: 'timeout', target: script }), 120000);
/******/ 			script.onerror = onScriptComplete.bind(null, script.onerror);
/******/ 			script.onload = onScriptComplete.bind(null, script.onload);
/******/ 			needAttach && document.head.appendChild(script);
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	!function() {
/******/ 		__webpack_require__.p = "/local/vue/dist-dev/";
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	!function() {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"app": 0
/******/ 		};
/******/ 		
/******/ 		__webpack_require__.f.j = function(chunkId, promises) {
/******/ 				// JSONP chunk loading for javascript
/******/ 				var installedChunkData = __webpack_require__.o(installedChunks, chunkId) ? installedChunks[chunkId] : undefined;
/******/ 				if(installedChunkData !== 0) { // 0 means "already installed".
/******/ 		
/******/ 					// a Promise means "currently loading".
/******/ 					if(installedChunkData) {
/******/ 						promises.push(installedChunkData[2]);
/******/ 					} else {
/******/ 						if(true) { // all chunks have JS
/******/ 							// setup Promise in chunk cache
/******/ 							var promise = new Promise(function(resolve, reject) { installedChunkData = installedChunks[chunkId] = [resolve, reject]; });
/******/ 							promises.push(installedChunkData[2] = promise);
/******/ 		
/******/ 							// start chunk loading
/******/ 							var url = __webpack_require__.p + __webpack_require__.u(chunkId);
/******/ 							// create error before stack unwound to get useful stacktrace later
/******/ 							var error = new Error();
/******/ 							var loadingEnded = function(event) {
/******/ 								if(__webpack_require__.o(installedChunks, chunkId)) {
/******/ 									installedChunkData = installedChunks[chunkId];
/******/ 									if(installedChunkData !== 0) installedChunks[chunkId] = undefined;
/******/ 									if(installedChunkData) {
/******/ 										var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 										var realSrc = event && event.target && event.target.src;
/******/ 										error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 										error.name = 'ChunkLoadError';
/******/ 										error.type = errorType;
/******/ 										error.request = realSrc;
/******/ 										installedChunkData[1](error);
/******/ 									}
/******/ 								}
/******/ 							};
/******/ 							__webpack_require__.l(url, loadingEnded, "chunk-" + chunkId, chunkId);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 		};
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = function(chunkId) { return installedChunks[chunkId] === 0; };
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = function(parentChunkLoadingFunction, data) {
/******/ 			var chunkIds = data[0];
/******/ 			var moreModules = data[1];
/******/ 			var runtime = data[2];
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some(function(id) { return installedChunks[id] !== 0; })) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkvue"] = self["webpackChunkvue"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	}();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["chunk-vendors"], function() { return __webpack_require__("./src/main.js"); })
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;