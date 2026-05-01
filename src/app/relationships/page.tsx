import { Column, Meta, Schema } from "@once-ui-system/core";
import { baseURL, relationshipsPage, relationships, person } from "@/resources";
import { RelationshipsSection } from "@/components/RelationshipsSection";

export async function generateMetadata() {
  return Meta.generate({
    title: relationshipsPage.title,
    description: relationshipsPage.description,
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(relationshipsPage.title)}`,
    path: relationshipsPage.path,
  });
}

export default function RelationshipsPage() {
  return (
    <Column maxWidth="xl" gap="xl">
      <Schema
        as="webPage"
        baseURL={baseURL}
        title={relationshipsPage.title}
        description={relationshipsPage.description}
        path={relationshipsPage.path}
        image={`/api/og/generate?title=${encodeURIComponent(relationshipsPage.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${relationshipsPage.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <RelationshipsSection relationships={relationships} />
    </Column>
  );
}
