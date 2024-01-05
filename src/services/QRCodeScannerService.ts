import { Html5QrcodeScanner } from 'html5-qrcode'
import type { QrcodeResult } from 'html5-qrcode/src/core.ts'

type QRCodeSuccessCallback = (decodedText: string, decodedResult: { result: QrcodeResult }) => void
type QRCodeErrorCallback = (errorMessage: string) => void

export default class QRCodeScannerService {
  private scanner: Html5QrcodeScanner

  constructor(
    private containerId: string,
    private qrCodeSuccessCallback: QRCodeSuccessCallback,
    private qrCodeErrorCallback: QRCodeErrorCallback
  ) {
    this.scanner = new Html5QrcodeScanner(
      this.containerId,
      { fps: 60, qrbox: 250 },
      /* verbose= */ false
    )
  }

  public start(): void {
    this.scanner.render(this.qrCodeSuccessCallback, this.qrCodeErrorCallback)
  }

  public stop(): Promise<void> {
    return this.scanner.clear()
  }
}
