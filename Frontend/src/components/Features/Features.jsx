import React from "react";
import FeatureItems from "../FeatureItems/FeatureItems";
import "./Features.scss";
import iconChat from "../../Assets/icons/icon-chat.webp";
import iconMoney from "../../Assets/icons/icon-money.webp";
import iconSecurity from "../../Assets/icons/icon-security.webp";

const Features = () => {
    const features = [
        {
            icon: iconChat,
            title: "You are our #1 priority",
            description:
                "Need to talk to a representative? You can get in touch through our 24/7 chat or through a phone call in less than 5 minutes.",
        },
        {
            icon: iconMoney,
            title: "More savings means higher rates",
            description:
                "The more you save with us, the higher your interest rate will be!",
        },
        {
            icon: iconSecurity,
            title: "Security you can trust",
            description:
                "We use top-of-the-line encryption to make sure your data and money are always safe.",
        },
    ];

    return (
        <section className="features">
            <h2 className="sr-only">Features</h2>
            {features.map((feature, index) => (
                <FeatureItems
                    key={index}
                    icon={feature.icon}
                    title={feature.title}
                    description={feature.description}
                />
            ))}
        </section>
    );
};

export default Features;
