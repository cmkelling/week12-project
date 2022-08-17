//classes to set up the information for each game and stats it provides.
class Game {
    constructor(name){
        this.name = name;
        this.stats = [];
    }

    addStat(name, timesPlayed, noPlayers, avgGamePlay, rating) {
        this.Stats.push(new Stats(name, timesPlayed, noPlayers, avgGamePlay, rating))
    }
}

class Stats {
    constructor(name, timesPlayed, noPlayers, avgGamePlay, rating){
        this.name = name;
        this.timesPlayed = timesPlayed;
        this.noPlayers = noPlayers;
        this.avgGamePlay = avgGamePlay;
        this.rating = rating;
    }
}

//test data//--Need Help Here
var test = [
    {
        id: 0,
        name: "Brew",
        stats: ["Brew", 1, "1-4", "30min", "8/10"]
    }
]

//For Rendering?--Need Help Here

$(() => {
    DOMManager.render()
});

const $currentGames = $('#current-games');



class GameService {

    static getAllGames() {
        $currentGames.empty();
        $currentGames.append(test.map(game => render(game)));
    };

    static createGame() {
        test.push({
            id:test[test.length - 1].id + 1,
            name: $nameInput.val()
        })
    }

    static deleteGame(gameId) {
        const indextoDelete = test.findIndex(game => game.id === gameId);
        test.splice(indextoDelete, 1);
        render();
    };
};
//Manages DOM manipulation to CRUD
class DOMManager {
    static games;

    static getAllGames() {
        GameService.getAllGames().then(games => this.render(games));
    }

    static createGame(name) {
        GameService.createGame(new Game(name)).then(() => {
            return GameService.getAllGames();
        }).then((games) => this.render(games));
    }

    static deleteGame(id) {
        GameService.deleteGame(id)
        .then(() => {
            return GameService.getAllGames();
        })
        .then((games) => this.render(games));
    }

    

    static addStats(id) {
        for (let game of this.games) {
            if (game._id == id) {
                game.stats.push(new Stats(
                    $(`#${game._id}-name`).val(), 
                    $(`#${game._id}-rating`).val(), 
                    $(`#${game._id}-no-players`).val(),
                    $(`#${game._id}-times-played`).val(),
                    $(`#${game._id}-avg-play-time`).val(),
                ));
                GameService.updateGame(game).then(() => {
                    return GameService.getAllGames();
                }).then((games) => this.render(games));
            }
        }
    }

    static deleteStats(gameId, statsId) {
        for (let game of this.games) {
            if (game._id == gameId) {
                for (let stat of game.stats) {
                    if (stat._id == statId) {
                        game.stats.splice(game.stats.indexOf(stat), 1);
                            return GameService.getAllGames()
                            .then((games) => this.render(games));
                    }
                }
            }
        }
    }

    static render(games) {
        this.games = games;
        $('#owned-games').empty();
        for (let game of games) {
            $('#owned-games').prepend(
                `<div id = "${game.id}" class = card>
                    <div class = "card-header">
                        <h4> ${game.name}</h4>
                        <button class = "btn btn-primary" onclick = "DOMManager.deleteGame('${game.id}')">Delete</button>
                    </div>
                    <div class = "card-body">
                        <div class = "container card">
                            <form class="container card-body" id="form">
                                <label class="form-label" for="${game.id}-name">Game Name</label>
                                <input type="text" id="${game.id}-name" placeholder="Name of Game">
                                <label class="form-label" for="${game.id}-rating">Game Rating</label>
                                <input type="text" id="${game._id}-rating" placeholder="Out of 10">
                                <label class="form-label" for="${game.id}-no-players">Number of Players Allowed</label>
                                <input type="text" id="${game.id}-no-players" placeholder="Number of players">
                                <br><br>
                                <label class="form-label" for="Times Played">Times Played</label>
                                <input type="number" name="Times Played" id="${game.id}-times-played">
                                <label class="form-label" for="Avg Time">Average Game Play Time</label>
                                <input type="text" name="Avg Time" id="${game.id}-avg-play-time" placeholder="hours/minutes">
                                <br><br>
                                <input id = "${game.id}-new-stats" class="btn btn-dark form-control" type="button" onclick = "DOMManager.addStats('${game.id})">
                            </form>
                        </div>
                    </div>
                </div><br>`
            );

            for(let stat of game.stats) {
                $(`#${game.id}`).find('card-body').append(
                    `<p>
                        <span id = "name-${stat.id}><strong>Name: </strong> ${stat.name}</span>
                        <span id = "rating-${stat.id}><strong>Rating: </strong> ${stat.rating}</span>
                        <span id = "players-${stat.id}><strong>Number of Players: </strong> ${stat.noPlayers}</span>
                        <span id = "times-${stat.id}><strong>Times Played: </strong> ${stat.timesPlayed}</span>
                        <span id = "avg-${stat.id}><strong>Average Play Time: </strong> ${stat.avgGamePlay}</span>
                        <button class = "btn btn-primary" onclick = "DOMManager.deleteStats('${game.id}', '${stat.id}')">Delete Stats</button>`
                )
            }
        }
    }
}

$('#create-new-game').on("click", () => {
    DOMManager.createGame($('#new-game').val());
    $('#new-game').val('');
});

DOMManager.getAllGames();