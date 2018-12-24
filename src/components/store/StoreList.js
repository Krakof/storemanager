import React from "react";
import PropTypes from "prop-types";
import HumanReadableSchedule from "./HumanReadableSchedule";

const propTypes = {
  stores: PropTypes.array.isRequired,
  editStore: PropTypes.func.isRequired,
  format: PropTypes.string
};

const defaultProps = {
  format: "h:mm A"
};

const StoreList = ({ stores, editStore, format }) => {
  const storeList = stores.map(storeItem => {
    return (
      <li key={storeItem._id || "new"} className={"cell"}>
        <div className={"store__item"}>
          <h2 className={"store__title"}>{storeItem.title}</h2>
          <HumanReadableSchedule
            schedule={storeItem.schedule}
            timeFormat={format}
          />
          <div className={"location"}>
            {storeItem.timeZone}, Country, City, Address
          </div>
          <button
            type="button"
            className={"btn btn-secondary"}
            onClick={() => editStore(storeItem._id)}
          >
            Edit store
          </button>
        </div>
      </li>
    );
  });

  return <ul className={"store__list"}>{storeList}</ul>;
};

StoreList.propTypes = propTypes;
StoreList.defaultProps = defaultProps;

export default StoreList;
