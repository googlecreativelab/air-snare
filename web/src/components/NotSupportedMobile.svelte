<script>
  import NotSupported from "./NotSupported.svelte";

  let show = true;
  function handleDismiss(){
    show = false;
  }
</script>

{#if show}
<NotSupported>
  <h2>Mobile is not officially supported. Functionality may be limited.</h2>
  <button on:click={handleDismiss}>Proceed Anyway</button>
</NotSupported>
{/if}