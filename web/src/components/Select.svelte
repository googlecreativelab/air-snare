<script>
  export let onSelect = () => {};
  export let value = null;

  let customSelect;
  let selected;

  $: if (selected) {
    onSelect(selected);
  }
</script>

<div class="custom-select" bind:this={customSelect} on:click|stopPropagation>
  <select bind:value={value}>
   <slot/>
  </select>
</div>

<style lang="scss">
  @import '../scss/vars';
  .custom-select {
    position: relative;
    &:after {
      position: absolute;
      content: "";
      top: 19px;
      right: 14px;
      width: 0;
      height: 0;
      border: 5px solid transparent;
      border-color: #000 transparent transparent transparent;
    }
  }
  select {
    appearance: none;
    background: none;
    border-radius: 5px;
    border: 2px solid $fgColor;
    min-width: 136px;
    font-size: inherit;
    font-family: "Google Sans Mono";
    padding: 0.6rem 0.6rem;
  }
</style>
