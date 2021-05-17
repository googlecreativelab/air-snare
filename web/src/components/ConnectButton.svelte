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
  import { onMount } from "svelte";
  import { isConnected, isModelTransferred, lastInference, transferProgress, onboardingStep } from "../store";
  import connectButton from "tf4micro-motion-kit/web/button";
  import soundManager from '../soundManager';

  let containerEl;
  let button;

  $: if(button && $isConnected){
    button.innerText = 'Transferring...';
  }

  $: if(button && $isModelTransferred){
    button.innerText = 'Transferred!';
    setTimeout(()=>{
      button.innerText = 'Disconnect';
    },1000)
  }
  

  function getModelName() {
    const modelOptions = ["pro", "beta"];

    try {
      let params = new URL(document.location).searchParams;
      let name = params.get("model");
      if (modelOptions.includes(name)) {
        return name;
      }
    } catch (e) {}
    return "beta";
  }

  function getModelConfig() {
    const name = getModelName();
    switch (name) {
      case "beta":
        return {
          model: `./${name}.tflite?cache-bust=${Math.floor(
            Math.random() * 1000000000
          )}`,
          numClasses: 3,
          threshold: 0.193,
          numSamples: 10,
          captureDelay: 125,
        };
      case "pro": {
        return {
          model: `./${name}.tflite?cache-bust=${Math.floor(
            Math.random() * 1000000000
          )}`,
          numClasses: 3,
          threshold: 0.244,
          numSamples: 6,
          captureDelay: 80,
        };
      }
    }
  }

  onMount(() => {
    const modelConfig = getModelConfig();
    button = connectButton(containerEl, {
      ...modelConfig,
      useMagnetometer: false,
      onInference(data){
        $lastInference = data;
      },
      onTransferProgress(p){
        $transferProgress = p * 100;
      },
      onDisconnect() {
        $isConnected = false;
        $isModelTransferred = false;
      },
      onConnect() {
        $isConnected = true;
      },
      onTransferCompleted() {
        $isModelTransferred = true;
        setTimeout(()=>{
          $onboardingStep = 1;
        }, 500)
      },
    });
    
    button.addEventListener("click", () => {
      soundManager.userInit();
    });
  });
</script>

<div bind:this={containerEl} class:inverted={$onboardingStep===0} />

<style lang="scss">
  @import "../scss/vars";


</style>
