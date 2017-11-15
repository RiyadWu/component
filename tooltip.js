class Tooltip extends Widget {
    constructor() {
        super()
        this.wrapper = $('.tooltip-wrapper')
        this.bindEvents()
    }

    bindEvents() {
        const key = 'item'
        const event = eventMapper[key]
        const singleStore = Store.single()
        singleStore.on(event, () => {
            const m = singleStore.find(key)
            this.renderTooltip(m)
        })
    }

    renderTooltip(data) {
        const s = JSON.stringify(data)
        this.wrapper.html(s)
    }
}