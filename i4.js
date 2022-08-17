
//test array and place for new info to go.
const puzzleList = [
    {
        id: 0,
        name: "Foul Play & Cabernet",
        pieces: 1000,
        completed: "no",
        rating: "NA"
    },
    {
        id: 1,
        name: "Ravensburger Peacock",
        pieces: 2000,
        completed: "yes",
        rating: "5/10"
    }
]

$(() => {
renderPuzzleList()
})

const $puzzlesContainer = $("#puzzles-container")

function renderPuzzleList() {
$puzzlesContainer.empty()
$puzzlesContainer.append(puzzleList.map(puzzle => renderPuzzle(puzzle)))
}

function renderPuzzle(puzzle) {
return $("<tr/>").append(
$("<td/>").text(puzzle.name),
$("<td/>").text(puzzle.pieces),
$("<td/>").text(puzzle.completed),
$("<td/>").text(puzzle.rating),
$("<td/>").append(
    $("<button/>").addClass("btn btn-danger me-2").text("Delete").on("click", () => onDeleteButtonClick(puzzle.id)),
    $("<button>").addClass("btn btn-dark").text("Edit").on("click", () => onStartEditPuzzle(puzzle.id))
)
)
}
//modal and variable info
const puzzleModal = new bootstrap.Modal('#puzzle-name-modal')
const $puzzleModalTitle = $("#puzzle-modal-title")
const $nameInput = $("#name-input")
const $completedInput = $("#complete-input")
const $ratingInput = $("#rating-input")
const $piecesInput = $("#pieces-input")

let editPuzzleId = null;
//buttons
function onStartCreatePuzzle() {
puzzleModal.show();
$puzzleModalTitle.text("New Puzzle")
$nameInput.val("")
$completedInput.val("")
$ratingInput.val("")
$piecesInput.val("")
//creating
editPuzzleId = null;
}

function onStartEditPuzzle(puzzleId) {
// get the one that matches that id
const puzzle = puzzleList.find(puzzle => puzzle.id === puzzleId);
puzzleModal.show();
// change the title of the modal to editting
$gpuzzleModalTitle.text("Edit " + puzzle.name)
// Put the puzzle's current data in the form
$nameInput.val(puzzle.name)
$timesInput.val(puzzle.timesPlayed)
$ratingInput.val(puzzle.rating)
$piecesInput.val(puzzle.pieces)
//editing
editpuzzleId = puzzle.id;
}

function onSavePuzzle() {
// check if saving a create or an edit
if (editPuzzleId === null) {
// get the name of the new puzzle
// create a new puzzle and add it to the list
puzzleList.push({
    id: puzzleList[puzzleList.length - 1].id + 1,
    name: $nameInput.val(),
    pieces: $piecesInput.val(),
    completed: $completedInput.val(),
    rating: $ratingInput.val()})
}
else {
    // Find the puzzle & update
    const puzzle = puzzleList.find(puzzle => puzzle.id === editPuzzleId);
    puzzle.name = $nameInput.val();
    puzzle.pieces = $piecesInput.val();
    puzzle.completed = $completedInput.val();
    puzzle.rating = $ratingInput.val();
}
renderPuzzleList();
puzzleModal.hide();
}

function onDeleteButtonClick(puzzleId) {
const indexToDelete = puzzleList.findIndex(puzzle => puzzle.id === puzzleId)
puzzleList.splice(indexToDelete, 1);
renderPuzzleList();
}