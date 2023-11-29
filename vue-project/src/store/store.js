import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // initial state defined here
    peopleData: [], // This will hold the retrieved data from Firebase
  },
  mutations: {
    // Mutations defined to update the state
    SET_PEOPLE_DATA(state, data) {
      state.peopleData = data;
    },
  },
  actions: {
    // Define actions to perform asynchronous operations
    fetchPeopleData({ commit }) {
      // Fetch data from Firebase or API here
      // Use Firebase SDK or Axios for API calls
      // Once data is retrieved, commit mutation to update the state

      firebase
        .database()
        .ref("people")
        .once("value")
        .then((snapshot) => {
          const data = snapshot.val();
          commit("SET_PEOPLE_DATA", data);
        });

      // Axios fetch:
      axios.get("'https://sample-data-3d140-default-rtdb.firebaseio.com/").then((response) => {
        const data = response.data;
        commit("SET_PEOPLE_DATA", data);
      });
    },
  },
  getters: {
    // Define getters to retrieve state properties
    getPeopleData: (state) => state.peopleData,
  },
});
