let board = ["", "", "", "", "", "", "", "", ""];
const human = "X";
const ai = "O";

const winCombos =
[
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
];

function makeMove(index) 
{
    if (board[index] !== "" || checkWinner(human)) return;

    board[index] = human;
    render();

    if (checkWinner(human)) 
    {
        document.getElementById("status").innerText = "You Win!";
        return;
    }

    if (isDraw()) 
    {
        document.getElementById("status").innerText = "Draw!";
        return;
    }

    let best = bestMove();
    board[best] = ai;
    render();

    if (checkWinner(ai)) 
    {
        document.getElementById("status").innerText = " AI Wins!";
    }
}

function render()
{
    document.querySelectorAll(".cell").forEach((cell, i) => {
        cell.innerText = board[i];
        cell.className = "cell " + board[i];  
    });
}


function checkWinner(player) 
{
    return winCombos.some(combo =>
        combo.every(i => board[i] === player)
    );
}

function isDraw() 
{
    return board.every(cell => cell !== "");
}

function bestMove()
{
    let bestScore = -Infinity;
    let move;

    for (let i = 0; i < 9; i++) 
        {
        if (board[i] === "") 
            {
            board[i] = ai;
            let score = minimax(board, 0, false);
            board[i] = "";
            if (score > bestScore) 
            {
                bestScore = score;
                move = i;
            }
        }
    }
    return move;
}

function minimax(board, depth, isMaximizing) 
{
    if (checkWinner(ai)) return 1;
    if (checkWinner(human)) return -1;
    if (isDraw()) return 0;

    if (isMaximizing) {
        let bestScore = -Infinity;
        for (let i = 0; i < 9; i++) 
            {
            if (board[i] === "") 
            {
                board[i] = ai;
                bestScore = Math.max(bestScore, minimax(board, depth+1, false));
                board[i] = "";
            }
        }
        return bestScore;
    } else 
        {
        let bestScore = Infinity;
        for (let i = 0; i < 9; i++) 
            {
            if (board[i] === "") 
                {
                board[i] = human;
                bestScore = Math.min(bestScore, minimax(board, depth+1, true));
                board[i] = "";
            }
        }
        return bestScore;
    }
}
