import React from "react";
import ButtonLink from "./ButtonLink";
import { createItemSmartLink, createElementSmartLink } from "../utils/smartlink";

type CallToActionProps = Readonly<{
  title: string;
  description: string;
  buttonText: string;
  buttonHref: string;
  imageSrc?: string;
  imageAlt: string;
  imagePosition?: "left" | "right" | "center";
  style?: "white" | "lavender" | "grey";
  componentId: string;
  componentName: string;
}>;

const CallToActionComponent: React.FC<CallToActionProps> = ({
  title,
  description,
  buttonText,
  buttonHref,
  imageSrc,
  imageAlt,
  imagePosition = "left",
  style = "white",
  componentId,
  componentName,
}) => {
  const calculateLayout = (imagePosition: "left" | "right" | "center") => {
    if (imagePosition === "left") {
      return "lg:flex-row";
    } else if (imagePosition === "right") {
      return "lg:flex-row-reverse";
    }
    return "";
  };

  const getStyleClasses = (style: "white" | "lavender" | "grey") => {
    switch (style) {
      case "lavender":
        return "bg-usanaBlue";
      case "grey":
        return "bg-usanaLightGrey";
      case "white":
      default:
        return "bg-white";
    }
  };

  return (
    <div
      className={`${getStyleClasses(style)} w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] px-4 lg:px-8 xl:px-16`}
      {...createItemSmartLink(componentId, componentName)}
    >
      <div className="max-w-7xl mx-auto">
        <div
          className={`flex flex-col ${calculateLayout(imagePosition)
            } items-center gap-16 py-16`}
        >
          <div className="rounded-lg xl:w-[560px] lg:w-[420px]">
            <img
              src={imageSrc}
              width={560}
              height={420}
              alt={imageAlt}
              className="rounded object-fit"
            />
          </div>

          <div className={`flex lg:flex-1 flex-col gap-5 ${imagePosition === "center" ? "items-center" : ""}`}>
            <h2 className={`flex w-fit text-heading-2-color text-[32px]`}
              {...createElementSmartLink("headline")}
            >
              {title}
            </h2>

            <p className={`flex text-base text-body-color line-clamp-5`}
              {...createElementSmartLink("subheadline")}
            >
              {description}
            </p>

            {buttonText &&  (
              <div className="flex pt-5">
                <ButtonLink
                  href={buttonHref}
                >
                  {buttonText}
                </ButtonLink>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CallToActionComponent;
