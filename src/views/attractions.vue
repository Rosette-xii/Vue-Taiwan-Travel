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
          <button type="button" class="searchBtn mx-1 mx-md-2" id="searchBtn" @click="getTourData()">
            <i class="bi bi-search text-white fs-6"></i>
          </button>
        </form>
      </div>
    </div>
    <section class="attractionSection">
      <div class="container">
        <h3 class="pb-3">{{ currentCity }}{{ currentCategory }}</h3>
        <p class="subtitle pb-5">
          台灣的各個美景，都美不勝收。<br />
          等你一同來發現這座寶島的奧妙！
        </p>
        <div class="row">
          <div class="col-12 col-md-6 col-lg-3 mb-5" v-for="(item, index) in pageData" :key="index">
            <div class="card" data-aos="fade-up">
              <div class="card-img-block">
                <img :src="item.Picture.PictureUrl1 || require('../assets/images/noImage.jpg')" :alt="item.Picture.PictureDescription1 || item.ScenicSpotName" class="card-img-top" />
              </div>
              <div class="card-body">
                <h5 class="card-title pb-1">{{ item.ScenicSpotName }}</h5>
                <span><i class="bi bi-clock pe-1"></i>{{ item.OpenTime || "未提供資料" }}</span>
                <p class="card-text pt-3"><i class="bi bi-geo-alt-fill pe-1"></i>{{ item.City || item.Address.substr(0, 3) }}</p>
              </div>
              <a href="#" class="card-btn" data-bs-toggle="modal" :data-bs-target="'#' + item.ScenicSpotID">了解更多</a>
            </div>
            <div class="modal fade" :id="item.ScenicSpotID" tabindex="-1" aria-labelledby="attractions1Label" aria-hidden="true">
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header border-0">
                    <h5 class="modal-title" id="attractions1Label">
                      {{ item.ScenicSpotName }}
                    </h5>
                    <button type="button" class="btn" data-bs-dismiss="modal" aria-label="Close">
                      <i class="bi bi-x-lg"></i>
                    </button>
                  </div>
                  <div class="modal-body">
                    <p class="fs-sm pb-3"><i class="bi bi-geo-alt-fill pe-1"></i>{{ item.Address || "未提供資料" }}</p>
                    <p class="pb-3 pb-md-5">
                      {{ item.Description || item.DescriptionDetail || "未提供資料" }}
                    </p>
                    <div class="row">
                      <div class="col-12">
                        <img :src="item.Picture.PictureUrl1 || require('../assets/images/noImage.jpg')" :alt="item.Picture.PictureDescription1 || item.ScenicSpotName" />
                      </div>
                    </div>
                  </div>
                  <div class="modal-footer border-0 justify-content-between">
                    <ul class="d-block d-md-flex flex-wrap">
                      <li class="pe-4"><i class="bi bi-clock pe-1"></i>{{ item.OpenTime || "未提供資料" }}</li>
                      <li class="pe-4"><i class="bi bi-ticket pe-1"></i>{{ item.TicketInfo || "未提供資料" }}</li>
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
        <nav aria-label="Page navigation example d-flex">
          <ul class="pagination justify-content-center" id="pageId" @click.prevent="switchPage($event)"></ul>
        </nav>
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
      category: "所有類別",
      city: "",
      currentCity: "台灣",
      currentCategory: "所有類別",
      tourData: [],
      filterData: [],
      pageData: [],
      height: 0,
      bannerData: [
        {
          imgUrl: "https://images.unsplash.com/photo-1470004914212-05527e49370b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&h=800&q=80",
          alt: "台北101",
        },
        {
          imgUrl: "https://images.unsplash.com/photo-1621848296279-7751546e9acc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1400&h=800&q=80",
          alt: "台江國家公園",
        },
        {
          imgUrl: "https://images.unsplash.com/photo-1532516993453-addb6c882c42?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&h=800&q=80",
          alt: "新月橋",
        },
      ],
      cityData: [
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
        { id: 1, label: "所有類別", value: "所有類別" },
        { id: 2, label: "自然風景類", value: "自然風景類" },
        { id: 3, label: "國家風景區類", value: "國家風景區類" },
        { id: 4, label: "體育健身類", value: "體育健身類" },
        { id: 5, label: "遊憩類", value: "遊憩類" },
        { id: 6, label: "文化類", value: "文化類" },
        { id: 7, label: "古蹟類", value: "古蹟類" },
        { id: 8, label: "廟宇類", value: "廟宇類" },
        { id: 9, label: "休閒農業類", value: "休閒農業類" },
        { id: 10, label: "其他", value: "其他" },
      ],
    };
  },
  methods: {
    getTourData() {
      this.axios({
        method: "get",
        url: `https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot/${this.city}`,
        headers: this.GetAuthorizationHeader(),
      })
        .then((response) => {
          this.tourData = response.data;
          this.filterCategory();
          this.cityTranslate();
          this.currentCategory = this.category + "景點";
          window.scrollTo(0, this.height);
          this.pagination(1);
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
      if (this.category === "所有類別") {
        this.filterData = this.tourData;
      } else if (this.category === "其他") {
        this.filterData = this.tourData.filter((item) => !item.Class1 && !item.Class2 && !item.Class3);
      } else {
        this.filterData = this.tourData.filter((item) => item.Class1 === this.category || item.Class2 === this.category || item.Class3 === this.category);
      }
    },
    pagination(nowPage) {
      const dataTotal = this.filterData.length;
      if (dataTotal === 0) {
        alert("查無資料");
        this.pageData = [];
        document.querySelector("#pageId").innerHTML = "";
        return;
      }
      const perPage = 12;
      const pageTotal = Math.ceil(dataTotal / perPage);
      let currentPage = nowPage;
      if (currentPage > pageTotal) {
        currentPage = pageTotal;
      }
      const minData = currentPage * perPage - perPage + 1;
      const maxData = currentPage * perPage;
      this.pageData = [];
      this.filterData.forEach((item, index) => {
        const num = index + 1;
        if (num >= minData && num <= maxData) {
          this.pageData.push(item);
        }
      });
      const page = {
        pageTotal,
        currentPage,
        hasPage: currentPage > 1,
        hasNext: currentPage < pageTotal,
      };
      this.pageBtn(page);
    },
    pageBtn(page) {
      let str = "";
      const total = page.pageTotal;
      let nowPage = Number(page.currentPage);
      if (this.tourData.length === 0) {
        return;
      } else {
        if (page.hasPage) {
          str += `
        <li class="page-item"><a class="page-link" href="#" data-page="1"><i class="bi bi-chevron-double-left" data-page="1"></i></a></li>
        <li class="page-item"><a class="page-link" href="#" data-page="${nowPage - 1}"><i class="bi bi-chevron-left" data-page="${nowPage - 1}"></i></a></li>
        `;
        } else {
          str += `
        <li class="page-item disabled"><span class="page-link"><i class="bi bi-chevron-double-left"></i></span></li>
        <li class="page-item disabled"><span class="page-link"><i class="bi bi-chevron-left"></i></span></li>
        `;
        }
        for (let i = 1; i <= total; i++) {
          if (page.pageTotal <= 5) {
            if (nowPage === i) {
              str += `<li class="page-item active"><a class="page-link" href="#" data-page="${i}">${i}</a></li>`;
            } else {
              str += `<li class="page-item"><a class="page-link" href="#" data-page="${i}">${i}</a></li>`;
            }
          } else {
            if (nowPage === 1) {
              str += `
                <li class="page-item active"><a class="page-link" href="#" data-page="1">1</a></li>
                <li class="page-item"><a class="page-link" href="#" data-page="2">2</a></li>
                <li class="page-item"><a class="page-link" href="#" data-page="3">3</a></li>
                <li class="page-item"><a class="page-link" href="#" data-page="4">4</a></li>
                <li class="page-item"><a class="page-link" href="#" data-page="5">5</a></li>
                <li class="page-item disabled"><a class="page-link" href="#">...</a></li>
                `;
              break;
            } else if (nowPage === 2) {
              str += `
                <li class="page-item"><a class="page-link" href="#" data-page="1">1</a></li>
                <li class="page-item active"><a class="page-link" href="#" data-page="2">2</a></li>
                <li class="page-item"><a class="page-link" href="#" data-page="3">3</a></li>
                <li class="page-item"><a class="page-link" href="#" data-page="4">4</a></li>
                <li class="page-item"><a class="page-link" href="#" data-page="5">5</a></li>
                <li class="page-item disabled"><a class="page-link" href="#">...</a></li>
                `;
              break;
            } else if (nowPage === 3) {
              str += `
                <li class="page-item"><a class="page-link" href="#" data-page="1">1</a></li>
                <li class="page-item"><a class="page-link" href="#" data-page="2">2</a></li>
                <li class="page-item active"><a class="page-link" href="#" data-page="3">3</a></li>
                <li class="page-item"><a class="page-link" href="#" data-page="4">4</a></li>
                <li class="page-item"><a class="page-link" href="#" data-page="5">5</a></li>
                <li class="page-item disabled"><a class="page-link" href="#">...</a></li>
                `;
              break;
            } else if (nowPage > 3 && nowPage <= total - 3) {
              str += `
                 <li class="page-item disabled"><a class="page-link" href="#">...</a></li>
                <li class="page-item"><a class="page-link" href="#" data-page="${nowPage - 2}">${nowPage - 2}</a></li>
                <li class="page-item"><a class="page-link" href="#" data-page="${nowPage - 1}">${nowPage - 1}</a></li>
                <li class="page-item active"><a class="page-link" href="#" data-page="${nowPage}">${nowPage}</a></li>
                <li class="page-item"><a class="page-link" href="#" data-page="${nowPage + 1}">${nowPage + 1}</a></li>
                <li class="page-item"><a class="page-link" href="#" data-page="${nowPage + 2}">${nowPage + 2}</a></li>
                <li class="page-item disabled"><a class="page-link" href="#">...</a></li>
                `;
              break;
            } else if (nowPage === total - 2) {
              str += `
                <li class="page-item disabled"><a class="page-link" href="#">...</a></li>
                <li class="page-item"><a class="page-link" href="#" data-page="${total - 4}">${total - 4}</a></li>
                <li class="page-item"><a class="page-link" href="#" data-page="${total - 3}">${total - 3}</a></li>
                <li class="page-item active"><a class="page-link" href="#" data-page="${total - 2}">${total - 2}</a></li>
                <li class="page-item"><a class="page-link" href="#" data-page="${total - 1}">${total - 1}</a></li>
                <li class="page-item"><a class="page-link" href="#" data-page="${total}">${total}</a></li>
                `;
              break;
            } else if (nowPage === total - 1) {
              str += `
                <li class="page-item disabled"><a class="page-link" href="#">...</a></li>
                <li class="page-item"><a class="page-link" href="#" data-page="${total - 4}">${total - 4}</a></li>
                <li class="page-item"><a class="page-link" href="#" data-page="${total - 3}">${total - 3}</a></li>
                <li class="page-item"><a class="page-link" href="#" data-page="${total - 2}">${total - 2}</a></li>
                <li class="page-item active"><a class="page-link" href="#" data-page="${total - 1}">${total - 1}</a></li>
                <li class="page-item"><a class="page-link" href="#" data-page="${total}">${total}</a></li>
                `;
              break;
            } else if (nowPage === total) {
              str += `
                <li class="page-item disabled"><a class="page-link" href="#">...</a></li>
                <li class="page-item"><a class="page-link" href="#" data-page="${total - 4}">${total - 4}</a></li>
                <li class="page-item"><a class="page-link" href="#" data-page="${total - 3}">${total - 3}</a></li>
                <li class="page-item"><a class="page-link" href="#" data-page="${total - 2}">${total - 2}</a></li>
                <li class="page-item"><a class="page-link" href="#" data-page="${total - 1}">${total - 1}</a></li>
                <li class="page-item active"><a class="page-link" href="#" data-page="${total}">${total}</a></li>
                `;
              break;
            }
          }
        }
        if (page.hasNext) {
          str += `
        <li class="page-item"><a class="page-link" href="#" data-page="${Number(page.currentPage) + 1}"><i class="bi bi-chevron-right" data-page="${Number(page.currentPage) + 1}"></i></a></li>
        <li class="page-item"><a class="page-link" href="#" data-page="${total}"><i class="bi bi-chevron-double-right" data-page="${total}"></i></a></li>
        `;
        } else {
          str += `
        <li class="page-item disabled"><span class="page-link"><i class="bi bi-chevron-right"></i></span></li>
        <li class="page-item disabled"><span class="page-link"><i class="bi bi-chevron-double-right"></i></span></li>
        `;
        }
        document.querySelector("#pageId").innerHTML = str;
      }
    },
    switchPage(event) {
      if (event.target.nodeName !== "A" && event.target.nodeName !== "I") {
        return;
      }
      const page = event.target.dataset.page;
      this.getScrollHeight();
      window.scrollTo(0, this.height);
      this.pagination(page);
    },
    getScrollHeight() {
      if (window.document.body.scrollWidth < 769) {
        this.height = this.$refs.scrollPoint.offsetTop + this.$refs.scrollPoint.offsetHeight - 100;
      } else {
        this.height = this.$refs.scrollPoint.offsetTop + this.$refs.scrollPoint.offsetHeight;
      }
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
  mounted() {
    this.category = this.$route.query.category || "所有類別";
    this.city = this.$route.query.city || "";
    this.getTourData();
  },
};
</script>