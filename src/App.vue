<template>
  <div id="app">
    <Header />
    <router-view class="everyPage" />
    <Footer />
  </div>
</template>
<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";

export default {
  name: "App",
  components: { Header, Footer },
};
</script>
<style>
@import "./assets/style/CSS/all.css";
</style>
