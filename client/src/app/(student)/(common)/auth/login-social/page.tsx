import { Suspense } from "react";
import SocialPage from "./_components/SocialPage";
import Loading from "~/app/(student)/_components/Loading";

export default function Page() {
    return (
        <Suspense fallback={<Loading />}>
            <SocialPage />
        </Suspense>
    );
}
