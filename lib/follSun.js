const axios = require("axios");

class follSun {

  constructor(api_id, api_key) {

    this.api_id = global.apiid.lapak;

    this.api_key = global.api.lapak;

    this.baseURL = global.APIs.lapak;

  }

  cekProfile() {

    return new Promise(async (resolve, reject) => {

      const data = new URLSearchParams();

      data.append("api_id", this.api_id);

      data.append("api_key", this.api_key);

      await axios

        .post(this.baseURL + "/api/profile", data)

        .then((response) => {

          if (response.data == false) throw response.data.message;

          resolve(response.data);

        })

        .catch((e) => {

          reject(e);

        });

    });

  }

  cekServices(type = "PPOB") {

    return new Promise(async (resolve, reject) => {

      const data = new URLSearchParams();

      data.append("api_id", this.api_id);

      data.append("api_key", this.api_key);

      data.append("service_type", type);

      await axios

        .post(this.baseURL + "/api/services", data)

        .then((response) => {

          if (response.data == false) throw response.data.message;

          resolve(response.data);

        })

        .catch((e) => {

          reject(e);

        });

    });

  }

  cekStatus(id) {

    return new Promise(async (resolve, reject) => {

      const data = new URLSearchParams();

      data.append("api_id", this.api_id);

      data.append("api_key", this.api_key);

      data.append("id", id);

      await axios

        .post(this.baseURL + "/api/status", data)

        .then((response) => {

          if (response.data == false) throw response.data.message;

          resolve(response.data);

        })

        .catch((e) => {

          reject(e);

        });

    });

  }

  order(service, tujuan, jumlah) {

    return new Promise(async (resolve, reject) => {

      const data = new URLSearchParams();

      data.append("api_id", this.api_id);

      data.append("api_key", this.api_key);

      data.append("service", service);

      data.append("target", tujuan);

      data.append("quantity", jumlah);

      await axios

        .post(this.baseURL + "/api/order", data)

        .then((response) => {

          if (response.data == false) throw response.data.message;

          resolve(response.data);

        })

        .catch((e) => {

          reject(e);

        });

    });

  }

}

module.exports = { follSun };