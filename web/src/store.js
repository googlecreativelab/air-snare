/* ======================================================================
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
========================================================================*/

/**
* @autor Rikard Lindstrom <rlindstrom@google.com>
*/

import { get, readable, writable } from "svelte/store";

export const isConnected = writable(false);
export const isModelTransferred = writable(false);
export const lastInference = writable({});
export const transferProgress = writable(0);
export const onboardingStep = writable(0);

export const sounds = readable({
  snare: {
    layers: [
      {
        url: "sounds/AirSnare_SNARE_MED.mp3",
      },
      {
        url: "sounds/AirSnare_SNARE_HARD.mp3",
      },
    ],
  },
  kick: {
    layers: [
      {
        url: "sounds/AirSnare_KICK.mp3",
      },
    ],
  },
  hihat: {
    layers: [
      {
        url: "sounds/AirSnare_HH_CLOSED.mp3",
      },
      {
        url: "sounds/AirSnare_HH_OPEN.mp3",
      },
    ],
  },
  tom: {
    layers: [
      {
        url: "sounds/AirSnare_TOM_REV.mp3",
      },
    ],
  },
  cowbell:{
    layers: [
      {
        url: "sounds/AirSnare_COWBELL.mp3"
      }
    ]
  },
  crash:{
    layers: [
      {
        url: "sounds/AirSnare_CRASH_REV.mp3"
      }
    ]
  }
});

export const soundMap = writable({
  0: "hihat",
  1: "snare",
  2: "kick",
});

export function mapSound(id, sound){
  soundMap.update($soundMap=>{
    return {
      ...$soundMap,
      [id]: sound
    }
  })
};

export function getSound(id){
  const name = get(soundMap)[id];
  return get(sounds)[name];
}