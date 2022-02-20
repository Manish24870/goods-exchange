import React from "react";

import OfferItem from "./OfferItem";

const OfferList = (props) => {
  const renderOffers = props.myOffers.map((offer) => {
    return offer.initiator.map((initiatorData) => {
      // Dont render rejected offers
      if (initiatorData.offerStatus === "rejected") {
        return null;
      }
      return (
        <OfferItem
          exchangeId={offer._id}
          key={initiatorData._id}
          initiatorData={initiatorData}
          ownerData={props.ownerInfo}
          wantedProduct={offer.productWanted}
          givenProduct={initiatorData.initiatorProduct}
          initiateInitiatedAt={initiatorData.initiatedAt}
        />
      );
    });
  });

  return renderOffers;
};

export default OfferList;
