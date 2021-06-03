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

  import { isConnected, isModelTransferred, onboardingStep } from "../store";

  import ConnectButton from "./ConnectButton.svelte";
  import ProgressBar from "./ProgressBar.svelte";

  let transferCompleded = false;
  let stickyHeight = 0;
  let stickyEl;
  let containerEl;
  let topSectionEl;
  let topSectionElHeight = 0;
  let instructionSectionEl;

  let smallScreen = false;

  $: if ($onboardingStep === 1) {
    setTimeout(() => {
      instructionSectionEl.scrollIntoView({
        behavior: "smooth",
      });
    }, 500);
  }

  $: if($onboardingStep === 2){
    setTimeout(()=>{
      window.scrollTo({
        top: 99999999,
        left: 0,
        behavior: "smooth",
      });
    }, 100);
  }

  function handleResize() {
    const { height } = stickyEl.getBoundingClientRect();
    stickyHeight = (height / window.innerHeight) * 100;

    topSectionElHeight =
      (topSectionEl.getBoundingClientRect().height / window.innerHeight) * 100;

    smallScreen = window.innerWidth < 905;
  }

  function handleLetsGo() {
    if($onboardingStep !== 2){
      $onboardingStep = 2;
    } else {
      setTimeout(()=>{
        window.scrollTo({
          top: 99999999,
          left: 0,
          behavior: "smooth",
        });
      });
    }
  }

  onMount(() => {
    handleResize();

    window.addEventListener("resize", handleResize, false);

    return () => {
      window.removeEventListener("resize", handleResize, false);
    };
  });
</script>

<div class="panel" class:onboarding-step-1={$onboardingStep >= 1}>
  <div class="container" bind:this={containerEl}>
    <header
      style={`height: ${
        smallScreen || $onboardingStep === 0
          ? 'auto'
          : `${topSectionElHeight + stickyHeight}vh`
      }`}
    >
      <div class="sticky" bind:this={stickyEl}>
        <h1>Air Snare</h1>
        <h2>Lets you play the drums in the air.</h2>
      </div>
    </header>
    <div class="scroll-container">
      <section bind:this={topSectionEl}>
        <div class="row">
          <h3>Getting started</h3>
          <p>
            You need a <a
              href="https://github.com/googlecreativelab/tf4micro-motion-kit/releases/latest" target="_blank"
              >TF4Micro Motion Kit</a
            >
            pre-installed on Arduino. To confirm you're good to go, look for the
            red, green and blue flashing LED in the middle of the board. If you
            do not see this, visit
            <a
              href="https://github.com/googlecreativelab/tf4micro-motion-kit"
              target="_blank">Getting Started Guide</a
            >.
          </p>
        </div>
        <div class="row">
          <h3>Connect via Bluetooth</h3>
          <p>
            The TF4Micro motion kit communicates with this website via BLE so
            you can have a wireless experience.
          </p>
          <p>
            Tap the button on your arduino then wait for the red, green and blue
            LED pattern to return. Warning: Do not hold the button down as this
            will clear the board.
          </p>
          <p>
            Click the "connect" button below, then select "TF4Micro Motion Kit"
            from the dialogue box.
          </p>
        </div>
        <div class="row">
          <ConnectButton />
        </div>
        <div
          class="row"
          style={`visibility: ${
            $isConnected || $onboardingStep > 0 ? "visible" : "hidden"
          }`}
        >
          <p>
            <ProgressBar
              label={transferCompleded
                ? "Transferred!"
                : "Sending TensorFlow model to your Arduino via Bluetooth"}
            />
          </p>
        </div>
      </section>
      {#if $onboardingStep >= 1}
        <section class="instructions" bind:this={instructionSectionEl}>
          <div class="row">
            <h3>Play</h3>
            <p>
              Hold the board so the LED is facing you and the usb connector is
              pointed towards your wrist.
            </p>
          </div>
          <div class="row">
            <img class="instruction-image" src="./images/calibrate.gif" /><br
            /><br />
          </div>
          <div class="row" class:inverted={$onboardingStep === 1}>
            <button on:click={handleLetsGo}>
              {#if $onboardingStep === 1}
                Let's Go
              {:else}
                Scroll Down ↓
              {/if}
            </button>
          </div>
        </section>
      {/if}
    </div>
  </div>
</div>

<!-- /container -->
<style lang="scss">
  @import "../scss/vars";

  .panel {
    min-height: 100vh;
    &.onboarding-step-1 {
      min-height: 180vh;
    }
    align-items: flex-start;
  }

  @media screen and (min-width: 905px) {
    .container {
      display: flex;
      flex-direction: row;
    }

    header {
      min-width: 448px;
      margin-right: 100px;
      padding-top: 17vh;
      .sticky {
        position: sticky;
        top: 17vh;
      }
    }

    .sticky {
      max-width: 448px;
    }
  }

  .scroll-container {
    min-height: 100vh;
    section {
      padding-bottom: 3vh;
      min-height: 80vh;
      padding-top: 17vh;
      &:first-child {
        padding-top: 17vh;
        padding-bottom: 3vh;
        min-height: 63vh;
      }
    }
  }

  section {
    max-width: 528px;
  }

  p {
    margin: 0;
  }

  .row {
    margin-bottom: 2rem;
    &:last-child {
      margin-bottom: 0;
    }
  }

  .instruction-image {
    border: 2px solid $fgColor;
    width: 100%;
  }
</style>
