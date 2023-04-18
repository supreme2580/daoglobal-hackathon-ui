import MemberProfileCard from "@components/members/MemberProfileCard";
import Head from "next/head";
import DelegateTable from "@components/members/DelegateTable";
import { table } from "@constants/table";

export default function Member() {
    return(
        <>
            <Head>
                <title>Dao members</title>
            </Head>
            <div className="flex h-full bg-base w-full justify-center">
                <div className="w-full max-w-7xl space-y-6">
                    <MemberProfileCard />
                    <DelegateTable data={table} />
                </div>
            </div>
        </>
    )
}