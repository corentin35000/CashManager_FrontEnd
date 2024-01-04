<template>
  <div id="qr-code-scanner-container"></div>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted } from 'vue'
import QRCodeScannerService from '@/services/QRCodeScannerService'
import type { QrcodeResult } from 'html5-qrcode/src/core.ts'

let qrCodeScannerService: QRCodeScannerService

onMounted(() => {
  qrCodeScannerService = new QRCodeScannerService(
    'qr-code-scanner-container',
    handleQRCodeSuccess,
    handleQRCodeError
  )

  qrCodeScannerService.start()
})

onUnmounted(() => {
  qrCodeScannerService.stop()
})

const handleQRCodeSuccess = (decodedText: string, decodedResult: { result: QrcodeResult }) => {
  // Gérer le résultat du scan ici
  console.log(`QR Code décodé : ${decodedText}`, decodedResult)
}

const handleQRCodeError = (errorMessage: string) => {
  // Gérer l'erreur ici
  console.error(`Erreur lors du scan du QR Code : ${errorMessage}`)
}
</script>

<style lang="scss">
#qr-code-scanner-container {
  border-width: 0 !important;
  width: 100%;

  img {
    display: none !important;
  }
}

#qr-code-scanner-container__header_message {
  border-width: 0 !important;
  color: #ffffff !important;
}

#qr-code-scanner-container__dashboard_section {
  display: flex;
  flex-direction: column;
  gap: 16px;
  justify-content: center;
  align-items: center;

  div {
    width: 100%;
  }
}

#html5-qrcode-button-camera-permission,
#html5-qrcode-button-camera-stop,
#html5-qrcode-button-camera-start {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: rgb(96, 165, 250);
  border-radius: 6px;
  color: rgb(17, 24, 39);
  font-size: 14px;
  padding: 10px 24px;
  font-weight: 500;

  &:hover {
    background-color: rgb(147, 197, 253);
  }
}
</style>
