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

<script>
  import soundManager from "../soundManager";
  import { getSound } from "../store";

  import SoundPad from "./SoundPad.svelte";
  import { lastInference } from "../store";
  let drumPads = [];

  $: if ($lastInference) {
    handleInference($lastInference);
  }

  function handleInference(data) {
    const index = data.index;
    if (drumPads[index]) {
      const velocity = data.velocity;
      const sound = getSound(index);
      const layer = sound.layers[0];
      soundManager.playSound(layer.url, velocity);
      drumPads[index].trigger();
    }
  }
</script>

<div class="panel">
  <div class="container">
    <div class="row">
      <div class="sound-pad-container">
        <div class="pad">
          <SoundPad
            bind:this={drumPads[0]}
            label="To The Side"
            imgSrc="images/hh.mov.gif"
            id={0}
            onClick={() =>
              handleInference({ index: 0, velocity: 100, score: 1 })}
          />
        </div>
        <div class="pad">
          <SoundPad
            bind:this={drumPads[1]}
            label="Down Low"
            imgSrc="images/sd.mov.gif"
            id={1}
            onClick={() =>
              handleInference({ index: 1, velocity: 100, score: 1 })}
          />
        </div>
        <div class="pad">
          <SoundPad
            bind:this={drumPads[2]}
            label="Up High"
            imgSrc="images/kd.mov.gif"
            id={2}
            onClick={() =>
              handleInference({ index: 2, velocity: 100, score: 1 })}
          />
        </div>
        <!-- <SoundPad
        bind:this={drumPads[3]}
        label="kd"
        imgSrc="images/kd.gif"
        id={3}
        onClick={() => handleInference({ index: 3, velocity: 100, score: 1 })}
      /> -->
      </div>
    </div>
  </div>
</div>

<style lang="scss">
  .panel {
    background: #bdc1c6;
    height: 100vh;
    min-height: 800px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .sound-pad-container {
    margin-top: 4em;
    position: relative;
    width: 100%;
    margin: 0 auto;
    .pad {
      width: 200px;
      height: 200px;
      padding: 20px 0;
      @media screen and (min-width: 905px) {
        width: 300px;
      height: 300px;
      padding: 0;
        position: absolute;
        left: 50%;
        top: 50%;
        &:first-child {
          transform: translate(-131%, -52%);
        }
        &:nth-child(3) {
          transform: translate(-9%, -122%);
        }
        &:nth-child(2) {
          transform: translate(-9%, 17%);
        }
      }
    }
  }
</style>
