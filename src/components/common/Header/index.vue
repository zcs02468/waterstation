<!--  -->
<template>
    <div class="header-box" @click="goToPage" :class="{ cursorPoninter: isHref() }">
        <div class="header-back">{{title}}</div>
    </div>
</template>

<script>
export default {
    name: "Header",

    props: {
        title: {
            type: String,
            default: "",
        },
    },

    data() {
        return {};
    },

    methods: {
        goToPage() {
            if (!this.isHref()) return;
            if( this.$route.name == 'Flood' ){
                // this.$router.push({name: 'Normal'});
                window.location.href = '/water/normal'
            }
            if( this.$route.name == 'Normal' ){
                // this.$router.push({name: 'Flood'});
                window.location.href = '/water/flood'
            }
        },
        isHref() {
            if (this.$route.name == "Flood" || this.$route.name == "Normal") {
                return true;
            }else {
                return false;
            }
        }
    },
};
</script>
<style lang="scss" scoped>
.cursorPoninter {
    cursor: pointer;
}
.header-box {
    height: 60px;
    margin: 0 20px;
    position: relative;
    .header-back {
        position: absolute;
        top: 30px;
        left: 0;
        height: 70px;
        width: 100%;
        background: url("../../../assets/image/title.jpg");
        background-size: 100% 100%;
        color: #fff;
        font-size: 35px;
        line-height: 70px;
        text-align: center;
    }
}
</style>
