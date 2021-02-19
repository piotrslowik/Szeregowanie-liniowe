<script>
import { HorizontalBar } from 'vue-chartjs'

export default {
  extends: HorizontalBar,
  data: () => ({
    options: {
      responsive: true,
      maintainAspectRatio: false,
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
      scales: {
        xAxes: [{
          ticks: {
            suggestedMin: 0,
            suggestedMax: 1,
            fontColor: '#999',
          },
          gridLines: {
            color: 'rgba(128, 128, 128, 0.2)',
          },
        }],
        yAxes: [{
          ticks: {
            fontColor: '#999',
          },
          gridLines: {
            color: 'rgba(128, 128, 128, 0.4)',
          },
        }],
      },
    },
  }),
  computed: {
    isDark() {
      return this.$vuetify.theme.dark;
    },
    data() {
      return this.$store.getters.chartData;
    },
    labels() {
      return this.$store.getters.chartLabels;
    },
    chartdata() {
      return {
        labels: this.labels,
        datasets: [
          {
            label: 'Syntetyczny Miernik Rozwoju',
            backgroundColor: 'rgba(61, 90, 244, 0.8)',
            borderColor: 'rgb(61, 90, 254)',
            borderWidth: 1,
            data: this.data,
          },
        ]
      };
    },
  },
  mounted() {
    this.renderChart(this.chartdata, this.options);
  },
  watch: {
    data() {
      this.renderChart(this.chartdata, this.options);
    },
  },
};
</script>
