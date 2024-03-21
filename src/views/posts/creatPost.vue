<template>
  <div class="creat-post">
    <div class="w-full max-w-xl mx-auto mt-8">
      <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <input type="hidden" name="_token" :value="token" />
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="title">
            Title
          </label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="title"
            type="text"
            v-model="user.title"
            placeholder="Enter Title"
          />
        </div>
        <div class="mb-6">
          <label
            class="block text-gray-700 text-sm font-bold mb-2"
            for="content"
          >
            Content
          </label>
          <textarea
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="content"
            v-model="user.content"
            placeholder="Enter Content"
          ></textarea>
        </div>
        <div class="mb-6">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="image">
            Image
          </label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="image"
            type="file"
            @change="getImage"
          />
        </div>
        <div class="flex items-center justify-between">
          <button
            v-show="clicked == 'ok'"
            @click.prevent="creatPost"
            class="ml-9 py-2 px-4 flex justify-center items-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg max-w-md"
            type="button"
          >
            Submit
          </button>
          <button
            v-show="clicked !== 'ok'"
            type="button"
            class="ml-9 py-2 px-4 flex justify-center items-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg max-w-md"
          >
            <svg
              width="20"
              height="20"
              fill="currentColor"
              class="mr-2 animate-spin"
              viewBox="0 0 1792 1792"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M526 1394q0 53-37.5 90.5t-90.5 37.5q-52 0-90-38t-38-90q0-53 37.5-90.5t90.5-37.5 90.5 37.5 37.5 90.5zm498 206q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-704-704q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm1202 498q0 52-38 90t-90 38q-53 0-90.5-37.5t-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-964-996q0 66-47 113t-113 47-113-47-47-113 47-113 113-47 113 47 47 113zm1170 498q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-640-704q0 80-56 136t-136 56-136-56-56-136 56-136 136-56 136 56 56 136zm530 206q0 93-66 158.5t-158 65.5q-93 0-158.5-65.5t-65.5-158.5q0-92 65.5-158t158.5-66q92 0 158 66t66 158z"
              ></path>
            </svg>
            loading
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "creatPost",
  data() {
    return {
      clicked: "ok",
      user: {
        id: "",
        title: "",
        content: "",
        image: "",
      },
      token: "",
    };
  },
  mounted() {
    this.getUserData();
  },
  methods: {
    async creatPost() {
      this.clicked = "ko";
      let formData = new FormData();
      formData.append("title", this.user.title);
      formData.append("content", this.user.content);
      formData.append("picture", this.user.image);
      formData.append("id", this.user.id);
      formData.append("_token", this.token);
      console.log([...formData]);

      await axios
        .post("http://127.0.0.1:8000/api/v1/posts/create", formData)
        .then((res) => {
          console.log(res);
          // if (res) {
          // } else {
          this.$router.push({ name: "blog" });
          // }
        })
        .catch((err) => console.log(err));
    },
    getImage(e) {
      //   console.log(e.target.files[0][0]);
      this.user.image = e.target.files[0];
    },
    getUserData() {
      let user = localStorage.getItem("user");
      let token = localStorage.getItem("api_token");
      if (user) {
        this.user.id = JSON.parse(user).id;
        this.token = JSON.parse(token);
      } else {
        this.user.id = 1;
        this.token = null;
      }
    },
  },
};
</script>
