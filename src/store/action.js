export default {
  async $A_setCount({ commit, state }, d) {
    let data = state.count;
    d.time = new Date().getTime();
    commit('$setCount', Object.assign({}, data, d));
  },
  $A_setLocation({ commit, state }) {
    return new Promise((resolve, reject) => {
      if (state.location.latitude && state.location.longitude) {
        resolve(state.location);
        return;
      }
      if (window.navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          function(p) {
            let locations = p.coords || {};
            commit('$setLocation', locations);
            resolve(locations);
          },
          e => {
            reject(e);
          }
        );
      } else {
        reject('不支持定位');
      }
    });
  }
};
