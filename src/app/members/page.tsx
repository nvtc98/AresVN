import { Column, Meta, Schema } from "@once-ui-system/core";
import { baseURL, members, person } from "@/resources";
import { getActivePlayers } from "@/data/players";
import { TeamSection } from "@/components/TeamSection";

export async function generateMetadata() {
  return Meta.generate({
    title: members.title,
    description: members.description,
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(members.title)}`,
    path: members.path,
  });
}

export default function MembersPage() {
  return (
    <Column maxWidth="m" gap="xl">
      <Schema
        as="webPage"
        baseURL={baseURL}
        title={members.title}
        description={members.description}
        path={members.path}
        image={`/api/og/generate?title=${encodeURIComponent(members.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${members.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <TeamSection players={getActivePlayers()} />
    </Column>
  );
}
