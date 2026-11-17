import { Column, Meta, Schema } from "@once-ui-system/core";
import { baseURL, members, person } from "@/resources";
import { getActivePlayers } from "@/data/players";
import { PageHero } from "@/components/fx/PageHero";
import { Roster } from "@/components/members/Roster";

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
  const players = getActivePlayers();

  return (
    <Column fillWidth gap="48" style={{ maxWidth: 1180, paddingBottom: 96 }}>
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
      <PageHero
        kicker={`Đội hình · ${players.length} chiến binh`}
        title={members.label}
        subtitle="Những gương mặt làm nên rạp xiếc. Bấm vào từng thẻ để xem hồ sơ."
      />
      <Roster players={players} />
    </Column>
  );
}
