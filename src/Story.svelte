<script lang='typescript'>
  import type { Story } from 'inkjs/engine/runtime';
  import { fly } from 'svelte/transition';

  export let story: Story;

  type Line = {
    line: string;
    style: string;
  };
  let lines: Line[] = [];

  export function addLine(line: string, style: string = '') {
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
        addLine(line, (story.currentTags || []).join(' '));
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
  <p class='line {style}' transition:fly={{ y: 10, opacity: 0 }}>{line}</p>
{/each}

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
</style>
