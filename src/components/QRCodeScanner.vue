<template>
  <div id="qr-code-scanner-container"></div>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted } from 'vue'
import QRCodeScannerService from '@/services/QRCodeScannerService'

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

const handleQRCodeSuccess = (decodedText: string, decodedResult: any) => {
  // Gérer le résultat du scan ici
  console.log(`QR Code décodé : ${decodedText}`, decodedResult)
}

const handleQRCodeError = (errorMessage: string) => {
  // Gérer l'erreur ici
  console.error(`Erreur lors du scan du QR Code : ${errorMessage}`)
}
</script>
