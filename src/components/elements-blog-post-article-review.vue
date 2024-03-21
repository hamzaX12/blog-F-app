<template>
  <div
    class="max-w-4xl px-10 py-6 bg-white rounded-lg shadow-md"
  >
    <div class="flex justify-between items-center">
      <span class="font-light text-gray-600">{{
        data.updated_at.split("T")[0]
      }}</span>
      <a
        class="px-2 py-1 bg-gray-600 text-gray-100 font-bold rounded hover:bg-gray-500"
        href="#"
        v-for="(tag, i) in data.tags.slice(0, 1)"
        :key="i"
        >{{ tag.name }}</a
      >
    </div>
    <div class="mt-2">
      <router-link
        :to="{ path: `/post/${data.id}` }"
        class="text-2xl text-gray-700 font-bold hover:underline"
        >{{ data.title }}</router-link
      >
      <p class="mt-2 text-gray-600">{{ data.content }}</p>
    </div>
    <div class="flex justify-between items-center mt-4">
      <router-link
        :to="{ path: `/post/${data.id}` }"
        class="text-blue-500 hover:underline"
        >Read more</router-link
      >
      <div>
        <a class="flex items-center" href="#">
          <img
            class="mx-4 w-10 h-10 object-cover rounded-full hidden sm:block"
            src="/src/assets/image-removebg-preview (4).png"
            alt="avatar"
          />
          <h1 class="text-gray-700 font-bold hover:underline">
            {{ data.user.name }}
          </h1>
        </a>
      </div>
    </div>
  </div>
 
</template>

<script>
export default {
  props: ["data"],
};
</script>
