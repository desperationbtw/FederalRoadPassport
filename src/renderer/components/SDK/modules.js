import parseXlsx from 'excel';

export default class {
  constructor(file) {
    this.file = file;
    this.roadArray = [];
  }

  init(callback) {
    parseXlsx('./src/renderer/assets/fr_data.xlsx').then((data) => {
      data.forEach((x) => {
        if (!x[1])
          return;
        let road = {};
        road.name = x[1].replace(/\s/igm, "");
        road.color = this.federalRoadColor();
        road.latlng = [];
        let dublicate = this.roadArray.filter(function (item) {
          return item.name == road.name;
        });
        if (dublicate.length)
          road = dublicate[0];
        let latlng = {};
        latlng.start = [];
        latlng.end = [];
        latlng.start.push(this.parseLatLng(x[4]));
        latlng.start.push(this.parseLatLng(x[5]));
        latlng.end.push(this.parseLatLng(x[6]));
        latlng.end.push(this.parseLatLng(x[7]));
        if (!latlng.start[0] || !latlng.start[1] || !latlng.end[0] || !latlng.end[1] || !road)
          return;
        road.latlng.push(latlng);
        if (!dublicate.length)
          this.roadArray.push(road);
      })
    }).then(() => {
      callback();
    })
  }

  parseLatLng(data) {
    if (!data)
    return null;
    let lng = data.match(/\d+\b/igm);
    if (!lng)
      return null;
    switch (lng.length) {
      case 2:
        return `${lng[0]}.${lng[1]}`
      case 3:
        return this.convertLatLng(lng[0], lng[1], lng[2])
      case 4:
        return this.convertLatLng(lng[0], lng[1], `${lng[2]}.${lng[3]}`)
      default:
        return null;
    }
  }

  federalRoadColor() {
    var letters = '23456789ABCDE';
    var color = '#';
    for (var i = 0; i < 4; i++) {
      color += letters[Math.floor(Math.random() * 13)];
    }
    color += "00";
    return color;
  }

  convertLatLng(deg, min, sec) {
    let x = sec / 3600 + min / 60 + Number(deg);
    return x;
  }
}
