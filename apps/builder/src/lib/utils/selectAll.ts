export const selectAll = (ref) => setTimeout(() => {
    if (window.getSelection && document.createRange) {
        const range = document.createRange();
        range.selectNodeContents(ref);
        const selection = window.getSelection();
        selection?.removeAllRanges();
        selection?.addRange(range);
    } else {
        const range = document.body.createTextRange?.();
        range.moveToElementText(ref);
        range.select();
    }
}, 1);