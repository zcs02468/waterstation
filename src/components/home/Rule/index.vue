<!--  -->
<template>
    <div class="box">
        <section class="ruler">
            <div class="line left-line">
                <div class="num">300</div>
            </div>
            <div class="line right-line">
                <div class="num">240</div>
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
            <section class="cm"></section>
        </section>
    </div>
</template>

<script>
export default {
    name: "rule",
    data() {
        return {};
    },

    components: {},

    methods: {},

    computed: {},
};
</script>
<style lang="scss" scoped>
// .box {
//     position: relative;
//     top: 100px;
//     left: 600px;
//     width: 60px;
//     height: 250px;
// }
.line {
    position: absolute;
    width: 290px;
    height: 2px;
    background: #1E6AFF;
    z-index: -1;
}
.right-line {
    top: 52%;
}
.left-line {
    right: 14px;
    top: 40%;
    .num {
        left: 0;
    }
}
.num {
    width: 48px;
    height: 30px;
    background: #1E6AFF;
    border-radius: 5px;
    text-align: center;
    line-height: 30px;
    color: #fff;
    font-size: 20px;
    position: absolute;
    right: 0;
    bottom: 5px;
}
.ruler {
    position: relative;
    height: 225px;
    width: 14px;
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
.ruler .mm {
    position: absolute;
    border-top: 1px solid #2565f3;
    height: 50px;
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
.ruler .cm:after {
    position: absolute;
    width: 24px;
    text-align: center;
    font-size: 12px;
    color: #fff;
    top: -8px;
    left: 20px;
}
.ruler .mm {
    width: 6px;
}
.ruler .cm:nth-of-type(1) {
    top: 0%;
}
.ruler .cm:nth-of-type(1):before {
    content: "500";
}
.ruler .cm:nth-of-type(1):after {
    content: "500";
}
.ruler .cm:nth-of-type(2) {
    top: 20%;
}
.ruler .cm:nth-of-type(2):before {
    content: "400";
}
.ruler .cm:nth-of-type(2):after {
    content: "400";
}
.ruler .cm:nth-of-type(3) {
    top: 40%;
}
.ruler .cm:nth-of-type(3):before {
    content: "300";
}
.ruler .cm:nth-of-type(3):after {
    content: "300";
}
.ruler .cm:nth-of-type(4) {
    top: 60%;
}
.ruler .cm:nth-of-type(4):before {
    content: "200";
}
.ruler .cm:nth-of-type(4):after {
    content: "200";
}
.ruler .cm:nth-of-type(5) {
    top: 80%;
}
.ruler .cm:nth-of-type(5):before {
    content: "100";
}
.ruler .cm:nth-of-type(5):after {
    content: "100";
}
.ruler .cm:nth-of-type(6) {
    top: 100%;
}
.ruler .cm:nth-of-type(6):before {
    content: "0";
}
.ruler .cm:nth-of-type(6):after {
    content: "0";
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
