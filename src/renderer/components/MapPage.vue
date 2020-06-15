<template>
  <div>
    <div class="overlay">
      <div class="leaflet-top leaflet-right">
        <div class="leaflet-control r_controls">
          <p
            class="overflow-roads-title"
            @click="spoiler(0)"
            :class="{ 'hide-element' : !roadsArray.length}"
          >
            Федеральные трассы
            <i
              :class="{ 'fas fa-eye' : spoilerData[0], 'fas fa-eye-slash' : !spoilerData[0]}"
            ></i>
          </p>
          <div
            class="overflow-roads"
            :class="{ 'hide-element' : !roadsArray.length || !spoilerData[0]}"
          >
            <div
              v-for="(item, index) of roadsArray"
              :key="index"
              class="overflow-roads-container"
              :class="{ 'disabled-element' : !item.polylines.length}"
            >
              <input
                class="overflow-roads-container-checkbox"
                type="checkbox"
                v-model="item.show"
                @change="check(item)"
              />
              <input type="color" v-model="item.color" @change="updateColor(color, item, $event)" />
              <a
                class="overflow-roads-container-roadname"
                href="#"
                title="TITLE"
                role="button"
                @click="focusPolyline(item)"
              >{{item.name}}</a>
            </div>
          </div>
          <p
            class="overflow-roads-title"
            @click="spoiler(1)"
            :class="{ 'hide-element' : !userRoadsArray.length}"
          >
            Пользовательские маршруты
            <i
              :class="{ 'fas fa-eye' : spoilerData[1], 'fas fa-eye-slash' : !spoilerData[1]}"
            ></i>
          </p>
          <div
            class="overflow-roads"
            :class="{ 'hide-element' : !userRoadsArray.length || !spoilerData[1]}"
          >
            <div
              v-for="(item, index) of userRoadsArray"
              :key="index"
              class="overflow-roads-container"
              :class="{ 'disabled-element' : !item.polylines.length}"
            >
              <input
                class="overflow-roads-container-checkbox"
                type="checkbox"
                v-model="item.show"
                @change="check(item)"
              />
              <input type="color" v-model="item.color" @change="updateColor(color, item, $event)" />
              <a
                class="overflow-roads-container-roadname"
                href="#"
                title="TITLE"
                role="button"
                @click="focusPolyline(item)"
              >{{item.name}}</a>
            </div>
          </div>
          <input
            class="input"
            placeholder="Название маршрута"
            type="text"
            v-model="userRoadFields.name"
          />
          <p class="hint">Начало</p>
          <div class="balance-box">
            <input class="input" placeholder="с.ш." type="text" v-model="userRoadFields.startLat" />
            <input class="input" placeholder="в.д." type="text" v-model="userRoadFields.startLng" />
          </div>
          <p class="hint">Конец</p>
          <div class="balance-box">
            <input class="input" placeholder="с.ш." type="text" v-model="userRoadFields.endLat" />
            <input class="input" placeholder="в.д." type="text" v-model="userRoadFields.endLng" />
          </div>
          <p class="hint" :class="{ 'hide-element' : userRoadFields.error}">
            Введите данные формата:
            <b>DD°MM'SS''</b>
          </p>
          <p
            class="hint error"
            :class="{ 'hide-element' : !userRoadFields.error}"
          >{{userRoadFields.error}}</p>
          <div class="balance-box">
            <a class="btn" href="#" @click="addUserRoad()">
              <i class="fas fa-plus-square"></i> Добавить
            </a>
            <a class="btn disabled-element" href="#">
              <i class="fas fa-file-import"></i> Импорт
            </a>
          </div>
        </div>
      </div>
    </div>
    <div id="wrapper">
      <div id="map" />
    </div>
  </div>
</template>



<script>
import axios from "axios";
import SDK from "./SDK/modules.js";
const decoder = require("@mapbox/polyline");
const sdk = new SDK();
require("leaflet-routing-machine");
require("leaflet-control-geocoder");
require("leaflet.icon.glyph");
export default {
  data() {
    return {
      spoilerData: [true, true],
      userRoadsArray: [
      ],
      roadsArray: [],
      map: null,
      userRoadFields: {
        name: null,
        startLat: null,
        startLng: null,
        endLat: null,
        endLng: null,
        color: "#FF0000",
        error: null
      }
    };
  },
  methods: {
    spoiler(data) {
      this.$set(this.spoilerData, data, !this.spoilerData[data]);
    },
    focusPolyline(item) {
      this.map.fitBounds(item.polylines[0].getBounds());
    },
    updateColor(object, property, e) {
      property.color = e.target.value;
      property.polylines.forEach(pl => {
        pl.setStyle({
          color: e.target.value
        });
      });
    },
    check(property) {
      property.polylines.forEach(pl => {
        pl.setStyle({
          opacity: property.show ? 1 : 0
        });
      });
    },
    getPolyline(ll, color, index, rArray) {
      let polyline;
      let coordinates = `${ll.start[1]},${ll.start[0]};${ll.end[1]},${ll.end[0]}`;
      axios
        .get(
          `http://router.project-osrm.org/route/v1/driving/${coordinates}?overview=full`
        )
        .then(data => {
          if (data) {
            let x = decoder.decode(data.data.routes[0].geometry);
            polyline = L.polyline(x, {
              color: color,
              weight: 2,
              opacity: 1,
              smoothFactor: 2
            });
            polyline.addTo(this.map);
            rArray[index].show = true;
            rArray[index].polylines.push(polyline);
          }
        });
    },
    addUserRoad() {
      var sdk = new SDK();
      this.userRoadFields.error = null;
      if (
        !sdk.parseLatLng(this.userRoadFields.startLat) ||
        !sdk.parseLatLng(this.userRoadFields.endLat) ||
        !sdk.parseLatLng(this.userRoadFields.startLng) ||
        !sdk.parseLatLng(this.userRoadFields.endLng)
      )
        return (this.userRoadFields.error = "Неверный формат данных");
      if (
        !this.userRoadFields.startLat ||
        !this.userRoadFields.endLat ||
        !this.userRoadFields.startLng ||
        !this.userRoadFields.endLng
      )
        return (this.userRoadFields.error = "Заполнены не все поля координат!");
      this.userRoadsArray.push({
        name: this.userRoadFields.name ? this.userRoadFields.name : "undefiend",
        color: "#0000FF",
        show: true,
        polylines: []
      });
      this.getPolyline(
        {
          start: [this.userRoadFields.startLat, this.userRoadFields.startLng],
          end: [this.userRoadFields.endLat, this.userRoadFields.endLng]
        },
        "#0000FF",
        this.userRoadsArray.length - 1,
        this.userRoadsArray
      );
      this.userRoadFields.name = null;
      this.userRoadFields.startLng = null;
      this.userRoadFields.startLat = null;
      this.userRoadFields.endLng = null;
      this.userRoadFields.endLat = null;
    }
  },
  mounted: function() {
    this.map = L.map("map").setView([55.751244, 37.618423], 3);
    L.tileLayer(
      "https://api.mapbox.com/styles/v1/luckshery/ckagnsb8n0cwp1ilt0kbwupze/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoibHVja3NoZXJ5IiwiYSI6ImNrYWduaG5jbzAwbnYyeG9iZ2ZpczJuNDUifQ.B-x-S9Nd4HXPO-W4qAfvAg"
    ).addTo(this.map);

    sdk.init(async () => {
      sdk.roadArray.forEach((road, index) => {
        this.roadsArray.push({
          name: road.name,
          color: road.color,
          show: false,
          polylines: []
        });
        road.latlng.forEach(ll => {
          this.getPolyline(ll, road.color, index, this.roadsArray);
        });
      });
    });
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Source+Sans+Pro");

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: "Source Sans Pro", sans-serif;
}

hr {
  margin: 3px;
}

.hide-element {
  display: none !important;
}

.hint {
  font-size: 8pt;
  text-align: center;
}

.error {
  color: rgb(204, 60, 34);
}

.balance-box {
  display: flex;
  justify-content: space-between;
}

.input {
  min-width: 1px;
  margin: 4px;
  width: -webkit-fill-available;
  border: none;
  padding: 5px 0;
  border-bottom: solid 1px #1e4864;
  transition: all 0.3s cubic-bezier(0.64, 0.09, 0.08, 1);
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0) 96%,
    #1e4864 4%
  );
  background-position: -200px 0;
  background-size: 200px 100%;
  background-repeat: no-repeat;
  color: darken(#1e4864, 20%);
}

.input:focus {
  box-shadow: none;
  outline: none;
  background-position: 0 0;
}

.btn {
  width: -webkit-fill-available;
  margin: 4px;
  padding: 4px 4px;
  margin-bottom: 0;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  color: #333333;
  text-shadow: 0 1px 1px rgba(255, 255, 255, 0.75);
  background-color: #f5f5f5;
  background-image: -moz-linear-gradient(top, #ffffff, #e6e6e6);
  background-image: -webkit-gradient(
    linear,
    0 0,
    0 100%,
    from(#ffffff),
    to(#e6e6e6)
  );
  background-image: -webkit-linear-gradient(top, #ffffff, #e6e6e6);
  background-image: -o-linear-gradient(top, #ffffff, #e6e6e6);
  background-image: linear-gradient(to bottom, #ffffff, #e6e6e6);
  background-repeat: repeat-x;
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#ffffffff', endColorstr='#ffe6e6e6', GradientType=0);
  border-color: #e6e6e6 #e6e6e6 #bfbfbf;
  border-color: rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.25);
  filter: progid:DXImageTransform.Microsoft.gradient(enabled = false);
  border: 1px solid #bbbbbb;
  border-bottom-color: #a2a2a2;
  border-radius: 4px;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2),
    0 1px 2px rgba(0, 0, 0, 0.05);
}

.btn:hover,
.btn:focus {
  color: #333333;
  text-decoration: none;
  background-position: 0 -15px;
  -webkit-transition: background-position 0.1s linear;
  -moz-transition: background-position 0.1s linear;
  -o-transition: background-position 0.1s linear;
  transition: background-position 0.1s linear;
}

.r_controls {
  background-color: white;
  width: 220px;
  padding: 5px;
}

.disabled-element {
  pointer-events: none;
  opacity: 0.4;
}

.overflow-roads-container {
  display: flex;
  vertical-align: middle;
  position: relative;
}

.overflow-roads-container-roadname {
  margin-left: auto;
  margin-right: 5px;
}

.overflow-roads-container-checkbox {
  position: relative;
  vertical-align: middle;
  margin: 5px;
}

.overflow-roads-title {
  cursor: pointer;
  vertical-align: middle;
  text-align: center;
  font-weight: bold;
  margin: 4px;
}

.overflow-roads {
  overflow: auto;
  max-height: 200px;
}

.r_controls a {
  text-decoration: none;
  color: black;
}

div {
  position: relative;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  pointer-events: none;
  z-index: 10;
  background-color: rgba(0, 0, 0, 0);
}

#map {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

#wrapper {
  background: radial-gradient(
    ellipse at top left,
    rgba(255, 255, 255, 1) 40%,
    rgba(229, 229, 229, 0.9) 100%
  );
  height: 100vh;
  padding: 60px 80px;
  width: 100vw;
}

#logo {
  height: auto;
  margin-bottom: 20px;
  width: 420px;
}

main {
  display: flex;
  justify-content: space-between;
}

main > div {
  flex-basis: 50%;
}

.left-side {
  display: flex;
  flex-direction: column;
}

.welcome {
  color: #555;
  font-size: 23px;
  margin-bottom: 10px;
}

.title {
  color: #2c3e50;
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 6px;
}

.title.alt {
  font-size: 18px;
  margin-bottom: 10px;
}

.doc p {
  color: black;
  margin-bottom: 10px;
}

.doc button {
  font-size: 0.8em;
  cursor: pointer;
  outline: none;
  padding: 0.75em 2em;
  border-radius: 2em;
  display: inline-block;
  color: #fff;
  background-color: #4fc08d;
  transition: all 0.15s ease;
  box-sizing: border-box;
  border: 1px solid #4fc08d;
}

.doc button.alt {
  color: #42b983;
  background-color: transparent;
}
</style>
