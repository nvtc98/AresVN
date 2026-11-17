import { Column, Meta, Schema } from "@once-ui-system/core";
import { baseURL, gallery, person } from "@/resources";
import { PageHero } from "@/components/fx/PageHero";
import { BentoGallery } from "@/components/gallery/BentoGallery";

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
  return (
    <Column fillWidth gap="48" style={{ maxWidth: 1180, paddingBottom: 96 }}>
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
      <PageHero
        kicker={`Kho lưu trữ · ${gallery.images.length} khoảnh khắc`}
        title={gallery.label}
        subtitle="Những khung hình không ai yêu cầu nhưng ai cũng cần."
      />
      <BentoGallery images={gallery.images} />
    </Column>
  );
}
