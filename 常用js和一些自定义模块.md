
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
    mu-circular-progress.move-size.move-btn-height(v-show="loadingVal != 0" mode="determinate" color="warning" :value="loadingVal" :max="loadingMax" :stroke-width="2" :size="btnHeight")
    mu-circular-progress.move-size.move-btn-height(v-show="playVal != 0" mode="determinate" :value="playVal" :max="playMax" :stroke-width="2" :size="btnHeight")
    .move-body.move-btn-height(ref="moveBody")
      slot.icon
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit, Watch } from 'vue-property-decorator';
import browser from '@/utils/browser';
import { ScreenModule } from '@/store/modules/screen';

@Component
export default class MoveBtn extends Vue {
  @Prop() private msg!: string;
  @Prop({default: 100}) private loadingMax!: number;
  @Prop({default: 0}) private loadingVal!: number;
  @Prop({default: 100}) private playMax!: number;
  @Prop({default: 0}) private playVal!: number;

  // 初始化按钮位置
  private btnHeight = 60;
  private bottomH = this.btnHeight + 10;
  private left = 10;
  private top = window.innerHeight + this.bottomH;

  // 初始屏幕状态
  private screenStatus = '';
  private timer: any = null;

  @Emit('replayEvent')
    private replayEvent() {}

  get deviceState() {
    return ScreenModule.deviceState;
  }

  @Watch('deviceState')
  private windowResize() {
    this.btnHeight = (this.$refs.moveBtn as any).clientHeight;
    this.bottomH = this.btnHeight + 10;
    const setSize = (height) => {
      this.left = 10;
      this.top = height - this.bottomH;
    };

    if (this.timer) {
      clearTimeout(this.timer);
    }

    if (this.deviceState) {
      this.timer = setTimeout(() => {
          setSize(window.innerHeight);
        }, 200);
    } else {
      this.timer = setTimeout(() => {
          setSize(window.innerHeight);
        }, 200);
    }

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
          } else if (this.top > clientHeight - this.bottomH) {
            this.top = clientHeight - this.bottomH;
          }

          if (this.left < 0) {
            this.left = 10;
          } else if (this.left > clientWidth - this.bottomH) {
            this.left = clientWidth - this.bottomH;
          }

          // 计算边缘距离
          const isX = this.left < clientWidth / 2 ? this.left : clientWidth - this.left;
          const isY = this.top < clientHeight / 2 ? this.top : clientHeight - this.top;

          // 判断贴边方向
          if ( Math.abs(isX) > Math.abs(isY) ) {
            if (this.top > clientHeight / 2) {
              this.top = clientHeight - this.bottomH;
            } else {
              this.top = 10;
            }
          } else {
            if (this.left > clientWidth / 2) {
              this.left = clientWidth - this.bottomH;
            } else {
              this.left = 10;
            }
          }

          body.style.opacity = 0.3;
        };
      };
  }

  private isPhone(div, isClick, body) {
    const pos = {
      x: 0,
      y: 0,
    };
    div.addEventListener('touchstart', (e) => {
        pos.x = Math.round(e.changedTouches[0].pageX);
        pos.y = Math.round(e.changedTouches[0].pageY);
        isClick = true;
        div.style.transition = 'none';
        body.style.opacity = 1;
        e.preventDefault();
      });
    div.addEventListener('touchmove', (e) => {
        const nowPos = {
            x: Math.round(e.changedTouches[0].pageX),
            y: Math.round(e.changedTouches[0].pageY),
        };
        if (nowPos.x === pos.x && nowPos.y === pos.y) {
            return; // 直接返回掉
        }
        if (e.targetTouches.length === 1) {
          // 发生移动则为拖移
          isClick = false;
          const touch = e.targetTouches[0];
          this.left = touch.clientX - 30;
          this.top = touch.clientY - 30;
        }
        e.preventDefault();
      });
    div.addEventListener('touchend', (e) => {
        e.preventDefault();
        if (isClick) {
          this.replayEvent();
        }

        div.style.transition = 'all 0.3s';

        const clientWidth = document.documentElement.clientWidth;
        const clientHeight = document.documentElement.clientHeight;

        // 超出边缘回到屏幕内
        if (this.top < 0) {
          this.top = 10;
        } else if (this.top > clientHeight - this.bottomH) {
          this.top = clientHeight - this.bottomH;
        }

        if (this.left < 0) {
          this.left = 10;
        } else if (this.left > clientWidth - this.bottomH) {
          this.left = clientWidth - this.bottomH;
        }

        // 计算边缘距离
        const isX = this.left < clientWidth / 2 ? this.left : clientWidth - this.left;
        const isY = this.top < clientHeight / 2 ? this.top : clientHeight - this.top;

        // 判断贴边方向
        if ( Math.abs(isX) > Math.abs(isY) ) {
          if (this.top > clientHeight / 2) {
            this.top = clientHeight - this.bottomH;
          } else {
            this.top = 10;
          }
        } else {
          if (this.left > clientWidth / 2) {
            this.left = clientWidth - this.bottomH;
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
    if (browser.pc) {
      this.isPC(div, isClick, body);
    } else {
      this.isPhone(div, isClick, body);
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

.move-btn{
  position: absolute;
}

.move-body{
  padding: calc((100% - 40px)/2);
  border-radius: 100%;
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

.move-btn-height{
  width: 8vw;
  height: 8vw;
  min-width: 60px;
  min-height: 60px;
  max-width: 90px;
  max-height: 90px;
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

### 4. vue全局监听并触发点击音效（给点击的标签添加 字段 和 音频类型）

```ts
Vue.prototype.clickButtonSound = (soundType) => {
  const buttonAudio = document.getElementById(soundType) as HTMLAudioElement;
  buttonAudio.setAttribute('src', sound[soundType]);
  buttonAudio.muted = false;
  buttonAudio.play();
};


document.body.addEventListener('touch', (e) => {
  const event = e || window.event;
  const target: any = event.target || event.srcElement;
  const soundType = target.getAttribute('soundType');
  const clickMusic = target.getAttribute('clickMusic');
  if (clickMusic === 'true') { Vue.prototype.clickButtonSound(soundType); } else { return false; }
});
document.body.addEventListener('click', (e) => {
  const event = e || window.event;
  const target: any = event.target || event.srcElement;
  const soundType = target.getAttribute('soundType');
  const clickMusic = target.getAttribute('clickMusic');
  if (clickMusic === 'true') { Vue.prototype.clickButtonSound(soundType); } else { return false; }
});
```
