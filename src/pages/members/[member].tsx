/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import Head from "next/head";
import {
  useProfilesOwnedBy,
  Profile,
  ProfileAttributes,
  usePublications,
  ProfileId,
} from "@lens-protocol/react-web";
import React, { Fragment } from "react";
import { useBalanceAndPower } from "@hooks/lens/useBalanceAndPower";
import { useDelegateNFT } from "@hooks/lens/useDelegateNFT";
import { Address, useAccount } from "wagmi";

import { AiOutlineTwitter } from "react-icons/ai";
import { GoLocation, GoGlobe } from "react-icons/go";

import { FollowOnLens, Theme, Size, Publication } from "@lens-protocol/widgets-react";
import { useRouter } from "next/router";

const Member = () => {
  const { query } = useRouter();
  const memberAddress = query.member as string;
  const { data } = useProfilesOwnedBy({
    address: memberAddress,
    limit: 5,
  });
  const profile = data?.[0];
  if (!memberAddress) {
    return null;
  }
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
              <Feed profileId={profile?.id.toString()} member={memberAddress} />
            </div>
          </div>

          {/* Right column */}
          <div className="grid grid-cols-1 gap-4">
            <ProfileBar profile={profile} member={memberAddress} />
          </div>
        </div>
      </div>
    </>
  );
};
interface FeedProps {
  member?: string;
  profileId?: string;
}
const Feed: React.FC<FeedProps> = ({ profileId }) => {
  const { data: publications } = usePublications({
    profileId: profileId as ProfileId,
    limit: 4,
  });

  return (
    <div className="h-screen">
      <ul role="list" className="w-full  space-y-3">
        {publications?.length ? (
          publications.map((item) => (
            <Publication key={item.id} publicationId={item.id} theme={Theme.dark} />
          ))
        ) : (
          <div className="text-error">No publications found for inexistent member</div>
        )}
      </ul>
    </div>
  );
};

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

const ProfileButtons: React.FC<ProfileProps> = ({ profile, member }) => {
  const { write } = useDelegateNFT(member as Address);
  return (
    <div className="flex items-center justify-center space-x-6 py-4 pt-2 align-middle">
      <div className="tooltip tooltip-bottom" data-tip="Follow this member on lens">
        <FollowOnLens
          handle={profile?.handle.split(".")[0] ?? ""}
          theme={Theme.mint}
          size={Size.medium}
        />
      </div>
      <div className="tooltip tooltip-bottom" data-tip="Delegate your voting power to this member">
        <button className="btn" onClick={() => write?.()}>
          delegate
        </button>
      </div>
    </div>
  );
};

interface ProfileProps {
  member: string;
  profile?: Profile;
}

const ProfileBar: React.FC<ProfileProps> = ({ profile, member }) => {
  const attributes = profile?.attributes ?? {};

  return (
    <div className="flex-col justify-center align-middle">
      {profile ? (
        <>
          <ProfileAvatar profileData={profile} />
          <ProfileIcons attributes={attributes} />
          <Stats data={profile} />
          <ProfileButtons profile={profile} member={member} />
        </>
      ) : (
        <div className="text-error">Profile does not exist</div>
      )}
    </div>
  );
};

const ProfileIcons = ({ attributes }: { attributes: ProfileAttributes }) => {
  const icons = parseAttributes(attributes);

  return (
    <div className="profile-icons">
      {icons.map((icon, index) => (
        <Fragment key={index}>{icon}</Fragment>
      ))}
    </div>
  );
};

const getDP = (data: any) => {
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
      const attribute = (attributes as any)[key] as string;
      if (attribute) {
        const value = attribute.toString();
        return (
          <div key={key} className="pr flex space-x-2">
            {(logos as any)[key]}
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
