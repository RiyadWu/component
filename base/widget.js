// 组件类
// 使用 class 的形式, 构建一棵组件树，立体化继承

// 使用的是自定义事件机制（观察者模式、pub/sub）
// 用 on 监听过后, 使用 fire 可以触发

class Widget {
    constructor() {
        this.handlers = {}
    }

    on(type, handler) {
        if (typeof this.handlers[type] === 'undefined' || this.handlers[type] === null) {
            this.handlers[type] = []
        }
        this.handlers[type].push(handler)
        return this
    }

    fire(...args) {
        // type 触发事件类型
        const [type, ...rest] = args
        const handlers = this.handlers[type]
        if (Array.isArray(handlers)) {
            handlers.forEach((k) => {
                k.apply(this, rest)
            })
        }
        return this
    }

    off(type) {
        if (type !== undefined) {
            this.handlers[type] = null
        } else {
            this.handlers = null
        }
        return this
    }

    destroy() {
        if (Object.keys(this.handlers).length > 0) {
            this.fire('destroyed')
        }
        this.handlers = null
    }

    // 单例模式
    static single() {
        const cls = this
        if (cls.instance === undefined) {
            cls.instance = new cls()
        }
        return cls.instance
    }
}

const test = () => {
    const w = new Widget()
    const eventType = 'message'

    w.on(eventType, () => {
        log('message event')
    })

    w.on(eventType, () => {
        log('message event 1')
    })

    w.fire(eventType)

    w.off(eventType)

    w.fire(eventType)

    w.on(eventType, () => {
        log('message event 3')
    })

    w.fire(eventType)
}

const main = () => {
    test()
}

main()