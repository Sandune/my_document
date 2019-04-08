
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
    mu-circular-progress.move-size(v-show="loadingVal != 0" mode="determinate" color="warning" :value="loadingVal" :max="loadingMax" :stroke-width="2" :size="60")
    mu-circular-progress.move-size(v-show="playVal != 0" mode="determinate" :value="playVal" :max="playMax" :stroke-width="2" :size="60")
    .move-body(ref="moveBody")
      slot.icon
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from 'vue-property-decorator';
import browser from '@/utils/browser';

@Component
export default class MoveBtn extends Vue {
  @Prop() private msg!: string;
  @Prop({default: 100}) private loadingMax!: number;
  @Prop({default: 0}) private loadingVal!: number;
  @Prop({default: 100}) private playMax!: number;
  @Prop({default: 0}) private playVal!: number;

  // 初始化按钮位置
  private left = 10;
  private top = window.innerHeight - 70;

  // 初始屏幕状态
  private screenStatus = '';
  private timer: any = null;

  @Emit('replayEvent')
    private replayEvent() {}

  private windowResize() {
    const screenDirection = window.matchMedia('(orientation: portrait)');

    const setSize = (height) => {
      this.left = 10;
      this.top = height - 70;
    };


    const handleOrientationChange = (screenDirectionVal: any) => {

      if (this.timer) {
        clearTimeout(this.timer);
      }

      if (screenDirectionVal.matches) {
        /* The device is currently in portrait orientation */
        /* 竖屏处理事件 */
        // console.log(document.documentElement.clientHeight,'竖屏')

        this.timer = setTimeout(() => {
          setSize(window.innerHeight);
        }, 200);
      } else {
        // console.log(document.documentElement.clientHeight,'横屏')
        this.timer = setTimeout(() => {
          setSize(window.innerHeight);
        }, 200);

        /* The device is currently in landscape orientation */
        /* 横屏屏处理事件 */
      }
    };

    screenDirection.addListener(handleOrientationChange);

    handleOrientationChange(screenDirection);
  }

  private isPC(div, isClick, body) {
    div.onmousedown = (e: any) => {
        isClick = true;
        e.preventDefault();
        div.style.transition = 'none';
        body.style.opacity = 1;
        // 算出鼠标相对元素的位置
        const disX = e.clientX - div.offsetLeft;
        const disY = e.clientY - div.offsetTop;
        document.onmousemove = (eve: any) => {
            isClick = false;
            // 用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
            this.left = eve.clientX - disX;
            this.top = eve.clientY - disY;
        };
        document.onmouseup = (ev: any) => {
          // 鼠标弹起来的时候不再移动
          document.onmousemove = null;
          // 预防鼠标弹起来后还会循环（即预防鼠标放上去的时候还会移动）
          document.onmouseup = null;
          if (isClick) {
            this.replayEvent();
          }

          div.style.transition = 'all 0.3s';

          const clientWidth = document.documentElement.clientWidth;
          const clientHeight = document.documentElement.clientHeight;

          // 超出边缘回到屏幕内
          if (this.top < 0) {
            this.top = 10;
          } else if (this.top > clientHeight - 70) {
            this.top = clientHeight - 70;
          }

          if (this.left < 0) {
            this.left = 10;
          } else if (this.left > clientWidth - 70) {
            this.left = clientWidth - 70;
          }

          // 计算边缘距离
          const isX = this.left < clientWidth / 2 ? this.left : clientWidth - this.left;
          const isY = this.top < clientHeight / 2 ? this.top : clientHeight - this.top;

          // 判断贴边方向
          if ( Math.abs(isX) > Math.abs(isY) ) {
            if (this.top > clientHeight / 2) {
              this.top = clientHeight - 70;
            } else {
              this.top = 10;
            }
          } else {
            if (this.left > clientWidth / 2) {
              this.left = clientWidth - 70;
            } else {
              this.left = 10;
            }
          }

          body.style.opacity = 0.3;
        };
      };
  }

  private isPhone(div, isClick, body) {
    div.addEventListener('touchstart', (e) => {
        isClick = true;
        e.preventDefault();
        div.style.transition = 'none';
        body.style.opacity = 1;
      });
    div.addEventListener('touchmove', (e) => {
        e.preventDefault();
        // 发生移动则为拖移
        isClick = false;
        if (e.targetTouches.length === 1) {
          const touch = e.targetTouches[0];
          this.left = touch.clientX - 30;
          this.top = touch.clientY - 30;
        }
      });
    div.addEventListener('touchend', (e) => {

        if (isClick) {
          this.replayEvent();
        }

        div.style.transition = 'all 0.3s';

        const clientWidth = document.documentElement.clientWidth;
        const clientHeight = document.documentElement.clientHeight;

        // 超出边缘回到屏幕内
        if (this.top < 0) {
          this.top = 10;
        } else if (this.top > clientHeight - 70) {
          this.top = clientHeight - 70;
        }

        if (this.left < 0) {
          this.left = 10;
        } else if (this.left > clientWidth - 70) {
          this.left = clientWidth - 70;
        }

        // 计算边缘距离
        const isX = this.left < clientWidth / 2 ? this.left : clientWidth - this.left;
        const isY = this.top < clientHeight / 2 ? this.top : clientHeight - this.top;

        // 判断贴边方向
        if ( Math.abs(isX) > Math.abs(isY) ) {
          if (this.top > clientHeight / 2) {
            this.top = clientHeight - 70;
          } else {
            this.top = 10;
          }
        } else {
          if (this.left > clientWidth / 2) {
            this.left = clientWidth - 70;
          } else {
            this.left = 10;
          }
        }

        body.style.opacity = 0.3;

      });
  }

  private mounted() {
    this.windowResize();

    // 判断单击: 默认为单击事件
    const isClick = true;

    const div: any = this.$refs.moveBtn;
    const body: any = this.$refs.moveBody;
    this.isPC(div, isClick, body);
    this.isPhone(div, isClick, body);
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

.move-btn{
  position: absolute;
}

.move-body{
  padding: 10px;
  width: 60px;
  height: 60px;
  border-radius: 60px;
  background-color: white;
  border: 2px solid rgb(201, 198, 198);
  opacity: 0.4;
}

.move-size {
  position: absolute;
  top: 0;
  left: 0;
  transform: translateY(90deg)
}

.icon{
  transition: all 0.7s;
}
</style>


```

### 3.判断设备横竖屏

```typescript
private windowResize() {
  const screenDirection = window.matchMedia('(orientation: portrait)');

  const handleOrientationChange = (screenDirectionVal: any) => {
    if (screenDirectionVal.matches) {
      /* The device is currently in portrait orientation */
      /* 竖屏处理事件 */
    } else {
      /* The device is currently in landscape orientation */
      /* 横屏屏处理事件 */
    }
  };

  screenDirection.addListener(handleOrientationChange);

  handleOrientationChange(screenDirection);
}
```