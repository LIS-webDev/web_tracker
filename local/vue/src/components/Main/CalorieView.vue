<template>
  <div class="calorie-burn">
    <div class="calorie-burn__wrapper">
      <h2 class="calorie-burn__title title">Добавить количество сожженых калорий</h2>
      <div class="calorie-burn__content">
        <div class="calorie-burn__progress-bar">
          <el-progress :text-inside="true" :stroke-width="26" :percentage="percent" color="#00e600">
            <span>{{burnedCalorie}}</span>
          </el-progress>
        </div>
        <form id="calorie-burn" action="" @submit.prevent="addCalorie">
          <div class="default__input-row justify-start">
            <label class="default-label" for="calorie-count">Количество(ккал):</label>
            <input v-model.trim="count" @keypress="isNumber" class="default-input" id="calorie-count" type="text" name="calorie_burn_count">
          </div>
          <button class="calorie-burn__submit-btn default-submit-btn center-btn" :disabled="btn.disabled">{{btn.text}}</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import {defineComponent} from 'vue'

export default defineComponent({
  name: "CalorieView",
  data() {
    return {
      count: "",
      btn: {
        text: "Добавить",
        disabled: false
      }
    }
  },
  methods: {
    addCalorie() {
      this.$store.commit('addBurnedCalorie', this.count);

      this.btn.text = 'Добавлено';
      this.btn.disabled = true;
      fetch('/api/burncalorie/add/', {
        method: 'POST',
        body: JSON.stringify({
            count: this.count
        })
      }).then(response => response.json())
          .then(result => {
            console.log(result);
            this.btn.text = 'Добавить';
            this.btn.disabled = false;
          })
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
    totalCalorie() {
      return this.$store.state.totalCalorie;
    },
    burnedCalorie() {
      return this.$store.state.burnedCalorie;
    },
    percent() {
      return Math.round(Number(this.burnedCalorie) / Number(this.totalCalorie) * 100) ?? 0;
    }
  }
});
</script>