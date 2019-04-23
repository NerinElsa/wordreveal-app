'use strict';

let hangmanApp = angular.module('myApp.view1', ['ngRoute'])

hangmanApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

hangmanApp.controller('View1Ctrl', ['$scope', function($scope) {
  $scope.demo = "Binding success! - From view1.js for view.html"

  //Declaring app variables globally
  let words = ["cat", "rat", "bat","mat"];  //array of words to choose from
  let wordRevealed =[];
  $scope.incorrectLettersChosen = [];       //array to hold user failures
  $scope.correctLettersChosen = [];         //array to hold user successes
  $scope.guesses = 6;                       //total number of guesses
  $scope.displayWord = '';                //un revealed word
  $scope.input = {                          //user input changed to 'star' symbol
    letter: ''
  }
 

  //Use this fuction to randomly choose a word from 'words' array
  let selectRandomWord = function () {
      var index = Math.floor (Math.random()*words.length);   //choose a random number and multiply it with the 'word' length and round it.
      return words[index];
                                        //chooses a random word from 'words' array with random 'index'
  }

  let selectedWord = selectRandomWord();  //GLOBALLY DECLARED!
  console.log(selectedWord);

 // $scope.newGame();

  //Use this function to re-start the game
  let newGame = function(){
    $scope.incorrectLettersChosen = []; //array to hold user failures
    $scope.correctLettersChosen = [];  //array to hold user successes
    $scope.guesses = 6;
    $scope.displayWord = '';

  //Assigning and testing randomly selected word 
  
  //let selectedWord = selectRandomWord();    //uses the 'selectRandomWord' function 
  //console.log(selectedWord);
  
    //console.log(l);              //logs the random word into console

  //Use this loop to assign 'star symbol' to the randomly selected word
    let tempDisplayWord = '';
    for (var i=0; i< selectedWord.length; i++){
      tempDisplayWord += '*';             //'+=' means add and make it equal to
    }
    console.log(tempDisplayWord);
    $scope.displayWord = tempDisplayWord; 
  }//end function newGame

  //Use this function to hold user input
  $scope.letterChosen = function(){
      //console.log('Button pressed!');     //TESTING!
      //let lengthCorrect = $scope.correctLettersChosen.length; 
      //console.log(lengthCorrect); 
      
      for (let i=0; i<$scope.correctLettersChosen.length; i++){
        
        //comparison condition
        if($scope.correctLettersChosen[i].toUpperCase() == $scope.input.letter.toUpperCase()){
          $scope.input.letter = " ";    //after comparison the user input is cleared
          return;                       //returns nothing
        }//end 'if condition'
        console.log('Loop - correct letters chosen DONE');
    }//end 'for loop'
      

      //Loops through the array called 'incorrectLettersChosen' to check if userinput is already present
      for(let i=0; i<$scope.incorrectLettersChosen.length; i++){
          //comparison condition
          if($scope.incorrectLettersChosen[i].toUpperCase() == $scope.input.letter.toUpperCase()){
            $scope.input.letter = " ";
            return;
          }//end 'if condition'
          console.log('Loop - incorrect letters chosen DONE');
      }//end 'for loop'

      //Checks the user input with 'selectedWord'
      let correct = false;   //FLAG!
      
      for(let i=0; i< selectedWord.length; i++){
        if(selectedWord[i].toUpperCase() == $scope.input.letter.toUpperCase()){
          console.log('OK!');
          $scope.displayWord = $scope.displayWord.slice(0,i)+ $scope.input.letter.toUpperCase()+$scope.displayWord.slice(i+1);
          console.log($scope.displayWord);
          correct = true;
        }
      }

      //Game logic

      if(correct == true){
       // $scope.guesses --;
        $scope.correctLettersChosen.push($scope.input.letter.toUpperCase());
      } else{
        $scope.guesses --;
        $scope.incorrectLettersChosen.push($scope.input.letter.toUpperCase());
        }
      
      $scope.input.letter = " ";
      
      //Game lost - ran out of guesses
      if($scope.guesses == 0){
        alert("You have lost the game! Try again!");
        $scope.displayWord = selectedWord;
        //$scope.gameReload();
      }

      //Game won if word is fully revealed
      if(($scope.displayWord.indexOf('*')== -1) && ($scope.guesses > 0)){
        alert("You have won! Play again?" );
        //$scope.gameReload();
      }

      console.log('finished');
  }//end 'function'


  //Game reload button function
  $scope.gameReload = function(){
    location.reload();
  }

  //Start new game
  newGame();

}]);