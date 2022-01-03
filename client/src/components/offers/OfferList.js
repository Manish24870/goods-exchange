import React from "react";

import OfferItem from "./OfferItem";

const OfferList = (props) => {
    const renderOffers = props.myOffers.map((offer) => {
        return offer.initiator.map((initiatorData) => {
            return (
                <OfferItem
                    key={initiatorData._id}
                    initiatorData={initiatorData}
                    wantedProduct={offer.productWanted}
                    givenProduct={initiatorData.initiatorProduct}
                    initiatorInfo={initiatorData.initiatorId}
                />
            );
        });
    });

    return renderOffers;
};

export default OfferList;
