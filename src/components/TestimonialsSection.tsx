import { Avatar, Column, Flex, Heading, Text } from "@once-ui-system/core";

interface Testimonial {
  img: string;
  text: string;
  name: string;
}

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({
  testimonials,
}) => {
  return (
    <Column fillWidth gap="m">
      <Heading
        as="h2"
        id="Nhận xét"
        variant="display-strong-s"
        marginBottom="m"
      >
        Nhận xét
      </Heading>
      <Flex fillWidth wrap gap="l">
        {testimonials.map((testimonial) => (
          <Column
            key={testimonial.name}
            border="neutral-medium"
            radius="l"
            padding="l"
            gap="m"
            style={{ flex: "1 1 280px", maxWidth: "100%" }}
          >
            <Text variant="body-default-l" style={{ fontStyle: "italic" }}>
              &ldquo;{testimonial.text}&rdquo;
            </Text>
            <Flex gap="m" vertical="center">
              <Avatar src={testimonial.img} size="m" />
              <Text variant="heading-strong-s">{testimonial.name}</Text>
            </Flex>
          </Column>
        ))}
      </Flex>
    </Column>
  );
};
