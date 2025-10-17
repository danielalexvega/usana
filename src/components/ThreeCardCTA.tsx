import { FC } from "react";
import { ThreeCardCTA, CTACard } from "../model";
import CTACardComponent from "./CtaCard";
import { createItemSmartLink, createElementSmartLink } from "../utils/smartlink";
import { IContentItem } from "@kontent-ai/delivery-sdk";

type ThreeCardCTAProps = {
  data: ThreeCardCTA;
  componentId: string;
  componentName: string;
  richTextLinkedItems?: IContentItem[];
};

const ThreeCardCTAComponent: FC<ThreeCardCTAProps> = ({ data, componentId, componentName, richTextLinkedItems }) => {
  // Get linked items from either the component's linkedItems or from rich text context
  const getLinkedItems = () => {
    if (data.elements.card_ctas.linkedItems && data.elements.card_ctas.linkedItems.length > 0) {
      return data.elements.card_ctas.linkedItems;
    }
    
    // Fallback: try to find linked items from rich text context
    if (richTextLinkedItems) {
      return data.elements.card_ctas.value.map(ref => 
        richTextLinkedItems.find(item => item.system.codename === ref)
      ).filter(Boolean) as CTACard[];
    }
    
    return [];
  };

  const linkedItems = getLinkedItems();
  return (
    <div 
      className="bg-blue-600 py-16 px-8"
      {...createItemSmartLink(componentId, componentName)}
    >
      <div className="max-w-6xl mx-auto">
        {/* Main Headline */}
        <h2 
          className="text-white text-center mb-12"
          style={{ fontSize: '32px', fontWeight: 400 }}
          {...createElementSmartLink("headline")}
        >
          {data.elements.headline.value}
        </h2>
        
        {/* Cards Container */}
        <div 
          className="flex flex-row justify-center gap-20 flex-nowrap"
          style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', gap: '80px', flexWrap: 'nowrap' }}
        >
          {linkedItems.map((card, index) => (
            <CTACardComponent
              key={card.system.id || index}
              card={card}
              componentId={card.system.id}
              componentName={card.system.name}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ThreeCardCTAComponent;
