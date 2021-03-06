angular.module('ngSeedApp').controller('ReadSongCtrl', function ($scope, $timeout,$http) {
    $scope.songLines = [];
    $http.get('/scripts/controllers/song.txt').then(function(value) {
        var intro = S(value.data).between('[Intro]', '[EndIntro]').s;
        var chorus = S(value.data).between('[Chorus]', '[EndChorus]').s;
        var verse1 = S(value.data).between('[Verse1]', '[EndVerse1]').s;
        var verse2 = S(value.data).between('[Verse2]', '[EndVerse2]').s;
        $scope.introArray  = createValidSongArray(intro);
        $scope.chorusArray  = createValidSongArray(chorus);
        $scope.verse1Array  = createValidSongArray(verse1);
        $scope.verse2Array  = createValidSongArray(verse2);
    });

    function createNonBreakingSpaces(emptySpaceIndex) {
        var nbspString = '';
        for(var i=0; i<emptySpaceIndex; i++){
            nbspString += '&nbsp;'
        }
        return nbspString;
    }

    function createChordLine(chordLine) {
        var formattedChordLine = '';
        var chordLineArray = chordLine.split(' ');
        var emptySpaceIndex = 0;
        _.each(chordLineArray, function(chordItem) {
            if(chordItem == '') {
                emptySpaceIndex++;
            } else {
                var spaces = createNonBreakingSpaces(emptySpaceIndex);
                var htmlStr = '<span>{{spaces}}</span><span class="chord">{{chordItem}}</span>';
                var values = {spaces:spaces, chordItem:chordItem};
                formattedChordLine += S(htmlStr).template(values).s;
                emptySpaceIndex = 0;
            }
        });
        //console.log(formattedChordLine);
        return formattedChordLine;
    }

    function createValidSongArray(songString) {
        var formattedSongArray = [];
        var chords = 'A |Am |B |Bm |C | Cm|D |Dm|E |Em |F |Fm |G |Gm ';
        _.each(songString.split("\n"), function(songLine) {
            if(!S(songLine).isEmpty()){
                var songObj = {};
                console.log(songLine);
                if (new RegExp(chords).test(songLine)) {
                    //console.log(songLine + ' is a chord line .its length is '+songLine.length);
                    songObj.type = 'chord';
                    //createChordLine(songLine);
                    songObj.chordLine = createChordLine(songLine);
                    songObj.length = createChordLine(songLine).length;

                } else {
                    songObj.type = 'song';
                    songObj.songLine = songLine;
                    songObj.length = songLine.length;
                }

                formattedSongArray.push(songObj);
            }
        });
        return formattedSongArray;
    }
});