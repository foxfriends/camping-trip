<script lang='typescript'>
  import Prompt from './Prompt.svelte';
</script>

<div class='layout'>
  <main>
    <div class='content'>
      <p>Hello.</p>

      <p>Let's go camping.</p>
    </div>
  </main>
  <footer>
    <div class='content'>
      <Prompt />
    </div>
  </footer>
</div>

<style>
  @media (prefers-color-scheme: light), (prefers-color-scheme: no-preference) {
    :root {
      --color--background: #f7f7f7;
      --color--content: #0a0a0a;
      --color--shadow: rgba(0, 0, 0, 0.05);
    }
  }

  @media (prefers-color-scheme: dark) {
    :root {
      --color--background: #111111;
      --color--content: #fafafa;
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
    box-sizing: border-box;
    width: 80ch;
    margin: 0 auto;
  }

  main {
    flex-grow: 1;
    overflow: auto;

    & .content {
      padding-top: 2em;
    }
  }

  footer {
    box-shadow: 0 0 45px var(--color--shadow);
  }
</style>
