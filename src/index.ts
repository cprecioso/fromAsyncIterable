import { Disposable, Scheduler, Sink, Stream } from "@most/types"

const fromAsyncIterable = <T>(iterable: AsyncIterable<T>): Stream<T> =>
  new FromAsyncIterableStream(iterable)

class FromAsyncIterableStream<T> implements Stream<T> {
  constructor(readonly iterable: AsyncIterable<T>) {}

  run(sink: Sink<T>, scheduler: Scheduler) {
    const disposable = new FromAsyncIterableDisposable(
      this.iterable,
      sink,
      scheduler
    )
    disposable.run()
    return disposable
  }
}

class FromAsyncIterableDisposable<T> implements Disposable {
  constructor(
    readonly iterable: AsyncIterable<T>,
    readonly sink: Sink<T>,
    readonly scheduler: Scheduler
  ) {}

  isDisposed = false

  async run() {
    try {
      for await (const element of this.iterable) {
        if (this.isDisposed) return
        this.sink.event(this.scheduler.currentTime(), element)
      }
      if (this.isDisposed) return
      this.sink.end(this.scheduler.currentTime())
    } catch (error) {
      if (this.isDisposed) return
      this.sink.error(this.scheduler.currentTime(), error)
    }
  }

  dispose() {
    this.isDisposed = true
  }
}

export default fromAsyncIterable
