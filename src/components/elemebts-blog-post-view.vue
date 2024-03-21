<template>
  <div class="main">
    <div class="max-w-4xl px-10 py-6 bg-white rounded-lg shadow-md">
      <div class="flex items-start">
        <a class="flex items-center" style="margin-left: -15px" href="#">
          <img
            class="mx-4 w-10 h-10 object-cover rounded-full hidden sm:block"
            src="/src/assets/image-removebg-preview (4).png"
            alt="avatar"
          />
          <h1 class="text-gray-700 font-bold hover:underline">
            {{ user.name }}
          </h1>
        </a>
      </div>
      <!-- {{ comments }} -->
      <div class="flex justify-between items-center">
        <span class="font-light text-gray-600">{{
          format(data.updated_at)
        }}</span>
        <a
          class="px-2 py-1 bg-gray-600 text-gray-100 font-bold rounded hover:bg-gray-500"
          href="#"
          v-for="(tag, i) in tags"
          :key="i"
          >{{ tag.name }}</a
        >
      </div>
      <div class="mt-2">
        <a class="text-2xl text-gray-700 font-bold hover:underline" href="#">{{
          data.title
        }}</a>
        <p class="mt-2 text-gray-600">{{ data.content }}</p>
      </div>
      <div>
        <div v-if="image === null"></div>
        <div v-else class="flex justify-between items-center mt-4 ml-48">
          <img
            class="object-contain rounded-lg"
            :src="'http://127.0.0.1:8000/Storage/' + image"
            alt="post image"
            width="400"
            height="400"
          />
        </div>
      </div>
    </div>

    <form @submit.prevent="addComment" v-if="userId !== null">
      <input
        v-model="content"
        type="text"
        class="mt-3 w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
        placeholder="Enter your comment..."
      />
    </form>
    <div v-else class="mt-6">
      <router-link
        class="px-4 py-3 rounded-lg border border-gray-300 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        :to="{ name: 'login' ,query:{comment:data.id} }"
        >login to commment</router-link
      >
    </div>

    <br />
    <div
      v-if="comments !== null && comments.length > 0"
      class="max-w-4xl px-10 py-6 bg-white rounded-lg shadow-md"
    >
      <ul class="-mx-4" v-for="comment in comments" :key="comment.id">
        <li class="flex items-center mt-3 mb-3">
          <img
            class="w-10 h-10 object-cover rounded-full mx-4"
            src="/src/assets/image-removebg-preview (4).png"
            alt="avatar"
          />
          <div class="flex-grow">
            <p>
              <a
                class="text-gray-700 font-bold mx-1 hover:underline"
                href="#"
                >{{ comment.user.name }}</a
              >
              <span class="text-gray-700 text-sm font-light">{{
                comment.updated_at.split("T")[0]
              }}</span>
            </p>
            <div class="flex">
              <!-- sdfsdf -->
              {{ comment.content }}
            </div>
          </div>
        </li>
        <hr />
      </ul>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  props: ["data", "user", "tags", "image", "comments"],
  data() {
    return {
      imager: this.image,
      content: "",
      userId: null,
      token: "",
    };
  },
  mounted() {
    // (this.commentObejct = this.comments), console.log("asdas", this.comments);
    this.getUserData();
  },
  methods: {
    getUserData() {
      let user = localStorage.getItem("user");
      let token = localStorage.getItem("api_token");
      if (user) {
        this.userId = JSON.parse(user).id;
        this.token = JSON.parse(token);
        console.log(this.userId);
      } else {
        this.userId = null;
        this.token = null;
      }
    },
    async addComment() {
      let formData = new FormData();
      formData.append("content", this.content);
      formData.append("user_id", this.userId);
      formData.append("_token", this.token);
      console.log([...formData]);
      try {
        const response = await axios.post(
          `http://127.0.0.1:8000/api/v1/posts/${this.data.id}/comment`,
          formData
        );
        this.$emit("comment-added", response.data.post_comment);

        // this.comments = response.data.post_comment;
      } catch (error) {
        console.error(error);
      }
      this.content = "";
    },
    format(date) {
      if (date) {
        return date.split("T")[0];
      } else {
        return "";
      }
    },
  },
};
</script>
