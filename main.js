const { selection } = require("scenegraph")
let panel;

const { Text, Color } = require("scenegraph");

function create() {
    const HTML =
        `<style>
            .break {
                flex-wrap: wrap;
            }
            label.row > span {
                color: #8E8E8E;
                width: 20px;
                text-align: right;
                font-size: 9px;
            }
            label.row input {
                flex: 1 1 auto;
            }
            .show {
                display: block;
            }
            .hide {
                display: none;
            }
        </style>
        <form method="dialog" id="main">
            <div class="row break">
                <label class="row">
                    <span>↕︎</span>
                    <input type="number" uxp-quiet="true" id="txtV" value="10" placeholder="Height" />
                </label>
                <label class="row">
                    <span>↔︎</span>
                    <input type="number" uxp-quiet="true" id="txtH" value="10" placeholder="Width" />
                </label>
            </div>
            <footer><button id="ok" type="submit" uxp-variant="cta">Apply</button></footer>
        </form>
        <p id="warning">This plugin requires you to select a rectangle in the document. Please select a rectangle.</p>
        `
    function increaseRectangleSize() {
        const { editDocument } = require("application");
        const height = Number(document.querySelector("#txtV").value);
        const width = Number(document.querySelector("#txtH").value);

        editDocument({ editLabel: "Increase rectangle size" }, function (selection) {
            const selectedRectangle = selection.items[0];
            selectedRectangle.width += width
            selectedRectangle.height += height
        })
    }

    panel = document.createElement("div");
    panel.innerHTML = HTML;
    panel.querySelector("form").addEventListener("submit", increaseRectangleSize);

    return panel;
}

function show(event) {
    if (!panel) event.node.appendChild(create());
}

function update() {
    const { Rectangle } = require("scenegraph");
    let form = document.querySelector("form");
    let warning = document.querySelector("#warning");
    if (!selection || !(selection.items[0] instanceof Rectangle)) {
        form.className = "hide";
        warning.className = "show";
    } else {
        form.className = "show";
        warning.className = "hide";
    }
}


function styleToText(selection) {
    for (let i = 0; i < selection.items.length; i++) {
        let node = selection.items[i];

        let lineHeight = Math.round((node.lineSpacing / node.fontSize) * 1000) / 1000;
        let letterSpacing = node.fontSize * node.charSpacing / 1000;

        if (node.text.lastIndexOf(" - ")>0)
            node.text = node.text.substring(0,node.text.lastIndexOf(" - "));

        node.text+= ` - ${node.fontFamily} ${node.fontStyle} ${node.fontSize}px / line-height: ${lineHeight} / letter-spacing: ${letterSpacing}`;       

        // if (node.text.indexOf(String.fromCharCode(13)) > 0){
        //     node.text = node.text.substring(0, node.text.indexOf(String.fromCharCode(13)));
        // }
            
        // let css = new Text();
        // css.styleRanges= [{
        //     fill: new Color("black"),
        //     fontFamily: "Consolas",
        //     fontSize: 14,
        //     fontStyle: "Regular"            
        // }];
        // css.text = 'font: ' + node.fontFamily + ' ' + node.fontStyle + ';' + String.fromCharCode(13) +
        // 'font-size: ' + node.fontSize + 'px;' + String.fromCharCode(13) +
        // 'line-height: ' + lineHeight + ';' + String.fromCharCode(13) +
        // 'letter-spacing: ' + letterSpacing + 'px;';
        // console.log(node.parent);
        // selection.insertionParent.addChild(css);
        // css.moveInParentCoordinates(0,0);
        // console.log(css);
    }

}

function arrangeLayers(selection) {
    let assets = require("assets");
    let allCharacterStyles = assets.characterStyles.get();
    let count = 0;
    console.log(allCharacterStyles);
    // for (let i=0;i<allCharacterStyles.length;i++){        
    //     let characterStyle = allCharacterStyles[i];
    //     if (characterStyle.name.indexOf('@') === 0){ 
    //         let name = characterStyle.name;           
    //         let style= characterStyle.style;
    //         let text = new Text();
    //         text.text = `${name} - ${style.fontFamily} ${style.fontStyle} ${style.fontSize}px`;
    //         text.styleRanges = [
    //             {
    //                 length: text.text.length,
    //                 fill: new Color("black"),
    //                 fontFamily: style.fontFamily,
    //                 fontSize: style.fontSize,
    //                 fontStyle: style.fontStyle
    //             }
    //         ];
    //         selection.insertionParent.addChild(text);
    //         text.moveInParentCoordinates(0, 100 * count++);
    //     }
    // }
}

function removeDecimalNumbers({
    items
}) {
    if (items.length > 0) {
        items.forEach(item => {
            // Get item's coords and bounds
            console.log(item);
            const {
                width,
                height
            } = item.localBounds;
            const {
                x,
                y
            } = item.topLeftInParent;
            console.log("width, height, x, y = ", width, height, x, y)
            // Round the Item's width and height
            const newWidth = Math.floor(width);
            const newHeight = Math.floor(height);
            item.resize(newWidth, newHeight);

            // Round the Item's X/Y positions
            const newX = x - Math.floor(x);
            const newY = y - Math.floor(y);
            console.log("newWidth, newHeight, newX, newY = ", newWidth, newHeight, newX, newY)
            item.moveInParentCoordinates(-newX, -newY);
            console.log("===========================================");
        });
    }
}

module.exports = {
    commands: {
        styleToText: styleToText,
        arrangeLayers: arrangeLayers,
        removeDecimalNumbers: removeDecimalNumbers
    }
};
