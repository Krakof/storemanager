import React, { Component, Fragment } from "react";
import HttpService from "../../httpService";
import StoreList from "./StoreList";
import StorEdit from "./StoreEdit";
import createModal from "../modal/Modal";
import "./Store.scss";
import { localTimeZone } from "../../utils";

const emptyStore = {
  title: "",
  schedule: {},
  timeZone: localTimeZone()
};

class StoreContainer extends Component {
  constructor() {
    super();

    this.state = {
      storeList: [],
      editedStore: {}
    };

    this.timeFormat = "h:mm A";
  }

  async componentDidMount() {
    const storeList = await HttpService.getStoreList();

    this.setState({ storeList });
  }

  editStore = storeId => {
    this.toggleModal();
    this.setState(state => {
      const [editedStore] = state.storeList.filter(
        item => item._id === storeId
      );

      return { editedStore: editedStore || emptyStore };
    });
  };

  saveStore = store => {
    this.toggleModal();
    this.setState(state => {
      if (state.editedStore._id) {
        state.storeList = state.storeList.map(item => {
          if (item._id === store._id) return store;

          return item;
        });
      } else {
        store._id = Math.floor(Math.random() * 10);
        state.storeList.push(store);
      }

      return { storeList: state.storeList, editedStore: {} };
    });
  };

  removeStore = () => {
    this.toggleModal();
    this.setState(state => {
      state.storeList = state.storeList.filter(
        store => store._id !== state.editedStore._id
      );

      return { store: state.storeList, editedStore: {} };
    });
  };

  toggleModal = () => {
    this.setState({ showEditStoreModal: !this.state.showEditStoreModal });
  };

  render() {
    const EditStoreModal = createModal(StorEdit);

    return (
      <Fragment>
        <header>
          <button className={"btn btn-success"} onClick={this.editStore}>
            <span>&#43;</span>Add store
          </button>
        </header>
        <main className={"store"}>
          <StoreList
            stores={this.state.storeList}
            format={this.timeFormat}
            editStore={this.editStore}
          />
        </main>
        <EditStoreModal
          show={this.state.showEditStoreModal}
          onClose={this.toggleModal}
          saveStore={this.saveStore}
          removeStore={this.removeStore}
          format={this.timeFormat}
          store={this.state.editedStore}
        />
      </Fragment>
    );
  }
}

export default StoreContainer;
