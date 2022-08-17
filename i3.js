
const gameList = [
            {
                id: 0,
                name: "Brew"
            },
            {
                id: 1,
                name: "Patchwork"
            }
]

$(() => {
    renderGameList()
})

const $gamesContainer = $("#games-container")

function renderGameList() {
    $gamesContainer.empty()
    $gamesContainer.append(gameList.map(game => renderGame(game)))
}

function renderGame(game) {
    return $("<tr/>").append(
        $("<td/>").text(game.name),
        $("<td/>").append(
            $("<button/>").addClass("btn btn-danger me-2").text("Delete").on("click", () => onDeleteButtonClick(game.id)),
            $("<button>").addClass("btn btn-dark").text("Edit").on("click", () => onStartEditGame(game.id))
        )
    )
}

const gameModal = new bootstrap.Modal('#game-modal')
const $gameModalTitle = $("#game-modal-title")
const $nameInput = $("#name-input")

let editGameId = null;

function onStartCreateGame() {
    // open the modal
    gameModal.show();
    // change the title of the modal
    $gameModalTitle.text("New Game")
    // clear the form
    $nameInput.val("")
    // Say that we're creating
    editGameId = null;
}

function onStartEditGame(gameId) {
    // get the one that matches that id
    const game = gameList.find(game => game.id === gameId);
    // open the modal
    gameModal.show();
    // change the title of the modal
    $gameModalTitle.text("Edit " + game.name)
    // Put the game's current data in the form
    $nameInput.val(game.name)
    // Say that we're editing this one
    editGameId = game.id;
}

function onSaveGame() {
    // check if we're saving a create or an edit
    if (editGameId === null) {
        // get the name of the new game
        // create a new game and add it to the list
        gameList.push({
            id: gameList[gameList.length - 1].id + 1,
            name: $nameInput.val()})
        }
        else {
            // Find the game & update
            const game = gameList.find(game => game.id === editGameId);
            game.name = $nameInput.val();
        }
        renderGameList();
        gameModal.hide();
    }

    function onDeleteButtonClick(gameId) {
        const indexToDelete = gameList.findIndex(game => game.id === gameId)
        gameList.splice(indexToDelete, 1);
        renderGameList();
    }