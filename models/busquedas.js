const axios = require("axios");

class Busquedas {
  historial = [];

  constructor() {
    //TODO leer db
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
      console.log(respuesta.data);

      return [];
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = Busquedas;
