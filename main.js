const { Text, Color } = require("scenegraph");

function styleToText(selection) {
    let node = selection.items[0];
    // let assets = require("assets");
    // let allCharacterStyles = assets.characterStyles.get();
    // let count = 0; 
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
    console.log(node);
    if (node.text.indexOf(" - ")>0)
        node.text = node.text.substring(0,node.text.indexOf(" - "));
    node.text+= ` - ${node.fontFamily} ${node.fontStyle} ${node.fontSize}px`;
}

function arrangeLayers(selection){
    let node = selection.items;
    console.log(node);
}

function printStyle(selection, currentStyle){
    let text = new Text();
    text.text = `${currentStyle.fontFamily} ${currentStyle.fontStyle} ${currentStyle.fontSize}px`;
    // text.styleRanges = [
    //     {
    //         length: text.text.length,
    //         fill: new Color("gray"),
    //         fontSize: 20
    //     }
    // ];
    selection.insertionParent.addChild(text);
    text.moveInParentCoordinates(0, 100 * i);
}
function createRainbowTextHandlerFunction(selection) {

    const node = new Text();

    const textData = [
        { text: "This ", color: "red" },
        { text: "is ", color: "orange" },
        { text: "some ", color: "yellow" },
        { text: "ra", color: "green" },
        { text: "in", color: "blue" },
        { text: "bow ", color: "indigo" },
        { text: "text", color: "violet" }
    ];

    node.text = textData.map(item => item.text).join("");

    // styleRange is an array of styles, and `length`
    // determines how far into the text each style applies.
    // A length of 1 means the style applies to one
    // character.
    node.styleRanges = textData.map(item => ({
        length: item.text.length,
        fill: new Color(item.color),
        fontSize: 24
    }));

    selection.insertionParent.addChild(node);
    node.moveInParentCoordinates(20, 50);
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
            console.log("width, height, x, y = ",width, height, x, y)
            // Round the Item's width and height
            const newWidth = Math.floor(width);
            const newHeight = Math.floor(height);
            item.resize(newWidth, newHeight);

            // Round the Item's X/Y positions
            const newX = x - Math.floor(x);
            const newY = y - Math.floor(y);
            console.log("newWidth, newHeight, newX, newY = ",newWidth, newHeight, newX, newY)
            item.moveInParentCoordinates(-newX,-newY);
            console.log("===========================================");
        });
    }
}


module.exports = {
    commands: {
        removeDecimalNumbers: removeDecimalNumbers
    }
};
module.exports = {
    commands: {
        styleToText: styleToText,
        arrangeLayers: arrangeLayers,
        removeDecimalNumbers: removeDecimalNumbers
    }
};
