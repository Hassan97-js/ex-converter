// jshint esversion:6

import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    rates: null,
    rateAmount: 0,
    selectedRateOne: "CAD",
    selectedRateTwo: "CAD"
  },
  mutations: {
    setRates(state, allRates) {
      state.rates = allRates;
    },
    setRateAmount(state, rateAmount) {
      state.rateAmount = rateAmount;
    },
    setSelectedRateOne(state, rateOne) {
      state.selectedRateOne = rateOne;
    },
    setSelectedRateTwo(state, rateTwo) {
      state.selectedRateTwo = rateTwo;
    }
  },
  actions: {
    getAllCurrency(context) {
      Vue.axios
        .get("https://api.exchangeratesapi.io/latest")
        .then(response => {
          context.commit("setRates", response.data.rates);
        })
        .catch(err => console.error(err));
    }
  }
});
