/*
 * @Author: Quentin Tonneau 
 * @Date: 2018-03-19 13:23:50 
 * @Last Modified by: Quentin Tonneau
 * @Last Modified time: 2018-03-19 15:20:20
 */

/**
 * Fonction principale executée après le chargement de la page
 * Initialise l'échiquier en fonction de la variable "echiquier"
 */
function init(){
    const CHESSBOARD_LENGTH = 8;

    for(var col = 0; col < CHESSBOARD_LENGTH; col++){
        for(var line = 0; line < CHESSBOARD_LENGTH; line++){
            var square = boardJSON.board[col][7-line]; // HTML Table lines are inversed
            var squareView = document.getElementsByTagName("tr")[line+1].getElementsByTagName("td")[col];
            if(square.isEmpty) {
                squareView.innerHTML = "";
            } else {
                squareView.innerHTML = square.piece.symbol;
            }
        }
    }    
}