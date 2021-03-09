<template>
  <div style="display: flex;">
    <div id="app">
      <div class="step_1" v-if="step == 1">
        <div class="d-flex service_types">
          <div
              :class="service_type == 'cat' ? 'select' : ''"
              v-if="services.filter(el => el.type === 'cat').length > 0"
          >
            <div class="service_type_box pointer" @click="setServiceType('cat')">
              <img :src="'https://api.null-it.ru/images/cat_icon'+(service_type == 'cat' ? '_select' : '')+'.svg'">
            </div>
            <b>{{ $t('form.services_types.cat') }}</b>
          </div>
          <div
              :class="service_type == 'dog' ? 'select' : ''"
              v-if="services.filter(el => el.type === 'dog').length > 0"
          >
            <div class="service_type_box pointer" @click="setServiceType('dog')">
              <img :src="'https://api.null-it.ru/images/dog_icon'+(service_type == 'dog' ? '_select' : '')+'.svg'">
            </div>
            <b>{{ $t('form.services_types.dog') }}</b>
          </div>
          <div
              :class="service_type == 'other' ? 'select' : ''"
              v-if="services.filter(el => el.type === 'other').length > 0"
          >
            <div class="service_type_box pointer" @click="setServiceType('other')">
              <img :src="'https://api.null-it.ru/images/other_icon'+(service_type == 'other' ? '_select' : '')+'.svg'">
            </div>
            <b>{{ $t('form.services_types.other') }}</b>
          </div>
        </div>

        <div class="services_select_title">
          <div>
            {{ $t('form.services') }}
          </div>
          <div class="services_select_count">
            <div v-if="services_select.length == 0">
              <img src="https://api.null-it.ru/images/services_select_none.svg"> {{ $t('form.services_no_select') }}
            </div>
            <div v-else class="select">
              <img src="https://api.null-it.ru/images/services_select_active.svg"> {{ $t('form.services_selected') }} {{ services_select.length }}
            </div>
          </div>
        </div>

        <div class="scroll_items" style="height: calc(100vh - 166px)">
          <div class="services_select">
            <div class="services_select_scroll">
              <div
                  v-for="(service,k) in services.filter(el => el.type === service_type)"
                  :key="k"
                  class="service_select pointer"
                  @click="selectServiceCard(service)"
              >
                <div
                    class="img"
                    :style="service.image ? 'background-image: url('+service.image+')' : ''"
                >

                </div>
                <div
                    class="service_select_content"
                >
                  <div class="service_select_content_title"><b>{{ service.name }}</b></div>
                  <div class="service_select_content_content">
                    <div class="service_select_content_description">
                      {{ service.description }}
                    </div>
                    <div class="service_select_content_price">
                      <div>
                        <b>от {{ service.price }}</b>
                      </div>
                      <div class="ml-auto">
                        <a
                            class="btn-select-service"
                            v-if="!services_select.includes(service.id)"
                        >
                          {{ $t('form.select') }}
                        </a>
                        <a
                            v-else
                            class="btn-select-service remove"
                        >
                          {{ $t('form.remove') }}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="step_1_btn">
            <div class="m-auto">
              <a class="btn-next-step" v-if="services_select.length == 0">
                {{ $t('form.select_services') }}
              </a>
              <a class="btn-next-step active" v-else @click="toSelectSalon">
                {{ $t('form.next') }}
              </a>
            </div>
          </div>
        </div>

      </div>
      <div class="step_2" v-if="step == 2">
        <div class="step_back">
          <div @click="to_step(1)" class="pointer">
            <img src="https://api.null-it.ru/images/left_back.svg"/>
          </div>
          <div class="m-auto">
            {{ $t('form.select_salon') }}
          </div>
          <div style="width: 44px"></div>
        </div>
        <div class="scroll_items">
          <div
              v-for="(salon, k) in salons"
              class="salon pointer"
              @click="setSalon(salon)"
              :key="k"
          >
            <div>
              <img src="https://api.null-it.ru/images/salon_icon.svg"/>
            </div>
            <div class="salon-address">
              <div class="title"><b>{{ $t('form.address') }}</b></div>
              {{ salon.address }}
            </div>
            <div class="salon-next ml-auto">
              <img src="https://api.null-it.ru/images/button_next.svg"/>
            </div>
          </div>
        </div>
      </div>
      <div class="step_3" v-if="step == 3">
        <div class="step_back">
          <div @click="to_step(2)" class="pointer">
            <img src="https://api.null-it.ru/images/left_back.svg"/>
          </div>
          <div class="m-auto">
            {{ $t('form.select_master') }}
          </div>
          <div style="width: 44px"></div>
        </div>
        <div class="scroll_items">
          <div
              v-for="(master, k) in salon_select.masters"  @click="setMaster(master)"
              :key="k"
              class="master pointer"
          >
            <div class="d-flex">
              <div>
                <img :src="master.photo" class="avatar"/>
              </div>
              <div class="master-name">
                <div class="title"><b>{{ master.name }}</b></div>
              </div>
              <div class="master-next ml-auto">
                <img src="https://api.null-it.ru/images/button_next.svg"/>
              </div>
            </div>#app
            <div class="master-description">
              {{ master.description }}
            </div>
          </div>
        </div>
      </div>
      <div class="step_4" id="step_4" v-show="step == 4">
        <div class="step_back">
          <div @click="to_step(3)" class="pointer">
            <img src="https://api.null-it.ru/images/left_back.svg"/>
          </div>
          <div class="m-auto">
            {{ $t('form.information') }}
          </div>
          <div style="width: 44px"></div>
        </div>
        <form
            v-on:submit.prevent="submitData"
            class="scroll_items"
            id="scroll"
        >
          <div class="master">
            <div class="master-card d-flex">
              <div>
                <img :src="master_select.photo" class="avatar"/>
              </div>
              <div class="master-name">
                <div class="title"><b>{{ master_select.name }}</b></div>
              </div>
              <div class="master-next ml-auto">
                <img src="https://api.null-it.ru/images/services_select_active.svg" width="32px"/>
              </div>
            </div>
            <div class="d-flex date_select">
              <div class="date_select_icon">
                <img src="https://api.null-it.ru/images/step_4_calendar.svg" />
              </div>
              <div class="date_select_text pointer">
                <v-date-picker
                    v-model="select_date"
                    :attributes="date_attributes"
                    required
                    :model-config="{
                                        type: 'string',
                                        mask: 'YYYY-MM-DD',
                                      }"
                >
                  <template v-slot="{ inputValue, togglePopover }">
                    <span v-if="!inputValue"  @click="togglePopover()">{{ $t('form.select_visit_date') }}</span>
                    <span v-else @click="togglePopover()">{{ inputValue }}</span>
                  </template>
                </v-date-picker>
              </div>
            </div>
            <div class="d-flex date_select" v-if="select_date">
              <div class="date_select_icon">
                <img src="https://api.null-it.ru/images/step_4_time.svg" />
              </div>
              <div class="date_select_text pointer">
                <div class="btn-group" >
                                <span @click="toggleMenu()" class="dropdown-toggle">
                                    {{ selected_time ? selected_time.time : this.$t('form.select_visit_time')  }}
                                </span>

                  <ul class="dropdown-menu" v-if="showMenu">
                    <li v-for="(option, idx) in day_times" :key="idx">
                      <a href="javascript:void(0)" @click="updateOption(option)">
                        {{ option.time }}
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div class="form-group">
            <label>{{ $t('form.order.name') }}</label>
            <input
                required
                type="text"
                name="name"
                class="form-control"
                v-model="order.name"
            />
          </div>

          <div class="form-group">
            <label>{{ $t('form.order.nickname') }}</label>
            <input
                required
                type="text"
                name="nickname"
                class="form-control"
                v-model="order.nickname"
            />
          </div>

          <div class="form-group">
            <label>{{ $t('form.order.phone') }}</label>
            <input
                required
                type="text"
                name="phone"
                placeholder="+7 _"
                class="form-control"
                v-model="order.phone"
            />
          </div>

          <div class="form-group">
            <label>{{ $t('form.order.email') }}</label>
            <input
                required
                name="email"
                type="email"
                class="form-control"
                v-model="order.email"
            />
          </div>

          <div class="form-group">
            <label>{{ $t('form.order.comment') }}</label>
            <textarea
                name="comment"
                class="form-control"
                v-model="order.comment"
            ></textarea>
          </div>
          <div class="form-group d-flex">
            <button type="submit" class="m-auto btn btn-next-step active">{{ $t('form.send') }}</button>
          </div>
        </form>
      </div>
      <div class="step_5 d-flex" v-if="step == 5">
        <div class="box">
          <h2>{{ $t('form.request_send') }}</h2>
          <div class="description">
            {{ $t('form.will_contact') }}
          </div>
          <div>
            <a class="btn-next-step active" @click="to_step(1)">Ok</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "index",
  data() {
    return {
      step: 1,
      services: [],
      salons: [],
      services_select: [],
      salon_select: {},
      master_select: {},
      master_select_diapasons: [],
      select_date: null,
      service_type: 'cat',
      organization_id: this.$route.query.organization_id ? this.$route.query.organization_id : 1,
      date_attributes: [
        {
          dot: 'green',
          dates: [],
        }
      ],
      base_url: "https://api.null-it.ru/api/v1/clients/",
      day_times: [],
      showMenu: false,
      selected_time: null,
      order: {
        name: '',
        nickname: '',
        phone: '',
        email: '',
        comment: ''
      }
    }
  },
  watch: {
    'select_date': function () {
      this.selected_time = null
      this.loadByDay()
    }
  },
  mounted () {
    if (this.$route.query.lang){
      this.$i18n.locale = this.$route.query.lang
    }

    this.$axios.get(this.base_url + this.organization_id + '/services').then((response) => {
      this.services = response.data

      if (this.services.filter(el => el.type === 'dog').length > 0){
        this.service_type = 'dog'
      } else
      if (this.services.filter(el => el.type === 'other').length > 0) {
        this.service_type = 'other'
      }
    })
    this.$axios.get(this.base_url + this.organization_id + '/salons').then((response) => {
      this.salons = response.data
    })
    const scroll = document.getElementById('scroll');
    scroll.onscroll = (e) => {
      if (e.target.scrollTop < 140){
        document.getElementById('step_4').style.backgroundPositionY = "-"+(e.target.scrollTop+40)+"px";
      }
    }
  },
  methods: {
    setServiceType(type){
      this.service_type = type
      this.services_select = [];
    },
    selectServiceCard(service){
      if (!this.services_select.includes(service.id)){
        this.selectService(service)
      }else {
        this.removeService(service)
      }
    },
    selectService(service) {
      this.services_select.push(service.id)
    },
    removeService(service){
      this.services_select = this.services_select.filter(el => el !== service.id)
    },
    to_step(step){
      this.step = step
      if (step == 3){
        //выбор мастера
        if (this.salon_select.masters.length == 1){
          //если в выбраном салоне 1 мастер - перекинуть не на выбор мастера а на выбор салона
          this.to_step(2)
        }
      }
      if (step == 2){
        //выбор мастера
        if (this.salons.length == 1){
          //если салон один - выбор услуг
          this.to_step(1)
        }
      }
    },
    toSelectSalon(){
      if (this.salons.length == 1){
        this.setSalon(this.salons[0])
      }else {
        this.step = 2
      }
    },
    setSalon(salon){
      this.salon_select = salon
      if (this.salon_select.masters.length == 1){
        this.setMaster(salon.masters[0])
      }else {
        this.step = 3
      }
    },
    setMaster(master){
      this.master_select = master
      this.step = 4

      this.$axios.get(this.base_url + this.organization_id + '/masters/' + master.id + '/working-diapasons', {
        params: {
          type: 'days'
        }
      })
          .then((response) => {
            response.data.forEach(item=>{
              this.date_attributes[0].dates.push(new Date(item.days))
            })
          })
    },
    loadByDay(){
      this.$axios.get(this.base_url + this.organization_id + '/masters/' + this.master_select.id + '/working-diapasons', {
        params: {
          type: 'by_day',
          day: this.select_date
        }
      })
          .then((response) => {
            this.day_times = response.data
          })
    },
    toggleMenu() {
      this.showMenu = !this.showMenu;
    },
    updateOption(option) {
      this.selected_time = option;
      this.showMenu = false;
    },
    clickHandler(event) {
      const { target } = event;
      const { $el } = this;

      if (!$el.contains(target)) {
        this.showMenu = false;
      }
    },
    submitData(){
      let data = {
        name: this.order.name,
        nickname: this.order.nickname,
        phone: this.order.phone,
        email: this.order.email,
        comment: this.order.comment,
        date: this.select_date,
        time_start: this.selected_time.time,
        master_id: this.master_select.id,
        services: this.services_select
      }

      this.$axios.post(this.base_url + this.organization_id + '/orders', data)
          .then(() => {
            this.order.name = null
            this.order.nickname = null
            this.order.phone = null
            this.order.email = null
            this.order.comment = null
            this.select_date = null
            this.selected_time = null
            this.master_select = {}
            this.services_select = []
            this.step = 5
          })
          .catch((error) => {
            console.warn(error)
          })
    }
  }
}
</script>

<style>
label {
  color: #90939D;
  font-weight: normal;
}
.form-control {
  background-color: #F2F2F2;
  border: 0px;
  box-shadow: none;
  padding: 16px 24px;
  height: auto;
  color: #282828;
  font-size: 15px;
}
.form-group {
  margin-bottom: 24px;
}
#app {
  margin: auto;
  width: 100%;
  height: 100vh;
  border: 0;
  border-radius: 4px;
  overflow: hidden;
  background: url("https://api.null-it.ru/images/bg.svg");
}
.service_types {
  justify-content: space-around;
  margin-top: 10px;
  padding-left: 16px;
  padding-right: 16px;
  text-align: center;
  color: #282828;
}
.service_type_box {
  width: 108px;
  height: 90px;
  background-color: #F4F4F5;
  border-radius: 16px;
  display: flex;
  align-items: center;
  border: 8px solid white;
}
.service_type_box img {
  margin: auto;
}
.service_types .select .service_type_box {
  border: 8px solid #D2C4DF;
  background-color: #8641C6;
}
.pointer {
  cursor: pointer;
}
.services_select_title {
  padding-top: 20px;
  padding-right: 16px;
  padding-left: 16px;
  font-weight: 500;
  font-size: 17px;
  line-height: 22px;
  color: #90939D;
  display: inline-flex;
  width: 100%;
  align-items: center;
}
.services_select_title .services_select_count {
  margin-left: auto!important;
}
.services_select_title .services_select_count div {
  font-size: 15px;
  line-height: 22px;
  align-items: center;
  display: flex;
}
.services_select_title .services_select_count .select {
  color: #ACDE84;
}
.services_select_title .services_select_count div img {
  margin-right: 6px;
}
.services_select {
  width: calc(100% - 16px);
  overflow-x: auto;
}
.services_select_scroll {
  display: inline-flex;
}
.service_select {
  margin-top: 16px;
  width: 222px;
  height: 307px;
  background: #FFFFFF;
  box-shadow: 0px 4px 20px rgba(45, 58, 103, 0.2);
  border-radius: 20px;
  margin-right: 16px;
  margin-bottom: 30px;
}
.service_select:first-child {
  margin-left: 16px;
}
.service_select .img {
  width: 222px;
  height: 124px;
  border-radius: 20px;
  background-position: center;
  background-size: cover;
}
.service_select_content {
  padding: 16px;
}
.service_select_content_content {
  height: 130px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.service_select_content_description {
  padding-top: 12px;
  font-size: 14px;
  line-height: 16px;
  color: #90939D;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 5; /* number of lines to show */
  -webkit-box-orient: vertical;
}
.service_select_content_price {
  display: flex;
}
.btn-select-service {
  background: #D2C4DF;
  color: white;
  padding: 6px 25px;
  border-radius: 10px;
}
.btn-select-service:hover {
  color: white;
  text-decoration: none;
  cursor: pointer;
}
.btn-select-service.remove {
  background: #8641C6;
}
.step_1_btn {
  margin-top: 15px;
  display: flex;
  padding-bottom: 30px;
}
.btn-next-step {
  display: inline-block;
  background: #E9E9EB;
  color: #90939D;
  padding: 16px 54px;
  border-radius: 54px;
}
.btn-next-step:hover {
  text-decoration: none;
  cursor: pointer;
  color: #90939D;
}
.btn-next-step.active {
  background: #FC7F6C;
  color: #FFFFFF;
}
.step_2, .step_3, .step_4 {
  background: url("https://api.null-it.ru/images/step_2_bg.svg");
  background-repeat: no-repeat;
  background-size: 100%;
  background-position: 0px -40px;
  max-height: 100%;
}

.salon {
  padding: 30px;
  background: #FFFFFF;
  box-shadow: 0px 4px 20px rgba(45, 58, 103, 0.2);
  border-radius: 20px;
  margin-bottom: 16px;
  display: flex;
}
.salon-address {
  margin-left: 16px;
  margin-right: 16px;
}
.salon-address .title {
  color: #8641C6;
}
.step_back {
  display: flex;
  color: white;
  padding: 16px;
}
.avatar {
  width: 64px;
  height: 64px;
  border-radius: 50%;
}
.scroll_items {
  overflow:hidden;
  overflow-y:scroll;
  padding: 16px;
  height: calc(100vh - 78px);
}

.master {
  padding: 30px;
  background: #FFFFFF;
  box-shadow: 0px 4px 20px rgba(45, 58, 103, 0.2);
  border-radius: 20px;
  margin-bottom: 16px;
}
.master-name {
  margin-left: 16px;
  margin-right: 16px;
  align-items: center;
  display: flex;
}
.master-name .title {
  color: #8641C6;
  font-size: 17px;
}
.master-next {
  align-items: center;
  display: flex;
}
.master-description {
  padding-top: 16px;
  color: #90939D;
  font-size: 15px;
}

.step_4 .master {
  margin-bottom: 16px;
  padding: 0px;
}
.step_4 .master-card {
  padding: 16px;
}
.step_4 .date_select {
  border-top: 1px #E9E9EB solid;
  padding: 22px 16px;
  align-items: center;
}
.date_select_icon {
  padding-right: 16px;
}
.date_select_text {
  color: #90939D;
}


.btn-group {
  position: relative;
  vertical-align: middle;
  display: flex;
  align-items: center;
}
.btn-group a:hover {
  text-decoration: none;
}

.dropdown-toggle {

  min-width: 160px;
  text-transform: none;
  border: 0;
  transition: background 0s ease-out;
  float: none;
  box-shadow: none;
  border-radius: 0;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  padding: 0;
  margin: 0;
}
.dropdown-toggle:hover {
  cursor: pointer;
}

.dropdown-menu {
  display: block!important;
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 1000;
  float: left;
  min-width: 160px;
  padding: 5px 0;
  margin: 2px 0 0;
  list-style: none;
  font-size: 14px;
  text-align: left;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.175);
  background-clip: padding-box;
  max-height: 200px;
  overflow-y: auto;
}

.dropdown-menu > li > a {
  padding: 10px 30px;
  display: block;
  clear: both;
  font-weight: normal;
  line-height: 1.6;
  color: #333333;
  white-space: nowrap;
  text-decoration: none;
}
.dropdown-menu > li > a:hover {
  background: #efefef;
  color: #8641C6;
}

.dropdown-menu > li {
  overflow: hidden;
  width: 100%;
  position: relative;
  margin: 0;
}

li {
  list-style: none;
}

.step_5 {
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  background: rgba(134, 65, 198, 0.4);
  backdrop-filter: blur(10px);
}
.step_5 .box {
  text-align: center;
  max-width: 80%;
  background-color: #FFFFFF;
  box-shadow: 0px 4px 20px rgba(45, 58, 103, 0.2);
  border-radius: 20px;
  padding: 32px;
}
.box .description {
  color: #90939D;
  margin-bottom: 32px;
}
</style>
