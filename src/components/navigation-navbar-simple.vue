<template>
  <nav class="bg-white px-6 py-4 shadow">
    <div
      class="flex flex-col container mx-auto md:flex-row md:items-center md:justify-between"
    >
      <div class="flex justify-between items-center">
        <div>
          <!-- <a href="#">hamza <span class="text-blue-500">blog</span></a> -->
          <router-link
            :to="{ name: 'blog' }"
            class="text-gray-800 text-xl font-bold md:text-2xl"
          >
            m-projet <span class="text-blue-500">blog</span>
          </router-link>
        </div>
        <div>
          <button
            type="button"
            @click="isOpen = !isOpen"
            class="block text-gray-800 hover:text-gray-600 focus:text-gray-600 focus:outline-none md:hidden"
          >
            <svg class="h-6 w-6 fill-current" viewBox="0 0 24 24">
              <path
                d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
              />
            </svg>
          </button>
        </div>
      </div>
      <div
        class="flex flex-col md:flex-row md:-mx-4"
        :class="isOpen ? 'block' : ['hidden', 'md:block']"
      >
        <!-- <a class="m y-1 text-gray-800 hover:text-blue-500 md:mx-4 md:my-0" href="#">Home</a> -->
        <router-link
          class="my-1 text-gray-800 hover:text-blue-500 md:mx-4 md:my-0"
          :to="{ name: 'blog' }"
          >Blog</router-link
        >
        <router-link
          v-if="userr !== null && userr.is_admin"
          class="my-1 text-gray-800 hover:text-blue-500 md:mx-4 md:my-0"
          :to="{ name: 'charts' }"
          >charts</router-link
        >

        <router-link
          @click="Logout()"
          v-show="userr !== null"
          class="my-1 text-gray-800 hover:text-blue-500 md:mx-4 md:my-0"
          :to="{ name: 'blog' }"
          >logout</router-link
        >

        <router-link
          v-show="userr === null"
          class="my-1 text-gray-800 hover:text-blue-500 md:mx-4 md:my-0"
          :to="{ name: 'login' }"
          >login</router-link
        >

        <!-- <a
          class="my-1 text-gray-800 hover:text-blue-500 md:mx-4 md:my-0"
          href="#"
          >About us</a
        > -->
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  // props: ["user"],
  data() {
    return {
      isOpen: false,
      userr: null,
    };
  },
  mounted() {
    this.getUserData();
  },
  methods: {
    Logout() {
      if (confirm("are you sure to logout")) {
        let user = localStorage.getItem("user");
        let token = localStorage.getItem("api_token");
        if (user) {
          localStorage.removeItem("user");
        }
        if (token) {
          localStorage.removeItem("api_token");
        }
      }
    },
    getUserData() {
      setInterval(() => {
        let user = localStorage.getItem("user");
        if (user) {
          this.userr = JSON.parse(user);
        } else {
          this.userr = null;
        }
      }, 100);
    },
  },
};
</script>
