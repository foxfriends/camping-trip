<script>
  export let story;

  let lines = [];

  export function addLine(line) {
    lines.push(line);
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
        addLine(story.Continue());
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

{#each lines as line}
  <p>{line}</p>
{/each}

<style>
</style>
