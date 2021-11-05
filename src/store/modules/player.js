/* 仓库的音乐播放器相关的状态 */
let mode = 0;

const playMode = {
  sequence: 0, // 顺序播放
  loop: 1, // 单曲循环
  random: 2, // 随机播放
};

export default {
  namespaced: true,

  state: {
    // 是否全屏播放
    fullScreen: false,
    // 当前音乐是否在播放
    playing: false,
    // 顺序歌曲列表, 原始的歌单列表
    sequencePlayList: [],
    // 播放模式(默认顺序播放)
    mode: playMode.sequence,
    // 当前第几首歌, -1: 用户未点击
    currentIndex: -1,
    // 当前歌曲信息
    currentSong: {},
  },
  getters: {
    // 依赖playList和currentIndex
    // currentSong(state, getters) {
    //   if (
    //     state.currentIndex >= 0 &&
    //     state.currentIndex < getters.playList.length
    //   ) {
    //     // 选中要播放的歌曲
    //     return getters.playList[state.currentIndex];
    //   } else {
    //     // 没有选中要播放的歌曲
    //     return {};
    //   }
    // },

    // 播放歌曲列表
    playList(state) {
      // 修改播放列表
      // 1. 顺序播放: 播放列表是原始的歌曲列表
      if (state.mode === 0) {
        return [...state.sequencePlayList];
      }
      // 2. 单曲循环: 播放列表是原始的歌曲列表
      else if (state.mode === 1) {
        return [...state.sequencePlayList];
      }
      // 3. 随机播放: 播放列表是原始歌曲打乱后的列表
      else if (state.mode === 2) {
        const newArr = [...state.sequencePlayList];
        // 打扰歌曲列表
        for (let i = 0; i < newArr.length; i++) {
          const item = newArr[i];
          const randomIndex = Math.floor(Math.random() * (i + 1));
          newArr[i] = newArr[randomIndex];
          newArr[randomIndex] = item;
        }

        return newArr;
      }
    },
  },
  mutations: {
    /* 歌单中的歌曲被点击之后 */
    selectSongByIdex(state, payload) {
      // 设置选中歌曲的下标
      state.currentIndex = payload.index;

      // 歌单列表的原始数据,歌单顺序不被其他事件影响到
      state.sequencePlayList = [...payload.list];

      // 播放音乐
      state.playing = true;
    },

    /* 修改播放状态 */
    setPlaying(state, playingValue) {
      state.playing = playingValue;
    },

    /* 是否全屏播放 */
    setFullScreen(state, isFullScreen) {
      state.fullScreen = isFullScreen;
    },

    /* 改变模仿模式 */
    changePlayMode(state) {
      // 修改播放模式
      mode += 1;
      state.mode = mode % 3;

      // 修改index
      state.currentIndex = state.playList.findIndex((item) => {
        return item.id === state.currentSong.id;
      });
    },
  },
  actions: {},
};
