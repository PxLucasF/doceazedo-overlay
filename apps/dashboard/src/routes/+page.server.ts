import { redirect } from '@sveltejs/kit';
import { CONFIG } from 'config';

export const load = () => {
	if (!CONFIG.twitchClientId || !CONFIG.twitchClientSecret) {
		throw redirect(302, '/setup');
	}

	return {
		twitchClientId: CONFIG.twitchClientId,
		twitchClientSecret: CONFIG.twitchClientSecret
	};
};
