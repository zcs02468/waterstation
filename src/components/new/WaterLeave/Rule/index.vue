<!--  -->
<template>
    <div class="box">
        <span v-html="ruleStyle"></span>
        <div>
          <section class="ruler">
              <div
                  class="line left-line"
                  :style="{ top: `${onePercentage}%` }"
              >
              </div>
              <div
                  class="line right-line"
                  :style="{ top: `${twoPercentage}%` }"
              >
              </div>
              <section class="cm">
                  <section class="mm"></section>
                  <section class="mm"></section>
                  <section class="mm"></section>
                  <section class="mm"></section>
              </section>
              <section class="cm">
                  <section class="mm"></section>
                  <section class="mm"></section>
                  <section class="mm"></section>
                  <section class="mm"></section>
              </section>
              <section class="cm">
                  <section class="mm"></section>
                  <section class="mm"></section>
                  <section class="mm"></section>
                  <section class="mm"></section>
              </section>
              <section class="cm">
                  <section class="mm"></section>
                  <section class="mm"></section>
                  <section class="mm"></section>
                  <section class="mm"></section>
              </section>
              <section class="cm">
                  <section class="mm"></section>
                  <section class="mm"></section>
                  <section class="mm"></section>
                  <section class="mm"></section>
              </section>
              <section class="cm">
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
    data() {
        return {
            ruleStyle: "",
            oneH: 2.5,
            twoH: 5.6
        };
    },
    computed: {
        onePercentage() {
            return (1 - this.oneH / 6) * 100;
        },
        twoPercentage() {
            return (1 - this.twoH / 6) * 100;
        },
    },
    created() {
        this.setStyle();
    },
    methods: {
        setStyle() {
            const count = 6;
            let str = "";
            let num = count;
            let top = Math.floor((100 / count) * 100) / 100;
            for (let i = 0; i <= count; i++) {
                str += this.getStyle(i + 1, num, i*top);
                num--;
            }
            this.ruleStyle = `<style>${str}</style>`;
        },
        getStyle(index, content, top) {
            return `
          .ruler .cm:nth-of-type(${index}) {
            top: ${top}%;
          }
          .ruler .cm:nth-of-type(${index}):before {
            content: "${content}";
          }
      `;
        },
    },
};
</script>
<style lang="scss" scoped>
.line {
    position: absolute;
    width: 93.5px;
    height: 2px;
    // background: #1e6aff;
    border: 1px dashed red;
    z-index: -1;
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
    // height: 225px;
    height: 114px;
    width: 14px;
    border-left: 2px solid #2565f3;
}
.ruler .cm {
    position: absolute;
    border-top: 2px solid #6da9ff;
    // height: 45px;
    height: 19px;
    width: 12px;
    left: -7px;
}
.ruler .mm {
    position: absolute;
    border-top: 1px solid #2565f3;
    // height: 50px;
    height: 52px;
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
// .ruler .cm:nth-of-type(1) {
//     top: 0%;
// }
// .ruler .cm:nth-of-type(1):before {
//     content: "6";
// }
// .ruler .cm:nth-of-type(2) {
//   top: 16.67%;
// }
// .ruler .cm:nth-of-type(2):before {
//     content: "5";
// }
// .ruler .cm:nth-of-type(3) {
//     top: 33.34%;
// }
// .ruler .cm:nth-of-type(3):before {
//     content: "4";
// }
// .ruler .cm:nth-of-type(4) {
//     top: 50.01%;
// }
// .ruler .cm:nth-of-type(4):before {
//     content: "3";
// }
// .ruler .cm:nth-of-type(5) {
//     top: 66.68%;
// }
// .ruler .cm:nth-of-type(5):before {
//     content: "2";
// }
// .ruler .cm:nth-of-type(6) {
//     top: 83.35%;
// }
// .ruler .cm:nth-of-type(6):before {
//     content: "1";
// }
// .ruler .cm:nth-of-type(7) {
//     top: 100%;
// }
// .ruler .cm:nth-of-type(7):before {
//     content: "0";
// }

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
