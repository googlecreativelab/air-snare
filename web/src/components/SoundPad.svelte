<!--====================================================================
Copyright 2021 Google LLC
Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    https://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License. 
========================================================================

@autor Rikard Lindstrom <rlindstrom@google.com>

-->
<svelte:options accessors={true} />

<script>
  import { mapSound, soundMap, sounds } from "../store";
  import Select from "./Select.svelte";

  let el;
  export let onClick = () => {};
  export let imgSrc;

  export let label;

  export let id;
  export let trigger = () => {
    el.classList.remove("trigger");
    el.classList.add("trigger");
    setTimeout(() => {
      el.classList.remove("trigger");
    }, 100);
  };

  let sound = $soundMap[id];
  $: mapSound(id, sound);
</script>

<div bind:this={el} class="soundpad" on:click={onClick}>
  <p>{label}</p>
  <Select bind:value={sound}>
    {#each Object.keys($sounds) as sound}
      <option value={sound}>{sound}</option>
    {/each}
  </Select>
  <div class="tiny-img" style={`background-image: url(${imgSrc})`} />
</div>

<style lang="scss">
  @import "../scss/vars";

  .soundpad {
    display: inline-block;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    border: 2px solid $fgColor;
    background-color: rgba($bgColor, 0);
    position: relative;
  }
  .tiny-img {
    border: 2px solid $fgColor;
    background-size: cover;
    border-radius: 50%;
    width: 80px;
    height: 80px;
    position: absolute;
    top: 50%;
    transform: translate(50%, -50%);
    right: 0;
  }
  :global(.soundpad.trigger) {
    animation: shake 0.2s;
  }

  @keyframes shake {
    0% {
      transform: translate(1px, 1px) rotate(0deg);
      background-color: rgba($bgColor, 1);
    }
    10% {
      transform: translate(-1px, -2px) rotate(-1deg);
    }
    20% {
      transform: translate(-3px, 0px) rotate(1deg);
    }
    30% {
      transform: translate(3px, 2px) rotate(0deg);
    }
    40% {
      transform: translate(1px, -1px) rotate(1deg);
    }
    50% {
      transform: translate(-1px, 2px) rotate(-1deg);
    }
    60% {
      transform: translate(-3px, 1px) rotate(0deg);
    }
    70% {
      transform: translate(3px, 1px) rotate(-1deg);
    }
    80% {
      transform: translate(-1px, -1px) rotate(1deg);
    }
    90% {
      transform: translate(1px, 2px) rotate(0deg);
    }
    100% {
      transform: translate(1px, -2px) rotate(-1deg);
      background-color: rgba($bgColor, 0);
    }
  }
</style>
