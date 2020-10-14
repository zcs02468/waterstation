<!--  -->
<template>
    <div class="box" ref="container">
        <div class="water">
            <div
                class="right-inside-cylinder"
                :style="{ height: `${(num / 5) * 100}%` }"
            >
                <div class="inside-top"></div>
                <div class="info" :class="textType">{{num}}m</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "canvas-container",

    props: {
        textType: {
            type: String,
            default: "default",
        },
        num: {
          type: [String, Number],
          default: 0
        }
    },
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
    width: 104px;
    height: 98px;
    border: 3px solid rgba(255, 255, 255, 0.15);
    border-top: none;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    .water {
        width: 87px;
        height: 90px;
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

    // background: linear-gradient(280deg, #0441C2 0%, #549DFE 100%);
    background-image: linear-gradient(to left, #0441c2 0%, #549dfe 100%);
    .inside-top {
        @extend %inside-cylinder-top;
        background-image: linear-gradient(to bottom, #0441c2 0%, #549dfe 100%);
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
