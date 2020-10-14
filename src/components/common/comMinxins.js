
import {mapState} from "vuex";
export default {
  computed:{
    ...mapState({
        randomNum: state => state.randomNum
    })
  },
  watch:{
      randomNum() {
        this.updateData();
      }
  }
}