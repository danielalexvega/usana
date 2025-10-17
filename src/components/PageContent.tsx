import { FC } from "react";
import { CTA, Disclaimer, Video, ThreeCardCTA, Testimonial, TestimonialSection } from "../model";
import { transformToPortableText } from "@kontent-ai/rich-text-resolver";
import { defaultPortableRichTextResolvers } from "../utils/richtext";
import { PortableText, PortableTextReactResolvers } from "@kontent-ai/rich-text-resolver/utils/react";
import PromotionalDisclaimer from "./disclaimer/PromotionalDisclaimer";
import InformationalDisclaimer from "./disclaimer/InformationalDisclaimer";
import CallToActionComponent from "./CallToAction";
import ThreeCardCTAComponent from "./ThreeCardCTA";
import TestimonialComponent from "./Testimonial";
import TestimonialSectionComponent from "./TestimonialSection";
import { createElementSmartLink, createFixedAddSmartLink, createItemSmartLink } from "../utils/smartlink";
import { Elements, IContentItem } from "@kontent-ai/delivery-sdk";
import VideoComponent from "./Video";

type PageContentProps = {
  body: Elements.RichTextElement;
  itemId: string;
  elementName: string;
};

const PageContent: FC<PageContentProps> = ({ body, itemId, elementName }) => {
  const value = !body || !body.value ? "<p><br/></p>" : body.value;
  const portableText = transformToPortableText(value);
  return (
    <div className="pb-20 flex flex-col"
      {...createItemSmartLink(itemId)}
      {...createElementSmartLink(
        elementName
      )}
      {...createFixedAddSmartLink("end", "bottom")}
    >
      <PortableText value={portableText} components={createPortableTextComponents(body)} />
    </div>
  );
};

const createPortableTextComponents = (
  element: Elements.RichTextElement,
): PortableTextReactResolvers => ({
  ...defaultPortableRichTextResolvers,
  types: {
    componentOrItem: ({ value }) => {
      const item = element.linkedItems.find(item => item.system.codename === value.componentOrItem._ref) as IContentItem;
      if (!item) {
        return <div>Did not find any item with codename {value.component._ref}</div>;
      }

      switch (item.system.type) {
        case "video":
          return <VideoComponent video={item as Video} componentId={item.system.id} componentName={item.system.name} />;
        case "disclaimer": {
          const disclaimerItem = item as Disclaimer;
          return disclaimerItem.elements.type.value[0]?.codename === "promotional"
            ? <PromotionalDisclaimer title={disclaimerItem.elements.headline.value} text={disclaimerItem.elements.subheadline.value} componentId={item.system.id} componentName={item.system.name} />
            : <InformationalDisclaimer title={disclaimerItem.elements.headline.value} text={disclaimerItem.elements.subheadline.value} componentId={item.system.id} componentName={item.system.name} />;
        }
        case "call_to_action": {
          const cta = item as CTA;
          return (
            <CallToActionComponent
              title={cta.elements.headline.value}
              description={cta.elements.subheadline.value}
              buttonText={cta.elements.button_label.value}
              buttonHref={cta.elements.button_link.linkedItems[0]?.elements.url.value ?? ""}
              imageSrc={cta.elements.image.value[0]?.url}
              imageAlt={cta.elements.image.value[0]?.description ?? "alt"}
              imagePosition={cta.elements.image_position.value[0]?.codename ?? "left"}
              componentId={cta.system.id}
              componentName={cta.system.name}
              style={cta.elements.style.value[0]?.codename ?? "white"}
            />
          );
        }
        case "three_card_cta": {
          const threeCardCta = item as ThreeCardCTA;
          return (
            <ThreeCardCTAComponent
              data={threeCardCta}
              componentId={threeCardCta.system.id}
              componentName={threeCardCta.system.name}
              richTextLinkedItems={element.linkedItems}
            />
          );
        }
        case "testimonial": {
          const testimonial = item as Testimonial;
          return (
            <TestimonialComponent
              quote={testimonial.elements.quote}
              name={testimonial.elements.name}
              role={testimonial.elements.role}
              image={testimonial.elements.image}
              componentId={testimonial.system.id}
              componentName={testimonial.system.name}
            />
          );
        }
        case "testimonial_section": {
          const testimonialSection = item as TestimonialSection;
          return (
            <TestimonialSectionComponent
              data={testimonialSection}
              componentId={testimonialSection.system.id}
              componentName={testimonialSection.system.name}
              richTextLinkedItems={element.linkedItems}
            />
          );
        }
        default:
          return (
            <div className="bg-red-500 text-white">
              Unsupported content type &quot;{item.system.type}&quot;
            </div>
          );
      }
    },
  },
});

export default PageContent;
