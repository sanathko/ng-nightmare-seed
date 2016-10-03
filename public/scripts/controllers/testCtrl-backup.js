/**
 * Created by sanathkodikara on 8/06/2016.
 */
angular.module('ngSeedApp').controller('TestCtrl', function ($scope, $timeout,$http) {
    //var songString = '        Em         D           Bm        D\nAeheala mal pipina deweta dige numba piyamenna';

    $http.get('/scripts/controllers/test.txt').then(function(songString) {
        console.log(songString.data);
        var songArray = [];
        _.each(songString.data.split("\n"), function(songLine) {
            console.log(songLine);
            songArray.push(songLine);
        });
        processSongInfo(songArray);
    });

    function processSongInfo(songArray) {
        var songLineLength = songArray[1].split(' ').length;
        console.log(songArray[0].split(' '));
        var formattedChordLine = '';
        var chordLineArray = songArray[0].split(' ');
        var emptySpaceIndex = 0;
        console.log(chordLineArray.length);
        var lineChordCharIndex = 0;
        var chordLinePosArray = [];
        var previousChord = '';
        _.each(chordLineArray, function(chordItem) {
            if(chordItem == '') {
                emptySpaceIndex++;
            } else {
                if(previousChord.length > 0) {
                    lineChordCharIndex += emptySpaceIndex + 1 + (previousChord.length - 1);
                } else {
                    lineChordCharIndex += emptySpaceIndex + 1;
                }
                chordLinePosArray.push({chord: chordItem, chordPosition: lineChordCharIndex, previousChord:previousChord});
                formattedChordLine += emptySpaceIndex + ' spaces ' + chordItem + ' ';
                emptySpaceIndex = 0;
                previousChord = chordItem;
            }
        });
        console.log(formattedChordLine);
        var songLineArray = songArray[1].split(' ');
        var songLinePosArray = [];
        var startPos = 1;
        var endPos = 1;
        var wordIndex = 0;
        _.each(songLineArray, function(songItem) {
            wordIndex++;
            if(endPos != 1){
                startPos = endPos + 2;
                endPos = startPos + (songItem.length -1);
            } else {
                endPos += songItem.length -1;
            }
            songLinePosArray.push({startPos:startPos,endPos:endPos, songWord: songItem, wordIndex: wordIndex});
        });
        createTable(songLinePosArray, chordLinePosArray);
    }

    function getWordIndexForChordPosition(songLinePosArray, chordLinePosArray) {
        var chordsPosArray = [];
        _.each(chordLinePosArray, function(chordLine) {
            var selectedSongPos = _.find(songLinePosArray, function(songLine) {
                return songLine.startPos <= chordLine.chordPosition && songLine.endPos >= chordLine.chordPosition;
            });
            if(selectedSongPos)
             chordsPosArray.push({chord: chordLine.chord, wordIndex: selectedSongPos.wordIndex});
        });
        return chordsPosArray;
    }

    function createTable(songLinePosArray, chordLinePosArray){
        var numberOfRows = 2;
        var numberOfColumns = songLinePosArray.length;
        var tableHtml = '';
        console.log(songLinePosArray);
        console.log(chordLinePosArray);
        console.log(getWordIndexForChordPosition(songLinePosArray, chordLinePosArray));
    }
});