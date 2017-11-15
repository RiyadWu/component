// 全局事件分发机制
class Store extends Widget {
    constructor() {
        super()
        this.data = {}
    }

    fireEvents(key) {
        const event = eventMapper[key]
        const value = this.find(key)
        if (event) {
            this.fire(event, value)
        }
    }

    add(key, value) {
        if (!this.data[key]) {
            this.data[key] = []
        }
        this.data[key].push(value)
        this.fireEvents(key)
    }

    clear(key) {
        delete this.data[key]
        this.fireEvents(key)
    }

    set(key, value) {
        this.data[key] = value
        this.fireEvents(key)
    }

    find(key) {
        if (key in this.data) {
            return this.data[key]
        } else {
            return []
        }
    }
}