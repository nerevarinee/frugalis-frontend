import { writable } from 'svelte/store';

function createConversationsStore() {
	const { subscribe, set, update } = writable([]);

	return {
		subscribe,
		set,
		update
	};
}

export const conversations = createConversationsStore();
export const activeConversationId = writable(null);
