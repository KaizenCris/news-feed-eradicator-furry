import injectUI, { isAlreadyInjected } from '../lib/inject-ui';
import { isEnabled } from '../lib/is-enabled';
import { Store } from '../store';
import { injectCSS } from './shared';

export function checkSite(): boolean {
	return window.location.host.includes('inkbunny.net');
}

export function eradicate(store: Store) {
	injectCSS('inkbunny');

	function eradicateRetry() {
		const settings = store.getState().settings;
		if (settings == null || !isEnabled(settings)) {
			return;
		}

		// Don't do anything if the UI hasn't loaded yet
		// Select the correct inkbunny feed based on the user's login status
		let feed = document.querySelector('#gallery-frontpage-submissions');

		if (feed == null) {
			return;
		}

		const container = feed;

		// Add News Feed Eradicator quote/info panel
		if (container && !isAlreadyInjected()) {
			injectUI(container, store);
		}
	}

	// This delay ensures that the elements have been created by inkbunny's
	// scripts before we attempt to replace them
	setInterval(eradicateRetry, 1000);
}
