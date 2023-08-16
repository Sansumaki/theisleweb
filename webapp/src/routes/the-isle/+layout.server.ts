// @ts-ignore
import type {LayoutServerLoad} from './$types';

export const load = (async () => {
    return {
        hasDrawer: true
    }
}) satisfies LayoutServerLoad;