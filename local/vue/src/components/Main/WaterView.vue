<template>
    <div class="water">
      <div class="water__wrapper">
        <h2 class="water__title title">Добавить количество выпитой воды</h2>
        <div class="water__content">
          <div class="water__progress-bar">
            <el-progress :text-inside="true" :stroke-width="26" :percentage="70" />
          </div>
          <form id="water" action="" @submit.prevent="addWater">
            <div class="default__input-row justify-start">
              <label class="default-label" for="water-count">Количество(мл.):</label>
              <input v-model.trim="count" @keypress="isNumber" class="default-input" id="water-count" type="text" name="water_count">
            </div>
            <button class="water__submit-btn default-submit-btn center-btn">Добавить</button>
          </form>
        </div>
      </div>
    </div>
</template>

<script>
import {defineComponent} from 'vue'

export default defineComponent({
  name: "WaterView",
  data() {
    return {
        count: ""
    }
  },
  methods: {
    addWater() {
    },
    isNumber(event) {
      let charCode =  event.keyCode;
      if ((charCode > 31 && (charCode < 48 || charCode > 57))) {
        event.preventDefault();
      } else {
        return true;
      }
    },
  },
  computed: {
      totalWaterCount() {
        return this.$store.state.totalWaterCount;
      }
  },
  mounted() {
  }
});
</script>