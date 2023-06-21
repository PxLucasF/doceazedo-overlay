import { CONFIG } from 'config';
import { error, redirect } from '@sveltejs/kit';
import { promises as fs } from 'fs';

export const GET = async ({ url, params }) => {
	const clientId = CONFIG.twitchClientId;
	if (!clientId) throw error(500, 'Could not get client ID');

	const clientSecret = CONFIG.twitchClientSecret;
	if (!clientSecret) throw error(500, 'Could not get client secret');

	const code = url.searchParams.get('code');
	if (!code) throw error(400, 'Invalid callback');

	const type = params.type;
	if (type != 'broadcaster' && type != 'bot') throw error(400, 'Invalid account type');

	const redirectUri = `${url.origin}/accounts/connect/twitch/${type}`;
	const token = await getTwitchToken(clientId, clientSecret, code, redirectUri);
	if (!token) throw error(500, 'Could not retrieve account token');

	const tokenData = {
		accessToken: token.access_token,
		refreshToken: token.refresh_token,
		expiresIn: token.expires_in,
		obtainmentTimestamp: 0
	};

	const user = await getTwitchUser(clientId, tokenData.accessToken);
	if (!user) throw error(500, 'Could not retrieve user data');

	try {
		await fs.writeFile(`../../tokens/${user.id}.json`, JSON.stringify(tokenData, null, 2));
	} catch (e) {
		throw error(500, 'Could not store token');
	}

	await CONFIG.update({
		twitchBroadcasterId: type == 'broadcaster' ? user.id : CONFIG.twitchBroadcasterId,
		twitchBotId: type == 'bot' ? user.id : CONFIG.twitchBotId
	});

	throw redirect(302, '/accounts');
};

const getTwitchToken = async (
	clientId: string,
	clientSecret: string,
	code: string,
	redirectUri: string
) => {
	try {
		const resp = await fetch(
			`https://id.twitch.tv/oauth2/token?client_id=${clientId}&client_secret=${clientSecret}&code=${code}&grant_type=authorization_code&redirect_uri=${redirectUri}`,
			{
				method: 'POST'
			}
		);
		if (!resp.ok) throw Error();
		const data = await resp.json();
		return data;
	} catch (error) {
		return null;
	}
};

const getTwitchUser = async (clientId: string, token: string) => {
	try {
		const resp = await fetch('https://api.twitch.tv/helix/users', {
			headers: {
				Authorization: `Bearer ${token}`,
				'Client-Id': clientId
			}
		});
		const data = await resp.json();
		return data?.data?.[0] || null;
	} catch (error) {
		return null;
	}
};
