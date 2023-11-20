export default class CookieService {
  static getCookie(name: string): string | undefined {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'))
    if (match) return match[2]
  }

  static setCookie(name: string, value: string, days = 7) {
    const date = new Date()
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
    const secure = window.location.protocol === 'https:' ? ';secure' : ''
    const sameSite = ';samesite=strict' // ou 'lax' selon votre besoin
    document.cookie = `${name}=${value};expires=${date.toUTCString()}${secure}${sameSite};path=/`
  }

  static deleteCookie(name: string) {
    this.setCookie(name, '', -1)
  }
}
