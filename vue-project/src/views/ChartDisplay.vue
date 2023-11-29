<template>
  <div>
    <!-- chart container -->
    <highcharts :options="chartOptions"></highcharts>
    <p>Hello there!</p>
  </div>
</template>

<script>
import HighchartsVue from "highcharts-vue";
// import Highcharts from "highcharts";
import firebase from "firebase/app";
import "firebase/database";

export default {
  components: {
    HighchartsVue,
    
  },
  data() {
    return {
      bloodGroupCategories: ["A", "B", "AB", "O"],

      bloodGroupData: {
        'A+': 0,
        'B+': 0,
        'AB+': 0,
        'O+': 0,
        'A-': 0,
        'B-': 0,
        'AB-': 0,
        'O-': 0
        },
      chartOptions: {
        // Initialize Highcharts options here
        chart: {
          type: "column",
        },
        title: {
          text: "Blood Groups and Age Ranges",
        },
        xAxis: {
          categories: [
            "Blood Groups",
            "20-29",
            "30-39",
            "40-49",
            "50-59",
            "60-69",
            "70-79",
            "80-89",
            "90-99",
          ],
          title: {
            text: "Categories",
          },
        },
        yAxis: {
          title: {
            text: "Count",
          },
        },
        series: [
          {
            name: "Blood Groups",
            data: bloodGroupCategories.map(
              (group) => this.bloodGroupData[group]
            ),
          },
          {
            name: "20-29",
            data: [this.ageRangeData["20-29"]],
          },
          {
            name: "30-39",
            data: [this.ageRangeData["30-39"]],
          },
          {
            name: "40-49",
            data: [this.ageRangeData["40-49"]],
          },
          {
            name: "50-59",
            data: [this.ageRangeData["50-59"]],
          },
          {
            name: "60-69",
            data: [this.ageRangeData["60-69"]],
          },
          {
            name: "70-79",
            data: [this.ageRangeData["70-79"]],
          },
          {
            name: "80-89",
            data: [this.ageRangeData["80-89"]],
          },
          {
            name: "90-99",
            data: [this.ageRangeData["90-99"]],
          },
        ],
      },
    };
  },
  created() {
    // Fetch data from Firebase
    this.fetchData();
  },
  methods: {
    fetchData() {
      const ref = firebase.database().ref("people");

      ref.once("value").then((snapshot) => {
        const data = snapshot.val();
        if (data) {
          const ageRanges = {
            "20-29": 0,
            "30-39": 0,
            "40-49": 0,
            "50-59": 0,
            "60-69": 0,
            "70-79": 0,
            "80-89": 0,
            "90-99": 0,
          };

          // Loop through data to count age ranges
          Object.values(data).forEach((person) => {
            const { age } = person;

            // Categorize ages into ranges
            for (const range in ageRanges) {
              const [min, max] = range.split("-").map(Number);
              if (age >= min && age <= max) {
                ageRanges[range]++;
                break;
              }
            }
          });

          // Prepare data for Highcharts
          const ageRangeSeries = {
            name: "Age Ranges",
            data: Object.values(ageRanges),
          };

          // Add age range series to chart options
          this.chartOptions.series.push(ageRangeSeries);

          // Update the chart with new data
          this.$refs.highcharts.chart.update(this.chartOptions);
        }
      });
    },
  },
};
</script>

<style>
/* Your component-specific styles if needed */
body {
  background-color: #eee;
}
</style>
