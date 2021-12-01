<template>
  <base-popup
      :caption="$t('app.components.salons.update')"
      @closePopup="closePopup"
      :success_error="success_error"
      dialogSize="modal-lg"
  >
    <template v-slot:body>
      <div class="row">
        <div class="col-lg-12">
          <form-group
              :label="$t('app.components.salons.fields.address')"
              type="textarea"
              name="address"
              disabled
              v-model="salon.address"
              :errors="errors"
          />
        </div>
        <div class="col-lg-12">
          <i class="fa fa-map-marker fa-lg map-pointer"/>
          <div class="map-container" ref="map">

          </div>
        </div>

        <div class="col-lg-12 mt-4 d-flex">
          <a class="btn btn-purpure" @click="findMe">{{ $t("base.find_me") }}</a>
          <a class="ml-auto btn btn-success" @click="submit">{{$t('base.update')}}</a>
        </div>
      </div>
    </template>
  </base-popup>
</template>

<script>
import BasePopup from "@/components/base/Popup";
import {Loader} from 'google-maps'
import FormGroup from "@/components/base/FormGroup";
import {salon_update} from "@/api";

export default {
  name: "Update",
  props: {
    salon: {
      type: Object,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: {
        address: "",
        lat: "",
        long: "",
      }
    }
  },
  data() {
    return {
      map: null,
      errors:{},
      addressObject: null,
      success_error: {
        success: false,
        error: false
      },
      mapOptions: {
        disableDefaultUI: false,
        center: {
          lat: this.salon.lat ? this.salon.lat : 55.7519449,
          lng: this.salon.long ? this.salon.long : 37.6249436
        },
        zoom: 15
      },
      libraries: ['places'],
      apiKey: "AIzaSyDIBD474WLp4j9QJL5DjT8sd-tEH7zF-oI",
    }
  },
  created() {
    const loader = new Loader(this.apiKey, {
      libraries: this.libraries,
      language: this.$i18n.locale,
    })
    loader.load().then(this.initMap)
  },
  components: {FormGroup, BasePopup},
  methods: {
    submit(){
      if (!this.salon.address){
        this.errors = {
          address: [
            this.$t('base.validation.address_not_found')
          ]
        }
        return
      }
      salon_update(this.salon.id, this.salon).then(() => {
        this.success_error.success = true
        setTimeout(() => {
          this.closePopup()
        }, 2000);
      })
          .catch((error) => {
            this.success_error.error = true
            if (error.response?.data?.errors) this.errors = error.response?.data?.errors
          })
    },
    closePopup() {
      this.$emit('closePopup');
    },
    initMap(google) {
      this.google = google
      const mapContainer = this.$refs.map
      if (this.center){
        this.mapOptions.center = this.center
      }
      this.map = new this.google.maps.Map(
          mapContainer, this.mapOptions
      )
      const geocoder = new google.maps.Geocoder();

      this.map.addListener('center_changed', ()=>{
        clearTimeout(this.timeout)
        this.timeout = setTimeout(()=>{
          this.timeout = null
          const newCenter = this.map.getCenter()
          const latlng = {
            lat: newCenter.lat(),
            lng: newCenter.lng(),
          };

          geocoder.geocode({ location: latlng }, (results, status) => {
            // // eslint-disable-next-line no-debugger
            // debugger;
            if (status === "OK") {

              if (results[0]) {
                this.setAddress(results[0].formatted_address, latlng.lat, latlng.lng)
              }
            }
          });
        }, 1000)
      })
    },
    setAddress(address, lat, lon){
      this.salon.address = address
      this.salon.lat = lat
      this.salon.long = lon
      this.errors = {}
    },
    findMe(){
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          this.map.setCenter({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        }, function () {
        });
      }else{
        console.warn("navigator error")
      }
    },
  }
}
</script>

<style scoped>
.map-container{
  width: 100%;
  min-height: 400px;
}
.map-pointer{
  color: #6a1b9a;
  position: absolute;
  justify-self: center;
  align-self: center;
  left: calc(50% - 10px);
  top: calc(50% - 20px);
  margin: auto;
  width: 20px;
  height: 20px;
  z-index: 2;
}
</style>
