<template>
  <div class="login">
    <section class="bg-gray-50 white:bg-gray-900">
      <div
        class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0"
      >
        <div
          class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0"
        >
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1
              class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-black"
            >
              Sign in to your account
            </h1>
            <form class="space-y-4 md:space-y-6" action="#">
              <div>
                <label
                  for="email"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                  >Your email</label
                >
                <input
                  v-model="userData.email"
                  type="email"
                  name="email"
                  id="email"
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  required=""
                />
              </div>
              <div>
                <label
                  for="password"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                  >Password</label
                >
                <input
                  v-model="userData.password"
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                />
              </div>
              <div class="flex items-center justify-between">
                <!-- <div class="flex items-start">
                  <div class="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                      required=""
                    />
                  </div>
                  <div class="ml-3 text-sm">
                    <label
                      for="remember"
                      class="text-gray-500 dark:text-gray-300"
                      >Remember me</label
                    >
                  </div>
                </div> -->
              </div>
              <button
                @click.prevent="login()"
                type="submit"
                class="w-full text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Sign in
              </button>
              <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                Don’t have an account yet?
                <a
                  href="#"
                  class="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >Sign up</a
                >
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import axios from "axios";

export default {
  name: "login",
  data() {
    return {
      userData: {
        email: "",
        password: "",
      },
      apitoken: "",
      user: "",
    };
  },
  methods: {
    setInLocalStorage(api_token, user) {
      localStorage.setItem(`api_token`, JSON.stringify(api_token));
      localStorage.setItem(`user`, JSON.stringify(user));
    },
    async login() {
      await axios
        .post("http://127.0.0.1:8000/api/v1/login", this.userData)
        .then((res) => {
          console.log(this.userData);
          if (res.data.user) {
            this.setInLocalStorage(res.data.api_token, res.data.user);
            console.log("dasdas");
          } else {
            alert(res.data.data);
          }
          if (res.data.user) {
            console.log("this is wrong");
            if (this.$route.query.post) {
              this.$router.push({
                name: "creatpost",
              });
            } else if (this.$route.query.comment) {
              this.$router.push({
                path: `/post/${this.$route.query.comment}`,
              });
            } else {
              this.$router.push({
                name: "blog",
              });
            }
          } else {
            console.log("this is wrong", res.data);
          }
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>

<style scoped>
@import "../assets/css/app.css";
</style>
