<template>
  <div class="register register-data">
    <div class="register__wrapper">
      <h2 class="register__title title">Ваши данные</h2>
      <div class="register__form">
        <form id="register-data" action="" class="default-form">
          <div class="default__input-row register__input-row">
            <label class="default-label" for="user-age">Возраст:</label>
            <input v-model.trim="age" @keypress="isNumber" class="default-input" id="user-age" type="text" name="age">
          </div>
          <div class="default__input-row register__input-row">
            <label class="default-label" for="user-height">Рост:</label>
            <input v-model.trim="height" @keypress="isNumber" class="default-input" id="user-height" type="text" name="height">
          </div>
          <div class="default__input-row register__input-row">
            <label class="default-label" for="user-weight">Вес:</label>
            <input v-model.trim="weight" @keypress="isNumber" class="default-input" id="user-weight" type="text" name="weight">
          </div>
          <div class="default__input-row register__input-row">
            <label class="default-label" for="user-goal">Ваша цель:</label>
            <select class="default-select" id="user-goal" v-model="goal" name="goal">
              <option disabled value="">Выберите одну из целей</option>
              <option value="less">Похудение</option>
              <option value="stay">Поддержание веса</option>
              <option value="up">Набор массы</option>
            </select>
          </div>
          <div class="default__input-row register__input-row">
            <label class="default-label" for="user-activity">Тип активности:</label>
            <select class="default-select" id="user-activity" v-model="activity" name="activity">
              <option disabled value="">Выберите один из вариантов</option>
              <option value="1.2" title="сидячая работа без физических нагрузок">минимальная активность</option>
              <option value="1.375" title="умеренные тренировки 1-3 раза в неделю">легкая активность</option>
              <option value="1.55" title="тренировки 3-5 раз в неделю">средняя активность</option>
              <option value="1.725" title="интенсивные тренировки 6-7 раз в неделю">высокая активность</option>
              <option value="1.9" title="ежедневные интенсивные тренировки или физическая работа">очень высокая активность</option>
            </select>
          </div>
          <h3 class="register__sub-title sub-title">Вы также можете сделать это после регистрации<span>*</span></h3>
          <div class="register__btns">
            <div class="default-submit-btn register__submit-btn skip-btn" @click.prevent="skip">Пропустить</div>
            <div class="register__submit-btn default-submit-btn" @click.prevent="skip">Запомнить</div>
          </div>
        </form>
      </div>
    </div>
  </div>
  <div class="register none">
    <div class="register__wrapper">
      <h2 class="register__title title">Регистрация</h2>
      <div class="register__form">
        <form id="register" class="default-form" action="" @submit.prevent="register">
          <div class="default__input-row register__input-row">
            <label class="default-label" for="user-login">Логин:</label>
            <input required v-model.trim="login" class="default-input" id="user-login" type="text" name="login">
          </div>
          <div class="default__input-row register__input-row">
            <label class="default-label" for="user-email">Email:</label>
            <input required v-model.trim="email" class="default-input" id="user-email" type="email" name="email">
          </div>
          <div class="default__input-row register__input-row">
            <label class="default-label" for="user-pass">Пароль:</label>
            <input required v-model.trim="password" class="default-input" id="user-pass" type="password" name="pass">
          </div>
          <div class="register__btns">
            <div class="default-submit-btn register__submit-btn" @click.prevent="skip">Вернуться</div>
            <button class="register__submit-btn default-submit-btn">Зарегистрироваться</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>


<script>
import {defineComponent} from 'vue'

export default defineComponent({
  name: "EditRegisterProfile",
  data() {
    return {
      login: "",
      password: "",
      email: "",
      age: "",
      height: "",
      weight: "",
      goal: "",
      activity: "",
      error: false,
      errorMessage: ""
    }
  },
  methods: {
    register() {
      let userSettings = {
        "UF_CALORIE": this.calorieCount,
        "UF_HEIGHT": this.height,
        "UF_WEIGHT": this.weight,
        "UF_PROTEIN": this.proteinCount,
        "UF_FAT": this.fatCount,
        "UF_CARB": this.carbCount,
        "UF_WATER": this.waterCount,
        "UF_GOAL": this.goalFormat,
        "UF_FOREIGN_KEY_PHYSICAL_TYPE": this.activityFormat
      };

      fetch('/api/user/register/', {
        method: 'POST',
        body: JSON.stringify({
          login: this.login,
          pass: this.password,
          email: this.email,
          userSettings: userSettings
        })
      })
          .then(response => response.json())
          .then(result => {
            if (!result.data.ERROR) {
              this.$store.state.userId = result.data.user_id;
              this.$store.state.userLogin = result.data.login;
              this.$router.push({name: 'HomeView'});
            }
          });
    },
    skip() {
        const registerData = document.querySelector('.register-data');
        const register = document.querySelector('.register:not(.register-data)')

        registerData.classList.toggle('none');
        register.classList.toggle('none');
    },
    isNumber(event) {
      let charCode =  event.keyCode;
      if ((charCode > 31 && (charCode < 48 || charCode > 57))) {
        event.preventDefault();
      } else {
        return true;
      }
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
    goalFormat() {
      switch (this.goal) {
        case "less":
          return "Похудение";
        case "stay":
          return "Поддержание веса";
        case "up":
          return "Набор массы";
        default:
          return "";
      }
    },
    activityFormat() {
      switch (this.activity) {
        case "1.375":
          return 2;
        case "1.55":
          return 3;
        case "1.725":
          return 4;
        case "1.9":
          return 5;
        default:
          return 1;
      }
    }
  }
})
</script>
