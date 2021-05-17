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

let audioContext;

const bufferCache = {};

function loadSound(url) {
  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.responseType = "arraybuffer";

    request.onload = () => {
      audioContext.decodeAudioData(
        request.response,
        (buffer) => {
          console.log('loaded url',url)

          resolve(buffer);
        },
        reject
      );
    };
    request.send();
  });
}

export default {
  init() {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
  },

  userInit(){
    audioContext.resume();
  },

  playSound(url, velocity) {
    const buffer = bufferCache[url];
    if (!buffer) {
      throw new Error(`${url} no loaded. Call .loadSound(url) first`);
    }

    const src = audioContext.createBufferSource();
    src.buffer = buffer;
    const gain = audioContext.createGain();
    gain.gain.value = Math.max(0.5, Math.min(1.,velocity / 127));
    gain.connect(audioContext.destination);
    src.connect(gain);
    src.start(audioContext.currentTime);
    src.onended = () => {
      src.disconnect();
      gain.disconnect();
      src.onended = null;
    };
  },

  loadSound(url) {
    console.log('load url',url)
    const cached = bufferCache[url];
    if (cached) {
      if (cached instanceof Promise) {
        return cached;
      } else {
        return Promise.resolve(cached);
      }
    } else {
      const promise = loadSound(url);
      bufferCache[url] = promise;
      promise.then((buffer) => (bufferCache[url] = buffer) && buffer);
      return promise;
    }
  },
};
