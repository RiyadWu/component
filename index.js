const initMovie = (data) => {
    const options = {
        wrapper: $('.wrapper'),
        data: data,
        store: Store,
        components: Tooltip,
    }
    new Movie(options)
}

const __main = () => {
    const m = MovieApi.single()
    m.fetchMovies().then((r) => {
        initMovie(r)
    })
}

$(document).ready(() => {
    __main()
})