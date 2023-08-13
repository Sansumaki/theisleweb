import type { Writable} from "svelte/store";
import { writable} from "svelte/store";

export const showDrawer : Writable<boolean> = writable(false);
export const drawerEnabled : Writable<boolean> = writable(false);
export const toggleDrawer: Writable<boolean> = writable(false);