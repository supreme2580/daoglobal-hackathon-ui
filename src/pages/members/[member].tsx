import Head from "next/head";
import {
  useProfilesOwnedBy,
  Profile,
  ProfileAttributes,
  usePublications,
  ProfileId,
} from "@lens-protocol/react-web";
import { Fragment } from "react";
import { useBalanceAndPower } from "@hooks/lens/useBalanceAndPower";
import { useAccount } from "wagmi";

import { AiOutlineTwitter } from "react-icons/ai";
import { GoLocation, GoGlobe } from "react-icons/go";

import { FollowOnLens, Theme, Size, Publication } from "@lens-protocol/widgets-react";

const Member = () => {
  return (
    <>
      <Head>
        <title>Dao members</title>
      </Head>
      <div className="mx-auto max-w-full px-4 sm:px-8 lg:px-8">
        <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-3 lg:gap-8">
          {/* Left column */}
          <div className={`grid grid-cols-1 gap-4 lg:col-span-2`}>
            <div className="h-screen ">
              <Feed />
            </div>
          </div>

          {/* Right column */}
          <div className="grid grid-cols-1 gap-4">
            <ProfileBar />
          </div>
        </div>
      </div>
    </>
  );
};

function Feed() {
  const { data: publications } = usePublications({
    profileId: "0x2e5f" as ProfileId,
    limit: 4,
  });

  return (
    <div className="h-screen">
      <ul role="list" className="w-full  space-y-3">
        {publications &&
          publications.map((item) => <Publication publicationId={item.id} theme={Theme.dark} />)}
      </ul>
    </div>
  );
}

function ProfileAvatar({ profileData }: { profileData: Profile }) {
  const { name, bio, handle, ownedBy, stats } = profileData ?? {};
  const picture = getDP(profileData);
  return (
    <>
      <div className="align-middle-center w-full flex-col justify-center">
        <div className="mask mask-squircle avatar w-48">
          <img src={picture}></img>
        </div>
      </div>
      <h1 className="text-3xl">{name}</h1>
      <h3 className="text-xl">@{handle}</h3>
      <p className="py-2">{bio}</p>
    </>
  );
}

function Stats({ data }: { data: Profile }) {
  const { stats } = data ?? {};
  const { address } = useAccount();
  const { token } = useBalanceAndPower(address);
  return (
    <div className="flex justify-between py-4">
      <div className="flex-col ">
        <h2>{stats?.totalFollowers ?? 0}</h2>
        <h1>followers</h1>
      </div>
      <div className="flex-col ">
        <h2>{token?.balance ?? 0}</h2>
        <h1>Tokens</h1>
      </div>
      <div className="flex-col">
        <h2>{token?.power ?? 0}</h2>
        <h1>Voting Power</h1>
      </div>
    </div>
  );
}

function ProfileButtons() {
  return (
    <div className="flex items-center justify-center space-x-6 py-4 pt-2 align-middle">
      <div className="tooltip tooltip-bottom" data-tip="Follow this member on lens">
        <FollowOnLens handle="stani" theme={Theme.mint} size={Size.medium} />
      </div>
      <div className="tooltip tooltip-bottom" data-tip="Delegate your voting power to this member">
        <button className="btn">delegate</button>
      </div>
    </div>
  );
}

function ProfileBar() {
  const { data } = useProfilesOwnedBy({
    address: "0x47d80912400ef8f8224531EBEB1ce8f2ACf4b75a",
  });
  console.log(data);
  const defaultProfile: Profile | undefined = data?.[0] ?? undefined;

  const attributes = defaultProfile?.attributes ?? [];

  return (
    <div className="flex-col justify-center align-middle">
      {defaultProfile && (
        <>
          <ProfileAvatar profileData={defaultProfile} />
          <ProfileIcons attributes={attributes} />
          <Stats data={defaultProfile} />
          <ProfileButtons />
        </>
      )}
    </div>
  );
}

const ProfileIcons = ({ attributes }: any) => {
  const icons = parseAttributes(attributes);

  return (
    <div className="profile-icons">
      {icons.map((icon, index) => (
        <Fragment key={index}>{icon}</Fragment>
      ))}
    </div>
  );
};

const getDP = (data: Profile) => {
  return (data?.picture?.original?.url ??
    `https://api.dicebear.com/6.x/pixel-art/svg?seed=${Math.random()}`) as string;
};

const parseAttributes = (attributes: ProfileAttributes | []) => {
  if (attributes.length === 0) {
    return [];
  }
  const keysToCheck = ["location", "twitter", "website"];
  const logos = {
    location: <GoLocation />,
    twitter: <AiOutlineTwitter />,
    website: <GoGlobe />,
  };

  return keysToCheck
    .map((key) => {
      const attribute = attributes[key];
      if (attribute) {
        const value = attribute.toString();
        return (
          <div key={key} className="pr flex space-x-2">
            {logos[key]}
            {/* <img src={logos[key]} alt={key} /> */}
            <span>{value}</span>
          </div>
        );
      }
      return null;
    })
    .filter((element) => element !== null);
};

export default Member;
