<!--  -->
<template>
    <div class="box" ref="container">
        <div class="water">
            <div
                class="right-inside-cylinder"
                :style="{ height: `${(num / count) * 100}%`, backgroundImage: getInsideCyinderStyle }"
            >
                <div class="inside-top"
                :style="{ backgroundImage: getInsideTopStyle }"></div>
                <!-- <div class="info" :class="textType">{{num}}m</div> -->
            </div>
        </div>
    </div>
</template>

<script>
    //1
    // background-image: linear-gradient(to left, #0441c2 0%, #549dfe 100%);
    // background-image: linear-gradient(to bottom, #0441c2 0%, #549dfe 100%);
    // 2
    // background-image: linear-gradient(to left, #0497C6 0%, #549dfe 100%);
    // background-image: linear-gradient(to bottom, #4CCCF5 0%, #4CCCF5 100%);
    // 3
    // background-image: linear-gradient(to left, #087A85 0%, #0CA7A1 100%);
    // background-image: linear-gradient(to bottom, #1DA3B0 0%,#1DA3B0 100%);
const InsideCyinderStyle = ['linear-gradient(to left, #0441c2 0%, #549dfe 100%)','linear-gradient(to left, #0497C6 0%, #549dfe 100%)','linear-gradient(to left, #087A85 0%, #0CA7A1 100%)']
const insideTopStyle = ['linear-gradient(to bottom, #0441c2 0%, #549dfe 100%)','linear-gradient(to bottom, #4CCCF5 0%, #4CCCF5 100%)','linear-gradient(to bottom, #1DA3B0 0%,#1DA3B0 100%)']
export default {
    name: "canvas-container",

    props: {
        textType: {
            type: String,
            default: "default",
        },
        num: {
          type: [String, Number],
          default: 2
        },
        count: {
          type: [String, Number],
          default: 2
        },
        type:{
            type: [String,Number],
            default: 1
        }
    },
    computed:{
        getInsideCyinderStyle() {
            return InsideCyinderStyle[this.type]
        },
        getInsideTopStyle() {
            return insideTopStyle[this.type]
        },
    }
};
</script>
<style lang="scss" scoped>
.default {
  color: #7BC7FF;
}
.yellow {
    color: #F6BA16;
}
.orange {
    color: #FF5E3D;
}
.box {
    // width: 104px;
    // height: 98px;
    width: 77px;
    height: 124px;
    border: 3px solid rgba(255, 255, 255, 0.15);
    border-top: none;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    margin-left: 11px;
    .water {
        width: 60px;
        height: 112px;
        // background: red;
        margin-left: 6px;
        position: relative;
    }
}

%inside-cylinder {
    transition: all 1s linear;
    position: absolute;
    width: 100%;
    z-index: 1;
    bottom: 0;
    border-bottom-left-radius: 7px;
    border-bottom-right-radius: 7px;
    max-height: 100%;
}
%inside-cylinder-top {
    position: absolute;
    top: -5px;
    content: "";
    display: block;
    width: 100%;
    height: 10px;
    border-radius: 50%;
    z-index: 2;
}
.right-inside-cylinder {
    @extend %inside-cylinder;

    // background-image: linear-gradient(to left, #0441c2 0%, #549dfe 100%);
    // background-image: linear-gradient(to left, #087A85 0%, #0CA7A1 100%);
    .inside-top {
        @extend %inside-cylinder-top;
        // background-image: linear-gradient(to bottom, #0441c2 0%, #549dfe 100%);
        // background-image: linear-gradient(to bottom, #1DA3B0 0%,#1DA3B0 100%);
    }
    .info {
        position: absolute;
        width: 100%;
        top: -20px;
        z-index: 10;
        font-size: 14px;
        text-align: center;
    }
}
</style>
