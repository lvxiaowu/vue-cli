export default {
  $setCount(state, d) {
    d.time = new Date().getTime();
    sessionStorage.setItem('vueCli-count', JSON.stringify(d || {}));
    state.count = d;
  },

  $setLocation(state, d) {
    let { latitude, longitude } = d;
    sessionStorage.setItem(
      'locationInfo',
      JSON.stringify(
        {
          latitude,
          longitude
        } || {}
      )
    );
    state.location.latitude = latitude;
    state.location.longitude = longitude;
  },

  //翻页效果
  $setDirection(state, d) {
    if (!d) {
      return;
    }
    state.direction = d.direction;
  }
};
