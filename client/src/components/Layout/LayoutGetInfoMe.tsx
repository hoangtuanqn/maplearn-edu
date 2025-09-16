"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
// import Loading from "~/app/(student)/_components/Loading";
import privateApi from "~/libs/apis/privateApi";
import { setUser } from "~/store/userSlice";

export default function LayoutGetInfoMe({ children }: { children: React.ReactNode }) {
    // const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const router = useRouter();
    useEffect(() => {
        const fetchUser = async () => {
            // setIsLoading(true);
            try {
                const res = await privateApi.post("/auth/me");
                const user = res.data.data;
                // Htuanqn: Lưu thông tin user
                dispatch(setUser(user));
            } catch {
            } finally {
                // setIsLoading(false);
            }
        };

        fetchUser();
    }, [dispatch, router]);
    // if (isLoading) return <Loading />;

    return children;
}
