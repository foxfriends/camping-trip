<script lang='typescript'>
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();

  export let prompt: string = '>';
  export let value: string = '';
  export let disabled: boolean = false;

  $: value = value.slice(0, 64);

  let input: HTMLInputElement;

  function focus() {
    input.focus();
  }

  function keydown({ key }: KeyboardEvent) {
    if (key === 'Enter') {
      submit();
    }
  }

  function submit() {
    dispatch('submit', !disabled ? value : undefined);
    if (!disabled) { value = ''; }
  }
</script>

<div class='container' class:disabled on:click={focus}>
  <span class='prompt'>{prompt}</span>
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
  .container {
    display: flex;
    padding: 1em 0 3em 0;
    width: 100%;
    font: var(--Prompt__font, var(--font--default));
    cursor: text;
    align-items: center;
  }

  .container.disabled input,
  .container.disabled .prompt {
    opacity: 0.24;
  }

  .container.disabled button {
    opacity: 0.48;
  }

  .container:not(.disabled) input:not(:placeholder-shown) + button {
    opacity: 0.48;
  }

  .prompt {
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
  }

  button:hover {
    opacity: 0.48;
    transform: translateY(-2px);
  }

  button:active {
    opacity: 0.48;
    transform: translateY(2px);
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
