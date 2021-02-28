<!--  -->
<template>
    <div class="box" :id="myId">
        <span v-html="ruleStyle"></span>
        <div>
          <section class="ruler">
              <div
                  class="line left-line"
                  :style="{ top: `${onePercentage}%`, border: `1px dashed #F6BA16` }"
              >
              </div>
              <div
                  class="line right-line"
                  :style="{ top: `${twoPercentage}%`, border: `1px dashed #FF5E3D`  }"
              >
              </div>
              <section class="cm" v-for="item in count" :key="item">
                  <section class="mm"></section>
                  <section class="mm"></section>
                  <section class="mm"></section>
                  <section class="mm"></section>
              </section>
              <section class="cm"></section>
          </section>
        </div>
    </div>
</template>

<script>
export default {
    name: "rule",
    props:{
        oneH:{
            type: [Number,String],
            default: 1
        },
        twoH:{
            type: [Number,String],
            default: 3
        },
        count:{
            type: [Number,String],
            default: 6
        },
    },
    data() {
        return {
            ruleStyle: "",
            myId: Number(Math.random().toString().substr(3,length) + Date.now()).toString(36)
        };
    },
    computed: {
        onePercentage() {
            return (1 - this.oneH / this.count) * 100;
        },
        twoPercentage() {
            return (1 - this.twoH / this.count) * 100;
        },
    },
    created() {
        this.setStyle();
    },
    methods: {
        setStyle() {
            const count = this.count;
            let str = "";
            let num = count;
            let top = Math.floor((100 / count) * 100) / 100;
            for (let i = 0; i <= count; i++) {
                str += this.getStyle(i + 1, num, i*top);
                num--;
            }
            str+= `
            #${this.myId} .ruler .cm {
                height: ${ 112/this.count }px;
            }
            #${this.myId} .ruler .mm {
                height: ${ 112/this.count }px;
            }
            `
            this.ruleStyle = `<style>${str}</style>`;
        },
        getStyle(index, content, top) {
            return `
          #${this.myId} .ruler .cm:nth-of-type(${index}) {
            top: ${top}%;
          }
          #${this.myId} .ruler .cm:nth-of-type(${index}):before {
            content: "${content}";
          }
      `;
        },
    },
    watch:{
        count() {
            this.setStyle();
        }
    }
};
</script>
<style lang="scss" scoped>
.line {
    position: absolute;
    width: 117px;
    height: 2px;
    border: 1px dashed red;
    z-index: 9;
    left: 16px;
}
.right-line {
    top: 52%;
    .num {
        right: 0;
    }
}
.left-line {
    right: 14px;
    top: 40%;
    .num {
        left: 0;
    }
}
.num {
    min-width: 48px;
    height: 30px;
    background: #1e6aff;
    border-radius: 5px;
    text-align: center;
    line-height: 30px;
    color: #fff;
    font-size: 20px;
    position: absolute;
    bottom: 5px;
    padding: 0 5px;
}
.ruler {
    position: relative;
    height: 112px;
    width: 14px;
    border-left: 2px solid #2565f3;
}
.ruler .cm {
    position: absolute;
    border-top: 2px solid #6da9ff;
    width: 12px;
    left: -7px;
}
.ruler .mm {
    position: absolute;
    border-top: 1px solid #2565f3;
    width: 6px;
    left: 3px;
}
.ruler .cm::before {
    position: absolute;
    top: -25px;
    color: #fff;
    top: -8px;
    left: -30px;
    text-align: center;
    width: 24px;
    font-size: 12px;
}
.ruler .mm {
    width: 6px;
}

.ruler .mm:nth-of-type(1) {
    top: 20%;
}
.ruler .mm:nth-of-type(2) {
    top: 40%;
}
.ruler .mm:nth-of-type(3) {
    top: 60%;
}
.ruler .mm:nth-of-type(4) {
    top: 80%;
}
</style>
