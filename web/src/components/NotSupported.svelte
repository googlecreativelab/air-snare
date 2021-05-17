
<div class="not-supported-container">
    <slot/>
</div>

<style lang="scss">
  .not-supported-container {
    position: fixed;
    z-index: 999;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: #9AA0A6;
  }

  :global(.not-supported-container h2){
    font-family: "Google Sans Mono", "Roboto Mono", monospace;
    font-size: 16px;
    line-height: 30px;
    max-width: 454px;
    text-align: center;
  }
</style>
