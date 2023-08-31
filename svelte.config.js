import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/kit/vite';

export default {
	preprocess: vitePreprocess(),
	kit: {
		adapter: adapter({ fallback: 'index.html' }),
		prerender: {
			entries: ['/quotes/edit/{text=string}/{text=string}/{text=string}'],
		},
	}
};
