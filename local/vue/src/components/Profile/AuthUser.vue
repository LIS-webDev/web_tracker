<template>
  <div class="register">
    <div class="register__wrapper">
      <h2 class="register__title title">Авторизация</h2>
      <div class="register__form">
        <form id="auth" class="default-form" action="" @submit.prevent="sendForm">
          <div class="register__input-row">
            <label class="default-label" for="user-auth-login">Логин:</label>
            <input class="default-input" id="user-auth-login" type="text" name="login" value="">
          </div>
          <div class="register__input-row">
            <label class="default-label" for="user-auth-pass">Пароль:</label>
            <input class="default-input" id="user-auth-pass" type="password" name="pass" value="">
          </div>
          <button class="register__submit-btn default-submit-btn" >Войти</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import {defineComponent} from 'vue'

export default defineComponent({
  name: "AuthUser",
  data() {
    return {

    }
  },
  methods: {
     sendForm() {
       fetch('/api/test/')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.$router.push('/register');
      });
    }
  }
})
</script>
