import { FC } from "react";
import { TestimonialSection, Testimonial } from "../model";
import TestimonialComponent from "./Testimonial";
import { createItemSmartLink, createElementSmartLink } from "../utils/smartlink";

type TestimonialSectionProps = {
  data: TestimonialSection;
  componentId: string;
  componentName: string;
  richTextLinkedItems?: any[];
};

const TestimonialSectionComponent: FC<TestimonialSectionProps> = ({ 
  data, 
  componentId, 
  componentName, 
  richTextLinkedItems 
}) => {
  // Get linked items from either the component's linkedItems or from rich text context
  const getLinkedItems = () => {
    if (data.elements.testimonials.linkedItems && data.elements.testimonials.linkedItems.length > 0) {
      return data.elements.testimonials.linkedItems;
    }
    
    // Fallback: try to find linked items from rich text context
    if (richTextLinkedItems) {
      return data.elements.testimonials.value.map(ref => 
        richTextLinkedItems.find(item => item.system.codename === ref)
      ).filter(Boolean) as Testimonial[];
    }
    
    return [];
  };

  const testimonials = getLinkedItems();

  return (
    <div 
      className="relative py-16 px-8 min-h-[720px]"
      style={{
        backgroundImage: data.elements.background_image?.value[0]?.url 
          ? `url(${data.elements.background_image.value[0].url})` 
          : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
      {...createItemSmartLink(componentId, componentName)}
    >
      <div className="max-w-6xl mx-auto">
        {/* Title */}
        <h2 
          className="text-center mb-12 text-usanaBlue"
          style={{ fontSize: '48px', fontWeight: 300, textAlign: 'center', marginBottom: '48px' }}
          {...createElementSmartLink("title")}
        >
          {data.elements.title.value}
        </h2>
        
        {/* Testimonials Container */}
        <div 
          className="flex flex-row justify-center gap-20"
          style={{ 
            display: 'flex', 
            flexDirection: 'row', 
            justifyContent: 'center', 
            gap: '80px' 
          }}
        >
          {testimonials.map((testimonial, index) => (
            <div key={testimonial.system.id || index} className="flex-1 max-w-sm">
              <TestimonialComponent
                quote={testimonial.elements.quote}
                name={testimonial.elements.name}
                role={testimonial.elements.role}
                image={testimonial.elements.image}
                componentId={testimonial.system.id}
                componentName={testimonial.system.name}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialSectionComponent;
