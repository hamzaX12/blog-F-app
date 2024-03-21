<template>
  <div id="app" class="font-roboto bg-gray-100">
    <navbar></navbar>
  </div>
  <router-view></router-view>
</template>

<script>
import Navbar from "@/components/navigation-navbar-simple.vue";
import axios from "axios";

export default {
  name: "app",
  components: {
    Navbar,
  },

  data() {
    return {
      posts: [],
      // user: null,
    };
  },
  mounted() {
    this.getposts();
    // this.getUserData();
  },
  methods: {
    getposts() {
      axios
        .get("http://127.0.0.1:8000/api/v1/posts")
        .then((res) => {
          this.posts = res.data.post;
          console.log(res.data.post);
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>

<style>
@import "assets/css/app.css";

::-webkit-scrollbar {
  width: 5px;
}

::-webkit-scrollbar-track {
  background: #2d3748;
}

::-webkit-scrollbar-thumb {
  background: #cbd5e0;
}

::-webkit-scrollbar-thumb:hover {
  background: #2d3748;
}
</style>
