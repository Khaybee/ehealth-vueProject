<template>
    <div ref="chart"></div>
  </template>
  
  <script>
  import Highcharts from 'highcharts';
  import { initializeApp } from "firebase/app";
  import 'firebase/database';
  
  export default {
    data() {
      return {
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
        ageRangeData: {
        '20-29': 0,
        '30-39': 0,
        '40-49': 0,
        '50-59': 0,
        '60-69': 0,
        '70-79': 0,
        '80-89': 0,
        '90-99': 0
        }
      };
    },
    mounted() {
      this.fetchData(); // Call function to fetch data from Firebase
    },
    methods: {
      fetchData() {
        // Initialize Firebase
        const isOnline = navigator.onLine;

        if (isOnline) {
            const firebaseConfig = {
            apiKey: "AIzaSyAMXoBdp7gpo6Q3zUqN8VwxZGPY0jLTC58",
            authDomain: "sample-data-3d140.firebaseapp.com",
            databaseURL: "https://sample-data-3d140-default-rtdb.firebaseio.com",
            projectId: "sample-data-3d140",
            storageBucket: "sample-data-3d140.appspot.com",
            messagingSenderId: "335304732007",
            appId: "1:335304732007:web:1a21cd6903340c293253c2",
            measurementId: "G-451SQBC91L"
        };
        const app = initializeApp(firebaseConfig);
  
        // const db = app.database();
        const db = firebase.database(app);
        const ref = db.ref('people');
  
        ref.on('value', (snapshot) => {
          const data = snapshot.val();

          // Update data variables
          this.processData(data);

          // Store data in localStorage
          localStorage.setItem('peopleData', JSON.stringify(data));

        });
        } else {
          const storedData = localStorage.getItem('peopleData');
          if (storedData) {
            this.processData(JSON.parse(storedData));
          } else {
            console.log('No data available offline');
          }
        }
    },
    processData(data) {
        // Process the data retrieved from Firebase or localStorage
          for (const personKey in data) {
            const person = data[personKey];
            this.bloodGroupData[person.bloodGroup]++;
  
            const age = person.age;
          if (age >= 20 && age <= 29) {
            this.ageRangeData['20-29']++;
          } else if (age >= 30 && age <= 39) {
            this.ageRangeData['30-39']++;
          } else if (age >= 40 && age <= 49) {
            this.ageRangeData['40-49']++;
          } else if (age >= 50 && age <= 59) {
            this.ageRangeData['50-59']++;
          } else if (age >= 60 && age <= 69) {
            this.ageRangeData['60-69']++;
          } else if (age >= 70 && age <= 79) {
            this.ageRangeData['70-79']++;
          } else if (age >= 80 && age <= 89) {
            this.ageRangeData['80-89']++;
          } else if (age >= 90 && age <= 99) {
            this.ageRangeData['90-99']++;
          }
          }
  
          this.renderChart();

    },
    renderChart() {
        const bloodGroupCategories = Object.keys(this.bloodGroupData);

        Highcharts.chart(this.$refs.chart.$el, {
          chart: {
            type: 'column'
          },
          title: {
            text: 'Blood Groups and Age Ranges'
          },
          xAxis: {
            categories: ['Blood Groups', '20-29', '30-39', '40-49', '50-59', '60-69', '70-79', '80-89', '90-99'],
            title: {
              text: 'Categories'
            }
          },
          yAxis: {
            title: {
              text: 'Count'
            }
          },
          series: [{
            name: 'Blood Groups',
            data: bloodGroupCategories.map(group => this.bloodGroupData[group])
          }, {
            name: '20-29',
            data: [this.ageRangeData['20-29']]
          }, {
            name: '30-39',
            data: [this.ageRangeData['30-39']]
          }, {
            name: '40-49',
            data: [this.ageRangeData['40-49']]
          }, {
            name: '50-59',
            data: [this.ageRangeData['50-59']]
          }, {
            name: '60-69',
            data: [this.ageRangeData['60-69']]
          }, {
            name: '70-79',
            data: [this.ageRangeData['70-79']]
          }, {
            name: '80-89',
            data: [this.ageRangeData['80-89']]
          }, {
            name: '90-99',
            data: [this.ageRangeData['90-99']]
          }
          ]
        });
      }
    }
  };
  </script>
  
  <style>
  /* Add any necessary styles for the chart container */
  </style>
  