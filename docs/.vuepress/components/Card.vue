<template>
  <div>
    <template v-if="cardData[0].title != undefined">
        <div style="text-align: center; font-weight: 800">{{ cardData[0].title }}</div>
    </template>
    <div class="kbt-row">
    <div
      class="card-nav-box"
      :style="
        cardListSize == 4
          ? 'width: 25%;'
          : cardListSize == 2
          ? 'width: 50%;'
          : 'width: 33.333%;'
      "
      v-for="(item,index) in cardData"
      :key="index"
    >
      <a :href="item.cardSrc" target="_blank">
        <div class="card-nav-item">
          <div class="card-nav-title">
            <p class="card-nav-name" :style="'color:' + carTitleColor">
              {{ item.cardName }}
            </p>            
            <img
              v-if="item.cardImgSrc && item.cardImgSrc != ''"
              :src="item.cardImgSrc"
              alt="🏎"
              class="card-nav-img"
            />
          </div>
          <div :title="item.cardContent" class="card-nav-content">
            {{ item.cardContent }}
          </div>
        </div>
      </a>
    </div>
  </div>
  </div>
</template>

<script>
export default {
  props: {
    cardData: {
      type: Array,
      default: [],
    },
    cardListSize: {
      type: Number,
      default: 4,
    },
    carTitleColor: {
      type: String,
      default: "#000",
    },
    carHoverColor: {
      type: String,
      default: "#000",
    },
  },
  mounted() {
    this.cardHoverColor();
  },
  methods: {
    cardHoverColor() {
      if(!document.querySelector(".card")){
        const carHoverColor = this.carHoverColor;
        let style = document.createElement("style");
        style.className = 'card';
        style.innerHTML = `.card-nav-content:hover{color: ${carHoverColor}}`;
        document.head.appendChild(style);
      }
    },
  },
};
</script>

<style scoped>
.kbt-row {
  margin: 0.7rem 0;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
}
.card-nav-box {
  padding: 0 0 0 0;
  box-sizing: border-box;
}
.card-nav-box a:hover {
  text-decoration: none !important;
}
.card-nav-item {
  min-height: 60px;
  margin-top: 2px;
  margin-bottom: 5px;
  margin-right: 5px;
  margin-left: 5px;
  padding: 2px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 5px 0 rgb(0 0 0 / 10%);
  transition: all 0.4s;
}
.card-nav-item:hover {
  box-shadow: 0 5px 10px -5px rgba(0, 0, 0, 0.7);
  transform: translateY(-3px) scale(1.01, 1.01);
}
.card-nav-title {
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 15px;
  margin: 2px 2px 0 2px;
  height: 40px;
  line-height: 10px;
  white-space: nowrap;
}
.card-nav-img {
  height: 35px;
  float: right;
}
.card-nav-name {
  height: 35px;
  float: left;
  font-size: 15px;
  margin: 0 0;
  line-height: 30px;
  white-space: nowrap;
}
.card-nav-content {
  margin-top: 0;
  margin-bottom: 2px;
  margin-right: 2px;
  margin-left: 2px;
  font-size: 13px;
  color: #999;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  height: 35px;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
