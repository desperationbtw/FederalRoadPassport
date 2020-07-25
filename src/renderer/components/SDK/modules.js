import fs from "fs";
import path from "path";
import parseXlsx from "excel";
import { parse, stringify } from "flatted";
const electron = require("electron").remote;
const dialog = electron.dialog;
var iconvlite = require("iconv-lite");

export default class {
  saveProject(data) {
    var path = dialog.showSaveDialogSync();
    fs.writeFile(`${path}.frp`, stringify(data), (err) => {
      if (err) throw err;
      console.log("File is created successfully.");
    });
  }

  parseDataFromTable(fieldLinks, callback) {
    var result = [];
    dialog.showOpenDialog().then((path) => {
      parseXlsx(path.filePaths[0])
        .then((data) => {
          data.forEach((x) => {
            let road = {};
            road.name = x[abcTo012(fieldLinks.name)].replace(/\s/igm, "");
            road.color = fieldLinks.color;
            road.latlng = [];
            let dublicate = result.filter(function(item) {
              return item.name == road.name;
            });
            if (dublicate.length) road = dublicate[0];
            let latlng = {};
            latlng.start = [];
            latlng.end = [];
            latlng.start.push(this.parseLatLng(x[abcTo012(fieldLinks.startLat)]));
            latlng.start.push(this.parseLatLng(x[abcTo012(fieldLinks.startLng)]));
            latlng.end.push(this.parseLatLng(x[abcTo012(fieldLinks.endLat)]));
            latlng.end.push(this.parseLatLng(x[abcTo012(fieldLinks.endLng)]));
            if (
              !latlng.start[0] ||
              !latlng.start[1] ||
              !latlng.end[0] ||
              !latlng.end[1] ||
              !road
            )
              return;
            road.latlng.push(latlng);
            if (!dublicate.length) result.push(road);
          });
        })
        .then(() => {
          return callback(result);
        });
    });
  }

  openProject(callback) {
    dialog.showOpenDialog().then((result) => {
      var z = parse(fs.readFileSync(result.filePaths[0]));
      callback(z);
    });
  }

  init(callback) {
    const pathToAsset = path.join(__static, "/fr_data_result.txt");
    const fileContents = readFileSyncEncoding(pathToAsset, "windows1251");
    callback(JSON.parse(fileContents));
  }

  tempMethod(callback) {
    var cb = callback;
    var roadArray = [];
    var start = null;
    var end = null;
    parseXlsx(path.join(__static, "/fst.xlsx"))
      .then((data) => {
        data.forEach((x, index) => {
          if (!start && x[1].startsWith("Начало")) start = index;
          if (
            start &&
            !end &&
            !x[1].startsWith("Начало") &&
            !x[1].startsWith("Конец")
          )
            end = index - 2;
        });
        return data;
      })
      .then((data) => {
        for (let i = start; i < end; i = i + 2) {
          let road = {};
          road.name = "ОТСУТСТВУЕТ ПОКРЫТИЕ";
          road.color = "#FF0000";
          road.show = true;
          road.latlng = [];
          let latlng = {
            start: parseLatLngAlternative(data[i][2]),
            end: parseLatLngAlternative(data[i + 1][2]),
          };
          road.latlng.push(latlng);
          roadArray.push(road);
        }
      })
      .then(() => {
        start = null;
        end = null;
        parseXlsx(path.join(__static, "/sec.xlsx"))
          .then((data) => {
            data.forEach((x, index) => {
              if (!start && x[1].startsWith("Начало")) start = index;
              if (
                start &&
                !end &&
                !x[1].startsWith("Начало") &&
                !x[1].startsWith("Конец")
              )
                end = index - 2;
            });
            return data;
          })
          .then((data) => {
            for (let i = start; i < end; i = i + 2) {
              let road = {};
              road.name = "ОТСУТСТВУЕТ ПОКРЫТИЕ";
              road.color = "#FF0000";
              road.show = true;
              road.latlng = [];
              let latlng = {
                start: parseLatLngAlternative(data[i][2]),
                end: parseLatLngAlternative(data[i + 1][2]),
              };
              road.latlng.push(latlng);
              roadArray.push(road);
            }
          });
      })
      .then(() => {
        cb(roadArray);
      });
  }

  parseLatLng(data) {
    if (!data) return null;
    let lng = data.match(/\d+\b/gim);
    if (!lng) return null;
    switch (lng.length) {
      case 2:
        return `${lng[0]}.${lng[1]}`;
      case 3:
        return convertLatLng(lng[0], lng[1], lng[2]);
      case 4:
        return convertLatLng(lng[0], lng[1], `${lng[2]}.${lng[3]}`);
      default:
        return null;
    }
  }

  federalRoadColor() {
    return `#${rgbToHex(randomInt(0, 140))}${rgbToHex(
      randomInt(0, 100)
    )}${rgbToHex(randomInt(195, 230))}`;
  }
}

function readFileSyncEncoding(filename, encoding) {
  var content = fs.readFileSync(filename);
  return iconvlite.decode(content, encoding);
}

function convertLatLng(deg, min, sec) {
  let x = sec / 3600 + min / 60 + Number(deg);
  return x;
}

function rgbToHex(rgb) {
  var hex = Number(rgb).toString(16);
  if (hex.length < 2) {
    hex = "0" + hex;
  }
  return hex;
}

function randomInt(min, max) {
  let rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
}

function abcTo012(char) {
  return char.charCodeAt(0) - 65;
}

function parseLatLngAlternative(data) {
  if (!data) return null;
  let lng = data.match(/\d+\b/gim);
  if (!lng) return null;
  switch (lng.length) {
    case 6:
      return [
        convertLatLng(lng[0], lng[1], lng[2]),
        convertLatLng(lng[3], lng[4], lng[5]),
      ];
    case 8:
      return [
        convertLatLng(lng[0], lng[1], `${lng[2]}.${lng[3]}`),
        convertLatLng(lng[4], lng[5], `${lng[6]}.${lng[7]}`),
      ];
    default:
      return null;
  }
}
