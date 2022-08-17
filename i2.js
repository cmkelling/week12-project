//Array for testing and storing data
let gamesList = [
    {
        id: 0,
        name: "Brew",
        stats: ["8/10", "1-4", 1, "30min"]
    },
    {
        id: 1,
        name: "Patchwork",
        stats: ["9/10", "2", 1, "30min"]
    }
];

$(() => {
    renderGamesList();
});

const $gamesContainer = $("#owned-games");

function renderGamesList() {
    $gamesContainer.empty();
    $gamesContainer.append(gamesList.map(game => renderGames(game)));
};
//want to pop up form when only needing to ad stats, unsure how to accomplish.
function renderGames(game) {
    $('#owned-games').append(`
    <div id = "${game.id}" class = card>
    <div class = "card-header">
        <h4> ${game.name}</h4>
        <button class = "btn btn-primary" onclick = "deleteGame('${game.id}')">Delete</button>
    </div>
        <div class = "card-body">
            <div class = "container card">
                <form class="container card-body" id="form">
                    <label class="form-label" for="${game.id}-rating">Game Rating</label>
                    <input type="text" id="${game.id}-rating" placeholder="Out of 10">
                    <label class="form-label" for="${game.id}-no-players">Number of Players Allowed</label>
                    <input type="text" id="${game.id}-no-players" placeholder="Number of players">
                    <br><br>
                    <label class="form-label" for="Times Played">Times Played</label>
                    <input type="number" name="Times Played" id="${game.id}-times-played">
                    <label class="form-label" for="Avg Time">Average Game Play Time</label>
                    <input type="text" name="Avg Time" id="${game.id}-avg-play-time" placeholder="hours/minutes">
                    <br><br>
                    <input id = "new-stats" class="btn btn-dark form-control" type="button" onclick = "addGameStats(game)">
                </form>
            </div>
        </div>
    </div><br>`)
};
//button functions
function createGame() {
    gamesList.push({
        id: gamesList[gamesList.length - 1].id + 1,
        name: game.name.val("#new-game-name"),
        stats: []
    });
};

function deleteGame(gameId) {
    const indexToDelete = gamesList.findIndex(game => game.id === gameId);
    gamesList.splice(indexToDelete, 1);
    renderGamesList();
};

function addGameStats() {
    const game = gamesList.find(game => game.id === gameId);
    game.stats.push( 
        $(`#${game.id}-rating`).val(), 
        $(`#${game.id}-no-players`).val(),
        $(`#${game.id}-times-played`).val(),
        $(`#${game.id}-avg-play-time`).val(),
    );
    renderGamesList();
};
//not sure how to get button for delete function. Could also be an edit function if I can figure it out.
function deleteStats(gameId, statId) {
    for (let game of this.games) {
        if (game.id == gameId) {
            for (let stat of game.stats) {
                if (stat.id == statId) {
                    game.stats.splice(game.stats.indexOf(stat), 1)};
            };
        };
    };
};