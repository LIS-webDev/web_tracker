<template>
    <div class="product">
      <div class="product__wrapper">
        <h2 class="product__title title">Добавить продукт</h2>
        <div class="product__content">
          <div class="product__column">
            <form id="product" action="" @submit.prevent="addProduct">
              <div class="default__input-row">
                <label class="default-label" for="product-name">Название:</label>
                <input v-model.trim="name" class="default-input" id="product-name" type="text" name="name">
              </div>
              <div class="default__input-row">
                <label class="default-label" for="product-protein">Белки(гр.):</label>
                <input v-model.trim="protein" @keypress="isNumber" class="default-input" id="product-protein" type="text" name="protein">
              </div>
              <div class="default__input-row">
                <label class="default-label" for="product-fat">Жиры(гр.):</label>
                <input v-model.trim="fat" @keypress="isNumber" class="default-input" id="product-fat" type="text" name="fat">
              </div>
              <div class="default__input-row">
                <label class="default-label" for="product-carb">Углеводы(гр.):</label>
                <input v-model.trim="carb" @keypress="isNumber" class="default-input" id="product-carb" type="text" name="carb">
              </div>
              <div class="default__input-row">
                <label class="default-label" for="product-count">Количество(гр.):</label>
                <input v-model.trim="count" @keypress="isNumber" class="default-input" id="product-count" type="text" name="count">
              </div>
              <div class="default__input-row">
                <label class="default-label" for="user-profile-meal">Прием пищи:</label>
                <select class="default-select" id="user-profile-meal" v-model="meal" name="meal">
                  <option disabled value="">Выберите прием пищи</option>
                  <option value="Завтрак">Завтрак</option>
                  <option value="Обед">Обед</option>
                  <option value="Ужин">Ужин</option>
                  <option value="Перекус">Перекус</option>
                </select>
              </div>
              <h3 class="product__sub-title sub-title">Количество белков, жиров и углеводов указывается на 100 грамм продукта<span>*</span></h3>
              <button class="product__submit-btn default-submit-btn center-btn">Добавить</button>
            </form>
          </div>
          <div class="product__column">
            <div class="product__meal column-item">{{meal ? meal : 'Прием пищи'}}</div>
            <div v-if="name" class="product__name column-item">Название: {{name}}</div>
            <div v-if="protein" class="product__name column-item">Белки: {{protein}}г.</div>
            <div v-if="fat" class="product__name column-item">Жиры: {{fat}}г.</div>
            <div v-if="carb" class="product__name column-item">Углеводы: {{carb}}г.</div>
            <div v-if="count" class="product__name column-item">Вес: {{count}}г.</div>
            <div v-if="calorieCount" class="product__calorie-count column-item">Количество калорий: {{calorieCount}} ккал</div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import {defineComponent} from 'vue'

export default defineComponent({
  name: "ProductView",
  data() {
    return {
      name: "",
      count: "",
      protein: "",
      fat: "",
      carb: "",
      meal: ""
    }
  },
  computed: {
    calorieCount() {
      return  Math.round((Number(this.protein) * 4 + Number(this.fat) * 9 + Number(this.carb) * 4) * (Number(this.count) / 100));
    },
  },
  methods: {
    addProduct() {

    },
    isNumber(event) {
      let charCode =  event.keyCode;
      if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
        event.preventDefault();
      } else {
        return true;
      }
    }
  }
});
</script>