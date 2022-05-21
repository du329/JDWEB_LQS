<template>
  <div class="areaAnew">
    <div class="icon area">&#xe619;</div>
    <div class="areaAnew_text">北京理工大学国防科技园2号楼10层</div>
    <div class="icon news">&#xe629;</div>
  </div>

  <div class="searchBox">
    <Search :placeholder="placeholder" />
  </div>

  <div class="banner">
    <img src="http://www.dell-lee.com/imgs/vue3/banner.jpg" alt="" />
  </div>

  <div class="icons">
    <div v-for="item in iconsList" :key="item.id" class="icons_item">
      <img :src="item.imgUrl" alt="" />
      <div class="text">{{ item.text }}</div>
    </div>
  </div>

  <div class="gap"></div>
</template>

<script>
import Search from "../../components/Search";
export default {
  name: "StaticArea",
  components: {
    Search,
  },
  setup() {
    const placeholder = "山姆会员商店优惠商品";
    let iconsList = [
      {
        id: 0,
        imgUrl: "http://www.dell-lee.com/imgs/vue3/超市.png",
        text: "超市便利",
      },
      {
        id: 1,
        imgUrl: "http://www.dell-lee.com/imgs/vue3/菜市场.png",
        text: "菜市场",
      },
      {
        id: 2,
        imgUrl: "http://www.dell-lee.com/imgs/vue3/水果店.png",
        text: "水果店",
      },
      {
        id: 3,
        imgUrl: "http://www.dell-lee.com/imgs/vue3/鲜花.png",
        text: "鲜花绿植",
      },
      {
        id: 4,
        imgUrl: "http://www.dell-lee.com/imgs/vue3/医药健康.png",
        text: "医药健康",
      },
      {
        id: 5,
        imgUrl: "http://www.dell-lee.com/imgs/vue3/家居.png",
        text: "家居时尚",
      },
      {
        id: 6,
        imgUrl: "http://www.dell-lee.com/imgs/vue3/蛋糕.png",
        text: "烘培蛋糕",
      },
      {
        id: 7,
        imgUrl: "http://www.dell-lee.com/imgs/vue3/签到.png",
        text: "签到",
      },
      {
        id: 8,
        imgUrl: "http://www.dell-lee.com/imgs/vue3/大牌免运.png",
        text: "大牌免运",
      },
      {
        id: 9,
        imgUrl: "http://www.dell-lee.com/imgs/vue3/红包.png",
        text: "红包套餐",
      },
    ];
    return { iconsList, placeholder };
  },
};
</script>

<style lang="scss" scoped>
@import "../../style/viriables.scss";
@import "../../style/mixins.scss";

// 顶部
.areaAnew {
  padding: 0 0.2rem;
  margin: 0.16rem 0;
  height: 0.22rem;
  line-height: 0.22rem;
  font-size: 0.16rem;
  color: $content-fontcolor;
  .icon {
    font-size: 0.2rem;
  }
  .area {
    margin-right: 0.1rem;
    float: left;
  }
  .areaAnew_text {
    float: left;
    width: 80%;
    @include ellipsis;
  }
  .news {
    float: right;
  }
}
// 搜索
.searchBox {
  padding: 0 5%;
}
// banner
.banner {
  padding: 0 0.18rem;
  margin: 0.12rem 0 0.16rem 0;
  width: 100%;
  // 防止抖动：
  height: 0;
  overflow: hidden;
  padding-bottom: 25.4%;
  img {
    width: 100%;
  }
}

// icons
.icons {
  padding: 0 0.18rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  .icons_item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 0.16rem;
    width: 20%;
  }
  img {
    margin-bottom: 0.06rem;
    width: 0.4rem;
  }
}

// 间隔
.gap {
  width: 100%;
  height: 0.1rem;
  background: $content-bgColor;
}
</style>