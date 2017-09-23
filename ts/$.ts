
export function $(selector) {
    var result = document.querySelectorAll(selector);
    return (result.length === 1) ? result[0] : result
}