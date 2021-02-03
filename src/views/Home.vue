<template>
  <div class="home mt-4">
    <ExRates
      :hundred="100"
      rate-title="Selected Rate"
      input-lable="Select Currency"
      @ex-rates-info="onRatesInfo"
    />
    <OperationsHistory :all-data="ratesDataArr" />
  </div>
</template>

<script>
import ExRates from "@/components/ExRates.vue";
import OperationsHistory from "@/components/OperationsHistory.vue";

export default {
  name: "Home",
  data() {
    return {
      ratesDataArr: []
    };
  },
  watch: {
    ratesDataArr(newV) {
      const ratesArr = [];
      ratesArr.push(newV);
    }
  },
  methods: {
    onRatesInfo(allExRatesInfo) {
      this.ratesDataArr.push(allExRatesInfo);
    }
  },
  components: {
    ExRates,
    OperationsHistory
  }
};
</script>
