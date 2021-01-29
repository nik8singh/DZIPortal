export function parameterFromURL(name) {
    return (location.search.split(name + '=')[1] || '').split('&')[0];
}

export function updateBagCountDisplay() {
    let $bagItems = $(".bagItems");
    let number = localStorage.getItem("bagCount");
    if (number === null)
        number = 0;
    $bagItems.text(" (" + number + ")");
}