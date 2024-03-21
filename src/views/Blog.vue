<template>
  <div id="app" class="font-roboto bg-gray-100">
    <div class="px-6 py-8">
      <div class="flex justify-between container mx-auto">
        <div class="w-full lg:w-8/12">
          <div class="flex items-center justify-between">
            <h1
              v-if="user !== null"
              class="text-xl font-bold text-blue-700 md:text-2xl"
            >
              hello, <span>{{ user.name }}</span>
            </h1>
            <h1 v-else class="text-xl font-bold text-gray-700 md:text-2xl"></h1>
            <!-- <post-filter></post-filter> -->
            <button
              @click="creatPost()"
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Create a Post
            </button>
          </div>

          <div v-if="Object.keys(posts).length > 0">
            <div class="mt-6" v-for="post in posts" :key="post.id">
              <post :data="post"></post>
            </div>
          </div>
          <div v-else>
            <div class="mt-6 p-4 bg-white rounded shadow">
              <div class="animate-pulse flex space-x-4">
                <div class="rounded-full bg-gray-300 h-12 w-12"></div>
                <div class="flex-1 space-y-4 py-1">
                  <div class="h-4 bg-gray-300 rounded w-3/4"></div>
                  <div class="space-y-2">
                    <div class="h-4 bg-gray-300 rounded"></div>
                    <div class="h-4 bg-gray-300 rounded w-5/6"></div>
                  </div>
                </div>
              </div>
            </div>

            <div class="mt-6 p-4 bg-white rounded shadow">
              <div class="animate-pulse flex space-x-4">
                <div class="rounded-full bg-gray-300 h-12 w-12"></div>
                <div class="flex-1 space-y-4 py-1">
                  <div class="h-4 bg-gray-300 rounded w-3/4"></div>
                  <div class="space-y-2">
                    <div class="h-4 bg-gray-300 rounded"></div>
                    <div class="h-4 bg-gray-300 rounded w-5/6"></div>
                  </div>
                </div>
              </div>
            </div>
            <div class="mt-6 p-4 bg-white rounded shadow">
              <div class="animate-pulse flex space-x-4">
                <div class="rounded-full bg-gray-300 h-12 w-12"></div>
                <div class="flex-1 space-y-4 py-1">
                  <div class="h-4 bg-gray-300 rounded w-3/4"></div>
                  <div class="space-y-2">
                    <div class="h-4 bg-gray-300 rounded"></div>
                    <div class="h-4 bg-gray-300 rounded w-5/6"></div>
                  </div>
                </div>
              </div>
            </div>
            <div class="mt-6 p-4 bg-white rounded shadow">
              <div class="animate-pulse flex space-x-4">
                <div class="rounded-full bg-gray-300 h-12 w-12"></div>
                <div class="flex-1 space-y-4 py-1">
                  <div class="h-4 bg-gray-300 rounded w-3/4"></div>
                  <div class="space-y-2">
                    <div class="h-4 bg-gray-300 rounded"></div>
                    <div class="h-4 bg-gray-300 rounded w-5/6"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="-mx-8 w-4/12 hidden lg:block">
          <div class="px-8">
            <h1 class="mb-4 text-xl font-bold text-gray-700">
              most user poster
            </h1>
            <users-list :users="users"> </users-list>
          </div>
          <div class="mt-10 px-8">
            <h1 class="mb-4 text-xl font-bold text-gray-700">
              most post commented
            </h1>
            <categories :postmostComments="postmostComments"></categories>
          </div>
          <div class="mt-10 px-8">
            <h1 class="mb-4 text-xl font-bold text-gray-700">
              most user active in last month
            </h1>
            <recent-post
              :UsersActiveInLastMonth="UsersActiveInLastMonth"
            ></recent-post>
          </div>
        </div>
      </div>
    </div>
    <simple-footer></simple-footer>
  </div>
</template>

<script>
// import PostFilter from "@/components/elements-select-option.vue";
import Post from "@/components/elements-blog-post-article-review.vue";
import Pagination from "@/components/elements-pagination.vue";
import UsersList from "@/components/sections-blog-users-list.vue";
import Categories from "@/components/sections-categories-list.vue";
import RecentPost from "@/components/sections-recent-article.vue";
import SimpleFooter from "@/components/navigation-footer-simple-with-icon.vue";
import axios from "axios";
export default {
  name: "app",
  components: {
    // PostFilter,
    Post,
    Pagination,
    UsersList,
    Categories,
    RecentPost,
    SimpleFooter,
  },

  data() {
    return {
      posts: [],
      user: null,
      users: null,
      postmostComments: null,
      UsersActiveInLastMonth: null,
    };
  },
  mounted() {
    this.getDataAboutA();
    this.getUserData();
    this.getposts();
    //console.log(this.$route.params.user);
  },
  methods: {
    creatPost() {
      if (this.user !== null) {
        console.log("this is so awsomes");
        this.$router.push({ name: "creatpost" });
      } else {
        this.$router.push({ name: "login", query: { post: true } });
      }
    },
    getUserData() {
      setInterval(() => {
        let user = localStorage.getItem("user");
        if (user) {
          this.user = JSON.parse(user);
        } else {
          this.user = null;
        }
      }, 100);
    },
    async getposts() {
      try {
        const res = await axios.get("http://127.0.0.1:8000/api/v1/posts");
        this.posts = res.data.post;
        this.posts.reverse();
        console.log(res.data.post);
      } catch (err) {
        console.error(err);
      }
    },

    async getDataAboutA() {
      // await axios
      //   .get("http://127.0.0.1:8000/api/v1/compose")
      //   .then((res) => {
      //     // console.log(res.data);
      //     this.users = res.data.UsersMostPostWriting;
      //     this.postmostComments = res.data.postmostComments;

      //     console.log(this.users);
      //   })
      //   .catch((err) => console.log(err));

      await fetch("http://127.0.0.1:8000/api/v1/compose", {
        method: "GET",
        // cache: "no-cache",
        cache: "force-cache",
      })
        .then((res) => {
          const data = res.json();
          return data;
        })
        .then((res) => {
          // console.log(res.UsersActiveInLastMonth);
          this.UsersActiveInLastMonth = res.UsersActiveInLastMonth;
          this.users = res.UsersMostPostWriting;
          this.postmostComments = res.postmostComments;
          console.log(this.postmostComments);
        });
    },
  },
};
</script>

<style>
@import "../assets/css/app.css";

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
