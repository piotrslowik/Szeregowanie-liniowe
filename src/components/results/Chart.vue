<script>
import { HorizontalBar } from 'vue-chartjs'

export default {
  extends: HorizontalBar,
  data: () => ({
    options: {
      responsive: true,
      maintainAspectRatio: false,
      legend: { display: false },
      title: {
        display: false,
      },
      scales: {
        xAxes: [{
          stacked: true,
          ticks: {
            suggestedMin: 0,
            suggestedMax: 1,
          },
        }],
        yAxes: [{
          stacked: true,
        }],
      } 
    },
  }),
  computed: {
    data() {
      return this.$store.getters.chartData;
    },
    labels() {
      return this.$store.getters.rows.map(row => row.name);
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
  mounted () {
    this.renderChart(this.chartdata, this.options);
  },
}
</script>
