<template>
  <div id="attraction">
    <div class="banner position-relative" id="banner" ref="scrollPoint">
      <div id="carouselBanner" class="carousel slide" data-bs-ride="carousel">
        <div class="carousel-indicators">
          <button type="button" data-bs-target="#carouselBanner" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#carouselBanner" data-bs-slide-to="1" aria-label="Slide 2"></button>
          <button type="button" data-bs-target="#carouselBanner" data-bs-slide-to="2" aria-label="Slide 3"></button>
        </div>
        <div class="carousel-inner">
          <div class="carousel-item" v-for="(item, index) in bannerData" :key="index" :class="{ active: index === 0 }">
            <img :src="item.imgUrl" class="d-block w-100" :alt="item.alt" />
          </div>
        </div>
      </div>
      <div class="bannerContent position-absolute top-50 start-50 translate-middle">
        <h2 class="pb-3 fs-2 text-white text-center">
          Welcome to<br class="d-md-none" />
          Travel Taiwan
        </h2>
        <form class="d-flex">
          <select v-model="category" class="form-select mx-1 mx-md-2 categorySelector text-center" id="categorySelector" aria-label="category select">
            <option value="" disabled selected>類別</option>
            <option :value="item.value" v-for="item in categoryList" :key="item.id">
              {{ item.label }}
            </option>
          </select>
          <select v-model="city" class="form-select mx-1 mx-md-2 citySelector" id="citySelector" aria-label="city select">
            <option value="" disabled selected>請選擇縣市</option>
            <option v-for="item in cityData" :value="item.City" :key="item.City">
              {{ item.CityName }}
            </option>
          </select>
          <button type="button" class="searchBtn mx-1 mx-md-2" id="searchBtn" @click="getEventData">
            <i class="bi bi-search text-white fs-6"></i>
          </button>
        </form>
      </div>
    </div>
    <section class="eventSection">
      <div class="container">
        <h3 class="pb-3">{{ currentCity }}{{ currentCategory !== "" ? currentCategory : "所有活動" }}</h3>
        <p class="subtitle pb-5">
          各種不同的活動內容<br />
          邀請您一同來共襄盛舉！
        </p>
        <div class="row">
          <div class="col-12 col-md-6 col-lg-3 mb-5" v-for="(item, index) in dataShow" :key="index">
            <div class="card" data-aos="fade-up">
              <div class="card-img-block">
                <img :src="item.Picture.PictureUrl1 || require('../assets/images/noImage.jpg')" :alt="item.Picture.PictureDescription1 || item.ActivityName" class="card-img-top" />
              </div>
              <div class="card-body">
                <h5 class="card-title pb-1">{{ item.ActivityName }}</h5>
                <span><i class="bi bi-clock pe-1"></i>{{ item.time || "未提供資料" }}</span>
                <p class="card-text pt-3"><i class="bi bi-geo-alt-fill pe-1"></i>{{ item.Location || item.City }}</p>
              </div>
              <a href="#" class="card-btn" data-bs-toggle="modal" :data-bs-target="'#' + item.ActivityID">了解更多</a>
            </div>
            <div class="modal fade" :id="item.ActivityID" tabindex="-1" aria-labelledby="eventLabel" aria-hidden="true">
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header border-0">
                    <h5 class="modal-title" id="eventLabel">
                      {{ item.ActivityName }}
                    </h5>
                    <button type="button" class="btn" data-bs-dismiss="modal" aria-label="Close">
                      <i class="bi bi-x-lg"></i>
                    </button>
                  </div>
                  <div class="modal-body">
                    <p class="fs-sm pb-3"><i class="bi bi-geo-alt-fill pe-1"></i>{{ item.Address || "未提供資料" }}</p>
                    <p class="pb-3 pb-md-5">
                      {{ item.Description || "未提供資料" }}
                    </p>
                    <div class="row">
                      <div class="col-12">
                        <img :src="item.Picture.PictureUrl1 || require('../assets/images/noImage.jpg')" :alt="item.Picture.PictureDescription1 || item.ActivityName" />
                      </div>
                    </div>
                  </div>
                  <div class="modal-footer border-0 justify-content-between">
                    <ul class="d-block d-md-flex flex-wrap">
                      <li class="pe-4"><i class="bi bi-clock pe-1"></i>{{ item.time || "未提供資料" }}</li>
                      <li class="pe-4"><i class="bi bi-ticket pe-1"></i>{{ item.Charge && item.Charge === "0" ? "免費入場" : "未提供資料" }}</li>
                      <li class="pe-4"><i class="bi bi-telephone pe-1"></i>{{ item.Phone || "未提供資料" }}</li>
                      <li class="pe-4" v-if="!item.Class1 && !item.Class2 && !item.Class1"><i class="bi bi-list-ul pe-1"></i>其他</li>
                      <li class="pe-4" v-else><i class="bi bi-list-ul pe-1"></i>{{ item.Class1 ? "#" + item.Class1 + " " : "" }}{{ item.Class2 ? "#" + item.Class2 + " " : "" }}{{ item.Class3 ? "#" + item.Class3 + " " : "" }}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="pagination">
          <button type="button" v-if="filterData.length != 0" @click="prePage" class="page-link" :disabled="currentPage === 0"><i class="bi bi-chevron-left"></i></button>
          <span v-if="pageNum > 5 && currentPage > 2" class="d-flex align-items-center px-1"><i class="bi bi-three-dots"></i></span>
          <span v-for="(i, index) in pageData(numArr)" :key="index" @click="page(i)" class="page-link" :class="{ active: i - 1 === currentPage }">{{ i }}</span>
          <span v-if="pageNum > 5 && currentPage < pageNum - 3" class="d-flex align-items-center px-1"><i class="bi bi-three-dots"></i></span>
          <button type="button" v-if="filterData.length != 0" @click="nextPage" class="page-link" :disabled="currentPage + 1 === pageNum"><i class="bi bi-chevron-right"></i></button>
        </div>
      </div>
    </section>
  </div>
</template>
<script type="text/javascript" src="/path/to/sha.js"></script>
<script>
export default {
  name: "App",
  data() {
    return {
      category: "所有活動",
      city: "Taiwan",
      currentCity: "台灣",
      currentCategory: "所有活動",
      eventData: [],
      eventTimeData: [],
      filterData: [],
      numArr: [],
      totalPage: [],
      pageSize: 12,
      pageNum: 1,
      dataShow: [],
      currentPage: 0,
      height: 0,
      bannerData: [
        {
          imgUrl: "https://images.unsplash.com/photo-1498931299472-f7a63a5a1cfa?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&h=800&q=80",
          alt: "年度活動",
        },
        {
          imgUrl: "https://images.unsplash.com/photo-1576948676327-46cb0e272a69?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&h=800&q=80",
          alt: "藝文活動",
        },
        {
          imgUrl: "https://images.unsplash.com/photo-1568119948624-ff9807d6be20?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1400&h=800&q=80",
          alt: "節慶活動",
        },
      ],
      cityData: [
        {
          CityName: "台灣",
          City: "Taiwan",
        },
        {
          CityName: "臺北市",
          City: "Taipei",
        },
        {
          CityName: "新北市",
          City: "NewTaipei",
        },
        {
          CityName: "桃園市",
          City: "Taoyuan",
        },
        {
          CityName: "臺中市",
          City: "Taichung",
        },
        {
          CityName: "臺南市",
          City: "Tainan",
        },
        {
          CityName: "高雄市",
          City: "Kaohsiung",
        },
        {
          CityName: "基隆市",
          City: "Keelung",
        },
        {
          CityName: "新竹市",
          City: "Hsinchu",
        },
        {
          CityName: "新竹縣",
          City: "HsinchuCounty",
        },
        {
          CityName: "苗栗縣",
          City: "MiaoliCounty",
        },
        {
          CityName: "彰化縣",
          City: "ChanghuaCounty",
        },
        {
          CityName: "南投縣",
          City: "NantouCounty",
        },
        {
          CityName: "雲林縣",
          City: "YunlinCounty",
        },
        {
          CityName: "嘉義縣",
          City: "ChiayiCounty",
        },
        {
          CityName: "嘉義市",
          City: "Chiayi",
        },
        {
          CityName: "屏東縣",
          City: "PingtungCounty",
        },
        {
          CityName: "宜蘭縣",
          City: "YilanCounty",
        },
        {
          CityName: "花蓮縣",
          City: "HualienCounty",
        },
        {
          CityName: "臺東縣",
          City: "TaitungCounty",
        },
        {
          CityName: "金門縣",
          City: "KinmenCounty",
        },
        {
          CityName: "澎湖縣",
          City: "PenghuCounty",
        },
        {
          CityName: "連江縣",
          City: "LienchiangCounty",
        },
      ],
      categoryList: [
        { id: 1, label: "所有活動", value: "所有活動" },
        { id: 2, label: "年度活動", value: "年度活動" },
        { id: 3, label: "藝文活動", value: "藝文活動" },
        { id: 4, label: "節慶活動", value: "節慶活動" },
        { id: 5, label: "其他活動", value: "其他活動" },
      ],
    };
  },
  methods: {
    getEventData() {
      let city = "";
      if (this.city === "Taiwan") {
        city = "";
      } else {
        city = this.city;
      }
      this.axios({
        method: "get",
        url: `https://ptx.transportdata.tw/MOTC/v2/Tourism/Activity/${city}`,
        headers: this.GetAuthorizationHeader(),
      })
        .then((response) => {
          this.eventData = response.data;
          this.filterCategory();
          this.cityTranslate();
          this.currentCategory = this.category;
          window.scrollTo(0, this.height);
        })
        .catch((error) => {
          console.log("error", error);
        });
    },
    cityTranslate() {
      if (this.city === "") {
        return;
      }
      const findCity = this.cityData.filter((i) => i.City === this.city);
      this.currentCity = findCity[0].CityName || "";
    },
    filterCategory() {
      if (this.category === "所有活動") {
        this.filterData = this.eventData;
      } else if (this.category === "其他活動") {
        this.filterData = this.eventData.filter((item) => !item.Class1 && !item.Class2 && !item.Class3);
      } else {
        this.filterData = this.eventData.filter((item) => item.Class1 === this.category || item.Class2 === this.category || item.Class3 === this.category);
      }
      if (this.filterData.length === 0) {
        alert("查無資料");
        this.reset();
        return;
      }
      this.pagination();
    },
    getEventTime() {
      this.pageData.forEach((item, i) => {
        this.pageData[i].time = item.StartTime.substr(0, 10) + "~" + item.EndTime.substr(0, 10);
      });
    },
    nextPage() {
      if (this.currentPage === this.pageNum - 1) return;
      this.dataShow = this.totalPage[++this.currentPage];
      this.getScrollHeight();
    },
    prePage() {
      if (this.currentPage === 0) return;
      this.dataShow = this.totalPage[--this.currentPage];
      this.getScrollHeight();
    },
    page(i) {
      this.currentPage = i - 1;
      this.dataShow = this.totalPage[i - 1];
      this.getScrollHeight();
    },
    pagination() {
      this.pageNum = Math.ceil(this.filterData.length / this.pageSize) || 1;
      this.reset();
      for (let i = 0; i < this.pageNum; i++) {
        this.numArr.push(i + 1);
        this.totalPage[i] = this.filterData.slice(this.pageSize * i, this.pageSize * (i + 1));
        this.dataShow = this.totalPage[this.currentPage];
      }
    },
    getScrollHeight() {
      if (window.document.body.scrollWidth < 769) {
        this.height = this.$refs.scrollPoint.offsetTop + this.$refs.scrollPoint.offsetHeight - 100;
      } else {
        this.height = this.$refs.scrollPoint.offsetTop + this.$refs.scrollPoint.offsetHeight;
      }
      window.scrollTo(0, this.height);
    },
    reset() {
      this.currentPage = 0;
      this.numArr = [];
      this.totalPage = [];
      this.dataShow = [];
    },
    GetAuthorizationHeader() {
      var AppID = "FFFFFFFF-FFFF-FFFF-FFFF-FFFFFFFFFFFF";
      var AppKey = "FFFFFFFF-FFFF-FFFF-FFFF-FFFFFFFFFFFF";
      var GMTString = new Date().toGMTString();
      var ShaObj = new jsSHA("SHA-1", "TEXT");
      ShaObj.setHMACKey(AppKey, "TEXT");
      ShaObj.update("x-date: " + GMTString);
      var HMAC = ShaObj.getHMAC("B64");
      var Authorization = 'hmac username="' + AppID + '", algorithm="hmac-sha1", headers="x-date", signature="' + HMAC + '"';
      return {
        Authorization: Authorization,
        "X-Date": GMTString,
      };
    },
  },
  computed: {
    pageData() {
      return (data) => {
        if (this.pageNum <= 5 || this.currentPage <= 2) {
          return data.filter((i) => i <= 5);
        } else if (this.currentPage > 2 && this.currentPage < this.pageNum - 2) {
          return [this.currentPage - 1, this.currentPage, this.currentPage + 1, this.currentPage + 2, this.currentPage + 3];
        } else {
          return data.filter((i) => i > this.pageNum - 5);
        }
      };
    },
  },
  mounted() {
    this.category = this.$route.query.category || "所有活動";
    this.getEventData();
  },
};
</script>