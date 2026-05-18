import { writable } from 'svelte/store';

function createGuestStore() {
	const stored = typeof localStorage !== 'undefined' ? localStorage.getItem('guest') : null;
	const initial = stored ? JSON.parse(stored) : { token: null, phone: null };

	const { subscribe, set } = writable(initial);

	subscribe((val) => {
		if (typeof localStorage !== 'undefined') {
			localStorage.setItem('guest', JSON.stringify(val));
		}
	});

	const API_URL = import.meta.env.PUBLIC_API_URL || 'http://localhost:8080';

	return {
		subscribe,
		/** @param {string} phone */
		async login(phone) {
			const res = await fetch(`${API_URL}/api/guests/auth`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				credentials: 'include',
				body: JSON.stringify({ phone })
			});
			if (!res.ok) {
				const data = await res.json();
				throw new Error(data.message || 'Guest login failed');
			}
			const data = await res.json();
			set({ token: data.token, phone: data.guest.phone });
			return data;
		},
		logout() {
			set({ token: null, phone: null });
		}
	};
}

export const guest = createGuestStore();
