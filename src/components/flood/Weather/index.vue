<!--  -->
<template>
  <div class="panel left-container-angle">
    <div class="panel-header">
      <Title title="气象信息" />
      <div class="unit">
        <span>当前平均温度：</span
        >{{ parsingNumber(weatherData.temperature.value) }}&#8451;
      </div>
    </div>
    <div class="panel-bodyer">
      <div class="block">
        <div class="icon-box">
          <span class="iconfont iconwendu2x"></span>
          <span class="title">温度</span>
        </div>
        <span class="text"
          >{{ parsingNumber(weatherData.temperature.value)
          }}{{ weatherData.temperature.unit }}</span
        >
      </div>
      <div class="block">
        <div class="icon-box">
          <span class="iconfont iconshidu"></span>
          <span class="title">湿度</span>
        </div>
        <span class="text"
          >{{ parsingNumber(weatherData.humidity.value)
          }}{{ weatherData.humidity.unit }}</span
        >
      </div>
      <div class="block">
        <div class="icon-box">
          <span class="iconfont iconfengsu1"></span>
          <span class="title">风速</span>
        </div>
        <span class="text"
          >{{ parsingNumber(weatherData.windspeed.value)
          }}{{ weatherData.windspeed.unit }}</span
        >
      </div>
      <div class="block">
        <div class="icon-box">
          <span class="iconfont iconapp_icons--"></span>
          <span class="title">PM2.5</span>
        </div>
        <span class="text"
          >{{ parsingNumber(weatherData.pm25.value)
          }}{{ weatherData.pm25.unit }}</span
        >
      </div>
      <div class="weather-wrapper">
        <div class="weather-box" v-if="advisories.length > 0">
          <el-carousel
            class="weather-carousel-box"
            direction="vertical"
            :interval="50000"
            indicator-position="none"
          >
            <el-carousel-item
              v-for="(item, index) in advisories"
              :key="`${index}_key`"
            >
              <div class="weather-slider-box">
                <div class="img-box" v-for="ele in item" :key="ele.id">
                  <img :src="ele.image" alt="" />
                </div>
                <!-- <div class="weather-slider-level" style="margin-left:21px">
                  <span>{{ item.warningLevel }}</span>
                </div>
                <div class="weather-slider-info">{{ item.weather }}</div> -->
              </div>
            </el-carousel-item>
          </el-carousel>
        </div>
        <div class="weather-box-info" v-else>
          当前无天气预警信息
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Title from "../../common/Title";
import comMinxins from "../../common/comMinxins";
import { getFloodWeatherInfo } from "../../../axios";
export default {
  name: "WeatherPlus",
  mixins: [comMinxins],
  data() {
    return {
      weatherData: {
        temperature: {
          name: "温度",
          value: 23.10029,
          unit: "℃",
        },
        humidity: {
          name: "湿度",
          value: 95.15361,
          unit: "mg/l",
        },
        windspeed: {
          name: "风速",
          value: 95.15361,
          unit: "m/s",
        },
        pm25: {
          name: "PM2.5",
          value: 95.15361,
          unit: "mg/m³",
        },
      },
      codingList: {
        a01001: "temperature",
        a01002: "humidity",
        a34002: "pm10",
        a34004: "pm25",
        a01007: "windspeed",
        a21026: "sq2",
      },
      advisories: [],
    };
  },

  components: {
    Title,
  },

  created() {
    this.getData();
  },

  methods: {
    parsingNumber(num) {
      return Math.round(Number(num) * 100) / 100;
    },
    updateData() {
      this.getData();
    },
    async getData() {
      let [err, res] = await getFloodWeatherInfo();
      if (err || res.result != "true") return;
      let data = res.data;
      const { advisories, weatherInfos } = data;
      weatherInfos.forEach((item) => {
        let key = this.codingList[item.factorCoding];
        this.weatherData[key].name = item.monitoringFactor;
        this.weatherData[key].value = item.factorValue;
        this.weatherData[key].unit = item.factorUnit;
      });
      if (!advisories && advisories.length == 0) return;
      let arr = this.filterData(advisories);
      this.advisories = arr;
      this.advisories.splice();
    },
    filterData(dataArr, colomns = 4) {
      let allArr = [];
      for (var i = 0, len = dataArr.length; i < len; i += colomns) {
        allArr.push([...dataArr.slice(i, i + colomns)]);
      }
      return allArr;
    },
  },

  computed: {},
};
</script>
<style lang="scss" scoped>
.panel {
  position: relative;
  width: 540px;
  height: 347px;
  margin-top: 20px;
}
.panel-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 15px 0 0 22.5px;
  .unit {
    padding-right: 67px;
    font-size: 15px;
    span {
      color: #68c8ff;
    }
  }
}
.iconfont {
  font-size: 35px;
  vertical-align: middle;
  text-align: center;
}
.text {
  font-size: 14px;
  vertical-align: middle;
}
.panel-bodyer {
  display: flex;
  flex-wrap: wrap;
  .center {
    width: 182px;
    position: relative;
    &::before {
      content: "";
      position: absolute;
      left: 0;
      top: 9px;
      display: inline-block;
      height: 18px;
      width: 1px;
      background: rgba(109, 214, 255, 1);
    }
    &::after {
      content: "";
      position: absolute;
      right: 0;
      top: 9px;
      display: inline-block;
      height: 18px;
      width: 1px;
      background: rgba(109, 214, 255, 1);
    }
  }
  .block {
    height: 102px;
    width: 175px;
    flex: 0 0 50%;
    display: flex;
    align-items: center;
    padding-left: 60px;
  }
  .icon-box {
    display: flex;
    justify-content: center;
    align-content: center;
    flex-direction: column;
    margin-right: 53px;
    min-width: 50px;
    .title {
      margin-top: 15px;
      text-align: center;
    }
  }
}
.weather-wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
}
.weather-slider-box {
  display: flex;
  height: 100%;
  padding: 10px 0;
  justify-content: space-around;
}
.weather-carousel-box {
  height: 100%;
  /deep/ .el-carousel__container {
    height: 80px;
  }
}
.weather-box {
  width: 470px;
  height: 80px;
  // border: 1px solid rgba(87, 189, 255, 0.56);
  padding: 0 10px;
  .img-box {
    width: 98.5px;
    height: 60px;
    background: #2a629a;
    border-radius: 5px;
    // border: 4px solid #2a629a;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .weather-slider-level {
    margin-left: 21px;
    font-size: 18px;
    font-weight: 500;
    color: #f84c28;
    line-height: 25px;
  }
  .weather-slider-info {
    margin-left: 75px;
    flex: 1;
    font-size: 18px;
    font-weight: 400;
    color: #ffffff;
    line-height: 25px;
  }
}
.weather-box-info {
  width: 470px;
  height: 80px;
  // border: 1px solid rgba(87, 189, 255, 0.56);
  padding: 0 10px;
  text-align: center;
  line-height: 80px;
  font-size: 18px;
}
</style>
