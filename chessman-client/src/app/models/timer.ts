import { Observable, ReplaySubject } from "rxjs"

export class Timer {
  isStart = false
  private isPause = false
  private intervalId: any
  isTimeOut: ReplaySubject<boolean>
  //
  private currentTime = 0

  constructor() {
    this.isTimeOut = new ReplaySubject(3);
  }
  startCountDown() {
    this.isStart = true
    this.intervalId = setInterval(() => {
      if (!this.isPause) {
        this.currentTime--
        if (this.currentTime === 0) {
          this.isTimeOut.next(true)
          clearInterval(this.intervalId)
        }
      }
    }, 100)
  }
  pause() {
    this.isPause = true
  }
  unPause() {
    this.isPause = false
  }
  clean() {
    clearInterval(this.intervalId)
  }

  getFormatTime(): string {
    let minutes = Math.floor(this.currentTime / 600)
    let res = ''
    minutes < 10 ? res += '0' + minutes : res += minutes
    let seconds = Math.round((this.currentTime - minutes * 600)/10);
    seconds < 10 ? res += ': 0' + seconds : res += ': ' + seconds
    return res
  }

  setlimitSecond(num: number) {
    this.currentTime = num * 10
  }

  getSeconds() {
    return this.currentTime / 10
  }
}
