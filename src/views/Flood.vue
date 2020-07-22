<template>
    <div class="home-container">
        <div class="wrap" ref="editor">
            <Header />
            <div class="main-box">
                <div class="colum">

                </div>
                <div class="colum center">

                </div>
                <div class="colum">

                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Header from "../components/home/Header";

export default {
    name: "Home",
    components: {
        Header
    },
    data() {
        return {};
    },
    computed: {},
    created() {},
    mounted() {},
    methods: {},
};
</script>

<style lang="scss" scoped>
.main-box {
    min-width: 1920px;
    padding: 0 20px;
    display: flex;
    .column {
        flex: 3;
    }
    .center {
        margin: 60px 20px 0 20px;
    }
}
</style>
