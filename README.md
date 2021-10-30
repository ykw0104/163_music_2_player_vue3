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

### 进度条 circle-progress

```
1. 环形进度条只能显示,不能修改进度
2. 条形进度条可以修改进度
3. 使用canvas制作
```
