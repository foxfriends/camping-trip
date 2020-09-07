<script lang='typescript'>
  import { onMount } from 'svelte';
  import type { Story as InkStory } from 'inkjs/engine/runtime';
  import Prompt from './Prompt.svelte';
  import Story from './Story.svelte';
  import Matcher from './Matcher';

  export let story: InkStory;

  let runner: Story;
  let options: string[] | undefined;
  $: matcher = options && new Matcher(options);

  function step({ detail: input }: CustomEvent<string | undefined> = {}) {
    const index = matcher && input && matcher.match(input);
    if (input) {
      runner.addLine([input], index === -1 ? 'input no-match' : 'input match');
    }
    const result = runner.next(typeof index === 'number' ? index : undefined);
    if (!result.done) {
      options = result.value;
    }
  }

  onMount(step);
</script>

<div class='layout'>
  <main>
    <div class='content'>
      <Story {story} bind:this={runner} />
    </div>
  </main>
  <footer>
    <div class='content'>
      <Prompt on:submit={step} disabled={!options} />
    </div>
  </footer>
</div>

<style>
  @media (prefers-color-scheme: light), (prefers-color-scheme: no-preference) {
    :root {
      --color--background: #f7f7f7;
      --color--content: #0a0a0a;
      --color--content-secondary: #0a0a0a80;
      --color--shadow: rgba(0, 0, 0, 0.05);
    }
  }

  @media (prefers-color-scheme: dark) {
    :root {
      --color--background: #111111;
      --color--content: #fafafa;
      --color--content-secondary: #fafafa80;
      --color--shadow: rgba(0, 0, 0, 0.7);
    }
  }

  :root {
    --color--divider: rgba(var(--color--content), 0.12);
    --border--divider: 1px solid var(--color--divider);
    --font--default: 16pt mono;
  }

  :global(body, p, h1, h2, h3, h4, h5, h6) {
    padding: 0;
    margin: 0;
    font: var(--font--default);
    color: var(--color--content);
  }

  :global(body) {
    height: 100vh;
    background-color: var(--color--background);
  }

  .layout {
    display: flex;
    flex-direction: column;
    word-wrap: break-word;
    overflow: hidden;
    height: 100%;
  }

  .content {
    position: relative;
    box-sizing: border-box;
    width: 80ch;
    margin: 0 auto;
  }

  main {
    flex-grow: 1;
    overflow: auto;
  }

  main .content {
    padding-top: 2em;
  }

  footer {
    box-shadow: 0 0 45px var(--color--shadow);
  }
</style>
