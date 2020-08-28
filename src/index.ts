import { Story } from 'inkjs';
import App from './App.svelte';
import ink from './story/index.ink';

const story = new Story(ink);
new App({ target: document.body, props: { story } });
