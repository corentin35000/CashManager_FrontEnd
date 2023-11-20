<template>
  <div class="container">
    <h1>Welcome to Tauri!</h1>

    <div id="reader" width="600px"></div>

    <div class="row">
      <a href="https://vitejs.dev" target="_blank">
        <img src="/vite.svg" class="logo vite" alt="Vite logo" />
      </a>
      <a href="https://tauri.app" target="_blank">
        <img src="/tauri.svg" class="logo tauri" alt="Tauri logo" />
      </a>
      <a href="https://vuejs.org/" target="_blank">
        <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
      </a>
    </div>

    <p>Click on the Tauri, Vite, and Vue logos to learn more.</p>

    <p>
      Recommended IDE setup:
      <a href="https://code.visualstudio.com/" target="_blank">VS Code</a>
      +
      <a href="https://github.com/johnsoncodehk/volar" target="_blank">Volar</a>
      +
      <a href="https://github.com/tauri-apps/tauri-vscode" target="_blank">Tauri</a>
      +
      <a href="https://github.com/rust-lang/rust-analyzer" target="_blank">rust-analyzer</a>
    </p>

    <Greet />
  </div>
</template>

<script setup lang="ts">
import { Html5QrcodeScanner } from 'html5-qrcode'
import { onMounted } from 'vue'
import Greet from "@/components/Greet.vue";

function onScanSuccess(decodedText, decodedResult) {
  // handle the scanned code as you like, for example:
  console.log(`Code matched = ${decodedText}`, decodedResult)
}

function onScanFailure(error) {
  // handle scan failure, usually better to ignore and keep scanning.
  // for example:
  console.warn(`Code scan error = ${error}`)
}

onMounted(() => {
  console.log('mounted')

  let html5QrcodeScanner = new Html5QrcodeScanner(
      'reader',
      { fps: 60, qrbox: { width: 250, height: 250 } },
      /* verbose= */ false
  )

  html5QrcodeScanner.render(onScanSuccess, onScanFailure)
})
</script>

<style scoped>
.logo.vite:hover {
  filter: drop-shadow(0 0 2em #747bff);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #249b73);
}
</style>
