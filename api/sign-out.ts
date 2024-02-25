import { fetcher } from "@/utils/fetcher";

export async function signOut() {
	await fetcher("/sign-out", { method: "POST", body: {} }).then(() => null);
}
