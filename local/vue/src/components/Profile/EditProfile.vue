<template>
    <div v-cloak class="profile">
        <div class="profile__wrapper">
          <h2 class="profile__title title">Добро пожаловать, {{this.$store.state.userLogin}}!</h2>
          <div class="profile__content">
            <div class="profile__column">
              <form id="profile" action="" @submit.prevent="updateProfile">
                <div class="default__input-row">
                  <label class="default-label" for="user-profile-login">Логин:</label>
                  <input v-model.trim="login" class="default-input" id="user-profile-login" type="text" name="login">
                </div>
                <div class="default__input-row">
                  <label class="default-label" for="user-profle-email">Email:</label>
                  <input v-model.trim="email" class="default-input" id="user-profle-email" type="email" name="email">
                </div>
                <div class="default__input-row">
                  <label class="default-label" for="user-profile-pass">Пароль:</label>
                  <input v-model.trim="password" class="default-input" id="user-profile-pass" type="password" name="pass">
                </div>
                <div class="default__input-row">
                  <label class="default-label" for="user-profile-age">Возраст:</label>
                  <input v-model.trim="age" class="default-input" id="user-profile-age" type="text" name="age">
                </div>
                <div class="default__input-row">
                  <label class="default-label" for="user-profile-height">Рост:</label>
                  <input v-model.trim="height" class="default-input" id="user-profile-height" type="text" name="height">
                </div>
                <div class="default__input-row">
                  <label class="default-label" for="user-profile-weight">Вес:</label>
                  <input v-model.trim="weight" class="default-input" id="user-profile-weight" type="text" name="weight">
                </div>
                <div class="default__input-row">
                  <label class="default-label" for="user-profile-goal">Ваша цель:</label>
                  <select class="default-select" id="user-profile-goal" v-model="goal" name="goal">
                    <option disabled value="">Выберите одну из целей</option>
                    <option value="less">Похудение</option>
                    <option value="stay">Поддержание веса</option>
                    <option value="up">Набор массы</option>
                  </select>
                </div>
                <div class="default__input-row">
                  <label class="default-label" for="user-profile-activity">Тип активности:</label>
                  <select class="default-select" id="user-profile-activity" v-model="activity" name="activity">
                    <option disabled value="">Выберите один из вариантов</option>
                    <option value="1.2" title="сидячая работа без физических нагрузок">минимальная активность</option>
                    <option value="1.375" title="умеренные тренировки 1-3 раза в неделю">легкая активность</option>
                    <option value="1.55" title="тренировки 3-5 раз в неделю">средняя активность</option>
                    <option value="1.725" title="интенсивные тренировки 6-7 раз в неделю">высокая активность</option>
                    <option value="1.9" title="ежедневные интенсивные тренировки или физическая работа">очень высокая активность</option>
                  </select>
                </div>
                <button class="profile__submit-btn default-submit-btn center-btn">Обновить</button>
              </form>
            </div>
            <div class="profile__column">
                <div class="profile__info-content">
                  <div class="profile__count profile__calorie-count">Суточная норма калорий: {{calorieCount}} ккал</div>
                  <div class="profile__count profile__protein-count">Белки: {{proteinCount}}г.</div>
                  <div class="profile__count profile__fat-count">Жиры: {{fatCount}}г.</div>
                  <div class="profile__count profile__carb-count">Углеводы: {{carbCount}}г.</div>
                  <div class="profile__count profile__water-count">Суточная норма воды: {{waterCount}}мл.</div>
                </div>
            </div>
          </div>
        </div>
    </div>
</template>

<script>
import {defineComponent} from 'vue'

export default defineComponent({
  name: "EditProfile",
  data() {
    return {
      login: "",
      password: "",
      email: "",
      age: "",
      height: "",
      weight: "",
      activity: "",
      goal: ""
    }
  },
  computed: {
    calorieCount() {
        // Формула Харриса-Бенедикта
      let BMR = Math.round((88.362 + (13.397 * Number(this.weight)) + (4.799 * Number(this.height)) - (5.677 * Number(this.age))) * Number(this.activity));
      switch (this.goal){
        case 'less':
          BMR -= 300;
          break;
        case 'up':
          BMR += 300;
          break;
      }
      return BMR;
    },
    proteinCount() {
      let proteinPercent = 0;
      switch (this.goal){
        case 'less':
          proteinPercent = 0.4;
          break;
        case 'stay':
          proteinPercent = 0.2;
          break;
        case 'up':
          proteinPercent = 0.3;
          break;
      }
      return Math.round(Number(this.calorieCount) * proteinPercent / 4);
    },
    fatCount() {
      let fatPercent = 0;
      switch (this.goal){
        case 'less':
          fatPercent = 0.4;
          break;
        case 'stay':
          fatPercent = 0.3;
          break;
        case 'up':
          fatPercent = 0.2;
          break;
      }
      return Math.round(Number(this.calorieCount) * fatPercent / 9);
    },
    carbCount() {
      let carbPercent = 0;
      switch (this.goal){
        case 'less':
          carbPercent = 0.2;
          break;
        case 'stay':
          carbPercent = 0.5;
          break;
        case 'up':
          carbPercent = 0.6;
          break;
      }
      return Math.round(Number(this.calorieCount) * carbPercent / 4);
    },
    waterCount() {
      return Math.round(Number(this.weight) / 30 * 1000);
    },
    isAuth() {
      return this.$store.state.userId && this.$store.state.userLogin;
    }
  },
  methods: {
    updateProfile() {
        let user = {},
            userSettings = {};
        if (this.login) {
          user['LOGIN'] = this.login;
        } else {
          user['LOGIN'] = this.$store.state.userLogin;
        }
        if (this.password) {
          user['PASSWORD'] = this.password;
        }
        if (this.email) {
          user['EMAIL'] = this.email;
        }
        // if (this.calorieCount) {
          // userSettings['UF_'] =
        // }
        fetch('/api/user/update/',{
          method: 'POST',
          body: JSON.stringify({
              user: user,
              user_settings: userSettings
          })
        })
            .then(response => response.json())
            .then(result => {
              console.log(result);
            });
    },
  },
})
</script>

<style scoped>

</style>