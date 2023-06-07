<template>
  <div class="stat">
    <div class="stat__wrapper">
      <h2 class="stat__title title">Статистика</h2>
      <div class="stat__content">
        <div class="stat__date-picker">
          <div class="stat__date-picker-wrapper">
            <el-date-picker
                v-model="date"
                type="daterange"
                range-separator="До"
                start-placeholder="Начало"
                end-placeholder="Конец"
                size="large"
            />
          </div>
          <button @click.prevent="showStat" class="calorie-burn__submit-btn default-submit-btn center-btn">Показать</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {defineComponent} from 'vue';

export default defineComponent({
  name: "StatView",
  data() {
    return {
      date: []
    }
  },
  methods: {
    showStat() {
      let el = this;
      let dateStart = new Date(el.date[0]);
      // let dateEnd = new Date(el.date[1]);
      console.log(dateStart.getDate());
    }
  },
  computed: {
  }
});
</script>