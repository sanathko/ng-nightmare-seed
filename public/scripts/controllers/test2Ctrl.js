/**
 * Created by sanathkodikara on 8/06/2016.
 */
angular.module('ngSeedApp').controller('Test2Ctrl', function ($scope, $timeout,$http, $anchorScroll, $location) {
    $scope.songObj = {};

    $scope.convertToGrid = function() {
        //console.log('convert to ',$scope.songObj.input.split('<table>'));
        //console.log(S($scope.songObj.input).between('<table>', '</table>'));
        $scope.songArray = [];
        var tableIndex = 0;

        _.each($scope.songObj.input.split('<table>'), function(x) {
            var songLineObj = {};
            var tableContent = x.replace('</table>','').trim();
            //console.log('TABLE',tableContent);
            tableIndex++;
            var rowIndex = 0;
            var rowArray = tableContent.split('<tr>');
            //console.log(rowArray);
            //console.log('ONE -- ',rowArray[1]);
            //console.log('TWO -- ',rowArray[2]);
            var songColumnArray = [];
            var columnIndex = 0;
            if(rowArray[1] && rowArray[2]) {
                var songColumns = rowArray[2].replace('</tr>','').trim().split('<td>');
                _.each(rowArray[1].replace('</tr>','').trim().split('<td>'), function(y){
                    var word = songColumns[columnIndex].replace('</td>','').trim();
                    var chord = y.replace('</td>','').replace('<span>','').replace('</span>','').trim();
                    if(word && word !=='') {
                        //console.log('word -------- ',word);
                        var songColumnObj = {word:word, chord: chord};
                        songColumnArray.push(songColumnObj);
                    }
                    columnIndex++;
                });
                songLineObj.columns = songColumnArray;
                songLineObj.empty = false;
            }
            if(songLineObj.columns) {
                $scope.songArray.push(songLineObj);
            }
        });

        console.log('******************',$scope.songArray);
        //$scope.songArray = [];
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
    };

    $scope.gotoAnchor = function(x) {
        var newHash = 'anchor' + x;
        if ($location.hash() !== newHash) {
            // set the $location.hash to `newHash` and
            // $anchorScroll will automatically scroll to it
            $location.hash(x);
        } else {
            // call $anchorScroll() explicitly,
            // since $location.hash hasn't changed
            $anchorScroll();
        }
    };

});