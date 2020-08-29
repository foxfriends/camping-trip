<script>
  import { fly } from 'svelte/transition';

  export let story;

  let lines = [];

  export function addLine(line, style = '') {
    lines.push([line, style]);
    lines = lines;
  }

  function * pick(options) {
    for (;;) {
      const option = yield options;
      if (option >= 0 && option < options.length) {
        return option;
      }
    }
  }

  function * play(story) {
    for (;;) {
      for (;;) {
        const line = story.Continue();
        addLine(line, story.currentTags.join(' '));
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
  export function next(option) { return state.next(option); }
</script>

{#each lines as [line, style]}
  <p class='line {style}' transition:fly={{ y: 10, opacity: 0 }}>{line}</p>
{/each}

<style>
  .line {
    margin-bottom: 1ch;

    &.input {
      &::before {
        content: '>';
        margin-right: 1ch;
      }

      &.match {
        opacity: 0.48;
      }

      &.no-match {
        opacity: 0.24;
      }
    }
  }
</style>
