const fs = require("fs");
const axios = require("axios");

class Busquedas {
  historial = [];
  dbPath = "./db/database.json";

  constructor() {
    this.leerDB();
  }

  get paramsMapbox() {
    return {
      access_token: process.env.MAPBOX_KEY,
      limit: 5,
      language: "es",
    };
  }

  async ciudad(lugar) {
    try {
      const instance = axios.create({
        baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
        params: this.paramsMapbox,
      });

      const respuesta = await instance.get();
      return respuesta.data.features.map((lugar) => ({
        id: lugar.id,
        nombre: lugar.place_name,
        lng: lugar.center[0],
        lat: lugar.center[1],
      }));
    } catch (error) {
      console.log(error);
    }
  }

  async climaPorLugar(lat, lng) {
    try {
      const instance = axios.create({
        baseURL: "https://api.openweathermap.org/data/2.5/weather",
        params: {
          lat: lat,
          lon: lng,
          appid: process.env.OPENWEATHER_KEY,
          lang: "es",
          units: "metric",
        },
      });
      const respuesta = await instance.get();
      const { weather, main } = respuesta.data;

      return {
        temperatura: main.temp,
        temperaturaMax: main.temp_max,
        temperaturaMin: main.temp_min,
        descripcion: weather[0].description,
      };
    } catch (error) {
      console.log(error);
    }
  }

  agregarHistorial(lugar = "") {
    if (this.historial.includes(lugar.toLocaleLowerCase())) {
      return;
    }
    this.historial.unshift(lugar.toLocaleLowerCase());

    this.guardarDB();
  }

  guardarDB() {
    fs.writeFileSync(this.dbPath, JSON.stringify(this.historial));
  }

  leerDB() {
    if (fs.existsSync(this.dbPath)) {
      const info = fs.readFileSync(this.dbPath, "utf8");
      const data = JSON.parse(info);
      this.historial = data;
    }
  }
}

module.exports = Busquedas;
