const { Text, Color } = require("scenegraph");

function styleToTextHandlerFunction(selection) {
    const textData = selection.items[0];
    selection.items[0].text = `${textData.fontFamily} ${textData.fontStyle} ${textData.fontSize}px`;
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
