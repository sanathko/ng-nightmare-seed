/**
 * Created by sanathkodikara on 8/06/2016.
 */
angular.module('ngSeedApp').controller('Test1Ctrl', function ($scope, $timeout,$http) {
    $scope.songObj = {};
    //$scope.songObj = {input: 'හැඳින ගත්තේ අප මුලින් පෙම්වතුන් වීමෙන්\n' +
    //'අප උපන්නේ ඒ දිනේ ප්‍රේමයේ නාමෙන්\n' +
    //'ඉතින් කෙලෙසද මා බලන්නේ ඔබ දිහා එලෙසින්\n' +
    //'යෙහෙළියක සේ සොයුරියක සේ පෙම් කඳුළු දෑසින්'};

    $scope.convertToGrid = function() {
        //console.log('convert to ',$scope.songObj.input);
        $scope.songArray = [];
        _.each($scope.songObj.input.split("\n"), function(songLine) {
            //console.log('---- '+songLine);
            var songLineObj = {};
            if(!S(songLine).isEmpty()){
                var songColumns = songLine.split(' ');
                var songColumnArray = [];
                _.each(songColumns, function(songColumn) {
                    var songColumnObj = {word:songColumn, chord:''};
                    songColumnArray.push(songColumnObj);
                });
                songLineObj.columns = songColumnArray;
                songLineObj.empty = false;
            } else {
                songLineObj.empty = true;
            }
            $scope.songArray.push(songLineObj);
        });

        //$scope.songObj.outputGrid = $scope.songObj.input + "ZZZZZ";
    };

    $scope.convertToSongHtml = function() {
        //console.log('------****',$scope.songArray);
        var html = '';
        _.forEach($scope.songArray, function(row) {
            var rowsHtml = '\n<table>';
            var chordTR = '\n<tr>';
            var songTR = '\n<tr>\n';
            _.forEach(row.columns, function(column) {
                if (column.chord !== '') {
                    chordTR += '<td><span>'+column.chord+'</span></td>';
                } else {
                    chordTR += '<td></td>';
                }
                songTR += '<td>'+column.word+'</td>';
            });
            rowsHtml += chordTR + '\n</tr>\n';
            rowsHtml += songTR + '\n</tr>';
            rowsHtml += '\n</table>';
            html += rowsHtml;
        });
        console.log(html);
        $scope.songHtml = html;
    }


});