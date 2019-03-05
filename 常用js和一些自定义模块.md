
### 1. h5判断屏幕旋转

```javascript
var evt = "onorientationchange" in window ? "orientationchange" : "resize";
    window.addEventListener(evt,resize,false);
    function resize(fals) {
      if(window.orientation == 0 || window.orientation == 180) {
          alert("竖屏");
        }else {
          alert("横屏");
      }
    }
    resize(true);

```

### 2. 屏幕拖拽按钮

```typescript
<template lang="pug">
  .move-btn(ref="moveBtn",:style="{'left': left + 'px', 'top': top + 'px'}")
    p asdasd
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class MoveBtn extends Vue {
  @Prop() private msg!: string;

  //初始化按钮位置
  private left = 10;
  private top = document.documentElement.clientHeight - 70;

  private mounted() {
    var evt = "onorientationchange" in window ? "orientationchange" : "resize";
    window.addEventListener(evt,resize,false);
    function resize(fals) {
      if(window.orientation == 0 || window.orientation == 180) {
          alert("竖屏");
        }else {
          alert("横屏");
      }
    }
    resize(true);
    const div: any = this.$refs.moveBtn;
    div.addEventListener("touchstart",()=>{
      div.style.transition = 'none';
      div.style.opacity = 1;
    });
    div.addEventListener("touchmove",(e) =>{
      if(e.targetTouches.length === 1){
        let touch = e.targetTouches[0];
        this.left = touch.clientX -30;
        this.top = touch.clientY - 30;
      }
    })
    div.addEventListener("touchend",(e) =>{
      div.style.transition = 'all 0.3s';

      //超出边缘回到屏幕内
      if(this.top < 0){
        this.top = 10
      }else if(this.top > document.documentElement.clientHeight - 70){
        this.top = document.documentElement.clientHeight - 70;
      }

      if(this.left < 0){
        this.left = 10
      }else if(this.left > document.documentElement.clientWidth - 70){
        this.left = document.documentElement.clientWidth - 70
      }

      //计算边缘距离
      var isX = this.left < document.documentElement.clientWidth/2 ? this.left : document.documentElement.clientWidth - this.left;
      var isY = this.top < document.documentElement.clientHeight/2 ? this.top : document.documentElement.clientHeight - this.top;

      //判断贴边方向
      if( Math.abs(isX) > Math.abs(isY) ){
        if(this.top > document.documentElement.clientHeight/2){
          this.top = document.documentElement.clientHeight - 70;
        }else{
          this.top = 10;
        }
      }else{
        if(this.left > document.documentElement.clientWidth/2){
          this.left = document.documentElement.clientWidth - 70;
        }else{
          this.left = 10;
        }
      }

      div.style.opacity = 0.3;

    })
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.move-btn{
  position: absolute;
  width: 60px;
  height: 60px;
  line-height: 60px;
  background-color: white;
  border-radius: 60px;
  border: 2px solid gray;
  opacity: 0.3;
}
</style>

```