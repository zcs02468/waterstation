<!--  -->
<template>
    <div class="box">
        <div class="container" ref="container">
            <canvas ref="canvas"></canvas>
            <div class="text" :class="type">{{percentage}}</div>
        </div>
        <div class="btn" :class="type">{{ btnText }}</div>
    </div>
</template>

<script>
import Retina from "./retina";
import Wave from "./wave";
export default {
    name: "Container",

    props: {
        percentage:{
            type:String,
            default: "90%",
        },
        btnText: {
            type: String,
            default: "东区",
        },
        type: {
            type: String,
            default: "east",
        },
    },

    data() {
        return {};
    },

    mounted() {
        this.drawInit();
        window.addEventListener("resize", () => {
            this.wave1 = null;
            this.wave2 = null;
            this.drawInit();
        });
    },

    components: {},

    methods: {
        drawInit() {
            this.canvasWidth = this.$refs.container.offsetWidth;
            this.canvasHeight = this.$refs.container.offsetHeight;
            let fontSize = document.querySelector("html").style.fontSize;
            fontSize = fontSize.substring(0, fontSize.length - 2);
            let num = Math.round((Number(fontSize) / 80) * 100) / 100;
            this.radius = 15 * num;
            setTimeout(() => {
                this.drawStart();
            });
        },
        drawStart() {
            let wave1Color, //前面波浪颜色
                wave2Color; //后面波浪颜色
            if (this.type == "west") {
                wave1Color = "#BFE2AC";
                wave2Color = "#8DAF96";
            } else {
                wave1Color = "#A1D1E7";
                wave2Color = "#77a2bf";
            }
            const canvas = this.$refs.canvas;
            canvas.height = Number(this.canvasHeight);
            canvas.width = Number(this.canvasWidth);
            this.canvas = canvas;
            this.radius = this.canvasWidth / 2;
            // 高清适配
            Retina.run(canvas);
            this.nowRange = 0;
            //水位
            this.rangeValue = 30;
            this.wave1 = new Wave({
                canvasWidth: this.canvasWidth, // 轴长
                canvasHeight: this.canvasHeight, // 轴高
                // waveWidth: 0.055, // 波浪宽度,数越小越宽
                // waveHeight: 4, // 波浪高度,数越大越高
                waveWidth: 0.018, // 波浪宽度,数越小越宽
                waveHeight: 12, // 波浪高度,数越大越高
                // colors: ["#F39C6B", "#A0563B"], // 波浪颜色
                colors: [wave1Color], // 波浪颜色
                xOffset: 0, // 初始偏移
                speed: 0.04, // 速度
            });
            this.wave2 = new Wave({
                canvasWidth: this.canvasWidth, // 轴长
                canvasHeight: this.canvasHeight, // 轴高
                waveWidth: 0.013, // 波浪宽度,数越小越宽
                waveHeight: 6, // 波浪高度,数越大越高
                // colors: ["rgba(243, 156, 107, 0.48)", "rgba(160, 86, 59, 0.48)"], // 波浪颜色
                colors: [wave2Color], // 波浪颜色
                xOffset: 2, // 初始偏移
                speed: 0.02, // 速度
            });
            this.draw();
        },

        draw() {
            // 波浪颜色  前面波浪 A1D1E7   后波浪  77A2BF  字体颜色 BAECFF  大小 22px
            // 西区
            // 波浪颜色  前面波浪 BFE2AC   后波浪  8DAF96  字体颜色 DDFFBA  大小 22px
            const ctx = this.canvas.getContext("2d");
            ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
            if (!this.isDrawContainer) {
                this.fillRoundRect(ctx, this.canvasWidth, this.canvasHeight, this.radius, "rgba(2,33,79,1)");
            }
            // this.drawBackground(ctx);
            if (this.nowRange <= this.rangeValue) {
                this.nowRange += 1;
            }
            if (this.nowRange > this.rangeValue) {
                this.nowRange -= 1;
            }
            this.wave2.update({
                nowRange: this.nowRange,
            });
            this.wave2.draw(ctx);
            this.wave1.update({
                nowRange: this.nowRange,
            });
            this.wave1.draw(ctx);
            window.requestAnimationFrame(this.draw);
        },
        fillRoundRect(ctx, width, height, radius, fillColor) {
            //圆的直径必然要小于矩形的宽高
            if (2 * radius > width || 2 * radius > height) {
                return false;
            }

            ctx.save();
            ctx.translate(0, 0);
            //绘制圆角矩形的各个边
            this.drawRoundRectPath(ctx, width, height, radius);
            ctx.fillStyle = fillColor || "#000"; //若是给定了值就用给定的值否则给予默认值
            ctx.fill();
            ctx.restore();
        },

        drawRoundRectPath(ctx, width, height, radius) {
            ctx.beginPath(0);
            //从右下角顺时针绘制，弧度从0到1/2PI
            ctx.arc(width - radius, height - radius, radius, 0, Math.PI / 2);

            //矩形下边线
            ctx.lineTo(radius, height);

            //左下角圆弧，弧度从1/2PI到PI
            ctx.arc(radius, height - radius, radius, Math.PI / 2, Math.PI);

            //矩形左边线
            ctx.lineTo(0, radius);
            ctx.lineTo(0, 0);
            ctx.lineTo(width, 0);

            ctx.lineTo(width, height - radius);
            ctx.closePath();
            ctx.stroke();

            ctx.clip();
        },
    },

    computed: {},
};
</script>
<style lang="scss" scoped>
.box {
    width: 200px;
    height: 154px;
    margin: 0 20px;
}
.container {
    width: 200px;
    height: 108px;
    background: #02214f;
    border-bottom-left-radius: 15px;
    border-bottom-right-radius: 15px;
    overflow: hidden;
    position: relative;
    .text {
        font-size: 18px;
        position: absolute;
        top: 18px;
        width: 100%;
        text-align: center;
    }
    .east {
        color: #baecff;
    }
    .west {
        color: #ddffba;
    }
}
.btn {
    width: 100%;
    height: 32px;
    font-size: 16px;
    text-align: center;
    margin-top: 12px;
    line-height: 32px;
    &.east {
        border: 1px solid #397BB4;
        color: #baecff;
        background: #142955;
    }
    &.west {
        border: 1px solid #89A88F;
        color: #ddffba;
        background: #2a4053;
    }
}
</style>
