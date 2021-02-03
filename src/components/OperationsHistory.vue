<template>
  <b-container class="operations-history">
    <section v-if="rates">
      <h2 class="my-5 display-4 font-weight-bold">
        <span class="history">History</span> (Last Operations)
      </h2>
      <div>
        <b-table
          class="table-dark pb-5"
          striped
          hover
          :items="allData"
        ></b-table>
      </div>
      <div v-if="isHistoryRates">
        <p
          class="display-5 font-weight-bold bg-primary w-25 mx-auto mb-5 rounded p-2"
        >
          Waiting for the user input...
          <span class="h5">
            <b-icon icon="exclamation-circle-fill" variant="warning"></b-icon>
          </span>
        </p>
      </div>
    </section>
  </b-container>
</template>

<script>
export default {
  name: "OperationsHistory",
  props: {
    allData: Array
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
    isHistoryRates() {
      return this.allData.length === 0;
    }
  }
};
</script>

<style scoped lang="scss">
@import "../scss/_variables.scss";
.operations-history {
  height: 100%;
  padding: 2rem;
  .history {
    color: $Red;
  }
}
</style>
