<template>
  <div id="qr-code-scanner-container"></div>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from 'vue'
import QRCodeScannerService from '@/services/QRCodeScannerService'
import { notify } from '@/plugins/notyf.ts'
import { useRouter } from 'vue-router'

/* DATAS */
let qrCodeScannerService: QRCodeScannerService
const notificationDelay = 2000 // 5 secondes

/* REFS */
let lastNotificationTime = ref(0)

/* LIFECYCLE */
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

/* HOOKS */
const router = useRouter()

/* METHODS */
const showNotification = (message: string, isError: boolean = true) => {
  const currentTime = Date.now()
  if (currentTime - lastNotificationTime.value > notificationDelay) {
    lastNotificationTime.value = currentTime
    notify.dismissAll()
    if (isError) {
      notify.error(message)
    } else {
      notify.success(message)
    }
  }
}
//https://www.qrcode-monkey.com/fr/#text

// {
//   "bankCheckBalance": 100
// }

const redirectToPaymentSecure = (bankCheckBalance?: number) => {
  router.push({
    name: 'payment-secure',
    params: { paymentMethod: 'check' },
    query: { bankCheckBalance }
  })
}

const handleQRCodeSuccess = (decodedText: string) => {
  try {
    const decodedObject = JSON.parse(decodedText)
    if (decodedObject && typeof decodedObject === 'object' && 'bankCheckBalance' in decodedObject) {
      redirectToPaymentSecure(decodedObject.bankCheckBalance)
    } else {
      showNotification('Invalid QR Code datas')
    }
  } catch (e) {
    showNotification(`Invalid QR Code datas`)
  }
}

const handleQRCodeError = () => {}
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
