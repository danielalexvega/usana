import { FC } from "react";
import { Elements } from "@kontent-ai/delivery-sdk";
import { createItemSmartLink, createElementSmartLink } from "../utils/smartlink";

type TestimonialProps = {
  quote: Elements.TextElement;
  name: Elements.TextElement;
  role: Elements.TextElement;
  image?: Elements.AssetsElement;
  componentId: string;
  componentName: string;
};

const TestimonialComponent: FC<TestimonialProps> = ({
  quote,
  name,
  role,
  image,
  componentId,
  componentName,
}) => {
  return (
    <div
      className="flex flex-col items-center justify-center py-12 px-4"
      {...createItemSmartLink(componentId, componentName)}
    >
      <div className="max-w-3xl">
        <p
          className="text-[24px] leading-[36px] text-center text-[#002f87] font-semibold mb-6"
          style={{ fontSize: '24px', lineHeight: '36px', textAlign: 'center', color: '#002f87', fontWeight: 600 }}
          {...createElementSmartLink("quote")}
        >
          {quote.value}
        </p>
        
        {image?.value[0] && (
          <div className="mb-4">
            <img
              src={image.value[0].url}
              alt={image.value[0].description || name.value}
              className="rounded-full w-24 h-24 object-cover mx-auto"
              {...createElementSmartLink("image")}
            />
          </div>
        )}
        
        <p
          className="text-[24px] font-normal italic text-center leading-[36px] text-[#002f87]"
          style={{ fontSize: '24px', fontWeight: 400, fontStyle: 'italic', textAlign: 'center', lineHeight: '36px' }}
          {...createElementSmartLink("name")}
        >
          -{name.value}
        </p>
        
        <p
          className="text-[24px] font-normal italic text-center leading-[36px] text-[#002f87]"
          style={{ fontSize: '24px', fontWeight: 400, fontStyle: 'italic', textAlign: 'center', lineHeight: '36px' }}
          {...createElementSmartLink("role")}
        >
          {role.value}
        </p>
      </div>
    </div>
  );
};

export default TestimonialComponent;
