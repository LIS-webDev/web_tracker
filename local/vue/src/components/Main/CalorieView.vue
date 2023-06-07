<template>
  <div class="calorie-burn">
    <div class="calorie-burn__wrapper">
      <h2 class="calorie-burn__title title">Добавить количество сожженых калорий</h2>
      <div class="calorie-burn__content">
        <div class="calorie-burn__progress-bar">
          <el-progress :text-inside="true" :stroke-width="26" :percentage="70" color="#00e600" />
        </div>
        <form id="calorie-burn" action="" @submit.prevent="addCalorie">
          <div class="default__input-row justify-start">
            <label class="default-label" for="calorie-count">Количество(ккал):</label>
            <input v-model.trim="calorie" @keypress="isNumber" class="default-input" id="calorie-count" type="text" name="calorie_burn_count">
          </div>
          <button class="calorie-burn__submit-btn default-submit-btn center-btn">Сжечь</button>
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
      calorie: ""
    }
  },
  methods: {
    addCalorie() {

    },
    isNumber(event) {
      let charCode =  event.keyCode;
      if ((charCode > 31 && (charCode < 48 || charCode > 57))) {
        event.preventDefault();
      } else {
        return true;
      }
    }
  }
});
</script>