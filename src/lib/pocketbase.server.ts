import { POCKETBASE_URL, POCKETBASE_ADMIN_EMAIL, POCKETBASE_ADMIN_PASSWORD } from "$env/static/private";
import PocketBase from "pocketbase";

const pb = new PocketBase(POCKETBASE_URL || "http://127.0.0.1:8090");
const authData = await pb.admins.authWithPassword(POCKETBASE_ADMIN_EMAIL, POCKETBASE_ADMIN_PASSWORD);

export default pb;