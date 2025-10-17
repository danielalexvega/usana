import { FC } from "react";
import { CTACard } from "../model";
import { createItemSmartLink, createElementSmartLink } from "../utils/smartlink";

type CTACardProps = {
  card: CTACard;
  componentId: string;
  componentName: string;
};

const CTACardComponent: FC<CTACardProps> = ({ card, componentId, componentName }) => {
  return (
    <div 
      className="flex flex-col max-w-[240px] text-center items-center"
      {...createItemSmartLink(componentId, componentName)}
    >
      {card.elements.image.value[0] && (
        <img
          src={card.elements.image.value[0].url}
          alt={card.elements.image.value[0].description ?? "Card image"}
          className="w-full mb-4 rounded-lg"
        />
      )}
      
      <h3 
        className="text-[24px] font-bold leading-[36px] mb-4 text-white"
        style={{ fontSize: '24px', fontWeight: 700, lineHeight: '36px', marginBottom: '16px' }}
        {...createElementSmartLink("headline")}
      >
        {card.elements.headline.value}
      </h3>
      
      <h4 
        className="text-[16px] font-normal leading-[24px] m-0 text-white"
        style={{ fontSize: '16px', fontWeight: 400, lineHeight: '24px', margin: 0 }}
        {...createElementSmartLink("subheadline")}
      >
        {card.elements.subheadline.value}
      </h4>
    </div>
  );
};

export default CTACardComponent;
