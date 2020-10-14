<!--  -->
<template>
    <div class="box">
        <section class="ruler">
            <div
                class="line right-line"
                :style="{ top: `${((standardList[1] / 5) * 100) > 100 ? 100 : ((standardList[1] / 5) * 100)}%`, border: `1px dashed #FF5E3D` }"
            ></div>
            <div
                class="line right-line"
                :style="{ top: `${ ((standardList[2] / 5) * 100) > 100 ? 100 : ((standardList[2] / 5) * 100) }%`, border: `1px dashed #F6BA16` }"
            ></div>
            <section class="cm"></section>
            <section class="cm"></section>
            <section class="cm"></section>
            <section class="cm"></section>
            <section class="cm"></section>
            <section class="cm"></section>
        </section>
    </div>
</template>

<script>
export default {
    name: "rule",
    props:{
        standardList:{
            type: Array,
            default: [1,2,3]
        },
    },
    data() {
        return {};
    },

    components: {},

    methods: {},

    computed: {
        oneH() {
            return this.$store.state.home.waterLevel.oneH;
        },
        twoH() {
            return this.$store.state.home.waterLevel.twoH;
        },
    },
};
</script>
<style lang="scss" scoped>
.box {
  position: relative;
  z-index: 10;
}
.line {
    position: absolute;
    width: 100%;
    // height: 2px;
    border: 1px dashed #ae504c;
    // background: #1e6aff;
    z-index: -1;
}
.right-line {
    // top: 52%;
    .num {
        right: 0;
    }
}
.left-line {
    right: 14px;
    // top: 40%;
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
    height: 90px;
    width: 100%;
    border-left: 2px solid #2565f3;
}
.ruler .cm {
    position: absolute;
    border-top: 2px solid #6da9ff;
    // height: 50px;
    height: 45px;
    width: 12px;
    left: -7px;
}
// .ruler .mm {
//     position: absolute;
//     border-top: 1px solid #2565f3;
//     height: 50px;
//     width: 6px;
//     left: 3px;
// }
.ruler .cm::before {    
    position: absolute;
    top: -25px;
    color: #fff;
    top: -8px;
    left: -10px;
    text-align: center;
    width: 7px;
    font-size: 12px;
}
// .ruler .cm:after {
//     position: absolute;
//     width: 24px;
//     text-align: center;
//     font-size: 12px;
//     color: #fff;
//     top: -8px;
//     left: 20px;
// }
.ruler .mm {
    width: 6px;
}
.ruler .cm:nth-of-type(1) {
    top: 0%;
}
.ruler .cm:nth-of-type(1):before {
    content: "5";
}
// .ruler .cm:nth-of-type(1):after {
//     content: "5";
// }
.ruler .cm:nth-of-type(2) {
    top: 20%;
}
.ruler .cm:nth-of-type(2):before {
    content: "4";
}
// .ruler .cm:nth-of-type(2):after {
//     content: "4";
// }
.ruler .cm:nth-of-type(3) {
    top: 40%;
}
.ruler .cm:nth-of-type(3):before {
    content: "3";
}
// .ruler .cm:nth-of-type(3):after {
//     content: "3";
// }
.ruler .cm:nth-of-type(4) {
    top: 60%;
}
.ruler .cm:nth-of-type(4):before {
    content: "2";
}
// .ruler .cm:nth-of-type(4):after {
//     content: "2";
// }
.ruler .cm:nth-of-type(5) {
    top: 80%;
}
.ruler .cm:nth-of-type(5):before {
    content: "1";
}
// .ruler .cm:nth-of-type(5):after {
//     content: "1";
// }
.ruler .cm:nth-of-type(6) {
    top: 100%;
}
.ruler .cm:nth-of-type(6):before {
    content: "0";
}
// .ruler .cm:nth-of-type(6):after {
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
