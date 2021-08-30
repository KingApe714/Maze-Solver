

export const aStar = (div) => {
    // console.log(div.children)
    console.log(div.children.length)
    for (let i = 0; i < div.childNodes.length; i++) {
        console.log(i)
        // console.log(div.childNodes[i])
        if (div.childNodes[i].style !== undefined) {
            console.log(div.childNodes[i].style.top)
        } 
    }

}