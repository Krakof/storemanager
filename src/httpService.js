import storeList from "./stores";

const HttpService = () => {
  const urlBase =
    "https://stores.build-341552.some-awesome-service.com/api/v1/stores";

  return {
    handleErrors(response) {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response;
    },

    getStoreList() {
      // fetch(urlBase)
      //   .then(this.handleErrors)
      //   .then(response => response.json())
      //   .then(data => data)
      //   .catch(error => console.log(error));
      return storeList;
    },

    saveStore(store) {
      const url = urlBase + "/create";
      fetch(url, { method: "POST", body: JSON.stringify(store) })
        .then(this.handleErrors)
        .then(response => response.json())
        .then(data => data)
        .catch(error => console.log(error));
    },

    updateStore(store) {
      const url = urlBase + `/${store._id}/update`;
      fetch(url, { method: "PUT", body: JSON.stringify(store) })
        .then(this.handleErrors)
        .then(response => response.json())
        .then(data => data)
        .catch(error => console.log(error));
    },

    removeStore(store) {
      const url = urlBase + `/${store._id}/delete`;
      fetch(url, { method: "DELETE" })
        .then(this.handleErrors)
        .then(response => response.json())
        .then(data => data)
        .catch(error => console.log(error));
    }
  };
};

export default HttpService();
