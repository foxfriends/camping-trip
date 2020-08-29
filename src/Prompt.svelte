<script lang='typescript'>
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();

  export let symbol = '>';
  export let value = '';
  export let disabled = false;

  $: value = value.slice(0, 64);

  let input;

  function focus() {
    input.focus();
  }

  function keydown({ key }) {
    if (key === 'Enter') {
      submit(event.originalTarget === input && !disabled ? value : undefined);
      if (!disabled) { value = ''; }
    }
  }

  function submit(value) {
    dispatch('submit', value);
  }
</script>

<div class='prompt' class:disabled on:click={focus}>
  <span class='symbol'>{symbol}</span>
  <input
    type='text'
    autofocus
    placeholder=''
    bind:value
    bind:this={input}
    on:keydown={keydown} />
  <button on:click={submit}>
    ↩ Enter
  </button>
</div>

<style>
  .prompt {
    display: flex;
    padding: 1em 0 3em 0;
    width: 100%;
    font: var(--Prompt__font, var(--font--default));
    cursor: text;
    align-items: center;

    &.disabled {
      & input,
      & .symbol {
        opacity: 0.24;
      }

      & button {
        opacity: 0.48;
      }
    }

    &:not(.disabled) {
      & input:not(:placeholder-shown) + button {
        opacity: 0.48;
      }
    }
  }

  .symbol {
    color: var(--color--content);
    opacity: 0.48;
    transition: opacity 0.2s;
  }

  button {
    padding: 8px;
    border: 1px solid;
    border-radius: 4px;
    color: var(--color--content);
    background: none;
    font: var(--Prompt__font, var(--font--default));
    font-size: smaller;
    opacity: 0.24;
    transition: opacity 0.2s, transform 0.2s;
    cursor: pointer;

    &:hover {
      opacity: 0.48;
      transform: translateY(-2px);
    }

    &:active {
      opacity: 0.48;
      transform: translateY(2px);
    }
  }

  input {
    border: none;
    background: none;
    padding: 0 1ch;
    flex-grow: 1;
    font: var(--Prompt_font, var(--font--default));
    color: var(--color--content);
    outline: none;
    transition: opacity 0.2s;
  }
</style>
