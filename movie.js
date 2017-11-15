class Movie extends Widget {
    constructor(options) {
        super()
        this._options = options
        this.body = this._options.wrapper
        this._components = {}
        // 组件的生命周期
        this.renderHtml()
        this.bindEvents()
    }

    bindEvents() {
        this.body.on('click', 'a', (e) => {
            e.preventDefault()
            const self = e.target
            const value = $(self).closest('a').find('span').text()
            const singleStore = this._options.store.single()
            // 把数据添加到 store 中, 方便其他地方使用
            singleStore.add('item', value)
            // 触发 item 事件
            this._components['item'].fire('item')
        })
    }

    renderHtml() {
        this.renderItems()
    }

    renderItems() {
        const movies = this._options.data
        const ms = movies.map((m) => {
            const cover = m.cover
            const title = m.title
            const score = m.rate
            const s = `
                <li>
                    <a href="">
                        <div>
                            <img src="${cover}" alt="${title}">
                        </div>
                        <p>
                            <span>${title}</span>
                            <strong>${score}</strong>
                        </p>
                    </a>
                </li>
            `
            return s
        }).join('')
        const t = (`
            <ul class="movie-list">
                ${ms}
            </ul>
        `)
        const container = this._options.wrapper
        container.append(t)
        // 顺便在这里初始化了 Tooltip 的实例
        this._components['item'] = new Tooltip(this._options)
    }
}