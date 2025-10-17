import { Elements } from "@kontent-ai/delivery-sdk";
import { FC } from "react";
import ButtonLink from "./ButtonLink";
import { createElementSmartLink, createItemSmartLink } from "../utils/smartlink";
import { Page } from "../model";

type HeroImageProps = Readonly<{
  data: {
    headline?: Elements.TextElement;
    subheadline?: Elements.TextElement;
    heroImage?: Elements.AssetsElement;
    buttonText?: Elements.TextElement;
    heroLink?: Elements.LinkedItemsElement<Page>;
    itemId?: string;
  };
  buttonLink?: string;

}>;

const HeroImage: FC<HeroImageProps> = ({ data, buttonLink }) => {
  const heroImageUrl = data.heroImage?.value[0]?.url;
  
  return (
    <div 
      className="relative w-full bg-white"
      style={{
        backgroundImage: heroImageUrl ? `url(${heroImageUrl}?auto=format&w=1200)` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center right',
        backgroundRepeat: 'no-repeat',
        maxHeight: '544px',
        minHeight: '544px'
      }}
    >
      {/* Content Container */}
      <div className="relative z-10 flex items-center h-full max-w-7xl mx-auto px-6">
        <div className="w-full lg:w-1/2 flex flex-col gap-6 mt-[100px]">
          <h1 
            className="font-noto text-[48px] font-normal leading-tight"
            style={{ color: 'rgb(51,75,215)' }}
            {...createItemSmartLink(data.itemId)}
            {...createElementSmartLink("headline")}
          >
            {data.headline?.value}
          </h1>
          <p 
            className="font-noto text-[20px] font-normal leading-[30px] text-gray-800"
            {...createItemSmartLink(data.itemId)}
            {...createElementSmartLink("subheadline")}
          >
            {data.subheadline?.value}
          </p>
          {(buttonLink != "nolink" || data.buttonText?.value) && (
            <div className="mt-4">
              <ButtonLink 
                href={buttonLink ?? (data.heroLink?.linkedItems?.[0]?.elements?.url?.value) ?? "services"}
              >
                <p>{data.buttonText?.value || "Shop Products"}</p>
              </ButtonLink>
            </div>
          )}
        </div>
        <div 
          className="hidden lg:block lg:w-1/2"
          {...createItemSmartLink(data.itemId)}
          {...createElementSmartLink("hero_image")}
        >
          {/* This div is intentionally empty - the background image handles the visual */}
        </div>
      </div>
    </div>
  );
};

export default HeroImage;