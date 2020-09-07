<script lang='typescript'>
  import type { Story } from 'inkjs/engine/runtime';
  import { fly } from 'svelte/transition';

  export let story: Story;

  type Span = [string, string];
  type Spanned = (string | Span)[];

  type Line = {
    line: Spanned;
    style: string;
  };
  let lines: Line[] = [];

  const spanned = (segments: string[], ...spans: Span[]): Spanned => segments
    .reduce((out, segment, i): Spanned => [...out, segment, spans[i] || ''], [] as Spanned);

  export function addLine(line: Spanned, style: string = '') {
    lines.push({ line, style });
    lines = lines;
  }

  function * pick(options: string[]) {
    for (;;) {
      const option = yield options;
      if (typeof option === 'number' && option >= 0 && option < options.length) {
        return option;
      }
    }
  }

  function * play(story: Story) {
    for (;;) {
      for (;;) {
        const line = story.Continue()!;
        const segments = line.split(/<[^>]*>/g);
        const spans = [...line.matchAll(/<([^>]*)>/g)]
          .map(([, content]) => content.split(':'))
          .map(([span, content]) => [content ? span : 'object', content || span] as Span);
        const text = spanned(segments, ...spans);
        addLine(text, (story.currentTags || []).join(' '));
        if (!story.canContinue) break;
        yield;
      }
      if (!story.currentChoices.length) {
        break;
      }
      const option = yield* pick(story.currentChoices.map(({ text }) => text));
      story.ChooseChoiceIndex(option);
    }
  }

  const state = play(story);
  export function next(option: number | undefined): IteratorResult<string[] | undefined, void> {
    return state.next(option);
  }
</script>

{#each lines as { line, style }}
  <p class='line {style}' transition:fly={{ y: 10, opacity: 0 }}>
    {#each line as span}
      {#if typeof span === 'string'}
        {span}
      {:else}
        <span class={span[0]}>{span[1]}</span>
      {/if}
    {/each}
  </p>
{/each}
{#if story.canContinue}
  <p class='arrow'>↩</p>
{/if}
{#if !story.canContinue && story.currentChoices}
  <p class='prompt' in:fly={{ x: -10, opacity: 0, delay: 500 }}>What do you do?</p>
{/if}

<style>
  .line {
    margin-bottom: 1ch;
  }

  .line.input::before {
    content: '>';
    margin-right: 1ch;
  }

  .line.input.match {
    opacity: 0.48;
  }

  .line.input.no-match {
    opacity: 0.24;
  }

  .arrow {
    opacity: 0.24;
    position: absolute;
    bottom: 0;
    right: 0;
  }

  .prompt {
    transform: translateX(-16ch);
    font-variant-caps: all-small-caps;
    font-size: smaller;
    opacity: 0.48;
  }

  .gps {
    text-transform: uppercase;
    color: var(--color--content-secondary);
    padding: 2em 0;
    font-size: smaller;
    text-align: center;
  }

  .scene {
    color: var(--color--content-secondary);
  }

  .object {
    color: var(--color--content);
  }
</style>
