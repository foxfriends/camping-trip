<script lang='typescript'>
  export let name: String;
</script>

<div class='test'>
  <div class='content'>
    Hello {name}
  </div>
</div>

<style>
  .test {
    & .content {
      color: red;
    }
  }
</style>
