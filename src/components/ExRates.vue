<template>
  <b-container class="mt-5">
    <b-alert
      class="dis-none"
      dismissible
      v-if="deferredPrompt"
      show
      variant="success"
    >
      The event is ready you can go ahead and download the PWA 🙂
    </b-alert>
    <b-alert class="dis-none" v-else show variant="info mb-4">
      Awaiting BeforeInstallPrompt event to Fire. It would not take so long 🙂.
      If the event <strong>didn't fire click</strong> anywhere inside the
      <strong>viewport</strong> and it will fire.
    </b-alert>
    <b-button
      class="bg-primary btn btn-outline-primary text-white dis-none"
      @click="triggerInstall"
      >Install</b-button
    >
    <main v-if="rates">
      <h1 class="my-5 display-4 font-weight-bold">
        Currency
        <span id="highlighted">Converter</span>
      </h1>
      <!-- Comment -->
      <b-form-row>
        <b-col cols="12" lg>
          <label class="d-block text-left" for="amount">Amount</label>
          <b-form-input
            v-model="rateAmount"
            type="number"
            id="amount"
            class="mb-2 mr-sm-2 mb-sm-0"
          ></b-form-input>
        </b-col>

        <b-col cols="12" lg>
          <label
            class="d-block text-left mt-2 mt-lg-0"
            for="select-first-currency"
            >{{ inputLable }}</label
          >
          <b-form-select
            v-model="rateOne"
            :options="ratesKeys"
            id="select-first-currency"
          ></b-form-select>
        </b-col>

        <img
          class="imageIcon d-none d-lg-block"
          src="../assets/exIcon.svg"
          alt="Arrow icon"
        />

        <b-col cols="12" lg>
          <label
            class="d-block text-left mt-2 mt-lg-0"
            for="select-second-currency"
            >{{ inputLable }}</label
          >
          <b-form-select
            v-model="rateTwo"
            :options="ratesKeys"
            id="select-second-currency"
          ></b-form-select>
        </b-col>
      </b-form-row>

      <b-row class="flex_row">
        <b-col lg="4">
          <b-button
            @click="exchangeCurrency"
            class="main-button mt-5"
            squared
            variant="primary"
            size="lg"
            >Convert
          </b-button>
        </b-col>
      </b-row>

      <div class="mt-4">
        <p class="rateOne">
          {{ rateTitle }} One:
          <strong>{{ rateOne }}</strong>
        </p>
        <p class="rateTwo">
          {{ rateTitle }} Two:
          <strong>{{ rateTwo }}</strong>
        </p>
      </div>

      <b-row class="my-5 rounded set-border">
        <b-col
          class="col-lg-3 bg-white text-primary font-weight-bold p-3"
          v-for="rate in ratesKeys"
          :key="rate"
          >{{ rate }}</b-col
        >
      </b-row>

      <section class="row" id="rateResult">
        <h2 class="w-100 font-weight-bold display-4">Rate Result:</h2>
        <p
          class="font-weight-bold display-4 w-100 mt-2 mx-auto text-primary col-md-6"
        >
          {{ exchangeRateResult }}
        </p>
      </section>
    </main>

    <div v-else>
      <span class="font-weight-bold h3 text-primary">Loading </span>
      <b-spinner label="Loading..."></b-spinner>
    </div>
  </b-container>
</template>

<script>
export default {
  name: "ExRates",
  created() {
    this.$store.dispatch("getAllCurrency");
  },
  mounted() {
    this.saveBeforeInstallPormpt();
  },
  data() {
    return {
      exchangeRateResult: null,
      deferredPrompt: null
    };
  },
  props: {
    inputLable: String,
    rateTitle: String,
    hundred: Number
  },
  computed: {
    rates: {
      get() {
        return this.$store.state.rates;
      },
      set(rates) {
        this.$store.commit("setRates", rates);
      }
    },
    rateAmount: {
      get() {
        return this.$store.state.rateAmount;
      },
      set(rateAmount) {
        this.$store.commit("setRateAmount", rateAmount);
      }
    },
    rateOne: {
      get() {
        return this.$store.state.selectedRateOne;
      },
      set(rateOne) {
        this.$store.commit("setSelectedRateOne", rateOne);
      }
    },
    rateTwo: {
      get() {
        return this.$store.state.selectedRateTwo;
      },
      set(rateTwo) {
        this.$store.commit("setSelectedRateTwo", rateTwo);
      }
    },
    ratesKeys() {
      return Object.keys(this.rates);
    },
    allRatesValues() {
      return this.rates;
    }
  },
  methods: {
    exchangeCurrency() {
      const rateOne = this.rateOne;
      const rateTwo = this.rateTwo;
      const hundred = this.hundred;
      this.axios
        .get(
          `https://api.exchangeratesapi.io/latest?base=${rateOne}&symbols=${rateTwo}`
        )
        .then(response => {
          const resRateObj = response.data.rates;
          const firstKeyValue = resRateObj[Object.keys(resRateObj)[0]];
          const rateExResult = firstKeyValue * this.rateAmount;
          const roundedExResult = Math.round(rateExResult * hundred) / hundred;
          this.exchangeRateResult = roundedExResult;
          this.$emit("ex-rates-info", {
            amount: this.rateAmount,
            from: this.rateOne,
            to: this.rateTwo,
            result: this.exchangeRateResult
          });
        })
        .catch(err => {
          console.error(err);
        });
    },
    saveBeforeInstallPormpt() {
      window.addEventListener("beforeinstallprompt", e => {
        console.log("Event fired!");
        // Prevent the mini-infobar from appearing on mobile
        e.preventDefault();
        // Save the event so it can be triggered later.
        this.deferredPrompt = e;
      });
    },
    triggerInstall() {
      if (this.deferredPrompt) {
        console.log("Event is triggerd!");
        this.deferredPrompt.prompt();
        this.deferredPrompt.userChoice.then(choiceResult => {
          if (choiceResult.outcome === "accepted") {
            this.$swal("You accepted the install prompt");
          } else {
            this.$swal("You dismissed the install prompt");
          }
          // Detect when the PWA was successfully installed
          window.addEventListener("appinstalled", () => {
            console.log("INTALL: Success");
          });
        });
      }
    }
  }
};
</script>

<style scoped lang="scss">
@import "../scss/_variables.scss";

main {
  span#highlighted {
    color: $Red;
  }
  .flex_row {
    display: flex;
    justify-content: center;
    align-items: center;
    .main-button {
      padding: 0.5rem 2rem;
    }
  }
  .imageIcon {
    margin-top: 1.9rem;
  }
  .set-border {
    border: 4px solid $Red;
  }
}

@media all and (display-mode: standalone) {
  .dis-none {
    display: none;
  }
}
</style>
