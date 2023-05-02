import Head from "next/head";
import { useProfilesOwnedBy, ProfileFragment } from "@lens-protocol/react-web";

export default function Member() {
  return (
    <>
      <Head>
        <title>Dao members</title>
      </Head>
      <div className="bg-base flex h-full w-full justify-center">
        <div className="w-full max-w-7xl space-y-6">
          <Page rightColumn={<ProfileBar />}>
            <div className="h-screen bg-slate-500/50">stuff</div>
          </Page>
        </div>
      </div>
    </>
  );
}

function ProfileBar() {
  const { data } = useProfilesOwnedBy({
    address: "0x47d80912400ef8f8224531EBEB1ce8f2ACf4b75a",
  });
  console.log(data);
  const defaultProfile: ProfileFragment | undefined = data?.[0] ?? undefined;
  const { name, bio, handle, ownedBy, stats } = defaultProfile ?? {};
  // const picture = defaultProfile?.picture?.original?.url ?? "undefined";
  return (
    <div className="flex-col">
      <div>profile</div>
      {defaultProfile && (
        <>
          <h1>{name}</h1>
          <h3>{handle}</h3>
          <p>{bio}</p>
          <p>{ownedBy}</p>
        </>
      )}
    </div>
  );
}

export function Page({
  rightColumn,
  children,
}: {
  rightColumn?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <main>
      <div className="mx-auto max-w-full px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-3 lg:gap-8">
          {/* Left column */}
          <div
            className={`grid grid-cols-1 gap-4 ${rightColumn ? "lg:col-span-2" : "lg:col-span-3"}`}
          >
            {children}
          </div>

          {/* Right column */}
          {rightColumn && <div className="grid grid-cols-1 gap-4">{rightColumn}</div>}
        </div>
      </div>
    </main>
  );
}
