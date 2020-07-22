<template>
    <div class="panel left-container-angle">
        <div class="angle-box"></div>
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
        <div>{{time}}</div>
    </div>
</template>

<script>
export default {
    name: "Time",
    data() {
        return {
            time:''
        };
    },

    created(){
        // setTimeout(this.showLeftTime, 1000 * 60)
        console.log('111111111',this.showLeftTime());
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
            this.time = `${year}-${month}-${day}  ${hours}:${minutes} ${d[dd]} `
            //document.all.show.innerHTML=" 系统管理部门     超级管理员   "+year+"年"+month+"月"+day+"日 "+d[dd+1]+"";
            // document.all.show.innerHTML = "${loginUser.username}   " + year + "——" + month + "——" + day + "日 " + d[dd + 1] + "";
            //一分刷新一次显示时间
            var timeID = setTimeout(this.showLeftTime, 1000 * 60);
            // return time
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
}
.left-container-angle:after {
    display: none !important;
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
        height: 16px;
        background: #478df7;
        transform: skewX(20deg);
        margin-right: 3px;
    }
    .block.first {
        width: 95px;
    }
}
</style>
