<template>
  <div>
    <div class="overlay">
      <div class="leaflet-top leaflet-right">
        <p
          class="control-title leaflet-control"
          :class="{ 'hide-element' : globalSpoilerData}"
        >Навигация</p>
        <div class="leaflet-control r_controls" :class="{ 'hide-element' : globalSpoilerData}">
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
            class="balance-box"
            style="font-size: 10px; margin-bottom: 4px;"
            :class="{ 'hide-element' : !roadsArray.length || !spoilerData[0]}"
          >
            <a href="#" class="icon-btn" @click="checkFalse(roadsArray)">Снять</a>
            <a href="#" class="icon-btn" @click="checkTrue(roadsArray)">Выделить</a>
            <a href="#" class="icon-btn" @click="checkInverse(roadsArray)">Инверс</a>
          </div>
          <div
            class="overflow-roads"
            :class="{ 'hide-element' : !roadsArray.length || !spoilerData[0]}"
          >
            <div
              v-for="(item, index) of roadsArray"
              :key="index"
              class="overflow-roads-container"
              :class="{ 'disabled-element' : !item.polylinesObj.length}"
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
                :title="String(`${item.discription}\nПротяженность: ${item.roadLength}км.`)"
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
            class="balance-box"
            style="font-size: 10px; margin-bottom: 4px;"
            :class="{ 'hide-element' : !userRoadsArray.length || !spoilerData[1]}"
          >
            <a href="#" class="icon-btn" @click="checkFalse(userRoadsArray)">Снять</a>
            <a href="#" class="icon-btn" @click="checkTrue(userRoadsArray)">Выделить</a>
            <a href="#" class="icon-btn" @click="checkInverse(userRoadsArray)">Инверс</a>
          </div>
          <div
            class="overflow-roads"
            :class="{ 'hide-element' : !userRoadsArray.length || !spoilerData[1]}"
          >
            <div
              v-for="(item, index) of userRoadsArray"
              :key="index"
              class="overflow-roads-container"
              :class="{ 'disabled-element' : !item.polylinesObj.length}"
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
            <div class="popup">
              <div class="popuptext" id="myPopup">
                <p class="control-title">
                  <b>Колонки</b>
                </p>
                <p class="control-title">Название</p>
                <select v-model="importSettings.name">
                  <option>A</option>
                  <option>B</option>
                  <option>C</option>
                  <option>D</option>
                  <option>E</option>
                  <option>F</option>
                  <option>G</option>
                  <option>H</option>
                  <option>I</option>
                </select>
                <div class="balance-box">
                  <div>
                    <p class="control-title">Начало с.ш</p>
                    <select v-model="importSettings.startLat">
                      <option>A</option>
                      <option>B</option>
                      <option>C</option>
                      <option>D</option>
                      <option>E</option>
                      <option>F</option>
                      <option>G</option>
                      <option>H</option>
                      <option>I</option>
                    </select>
                  </div>
                  <div>
                    <p class="control-title">Начало в.д</p>
                    <select v-model="importSettings.startLng">
                      <option>A</option>
                      <option>B</option>
                      <option>C</option>
                      <option>D</option>
                      <option>E</option>
                      <option>F</option>
                      <option>G</option>
                      <option>H</option>
                      <option>I</option>
                    </select>
                  </div>
                </div>
                <div class="balance-box">
                  <div>
                    <p class="control-title">Конец с.ш</p>
                    <select v-model="importSettings.endLat">
                      <option>A</option>
                      <option>B</option>
                      <option>C</option>
                      <option>D</option>
                      <option>E</option>
                      <option>F</option>
                      <option>G</option>
                      <option>H</option>
                      <option>I</option>
                    </select>
                  </div>
                  <div>
                    <p class="control-title">Конец в.д</p>
                    <select v-model="importSettings.endLng">
                      <option>A</option>
                      <option>B</option>
                      <option>C</option>
                      <option>D</option>
                      <option>E</option>
                      <option>F</option>
                      <option>G</option>
                      <option>H</option>
                      <option>I</option>
                    </select>
                  </div>
                </div>
                <p class="control-title">
                  <b>Цвет</b>
                </p>
                <input type="color" v-model="importSettings.color" />
                <div class="balance-box">
                  <a href="#" class="btn" @click="importRoads()">
                    <i class="fas fa-check-circle"></i>
                  </a>
                  <a href="#" class="btn" @click="popup()">
                    <i class="fas fa-times-circle"></i>
                  </a>
                </div>
              </div>
            </div>
            <a
              class="btn"
              href="#"
              @click="popup()"
              :class="{ 'disabled-element' : importSettings.popupStatus}"
            >
              <i class="fas fa-file-import"></i> Импорт
            </a>
          </div>
        </div>
        <p
          class="control-title leaflet-control"
          :class="{ 'hide-element' : globalSpoilerData || !hoverInfo.name}"
        >Информация</p>
        <div
          class="leaflet-control r_controls"
          style="font-size: 9pt;"
          :class="{ 'hide-element' : !hoverInfo.name}"
        >
          <b>Трасса:</b>
          {{hoverInfo.name}}
          <br />
          <b>Протяженность:</b>
          {{hoverInfo.roadLength}}.
          <br />
          <b>Наименование:</b>
          {{hoverInfo.discription}}
          <br />
        </div>
        <p
          class="control-title leaflet-control"
          :class="{ 'hide-element' : globalSpoilerData}"
        >Опции</p>
        <div class="leaflet-control r_controls" :class="{ 'hide-element' : globalSpoilerData}">
          <div class="balance-box">
            <a class="btn" href="#" @click="saveProject()">
              <i class="fas fa-save"></i> Сохранить
            </a>
            <a class="btn" href="#" @click="openProject()">
              <i class="fas fa-folder-open"></i> Открыть
            </a>
          </div>
        </div>
        <div class="leaflet-control">
          <div class="balance-box">
            <a
              href="#"
              style="margin-right: 5px;"
              class="icon-btn"
              :title="String(`НЕПОКРЫТЫЕ УЧАСТКИ`)"
              :class="{ 'icon-btn-active' : lostConnectionStatus}"
              @click="lostConnectionButton()"
            >
              <i class="fas fa-phone-slash"></i>
            </a>
            <a
              href="#"
              class="icon-btn"
              :title="String(`ИНТЕРФЕЙС РЕДАКТИРОВАНИЯ`)"
              :class="{ 'icon-btn-active' : globalSpoilerData}"
              @click="globalSpoiler()"
            >
              <i class="fas fa-eye-slash"></i>
            </a>
          </div>
        </div>
        <div class="leaflet-control">
          <a
            href="#"
            class="icon-btn"
            :title="String(`СКРИНШОТ КАРТЫ`)"
            :class="{ 'icon-btn-active' : globalSpoilerData}"
            @click="doScreen()"
          >
            <i class="fas fa-file-image"></i>
          </a>
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
import path from "path";
import fs from "fs";
import { loadData, saveData } from "./SDK/constData";
const electron = require("electron").remote;
const dialog = electron.dialog;
var iconvlite = require("iconv-lite");
var sdk = new SDK();
const decoder = require("@mapbox/polyline");
require("leaflet-routing-machine");
require("leaflet-control-geocoder");
require("leaflet.icon.glyph");
require("leaflet.export");
L.Polyline.prototype.measuredDistance = function(options) {
  var distance = 0,
    coords = null,
    coordsArray = this._latlngs;

  for (var i = 0; i < coordsArray.length - 1; i++) {
    coords = coordsArray[i];
    distance += coords.distanceTo(coordsArray[i + 1]);
  }

  return L.PolylineUtil.readableDistance(distance, true);
};

L.PolylineUtil = {
  readableDistance: function(distance, isMetric) {
    var distanceStr;

    if (isMetric) {
      if (distance > 1000) {
        distanceStr = (distance / 1000).toFixed(2) + "км";
      } else {
        distanceStr = Math.ceil(distance) + " m";
      }
    } else {
      distance *= 1.09361;

      if (distance > 1760) {
        distanceStr = (distance / 1760).toFixed(2) + " miles";
      } else {
        distanceStr = Math.ceil(distance) + " yd";
      }
    }

    return distanceStr;
  }
};

export default {
  data() {
    return {
      hoverInfo: {
        name: null,
        roadLength: null,
        discription: null
      },
      importSettings: {
        name: null,
        startLat: null,
        startLng: null,
        endLat: null,
        endLng: null,
        color: "#00FF00",
        popupStatus: false
      },
      globalSpoilerData: false,
      lostConnectionStatus: true,
      spoilerData: [true, true],
      userRoadsArray: [],
      roadsArray: [],
      lostConnectionRoads: [],
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
    doScreen() {
      this.map.export().then(result => {
        var path = dialog.showSaveDialogSync();
        fs.writeFile(
          `${path}.png`,
          new Buffer.from(
            result.data.replace(/^data:image\/\w+;base64,/, ""),
            "base64"
          ),
          "binary",
          function(err) {
            if (err) {
              console.log(err);
            } else {
              console.log("The file was saved!");
            }
          }
        );
      });
    },
    lostConnectionButton() {
      this.lostConnectionStatus = !this.lostConnectionStatus;
      this.lostConnectionRoads.forEach(item => {
        item.show = this.lostConnectionStatus;
        item.polylinesObj.forEach(pl => {
          pl.setStyle({
            opacity: this.lostConnectionStatus ? 1 : 0
          });
        });
      });
    },
    loadFailData() {
      this.lostConnectionRoads = JSON.parse(
        this.readFileSyncEncoding(
          path.join(__static, "/fail_data.txt"),
          "utf-8"
        )
      );
      this.lostConnectionRoads.forEach((item, index) => {
        this.getPolylineLocal(
          item.color,
          index,
          this.lostConnectionRoads,
          item.polylines
        );
      });
    },
    readFileSyncEncoding(filename, encoding) {
      var content = fs.readFileSync(filename);
      return iconvlite.decode(content, encoding);
    },
    importRoads() {
      sdk.parseDataFromTable(this.importSettings, result => {
        result.forEach(item => {
          let newUserRoad = {
            name: item.name ? item.name : "Без названия",
            color: item.color,
            show: true,
            polylines: item.latlng,
            polylinesObj: []
          }
          this.userRoadsArray.push(newUserRoad);
          newUserRoad.polylines.forEach(item => {
            this.getPolyline(
              item,
              newUserRoad.color,
              this.userRoadsArray.length - 1,
              this.userRoadsArray
            );
          });
        });
      });
    },
    popup() {
      var popup = document.getElementById("myPopup");
      popup.classList.toggle("show");
      this.importSettings.popupStatus = !this.importSettings.popupStatus;
    },
    saveProject() {
      sdk.saveProject({
        spoilerData: this.spoilerData,
        userRoadsArray: this.userRoadsArray,
        roadsArray: this.roadsArray
      });
    },
    clearMap() {
      for (var i in this.map._layers) {
        if (this.map._layers[i]._path != undefined) {
          try {
            this.map.removeLayer(this.map._layers[i]);
          } catch (e) {
            console.log("problem with " + e + this.map._layers[i]);
          }
        }
      }
    },
    openProject() {
      sdk.openProject(result => {
        this.clearMap();
        this.spoilerData = result.spoilerData;
        result.userRoadsArray.forEach((unit, index) => {
          unit.polylinesObj = [];
          unit.polylines.forEach(item => {
            getPolylineLocal(unit.color, index, result.userRoadsArray, item);
          });
        });
        this.userRoadsArray = result.userRoadsArray;
        result.roadsArray.forEach((unit, index) => {
          unit.polylinesObj = [];
          unit.polylines.forEach(item => {
            this.getPolylineLocal(unit.color, index, result.roadsArray, item);
          });
        });
        this.roadsArray = result.roadsArray;
      });
    },
    globalSpoiler() {
      this.globalSpoilerData = !this.globalSpoilerData;
    },
    checkFalse(array) {
      array.forEach(item => {
        item.show = false;
        this.check(item);
      });
    },
    checkTrue(array) {
      array.forEach(item => {
        item.show = true;
        this.check(item);
      });
    },
    checkInverse(array) {
      array.forEach(item => {
        item.show = !item.show;
        this.check(item);
      });
    },
    spoiler(data) {
      this.$set(this.spoilerData, data, !this.spoilerData[data]);
    },
    focusPolyline(item) {
      this.map.fitBounds(item.polylinesObj[0].getBounds());
    },
    updateColor(object, property, e) {
      property.color = e.target.value;
      property.polylinesObj.forEach(pl => {
        pl.setStyle({
          color: e.target.value
        });
      });
    },
    check(property) {
      property.polylinesObj.forEach(pl => {
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
            let show = rArray[index].show ? 1 : 0;
            polyline = L.polyline(x, {
              color: color,
              weight: 2,
              opacity: show,
              smoothFactor: 2
            });

            polyline.on("mouseover", e => {
              let layer = e.target;
              if (!layer.options.opacity) return;
              this.hoverInfo = {
                name: rArray[index].name,
                roadLength: polyline.measuredDistance(),
                discription: "null"
              };
              layer.setStyle({
                color: "red",
                weight: 4
              });
            });

            polyline.on("mouseout", e => {
              let layer = e.target;
              if (!layer.options.opacity) return;
              layer.setStyle({
                color: color,
                weight: 2
              });
            });

            polyline.addTo(this.map);
            if (!rArray[index].polylinesObj) rArray[index].polylinesObj = [];
            rArray[index].polylinesObj.push(polyline);
          }
        });
    },
    getPolylineLocal(color, index, rArray, pl) {
      let polyline;

      let show = rArray[index].show ? 1 : 0;
      polyline = L.polyline(pl, {
        color: color,
        weight: 2,
        opacity: show,
        smoothFactor: 2
      });

      polyline.on("mouseover", e => {
        let layer = e.target;
        if (!layer.options.opacity) return;
        this.hoverInfo = {
          name: rArray[index].name,
          roadLength: polyline.measuredDistance(),
          discription: rArray[index].discription
        };
        layer.setStyle({
          color: "red",
          weight: 4
        });
      });

      polyline.on("mouseout", e => {
        let layer = e.target;
        if (!layer.options.opacity) return;
        layer.setStyle({
          color: color,
          weight: 2
        });
      });
      polyline.addTo(this.map);
      if (!rArray[index].polylinesObj) rArray[index].polylinesObj = [];
      rArray[index].polylinesObj.push(polyline);
    },
    addUserRoad() {
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
        name: this.userRoadFields.name
          ? this.userRoadFields.name
          : "Без названия",
        color: "#FF0000",
        show: true,
        polylines: [],
        polylinesObj: []
      });
      this.getPolyline(
        {
          start: [this.userRoadFields.startLat, this.userRoadFields.startLng],
          end: [this.userRoadFields.endLat, this.userRoadFields.endLng]
        },
        "#FF0000",
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
    L.tileLayer("https://a.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(
      this.map
    );

    if (loadData) {
      this.spoilerData = loadData.spoilerData;
      loadData.userRoadsArray.forEach((unit, index) => {
        unit.polylinesObj = [];
        unit.polylines.forEach(item => {
          getPolylineLocal(unit.color, index, loadData.userRoadsArray, item);
        });
      });
      this.userRoadsArray = loadData.userRoadsArray;
      loadData.roadsArray.forEach((unit, index) => {
        unit.polylinesObj = [];
        unit.polylines.forEach(item => {
          this.getPolylineLocal(unit.color, index, loadData.roadsArray, item);
        });
      });
      this.roadsArray = loadData.roadsArray;
    } else {
      sdk.init(data => {
        this.roadsArray = data;
        data.forEach((road, index) => {
          road.polylines.forEach(pl => {
            this.getPolylineLocal(road.color, index, this.roadsArray, pl);
          });
        });
        this.loadFailData();
      });
    }
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

/* Popup container */
.popup {
  position: relative;
  display: inline-block;
  cursor: pointer;
}

/* The actual popup (appears on top) */
.popup .popuptext {
  visibility: hidden;
  width: 200px;
  background-color: #555;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 4px;
  position: absolute;
  z-index: 1;
  bottom: 100%;
  left: 50%;
  margin-left: -100px;
}

/* Popup arrow */
.popup .popuptext::after {
  content: "";
  position: absolute;
  top: 100%;
  left: 50%;
  margin-left: 45px;
  border-width: 5px;
  border-style: solid;
  border-color: #555 transparent transparent transparent;
}

/* Toggle this class when clicking on the popup container (hide and show the popup) */
.popup .show {
  visibility: visible;
  -webkit-animation: fadeIn 1s;
  animation: fadeIn 1s;
}

/* Add animation (fade in the popup) */
@-webkit-keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
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

.icon-btn {
  padding: 2px;
  background-color: white;
  padding: 5px;
  text-decoration: none;
  color: black;
}

.icon-btn-active {
  padding: 2px;
  background-color: rgb(87, 146, 50) !important;
  padding: 5px;
  text-decoration: none;
  color: rgb(140, 243, 6) !important;
}

.control-title {
  color: #ffffff;
  font-size: 10pt;
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
  position: unset;
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
