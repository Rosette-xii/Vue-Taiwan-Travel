<template>
  <div id="index">
    <div class="banner position-relative" id="banner">
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

        <form class="d-flex" @submit.prevent="submit()">
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
          <button type="submit" class="searchBtn mx-1 mx-md-2" id="searchBtn">
            <i class="bi bi-search text-white fs-6"></i>
          </button>
        </form>
      </div>
    </div>

    <section class="hotAttractions">
      <div class="container">
        <h3 class="pb-3">熱門景點</h3>
        <p class="subtitle pb-5">
          台灣的各個美景，都美不勝收。<br />
          等你一同來發現這座寶島的奧妙！
        </p>

        <div class="row">
          <div class="col-12 col-md-6 col-lg-3 mb-5" v-for="item in hotAttractions" :key="item.id">
            <div class="card">
              <div class="card-img-block">
                <img :src="item.image.imgUrl" class="card-img-top" :alt="item.image.alt" />
              </div>
              <div class="card-body">
                <h5 class="card-title pb-1">{{ item.name }}</h5>
                <span><i class="bi bi-clock pe-1"></i>{{ item.infos.openTime }}</span>
                <p class="card-text pt-3"><i class="bi bi-geo-alt-fill pe-1"></i>{{ item.city }}</p>
              </div>
              <a href="#" class="card-btn" data-bs-toggle="modal" :data-bs-target="'#' + item.name">了解更多</a>
            </div>

            <div class="modal fade" :id="item.name" tabindex="-1" aria-labelledby="attractions1Label" aria-hidden="true">
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header border-0">
                    <h5 class="modal-title" id="attractions1Label">
                      {{ item.name }}
                    </h5>
                    <button type="button" class="btn" data-bs-dismiss="modal" aria-label="Close">
                      <i class="bi bi-x-lg"></i>
                    </button>
                  </div>

                  <div class="modal-body">
                    <p class="fs-sm pb-3"><i class="bi bi-geo-alt-fill pe-1"></i>{{ item.address }}</p>
                    <p class="pb-3 pb-md-5">
                      {{ item.descriptionDetail }}
                    </p>
                    <div class="row">
                      <div class="col-12">
                        <img :src="item.image.imgUrl" :alt="item.image.alt" />
                      </div>
                    </div>
                  </div>

                  <div class="modal-footer border-0 justify-content-between">
                    <ul class="d-block d-md-flex flex-wrap">
                      <li class="pe-4"><i class="bi bi-clock pe-1"></i>{{ item.infos.openTime }}</li>
                      <li class="pe-4"><i class="bi bi-ticket pe-1"></i>{{ item.infos.ticketInfo }}</li>
                      <li class="pe-4"><i class="bi bi-telephone pe-1"></i>{{ item.infos.tel }}</li>
                      <li class="pe-4"><i class="bi bi-list-ul pe-1"></i>{{ item.infos.spotClass }}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="event" data-aos="fade-up">
      <div class="container">
        <h3 class="pb-3">活動類別</h3>
        <p class="subtitle pb-5">
          各種不同的活動內容<br />
          邀請您一同來共襄盛舉！
        </p>

        <div class="row">
          <div class="col-9 col-md-6 col-lg-3 mb-5" v-for="item in eventData" :key="item.id">
            <a href="./event.html" @click.prevent="goEvent(item.eventName)">
              <div class="card">
                <div class="event-img">
                  <img :src="item.imgUrl" :alt="item.eventName" />
                </div>
              </div>
              <h5 class="text-center fs-6 fw-bold pt-4">
                {{ item.eventName }}
              </h5>
            </a>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      category: "",
      city: "",
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
      hotAttractions: [
        {
          id: 1,
          name: "成功新港漁港",
          city: "臺東縣成功鎮",
          image: {
            imgUrl: "https://www.eastcoast-nsa.gov.tw/image/28792/640x480",
            alt: "親潮和黑潮兩股暖流在此經過，造就了成功漁港豐富的水產資源",
          },
          address: "臺東縣961成功鎮港邊路19號",
          descriptionDetail:
            "成功新港漁港是東海岸地區最大的漁港，漁港面臨太平洋，是黑潮暖流經過的海域，鬼頭刀、旗魚、鰹魚等豐富的海洋資源，造就了成功獨特的鏢旗魚技藝，以及漁業文化的蓬勃發展。當每年10月吹起東北季風時，正是旗魚的盛產季節，漁民鏢旗魚的獨到技藝，讓旗魚肉質保留了鮮Q的口感，深受各地老饕的喜愛，紛紛來成功飽啖美味的旗魚大餐！黑潮暖流經過的成功，也是賞鯨的好地方！搭乘賞鯨船乘風破浪，遙望美麗的東海岸島嶼之餘，還有機會欣賞到海豚成群在海中跳躍，那美麗的時刻總是令人難以忘懷。除了賞鯨、冬天大啖旗魚之外，成功鎮上還有各種特色小吃、伴手禮，多汁的鬼頭刀魚排、綿密的成功豆花、用當地食材製作的手工餅等等，都是來成功不可錯過的美食喔！",
          infos: {
            openTime: "全天候開放",
            ticketInfo: "免費入場",
            tel: "886-8-9851004",
            spotClass: "遊憩類",
          },
        },
        {
          id: 2,
          name: "石梯坪",
          city: "花蓮縣豐濱鄉",
          image: {
            imgUrl: "https://www.eastcoast-nsa.gov.tw/image/28701/640x480",
            alt: "宛如鬼斧神工般的石梯坪海蝕地形",
          },
          address: "花蓮縣豐濱鄉石梯坪52號",
          descriptionDetail:
            "長虹橋優雅的拱形橋身橫跨在秀姑巒溪出海口處兩岸，在山海交際之處形成一道美麗的虹影，成為東海岸的著名拍照地標，而這裡也是泛舟的終點站，一艘艘疲倦又滿足的泛舟筏在這裡靠岸。沿著步道在溪畔漫步，水鳥輕巧的在河床邊覓食，自行車來來往往，兩旁的植物隨季節變換風景，若是累了，不妨到附近的新太平洋1號店稍作休息，喝杯下午茶，度過悠閒的時光。出海口的奚卜蘭島，又稱作獅球嶼，綠意蒼蒼的小島是當地海岸阿美族的聖地，也是火山集塊岩構成的島嶼，由於溪流阻隔，保有相當天然的生態相貌，在河口覓食的鳥類、洄游魚類和蝦蟹都會在此聚集，是做生態觀察的好地點。",
          infos: {
            openTime: "全天候開放",
            ticketInfo: "免費入場",
            tel: "886-3-8671326",
            spotClass: "遊憩類",
          },
        },
        {
          id: 3,
          name: "新岑公園",
          city: "嘉義縣布袋鎮",
          image: {
            imgUrl: "https://swcoast-nsa.travel/image/35376/640x480",
            alt: "新岑公園植栽多",
          },
          address: "嘉義縣625布袋鎮161縣道13號",
          descriptionDetail:
            "布袋不僅是濕地糧倉更是環境生態的寶地，有許多候鳥棲息地及賞鳥點，其中又以南布袋濕地新岑公園為最佳觀賞點，賞鳥點距離200多公尺便能看見黑面琵鷺及各種鳥類，而防風林邊的賞鳥牆、活動廣場、步道及停車空間等遊憩服務設施，提供給國內外學者專家及賞鳥人士一個舒適的賞鳥環境。南布袋鹽田濕地占地面積約722.21公頃，依據109年度調查成果，可見黑面琵鷺、鸕鷓、雁鴨科(琵嘴鴨、綠頭鴨、淺鴨)、小水鴨、赤頸鳧、高蹺鴴、紅嘴鷗、黑尾鷗、埃及聖鹮、東方環頸鴴、青足鷸等鴴鷸科、小白鷺、夜鷺等鷺科等鳥類，其中當日黑面琵鷺觀測數量高達639隻，植物種類包含台灣構樹、苦楝狗尾草、茅草、龍爪茅等，另可見魚蝦貝類、水生植物海菜、絲藻、流蘇及石蓴等藻類，足見其生態非常豐富。",
          infos: {
            openTime: "全天候開放",
            ticketInfo: "免費入場",
            tel: "886-5-3470051",
            spotClass: "自然風景類",
          },
        },
        {
          id: 4,
          name: "臺灣省城隍廟",
          city: "臺北市中正區",
          image: {
            imgUrl: "https://www.travel.taipei/image/155558",
            alt: "臺灣省城隍廟",
          },
          address: "未提供資料",
          descriptionDetail:
            "臺灣省城隍廟原為官廟，如今已成立為財團法人，是臺灣制度最健全的公廟之一。1875年，清廷將淡水廳升格臺北府，旋由陳星聚開府臺北。1881年，臺北府衙在撫台街後方，即府直街和北門街口(臺北市延平南路和漢口街間）建臺北府城隍廟。日據時期城隍廟被拆，臺灣光復後改設現址，周邊交通便捷，商業繁榮，是附近居民的信仰中心，更因為城隍爺神威遠播，信眾遍及海內外。本廟是臺北城內規模最大的廟宇，供奉主神城隍爺，另有釋迦牟尼佛、藥師佛、阿彌陀佛、觀音菩薩和地藏菩薩，關聖帝君、孚佑帝君、文昌帝君、濟公禪師、城隍夫人、福德正神......等，內部對聯、匾額、剪黏、彩繪或雕刻，都以「趨吉避凶，教化人心。」、「潛移默化」為宗旨，讓前往參拜的信眾獲得心靈的啟迪。",
          infos: {
            openTime: "06:00~21:00",
            ticketInfo: "免費入場",
            tel: "886-2-23615080",
            spotClass: "遊憩類",
          },
        },
        {
          id: 5,
          name: "清境農場",
          city: "南投縣仁愛鄉",
          image: {
            imgUrl: "http://travel.nantou.gov.tw/manasystem/files/scenic/20140310095216_清境農場青青草原-1.jpg",
            alt: "青青草原",
          },
          address: "南投縣仁愛鄉大同村仁和路170號",
          descriptionDetail: "清境農場四季景致秀麗，各有趣味，信步其中可盡覽清境之美：碧湖映壽、步步高升、慈雲獻壽、青青草原、果林飄香、心誠則靈，不妨細細品味高山原野自然恬靜的氣氛。廣義的清境，包含退輔會清境農場及周邊地區，南起霧社，北至梅峰，省道台14甲線貫穿其間，青青草原、觀山牧區、壽山園生態區、步步高升至小瑞士花園為主要賞景與遊憩動線。",
          infos: {
            openTime: "08：00~17：00",
            ticketInfo: "免費入場",
            tel: "886-2-23615080",
            spotClass: "自然風景類",
          },
        },
        {
          id: 6,
          name: "蛟龍瀑布",
          city: "嘉義縣阿里山鄉",
          image: {
            imgUrl: "https://www.ali-nsa.net/image/5060/640x480",
            alt: "蛟龍瀑布",
          },
          address: "嘉義縣605阿里山鄉",
          descriptionDetail:
            "巍峨高聳的蛟龍瀑布又被喚作「台灣之瀧」，是一座因斷層形成的瀑布，位於豐山東南方的塔山尾稜岩壁上，其水源則是清水溪上游的支流蛟龍溪。在日治時期留存的手繪地圖中被標示為「大瀧」，在日語中為特大瀑布之意。蛟龍瀑布懸掛在高達1600公尺的懸崖絕壁上，落差846公尺，水量豐沛時，可見瀑布分作兩層俯衝而下，猶如白色巨龍，水勢磅礡，讓人體驗到大自然的威力，遠觀就像一幅山水畫作，可謂豪雨後的限定版美景，深獲遊客和攝影師的喜愛。當水量少時，則會看見大面積的山壁，流水則分作四層直落山谷，故建議想一窺蛟龍瀑布壯美之姿的旅人們在雨季時前往。",
          infos: {
            openTime: "每日開放",
            ticketInfo: "免費入場",
            tel: "886-5-2593900",
            spotClass: "遊憩類",
          },
        },
        {
          id: 7,
          name: "柴口浮潛區",
          city: "臺東縣綠島鄉",
          image: {
            imgUrl: "https://www.eastcoast-nsa.gov.tw/image/29042/640x480",
            alt: "柴口十分適合新手來體驗浮潛",
          },
          address: "臺東縣951綠島鄉環島公路2公里處",
          descriptionDetail:
            "綠島主要的浮潛區有二處，分別為柴口與石朗，而柴口不僅十分適合新手來體驗浮潛，也是每年6-8月強勁的西南風吹臨綠島時，位在避風面的柴口是絕佳浮潛區。柴口以壯麗的石珊瑚景觀著稱，海水深淺變化具有層次感，讓人能夠盡情享受瑰麗的海底景觀。柴口潛水區近海與大礁石間的潮間帶，海域變化層次多，海底礁石林立，近岸海底和大礁石間為礁岩平台地形，覆蓋在礁石上以團塊和表覆形珊瑚群體等石珊瑚種類為主；浮潛完後，走在潛水步道上近距離觀察潮間帶生物，可找到海藻、海膽、海星的蹤影。早期開墾綠島的漢人曾與島上原住民族發生爭鬥，兩聚落於此地以木材築牆對峙，當時稱為柵口，後來隨著地方發展建設，才更名為「柴口」；從公館到柴口、中寮間的北海岸，是綠島海岸平原面積最廣的地方；海岸地形仍是以珊瑚裙礁為主體，柴口與中寮則是綠島砂丘孕育的最佳之處，也是綠島僅有的兩處沙灘之一。",
          infos: {
            openTime: "全天候開放",
            ticketInfo: "免費入場",
            tel: "886-5-2593900",
            spotClass: "遊憩類",
          },
        },
        {
          id: 8,
          name: "福隆海水浴場",
          city: "新北市貢寮區",
          image: {
            imgUrl: "https://newtaipei.travel/content/images/attractions/25573/640x480_attractions-image-6ritkukt_0onivc3vaclvq.jpg",
            alt: "風帆與沙雕",
          },
          address: "新北市228貢寮區福隆里福隆街42號",
          descriptionDetail:
            "福隆貢寮一帶的海岸線佈滿了細軟金黃的海砂，優美的弧型海灘，配上藍天碧海，讓福隆博得黃金海岸的美譽，雙溪河在此入海，形成內河、外海的雙重景觀，彎月型的彩虹橋連結兩處，內河河面寬廣、水流平穩，適合從事風帆、獨木舟、拖曳傘等活動，外海的海水浴場寬約60公尺，長約3000公尺，可從事游泳、戲水、灘地活動等，絕對是夏日玩水的最佳消暑去處。此外，每年5月至7月左右會舉辦由來自數十個不同國家的沙雕藝術家，在沙灘上展示精美沙雕創作的「福隆國際沙雕藝術節」；7月到8月之間，則會在美麗沙灘上舉辦「貢寮國際海洋音樂祭」，每年活動約舉辦3-5天不等，會邀請國內外樂團前來共襄盛舉，是充滿陽光、沙灘、美酒與夕陽的大型音樂饗宴。想要參加這些活動的遊客一定要挑對日子前來！",
          infos: {
            openTime: "09:00-17:00 依不同活動展出有所變動",
            ticketInfo: "免費入場",
            tel: "886-2-24991188",
            spotClass: "遊憩類、體育健身類",
          },
        },
      ],
      eventData: [
        {
          id: 1,
          imgUrl: "https://images.unsplash.com/photo-1498931299472-f7a63a5a1cfa?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=350&q=80",
          eventName: "年度活動",
        },
        {
          id: 2,
          imgUrl: "https://images.unsplash.com/photo-1576948676327-46cb0e272a69?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=350&q=80",
          eventName: "藝文活動",
        },
        {
          id: 3,
          imgUrl: "https://images.unsplash.com/photo-1568119948624-ff9807d6be20?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=350&q=80",
          eventName: "節慶活動",
        },
        {
          id: 4,
          imgUrl: "https://images.unsplash.com/photo-1447401097745-cd48a83da97f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=350&q=80",
          eventName: "其他活動",
        },
      ],
    };
  },
  methods: {
    submit() {
      console.log(this.category, this.city);
      this.$router.push({
        path: "/attractions",
        query: {
          category: this.category,
          city: this.city,
        },
      });
    },
    goEvent(str) {
      this.$router.push({
        path: "/events",
        query: {
          category: str,
        },
      });
    },
  },
};
</script>
