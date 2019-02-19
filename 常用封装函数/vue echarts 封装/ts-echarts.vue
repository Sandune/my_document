<template lang="pug">
  .echarts(:id="id" :data="data")
</template>

<script lang="ts">
import { Vue, Component, Watch, Prop } from 'vue-property-decorator';
import EchartsModules from 'echarts';
const $echarts = EchartsModules as any;
@Component
export default class Echarts extends Vue {
  private echarts: any;
  @Prop() private data!: object;
  @Prop() private id!: string;

  @Watch('data', {deep: true})
  private handler(newValue: object, oldValue: object) {
    this.darwLineGraph(this.id, newValue);
  }

  private mounted() {
    this.darwLineGraph(this.id, this.data);
  }

  private darwLineGraph(id: string, data: object) {
    const mychar = document.getElementById(id);
    if (mychar != null) {
      this.echarts = $echarts.init(mychar);
      this.echarts.setOption(data);
      window.addEventListener('resize', () => {
        this.echarts.resize();
      });
    }
  }

  private beforeDestroy() {
    if (this.echarts) {
      this.echarts.clear();
    }
  }

}
</script>

