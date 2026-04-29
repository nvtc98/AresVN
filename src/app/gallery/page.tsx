import { Carousel, Column, Heading, Meta, Schema } from "@once-ui-system/core";
import { baseURL, gallery, person } from "@/resources";

export async function generateMetadata() {
  return Meta.generate({
    title: gallery.title,
    description: gallery.description,
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(gallery.title)}`,
    path: gallery.path,
  });
}

export default function Gallery() {
  const carouselItems = gallery.images.map((image) => ({
    slide: image.src,
    alt: image.alt,
  }));

  return (
    <Column maxWidth="l" gap="l" horizontal="center">
      <Schema
        as="webPage"
        baseURL={baseURL}
        title={gallery.title}
        description={gallery.description}
        path={gallery.path}
        image={`/api/og/generate?title=${encodeURIComponent(gallery.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${gallery.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <Heading as="h1" variant="display-strong-l">
        {gallery.label}
      </Heading>
      <Carousel
        fillWidth
        items={carouselItems}
        aspectRatio="16 / 9"
        indicator="thumbnail"
        sizes="(max-width: 960px) 100vw, 960px"
      />
    </Column>
  );
}
