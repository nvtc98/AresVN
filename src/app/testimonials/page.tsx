import { Column, Meta, Schema } from "@once-ui-system/core";
import { baseURL, testimonialsPage, testimonials, person } from "@/resources";
import { TestimonialsSection } from "@/components/TestimonialsSection";

export async function generateMetadata() {
  return Meta.generate({
    title: testimonialsPage.title,
    description: testimonialsPage.description,
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(testimonialsPage.title)}`,
    path: testimonialsPage.path,
  });
}

export default function TestimonialsPage() {
  return (
    <Column maxWidth="m" gap="xl">
      <Schema
        as="webPage"
        baseURL={baseURL}
        title={testimonialsPage.title}
        description={testimonialsPage.description}
        path={testimonialsPage.path}
        image={`/api/og/generate?title=${encodeURIComponent(testimonialsPage.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${testimonialsPage.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <TestimonialsSection testimonials={testimonials} />
    </Column>
  );
}
