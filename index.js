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
//API usage and setting up methods for later use.
class GameService {
    static url = '#'

    static getAllGames() {
        return $.get(this.url);
    }

    static getGame() {
        return $.get(this.url + `/${id}`);
    }

    static createGame(game) {
        return $.post(this.url, game);
    }

    static updateGame(game) {
        return $.ajax({
            url: this.url + `/${house._id}`,
            dataType: 'json',
            data: JSON.stringify(game),
            contentType: 'application/json',
            type: 'PUT'
        });
    }

    static deleteGame(id) {
        return $.ajax({
            url: this.url + `/${id}`,
            type: 'DELETE'
        });
    }


}
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

    }

    static render(games) {
        this.games = games;
        $('#owned-games').empty();
        for (let game of games) {
            $('#owned-games').prepend(
                `<div id = "${game._id}" class = card>
                    <div class = "card-header">
                        <h4> ${game.name}</h4>
                        <button class = "btn btn-primary" onclick = "DOMManager.deleteGame('${game._id}')">Delete</button>
                    </div>
                    <div class = "card-body">
                        <div class = "container card">
                            <form class="container card-body" id="form">
                                <label class="form-label" for="${game._id}-name">Game Name</label>
                                <input type="text" id="${game._id}-name" placeholder="Name of Game">
                                <label class="form-label" for="${game._id}-rating">Game Rating</label>
                                <input type="text" id="${game._id}-rating" placeholder="Out of 10">
                                <label class="form-label" for="${game._id}-no-players">Number of Players Allowed</label>
                                <input type="text" id="${game._id}-no-players" placeholder="Number of players">
                                <br><br>
                                <label class="form-label" for="Times Played">Times Played</label>
                                <input type="number" name="Times Played" id="${game._id}-times-played">
                                <label class="form-label" for="Avg Time">Average Game Play Time</label>
                                <input type="text" name="Avg Time" id="${game._id}-avg-play-time" placeholder="hours/minutes">
                                <br><br>
                                <input id = "${game._id}-new-stats" class="btn btn-dark form-control" type="button" onclick = "DOMManager.addStats('${game._id})">
                            </form>
                        </div>
                    </div>
                </div><br>`
            );

            for(let stat of game.stats) {
                $(`#${game._id}`).find('card-body').append(
                    `<p>
                        <span id = "name-${stat._id}><strong>Name: </strong> ${stat.name}</span>
                        <span id = "rating-${stat._id}><strong>Rating: </strong> ${stat.rating}</span>
                        <span id = "players-${stat._id}><strong>Number of Players: </strong> ${stat.noPlayers}</span>
                        <span id = "times-${stat._id}><strong>Times Played: </strong> ${stat.timesPlayed}</span>
                        <span id = "avg-${stat._id}><strong>Average Play Time: </strong> ${stat.avgGamePlay}</span>
                        <button class = "btn btn-primary" onclick = "DOMManager.deleteStats('${game._id}', '${stat._id}')">Delete Stats</button>`
                )
            }
        }
    }
}

$('#create-new-game').on("click", () => {
    DOMManager.createGame($('new-game-name').val());
    $('#new-game-name').val('');
});

DOMManager.getAllGames();