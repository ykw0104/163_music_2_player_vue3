### 歌曲图片的旋转在 App 里设置了动画: @keyframes imgRotate

```
img {
        /* 旋转 */
        animation: imgRotate 10s linear infinite;

        /* 旋转暂停 */
        &.pause {
          animation-play-state: paused;
        }
      }
```

### 环形进度条: circle-progress, 条形进度条: bar-progress

```
1. 环形进度条只能显示,不能修改进度
2. 条形进度条可以修改进度
3. 使用canvas制作
```

### 扩大按钮的接触范围

```
  .icon {
      position: absolute;
      top: 50%;
      left: 0;
      transform: translate(0, -50%);
      display: block;
      width: 12px;
      height: 12px;
      border: 3px solid #fff;
      border-radius: 50%;
      background-color: red;

      &::before {
        content: "";
        position: absolute;
        top: -10px;
        left: -10px;
        right: -10px;
        bottom: -10px;
      }
    }
```
