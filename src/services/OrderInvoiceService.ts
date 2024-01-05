import { jsPDF } from 'jspdf'
import autoTable from 'jspdf-autotable'
import { DateTime } from 'luxon'
import type { Order } from '@/services/OrderService.ts'
import { convertToSimpleDateFormat } from '@/utils/dateUtils.ts'
import { convertCentsToEuros } from '@/utils/priceUtils.ts'

class InvoiceGenerator {
  private readonly doc: jsPDF
  private order: Order

  constructor(order: Order) {
    this.doc = new jsPDF()
    this.order = order
  }

  private addHeader(): void {
    // Exemple : logo à gauche et infos de l'entreprise à droite
    const logoUrl = '/logo-blue.png'
    this.doc.addImage(logoUrl, 'PNG', 10, 10, 20, 20)
    this.doc.setFontSize(10) // Réduire la taille de la police à 10 points
    this.doc.text('Cash Manager', 150, 15)
    this.doc.text('19-22 Bd Saint-Conwoïon', 150, 20)
    this.doc.text('35000 Rennes', 150, 25)
    this.doc.text('Téléphone: 02 57 22 08 54', 150, 30)
    this.doc.text('Site Web: www.cash-manager.fr', 150, 35)
    this.doc.text('Email: contact@cash-manager.fr', 150, 40)
  }

  private addOrderDetails(): void {
    const invoiceNumber = `Invoice #: ${this.order.id}`
    const paymentDate = `Payment Date: ${convertToSimpleDateFormat(this.order.created_at)}`
    const invoiceDate = `Invoice Date: ${DateTime.now().toFormat('yyyy-MM-dd')}`

    this.doc.text(invoiceNumber, 10, 50)
    this.doc.text(paymentDate, 10, 56)
    this.doc.text(invoiceDate, 10, 62)
  }

  private addProductDetails(): void {
    // Titres de colonnes pour le tableau des produits
    const headers = [['#', 'Title', 'Description', 'Price', 'Quantity', 'Unit', 'Total']]
    const body = this.order.orderProducts.map((product) => [
      product.product.id.toString(),
      product.product.name,
      product.product.description,
      product.product.price.toFixed(2),
      product.quantity.toString(),
      '€',
      (product.product.price * product.quantity).toFixed(2)
    ])

    autoTable(this.doc, {
      head: headers,
      body: body,
      startY: 70
    })

    const finalY = (this.doc as any).lastAutoTable.finalY || 80 // Utilisez 'any' pour accéder aux propriétés ajoutées par le plugin
    const totalAmount = `Total: ${convertCentsToEuros(this.order.total_amount)}`
    this.doc.text(totalAmount, 170, finalY + 10)
  }

  public generatePDF(): void {
    this.addHeader()
    this.addOrderDetails()
    this.addProductDetails()

    this.doc.save(`facture-${this.order.id}.pdf`)
  }
}

export default InvoiceGenerator
