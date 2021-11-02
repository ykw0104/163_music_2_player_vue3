/* 仓库的音乐播放器相关的状态 */
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
    // 播放歌曲列表
    playList: [],
    // 顺序歌曲列表, 原始的歌单列表
    sequencePlayList: [],
    // 播放模式(默认顺序播放)
    mode: playMode.sequence,
    // 当前第几首歌, -1: 用户未点击
    currentIndex: -1,
    // 当前歌曲信息
  },
  getters: {
    currentSong(state) {
      if (
        state.currentIndex >= 0 &&
        state.currentIndex < state.sequencePlayList.length
      ) {
        // 选中要播放的歌曲
        return state.sequencePlayList[state.currentIndex];
      } else {
        // 没有选中要播放的歌曲
        return {};
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
  },
  actions: {},
};
