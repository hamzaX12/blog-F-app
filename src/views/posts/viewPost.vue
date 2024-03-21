<template>
  <div id="app" class="font-roboto bg-gray-100">
    <div class="px-6 py-8">
      <div class="flex justify-between container mx-auto">
        <div class="w-full lg:w-8/12">
          <div class="flex items-center justify-between">
            <h1 class="text-xl font-bold text-gray-700 md:text-2xl">Post</h1>
          </div>
          <div class="mt-6">
            <PostView
              :data="post"
              :user="user"
              :tags="tags"
              :image="image"
              :comments="comments"
              @comment-added="updateComments"
            ></PostView>
          </div>
        </div>
        <div class="-mx-8 w-4/12 hidden lg:block">
          <div class="px-8">
            <h1 class="mb-4 text-xl font-bold text-gray-700">
              most user poster
            </h1>
            <users-list :users="users"></users-list>
          </div>
          <div class="mt-10 px-8">
            <h1 class="mb-4 text-xl font-bold text-gray-700">
              most post commented
            </h1>
            <categories
              :postmostComments="postmostComments"
              @pushRoute="pushRouter"
            ></categories>
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

    <!-- <simple-footer></simple-footer> -->
  </div>
</template>

<script>
import axios from "axios";
import UsersList from "@/components/sections-blog-users-list.vue";
import Categories from "@/components/sections-categories-list.vue";
import RecentPost from "@/components/sections-recent-article.vue";
import SimpleFooter from "@/components/navigation-footer-simple-with-icon.vue";
import PostView from "@/components/elemebts-blog-post-view.vue";
export default {
  name: "viewPost",
  components: {
    // Navbar,
    PostView,
    UsersList,
    Categories,
    RecentPost,
    SimpleFooter,
  },
  data() {
    return {
      post: [],
      user: [],
      tags: [],
      image: null,
      comments: [],
      id: this.$route.params.id,
      users: null,
      postmostComments: null,
      UsersActiveInLastMonth: null,
    };
  },
  mounted() {
    this.getDataAboutA();
    this.getpost();
  },
  methods: {
    getpost() {
      axios
        .get(`http://127.0.0.1:8000/api/v1/posts/${this.id}`)
        .then((res) => {
          this.post = res.data.post;
          this.user = res.data.post.user;
          if (res.data.post.image) {
            this.image = res.data.post.image.path;
          }
          this.tags = res.data.post.tags.slice(0, 1);

          if (res.data.post.comments) {
            this.comments = res.data.post.comments;
          } else {
            this.comments = null;
          }
          // console.log("this is ", res.data.post.image);
          // console.log(res.data.post.comments);
        })
        .catch((err) => console.log(err));
      // console.log("asdasd====>", this.image);
    },
    updateComments(newComment) {
      this.comments = newComment;
      this.getDataAboutA();
    },
    pushRouter(id) {
      console.log("hi");
      this.$router.push({ name: `blog` });
      // this.$router.push({ path: `/post/${id}` });
    },
    async getDataAboutA() {
      await fetch("http://127.0.0.1:8000/api/v1/compose", {
        method: "GET",
        // cache: "force-cache",
        // headers: {
        //   "Cache-Control": "max-age=3",
        // },
      })
        .then((res) => {
          // console.log(res);
          const data = res.json();
          return data;
        })
        .then((res) => {
          console.log(res.UsersActiveInLastMonth);
          this.users = res.UsersMostPostWriting;
          this.postmostComments = res.postmostComments;
          this.UsersActiveInLastMonth = res.UsersActiveInLastMonth;
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>

<style>
@import "../../assets/css/app.css";

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
