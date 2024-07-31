import { POCKETBASE_ADMIN_EMAIL, POCKETBASE_ADMIN_PASSWORD } from "$env/static/private";
import { PUBLIC_POCKETBASE_URL } from "$env/static/public";
import PocketBase from "pocketbase";

const pb = new PocketBase(PUBLIC_POCKETBASE_URL || "http://127.0.0.1:8090");
const authData = await pb.admins.authWithPassword(POCKETBASE_ADMIN_EMAIL, POCKETBASE_ADMIN_PASSWORD);

export default pb;