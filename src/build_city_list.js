import AreaCityData from "./area_format_js.level4";

export function getItem(id) {
  return AreaCityData[id];
}

export function getChild(pid) {
  var arr = [
    {
      id: -1,
      name: "--请选择--",
    },
  ];
  for (var k in AreaCityData) {
    var o = AreaCityData[k];
    if (o.pid == pid) {
      arr.push(o);
    }
  }

  return arr;
}

 