import React from "react";
import PropTypes from "prop-types";
import "../FeatureItems/FeatureItems.scss";
const FeatureItem = ({ icon, title, description }) => {
    return (
        <div className="feature-item">
            <img src={icon} alt={`${title} Icon`} className="feature-icon" />
            <h3 className="feature-item-title">{title}</h3>
            <p>{description}</p>
        </div>
    );
};

FeatureItem.propTypes = {
    icon: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
};

export default FeatureItem;
