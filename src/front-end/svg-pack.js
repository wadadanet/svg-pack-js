
// SVG_PACK::INSERT_SVGS
function init() {
    for (let v of Array.prototype.slice.call(document.querySelectorAll('.svgp'),0)) {
        replaceSvg(v)
    }
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            for (let elem of mutation.addedNodes) {
                if (elem.classList.contains('svgp')) {
                    replaceSvg(elem)
                }
            }
            if (mutation.target && mutation.attributeName === 'class') {
                if (mutation.target.classList.contains('svgp')) {
                    replaceSvg(mutation.target)
                }
            }
        });
    });
    window.SvgPack = {
        mutationObserverStart(target = document.body){
            const config = { 
                childList: true,
                subtree: true,
                attributes: true
            };
            observer.observe(target, config);
        },
        mutationObserverEnd(){
            observer.disconnect()
        }
    }
    // SVG_PACK::MUTATION_OBSERVER
}
function replaceSvg(svgp) {
    const class_names = svgp.className.match(/svgp-(.+?)( |$)/)
    if (!class_names || class_names.length < 2 || !class_names[1]) return;
    const name = class_names[1];
    svgp.insertAdjacentHTML('beforeend', svgs[name]);
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
} else {
    init();
}
