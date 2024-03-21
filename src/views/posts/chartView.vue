<template>
  <!-- <div class="h-screen bg-gray-100">
    <div class="">hamza</div>
  </div> -->

  <div class="px-6 py-8">
    <div class="flex justify-between container mx-8">
      <div class="w-full lg:w-6/12">
        <canvas id="planet-chart"></canvas>
        <!-- <div class="flex items-center justify-between"></div> -->
        <!-- <div class="mt-6">dasd</div> -->
      </div>
      <div class="-mx-8 w-6/12 hidden lg:block">
        <canvas id="planet-chart-comments"></canvas>
      </div>
    </div>
    <div class="flex justify-between container mx-8 mt-10">
      <div class="w-full lg:w-6/12">
        <canvas id="chart-tags"></canvas>
      </div>
      <div class="w-full lg:w-6/12 ml-5">
        <canvas id="chart-time"></canvas>
      </div>
    </div>
  </div>
</template>

<script>
import Chart from "chart.js/auto";
export default {
  data() {
    return {
      postsData: [],
      CommentsData: [],
      tagData: [],
      timeData: [],
      posts: {
        counts: [],
        labels: [],
      },
      comments: {
        counts: [],
        labels: [],
      },
      tags: {
        counts: [],
        labels: [],
      },
      time: {
        counts: [],
        labels: [],
      },
    };
  },
  mounted() {
    this.getPostsData();
    this.getCommentsData();
    this.getTagsData();
    this.getTimeData();
  },
  methods: {
    ///////////////////////// print charts
    myChart1() {
      const ctx = document.getElementById("planet-chart");
      const myChart = new Chart(ctx, {
        type: "bar",
        data: {
          labels: this.posts.labels,
          // labels: ["Red", "Blue", "Yellow"],
          datasets: [
            {
              label: "numer of Posts per user",
              // data: [300, 50, 100],
              data: this.posts.counts,
              backgroundColor: "rgb(54, 162, 235)",
              borderColor: "rgb(54, 162, 235)",
              borderWidth: 1,
            },
          ],
        },

        options: {
          // responsive: true,
          // lineTension: 1,
          scales: {
            y: {
              ticks: {
                beginAtZero: true,
                // padding: 25,
              },
            },
          },
        },
      });
    },
    myChart2() {
      const ctx = document.getElementById("planet-chart-comments");
      const myChart = new Chart(ctx, {
        type: "line",
        data: {
          labels: this.comments.labels,
          // labels: ["Red", "Blue", "Yellow"],
          datasets: [
            {
              label: "numer of comment per post",
              // data: [300, 50, 100],
              data: this.comments.counts,
              backgroundColor: "rgb(49, 230, 140)",
              borderColor: "rgb(54, 162, 235)",
              borderWidth: 1,
            },
          ],
        },

        options: {
          // responsive: true,
          // lineTension: 1,
          scales: {
            y: {
              ticks: {
                beginAtZero: true,
                // padding: 25,
              },
            },
          },
        },
      });
    },
    myChart3() {
      const ctx = document.getElementById("chart-tags");
      const myChart = new Chart(ctx, {
        type: "doughnut",
        data: {
          labels: this.tags.labels,
          // labels: ["Red", "Blue", "Yellow"],
          datasets: [
            {
              label: "numer of post per tag",
              // label: this.tags.labels,
              // data: [300, 50, 100],
              data: this.tags.counts,
              backgroundColor: this.generateColors(this.tags.labels),
              borderColor: "rgb(54, 162, 235)",
              borderWidth: 1,
            },
          ],
        },

        options: {
          // responsive: true,
          // lineTension: 1,
          scales: {
            y: {
              ticks: {
                beginAtZero: true,
                // padding: 25,
              },
            },
          },
        },
      });
    },
    myChart4() {
      const ctx = document.getElementById("chart-time");
      const myChart = new Chart(ctx, {
        type: "line",
        data: {
          labels: this.time.labels,
          datasets: [
            {
              label: "number of posts per month",
              data: this.time.counts,
              backgroundColor: this.generateColors(this.time.labels),
              borderColor: "rgb(54, 162, 235)",
              borderWidth: 1,
            },
          ],
        },

        options: {
          scales: {
            y: {
              ticks: {
                beginAtZero: true,
              },
            },
          },
        },
      });
    },

    //////////////////////// get data

    getCommentsData() {
      fetch("http://127.0.0.1:8000/api/v1/chart/comment", {
        cache: "force-cache",
      })
        .then((res) => res.json())
        .then((res) => {
          this.CommentsData = res;
          console.log(this.CommentsData);
          this.extractCommentsData();
          this.myChart2();
        })
        .catch((err) => console.log(err));
    },
    getPostsData() {
      fetch("http://127.0.0.1:8000/api/v1/chart/post", {
        cache: "force-cache",
      })
        .then((res) => res.json())
        .then((res) => {
          this.postsData = res;
          this.extractPostData();
          this.myChart1();
        })
        .catch((err) => console.log(err));
    },
    getTagsData() {
      fetch("http://127.0.0.1:8000/api/v1/chart/tagTime", {
        cache: "force-cache",
      })
        .then((res) => res.json())
        .then((res) => {
          this.tagData = res;
          console.log(this.tagData);
          this.extractTagsData();
          this.myChart3();
        })
        .catch((err) => console.log(err));
    },
    getTimeData() {
      fetch("http://127.0.0.1:8000/api/v1/chart/Time", {
        cache: "force-cache",
      })
        .then((res) => res.json())
        .then((res) => {
          this.timeData = res;
          console.log(this.timeData);
          this.extractTimeData();
          this.myChart4();
        })
        .catch((err) => console.log(err));
    },
    ///////////////////////////////// extract data
    extractPostData() {
      for (const [user, count] of Object.entries(this.postsData)) {
        this.posts.labels.push(user);
        this.posts.counts.push(count);
      }
    },
    extractCommentsData() {
      for (const [comment, count] of Object.entries(this.CommentsData)) {
        this.comments.labels.push(comment);
        this.comments.counts.push(count);
      }
    },
    extractTagsData() {
      for (const [tag, count] of Object.entries(this.tagData)) {
        this.tags.labels.push(tag);
        this.tags.counts.push(count);
      }
    },
    extractTimeData() {
      for (const [time, count] of Object.entries(this.timeData)) {
        this.time.labels.push(time);
        this.time.counts.push(count);
      }
    },
    generateColors(data) {
      var backgroundColors = [];
      for (var i = 0; i < data.length; i++) {
        var randomColor =
          "rgb(" +
          Math.floor(Math.random() * 256) +
          ", " +
          Math.floor(Math.random() * 256) +
          ", " +
          Math.floor(Math.random() * 256) +
          ")";
        backgroundColors.push(randomColor);
      }
      return backgroundColors;
    },
  },
};
</script>
