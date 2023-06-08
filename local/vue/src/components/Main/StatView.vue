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
        <div v-if="isShow" class="stat__diagram" >
          <Line :data="setData" :options="options" :style="styles"></Line>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement, PointElement, Title, Tooltip} from 'chart.js'
import {defineComponent} from 'vue';
import {Line} from 'vue-chartjs';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
)

export default defineComponent({
  name: "StatView",
  data() {
    return {
      showDiagram: false,
      date: [],
      dates: [],
      values: [],
      options: {
        responsive: true,
        maintainAspectRatio: false
      },
      styles: {
        width: '100%',
        height: '300px'
      }
    }
  },
  computed: {
    setData() {
      return {
        labels: this.dates,
        datasets: [
          {
            label: 'Калории',
            backgroundColor: '#f87979',
            data: this.values
          }
        ],
      }
    },
    isShow() {
      return this.values.length;
    }
  },
  methods: {
    showStat() {
      let el = this;
      el.showDiagram = true;
      let dateStart = new Date(el.date[0]);
      let dateEnd = new Date(el.date[1]);
      fetch('/api/stat/period/get/', {
        method: "POST",
        body: JSON.stringify({
          start: dateStart,
          end: dateEnd
        })
      }).then(response => response.json())
          .then(result => {
            console.log(result);
            this.dates = Object.keys(result.data);
            this.values = Object.values(result.data)
          })
    },
  },
  components: {
    Line
  },

});
</script>