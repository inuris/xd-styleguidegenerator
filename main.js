const { Text, Color } = require("scenegraph");

    
function styleToTextHandlerFunction(selection) {
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
    if (node.text.indexOf(" ")>0)
        node.text = node.text.substring(0,node.text.indexOf(" "));
    node.text+= ` - ${node.fontFamily} ${node.fontStyle} ${node.fontSize}px`;
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

module.exports = {
    commands: {
        "styleToTextCommand": styleToTextHandlerFunction
    }
};
