import React, { Component } from "react";
import "./Modal.scss";

const createModal = PropComponent => {
  class ModalHOC extends Component {
    render() {
      return this.props.show ? (
        <div className="modal-overlay">
          <div className={"modal"}>
            <div className="content">
              <PropComponent {...this.props} />
              <button
                type="button"
                className={"close"}
                onClick={this.props.onClose}
              >
                <span aria-hidden="true">&times;</span>
              </button>
              {/*<div className={"close"} onClick={this.props.onClose}>*/}
              {/*&times;*/}
              {/*</div>*/}
            </div>
          </div>
        </div>
      ) : (
        false
      );
    }
  }

  ModalHOC.displayName = `HOC(${getDisplayName(PropComponent)})`;

  return ModalHOC;
};

const getDisplayName = Component => {
  return Component.displayName || Component.name || "Component";
};

export default createModal;
