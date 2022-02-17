<template>
  <header class="max-h-80 d-flex align-items-center">
    <nav class="position-fixed w-100" id="nav">
      <div class="container">
        <div class="d-block d-md-flex justify-content-between">
          <h1>
            <a href="./index.html"
              ><img src="../assets/images/logo.svg" alt="logo"
            /></a>
          </h1>
          <ul class="d-flex justify-content-center">
            <li class="nav-item px-3" v-for="item in linkList" :key="item.id">
              <a
                class="nav-link px-0"
                :class="{ active: checkPath(item) }"
                @click="goPath(item)"
                >{{ item.label }}</a
              >
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  data() {
    return {
      defaultLink: 1,
      linkList: [
        { id: 1, label: "首頁", path: "/" },
        { id: 2, label: "景點導覽", path: "/attractions" },
        { id: 3, label: "觀光活動", path: "/events" },
      ],
    };
  },
  computed: {
    checkPath() {
      return (item) => {
        return item.path === this.$route.path;
      };
    },
  },
  methods: {
    goPath(item) {
      this.$router.push(item.path);
    },
  },
};
</script>
