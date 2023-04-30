import MemberCard from "./MemberCard";
import { Address } from "wagmi";

export default function MemberCardList({ members }: { members: Address[] | undefined }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {members?.map((member, index) => (
        <MemberCard key={index} member={member} />
      ))}
    </div>
  );
}
