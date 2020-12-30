<!--  -->
<template>
  <div class="panel">
    <div class="back"></div>
    <div class="panel-header">
      <Title title="蓄水池水位" />
    </div>
    <div class="panel-bodyer">
      <div class="left-cylinder">
        <div class="top"></div>
        <div class="bottom"></div>
        <div
          class="left-inside-cylinder"
          :style="{ height: `${(oneH / 4) * 100}%` }"
        >
          <div class="inside-top"></div>
          <div class="inside-bottom"></div>
        </div>
        <div class="title">蓄水池1</div>
      </div>
      <div class="line-box">
        <Rule :oneH="oneH" :twoH="twoH" />
      </div>
      <div class="right-cylinder">
        <div class="top"></div>
        <div class="bottom"></div>
        <div
          class="right-inside-cylinder"
          :style="{ height: `${(twoH / 4) * 100}%` }"
        >
          <div class="inside-top"></div>
          <div class="inside-bottom"></div>
        </div>
        <div class="title">蓄水池2</div>
      </div>
    </div>
  </div>
</template>

<script>
import Title from "../../common/Title";
import Rule from "../Rule/index";
import comMinxins from "../../common/comMinxins";
import { getReservoirLevel } from "../../../axios";
export default {
  name: "WaterLevel",
  mixins: [comMinxins],
  data() {
    return {
      oneH: 0,
      twoH: 0,
    };
  },

  components: {
    Title,
    Rule,
  },

  created() {
    this.getData();
  },

  methods: {
    updateData() {
      this.getData();
    },
    async getData() {
      let [err,res] = await getReservoirLevel();
      if( err ) return;
      let data = JSON.parse(res.message);
      this.oneH = this.keepTwoDecimal(data.sc1/100);
      this.twoH = this.keepTwoDecimal(data.sc2/100);
      setTimeout(() => {
        this.$store.commit("setWaterLevel", {
          oneH: this.oneH,
          twoH: this.twoH,
        });
      }, 2000);
      // setTimeout(()=> {
      //     this.getData()
      // },60000)
    },
    keepTwoDecimal(num) {
      var result = parseFloat(num);

      if (isNaN(result)) {
        return 0;
      }

      result = Math.round(num * 100) / 100;

      return result;
    },
  },

  computed: {},
};
</script>
<style lang="scss" scoped>
.line-box {
  position: relative;
  z-index: 3;
  left: 52px;
  width: 106px;
}
.panel {
  width: 640px;
  height: 444px;
  position: relative;
}
.back {
  position: absolute;
  left: 0;
  bottom: 20px;
  height: 204.5px;
  width: 100%;
  background: url("../../../assets/image/waterLevelBack.jpg");
  background-size: 100% 100%;
}
.panel-header {
  height: 60px;
  padding-top: 25px;
  padding-left: 23px;
}
.panel-bodyer {
  height: 360px;
  display: flex;
  padding-top: 29px;
  padding-left: 105px;
}
%cylinder {
  position: relative;
  height: 225px;
  width: 160px;
  z-index: 1;
  display: flex;
  justify-content: center;
}
%cylinder-top {
  position: absolute;
  top: -22px;
  content: "";
  display: block;
  width: 160px;
  height: 44px;
  border-radius: 50%;
  z-index: 1;
}
%cylinder-bottom {
  position: absolute;
  bottom: -22px;
  content: "";
  display: block;
  width: 160px;
  height: 44px;
  border-radius: 50%;
  z-index: 1;
}
%inside-cylinder {
  transition: all 1s linear;
  position: absolute;
  width: 120px;
  z-index: 1;
  bottom: 0;
}
%inside-cylinder-top {
  position: absolute;
  top: -15px;
  content: "";
  display: block;
  width: 120px;
  height: 30px;
  border-radius: 50%;
  z-index: 2;
}
%inside-cylinder-bottom {
  position: absolute;
  bottom: -15px;
  content: "";
  display: block;
  width: 120px;
  height: 30px;
  border-radius: 50%;
  z-index: 2;
}
.title {
  position: absolute;
  color: #fff;
  z-index: 3;
  width: 156px;
  height: 30px;
  border: 1px solid #3980c1;
  background: rgba(20, 54, 116, 0.5);
  font-size: 18px;
  line-height: 30px;
  text-align: center;
  bottom: -80px;
}
.left-cylinder {
  @extend %cylinder;
  background-image: linear-gradient(
    to bottom,
    rgba(0, 39, 115, 1) 0%,
    rgba(0, 40, 116, 0.7) 100%
  );
  .top {
    @extend %cylinder-top;
    background-image: linear-gradient(
      to bottom,
      rgba(4, 42, 130, 1) 0%,
      rgba(4, 42, 132, 1) 100%
    );
  }
  .bottom {
    @extend %cylinder-bottom;
    background: #1239c1;
  }
}

.left-inside-cylinder {
  @extend %inside-cylinder;
  background-image: linear-gradient(
    to left,
    rgba(85, 157, 254, 1) 0%,
    rgba(7, 65, 189, 1) 100%
  );
  .inside-top {
    @extend %inside-cylinder-top;
    background-image: linear-gradient(
      to bottom,
      rgba(4, 65, 194, 1) 0%,
      rgba(84, 157, 254, 1) 100%
    );
  }
  .inside-bottom {
    @extend %inside-cylinder-bottom;
    background-image: linear-gradient(
      to left,
      rgba(85, 157, 254, 1) 0%,
      rgba(7, 65, 189, 1) 100%
    );
  }
}

.right-cylinder {
  @extend %cylinder;
  background-image: linear-gradient(
    to bottom,
    rgba(0, 55, 114, 1) 0%,
    rgba(0, 55, 114, 0.7) 100%
  );
  .top {
    @extend %cylinder-top;
    background-image: linear-gradient(
      to bottom,
      rgba(4, 70, 132, 1) 0%,
      rgba(4, 71, 132, 1) 100%
    );
  }
  .bottom {
    @extend %cylinder-bottom;
    background: #1289c1;
  }
}

.right-inside-cylinder {
  @extend %inside-cylinder;
  background-image: linear-gradient(
    to left,
    rgba(105, 221, 233, 1) 0%,
    rgba(12, 142, 189, 1) 100%
  );
  .inside-top {
    @extend %inside-cylinder-top;
    background-image: linear-gradient(
      to bottom,
      rgba(4, 143, 194, 1) 0%,
      rgba(85, 237, 253, 1) 100%
    );
  }
  .inside-bottom {
    @extend %inside-cylinder-bottom;
    background-image: linear-gradient(
      to left,
      rgba(105, 221, 233, 1) 0%,
      rgba(12, 142, 189, 1) 100%
    );
  }
}
</style>
