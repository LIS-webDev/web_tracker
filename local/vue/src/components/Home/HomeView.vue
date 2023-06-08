
<template>
  <div v-cloak v-if="isAuth" class="home">
    <div class="stat-today">
      <div class="stat-today__wrapper">
        <h1 class="stat-today__title title">Ваша статистика за сегодняшний день</h1>
        <div class="stat-today__columns">
          <div v-if="false" class="stat-today__column">
          </div>
          <div class="stat-today__column custom-column">
            <el-progress type="circle" :stroke-width="16" :width="200" :percentage="percentCalorie" >
              <span>{{calorieCount}}</span>
            </el-progress>
            <div class="stat-today__nutritions">
              <div class="stat-today__nutritions-title small-title">Всего</div>
              <div class="stat-today__nutritions-items">
                <div class="stat-today__nutritions-item">Калории: {{eatedCalorie}}/{{calorieCount}}г.</div>
                <div class="stat-today__nutritions-item">Белки: {{eatedProtein}}/{{totalProtein}}г.</div>
                <div class="stat-today__nutritions-item">Жиры: {{eatedFat}}/{{totalFat}}г.</div>
                <div class="stat-today__nutritions-item">Углеводы: {{eatedCarb}}/{{totalCarb}}г.</div>
                <div class="stat-today__nutritions-item">Вода: {{drinkedWater}}/{{totalWater}}мл.</div>
                <div class="stat-today__nutritions-item">Сожгли: {{burnedCalorie}} ккал</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="main-banner" v-else>
      <img src="/local/templates/main/img/main-banner.svg" alt="BitBalance">
  </div>
</template>

<script>
import {defineComponent} from 'vue'

export default defineComponent({
  name: "HomeView",
  data() {
    return {
    }
  },
  created() {

  },
  methods: {
    circleFormat(count) {
      return count;
    }
  },
  computed: {
    isAuth() {
      return this.$store.state.userId && this.$store.state.userLogin;
    },
    calorieCount() {
      return this.$store.state.totalCalorie;
    },
    totalProtein(){
      return this.$store.state.totalProtein;
    },
    totalFat(){
      return this.$store.state.totalFat;
    },
    totalCarb(){
      return this.$store.state.totalCarb;
    },
    totalWater(){
      return this.$store.state.totalWaterCount;
    },
    drinkedWater(){
      return this.$store.state.addedWater;
    },
    eatedProtein() {
      return this.$store.state.addedProtein;
    },
    eatedFat() {
      return this.$store.state.addedFat;
    },
    eatedCarb() {
      return this.$store.state.addedCarb;
    },
    burnedCalorie() {
      return this.$store.state.burnedCalorie;
    },
    eatedCalorie() {
      return this.$store.state.addedCalorie;
    },
    percentCalorie() {
      return Math.round(Number(this.eatedCalorie) / Number(this.calorieCount) * 100) ?? 0;
    }
  }
})
</script>
