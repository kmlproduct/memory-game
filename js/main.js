document.querySelector(".controls-button span").onclick = function () {
    var yourName = prompt("whats your name?");
    if (yourName == null || yourName == "") {
        document.querySelector('.name span').innerHTML = 'Unkown';
    } else {
        document.querySelector('.name span').innerHTML = yourName
    }
    document.querySelector('.controls-button').remove()
};
var duration = 1000;
var blocksContainer = document.querySelector('.memory-game-block');
var blocks = Array.from(blocksContainer.children);
var orderRange = Array.from(Array(blocks.length).keys());
shuffle(orderRange)

// add order css property
blocks.forEach((block, index) => {
    block.style.order = orderRange[index];
    block.addEventListener('click', function () {
        flipBlock(block)
    })
});

function flipBlock(selectedBlock) {
    selectedBlock.classList.add('is-filipped');

    var allFlippedBlocks = blocks.filter(flippedBlock => flippedBlock.classList.contains('is-filipped'));
    console.log(allFlippedBlocks)
    if (allFlippedBlocks.length === 2) {
        stopClicking();
        checkMatchedBlocks(allFlippedBlocks[0], allFlippedBlocks[1]);
    }

    function stopClicking() {
        blocksContainer.classList.add('no-clicking');
        setTimeout(() => {
            blocksContainer.classList.remove('no-clicking');
        }, duration);
    }
}

function checkMatchedBlocks(firstBlock, secondBlock) {
    var triesElement = document.querySelector('.tries span');
    if (firstBlock.dataset.technology === secondBlock.dataset.technology) {
        firstBlock.classList.remove('is-filipped');
        secondBlock.classList.remove('is-filipped');
        firstBlock.classList.add('has-match');
        secondBlock.classList.add('has-match');
    } else {
        triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;

        setTimeout(() => {
            firstBlock.classList.remove('is-filipped');
            secondBlock.classList.remove('is-filipped');
        }, duration)
    }

}

function shuffle(Array) {
    let current = Array.length,
        temp,
        random;
    while (current > 0) {
        random = Math.floor(Math.random() * current);
        current--;
        temp = Array[current];
        Array[current] = temp;
    }
    return Array;
}