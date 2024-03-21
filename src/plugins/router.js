import { createRouter, createWebHistory } from "vue-router";
import BlogPage from "@/views/Blog.vue";
import PostViewPage from "@/views/posts/viewPost.vue";
import LoginPage from "@/views/LoginPage.vue";
import createPostPage from "@/views/posts/creatPost.vue";
import chartPage from "@/views/posts/chartView.vue";
const routes = [
  {
    path: "/",
    name: "App",
    component: BlogPage,
  },
  {
    path: "/blog",
    name: "blog",
    component: BlogPage,
  },
  {
    path: "/post/:id",
    name: "viewPost",
    component: PostViewPage,
  },
  {
    path: "/login",
    name: "login",
    component: LoginPage,
  },
  {
    path: "/create/post",
    name: "creatpost",
    component: createPostPage,
  },
  {
    path: "/charts",
    name: "charts",
    component: chartPage,
  },
];

const router = createRouter({
  routes,
  history: createWebHistory(),
});
export default router;
