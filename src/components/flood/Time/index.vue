<template>
    <div class="panel left-container-angle">
        <div class="angle-box"></div>
        <div class="content">
            <div class="icon-box">
                <span class="icon">
                    <span class="block first"></span>
                    <span class="block"></span>
                    <span class="block"></span>
                    <span class="block"></span>
                    <span class="block"></span>
                    <span class="block"></span>
                    <span class="block"></span>
                </span>
            </div>
            <div class="text">{{ time }}</div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Time",
    data() {
        return {
            time: "",
        };
    },

    created() {
        // setTimeout(this.showLeftTime, 1000 * 60)
        this.showLeftTime();
    },

    components: {},

    methods: {
        showLeftTime() {
            var now = new Date();
            var year = now.getFullYear();
            var month = now.getMonth() + 1;
            var day = now.getDate();
            var hours = now.getHours();
            var minutes = now.getMinutes();
            var seconds = now.getSeconds();
            var dd = now.getDay();
            var d = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
            this.time = `${year}-${month}-${day}  ${hours}:${minutes} ${d[dd]} `;

            // this.date.day = `${year}-${String(month).padStart(2,"0")}-${String(day).padStart(2,"0")}`;
            // this.date.time = `${String(hours).padStart(2,"0")}:${String(minutes).padStart(2,"0")}:${String(seconds).padStart(2,"0")}`;
            // this.date.week = `${d[dd]}`;
            var timeID = setTimeout(this.showLeftTime, 1000 * 60);
        },
    },

    computed: {},
};
</script>
<style lang="scss" scoped>
.panel {
    position: relative;
    width: 600px;
    height: 41px;
    margin-left: 20px;
}
.left-container-angle:after {
    display: none !important;
}

.angle-box {
    width: 50px;
    height: 29px;
    background: rgb(1, 20, 60);
    position: absolute;
    right: -23px;
    top: -4px;
    border-bottom: 2px solid #224c72;
    transform: rotate(54deg);
}
.content {
    display: flex;
    align-items: center;
    height: 100%;
    .text{
        font-size: 16px;
        margin-left: 20px;
    }
}
.icon-box {
    margin: 0px 0 0 25px;
}
.icon {
    display: inline-block;
    margin-right: 7px;
    .block {
        display: inline-block;
        width: 4px;
        height: 14px;
        background: #478df7;
        transform: skewX(20deg);
        margin-right: 3px;
        vertical-align: middle;
    }
    .block.first {
        width: 95px;
    }
}
</style>
