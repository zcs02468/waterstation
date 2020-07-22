<!--  -->
<template>
    <div class="panel left-container-angle">
        <div class="panel-header">
            <Title title="河道及水池水位" />
        </div>
    </div>
</template>

<script>
import Title from "../../common/Title";
export default {
    name: "WaterLevel",
    data() {
        return {};
    },

    components: {
        Title,
    },

    methods: {},

    computed: {},
};
</script>
<style lang="scss" scoped>
.panel {
    width: 540px;
    height: 607px;
    position: relative;
}
</style>
