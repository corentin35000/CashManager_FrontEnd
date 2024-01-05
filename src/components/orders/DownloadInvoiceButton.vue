<template>
  <CashManagerButton class="w-full mt-6" @click="generateAndDownloadInvoice">
    Download invoice
  </CashManagerButton>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'
import type { PropType } from 'vue'
import CashManagerButton from '@/components/core/CashManagerButton.vue'
import type { Order } from '@/services/OrderService.ts'
import InvoiceGenerator from '@/services/OrderInvoiceService.ts'

/* PROPS */
const props = defineProps({
  order: {
    type: Object as PropType<Order>,
    required: true
  }
})

/* METHODS */
// Fonction pour générer et télécharger la facture
const generateAndDownloadInvoice = () => {
  if (!props.order) return

  const invoiceGenerator = new InvoiceGenerator(props.order)
  invoiceGenerator.generatePDF()
}
</script>
