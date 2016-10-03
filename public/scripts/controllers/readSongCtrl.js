angular.module('ngSeedApp').controller('ReadSongCtrl', function ($scope, $timeout,$http) {
    $scope.songLines = [];
    $http.get('/scripts/controllers/sinhalasong.txt').then(function(value) {
        //console.log('----',value.data);
        //var table_htmlStr = '\n<table>\n{{trContent}}\n</table>\n';
        var rowsHtml = '<table>\n';
        _.each(value.data.split("\n"), function(songLine) {
            //console.log(songLine);
            if(!S(songLine).isEmpty()){
                var songLineArray = songLine.split(' ');
                var tdChordContent = createChordTDs(songLineArray);
                var tdSongContent = createSongTDs(songLineArray);
                var tr_htmlStr = '<tr>\n{{tdChordContent}}\n</tr>\n<tr>\n{{tdSongContent}}\n</tr>\n';
                var TR_values = {tdChordContent:tdChordContent, tdSongContent:tdSongContent};
                rowsHtml += S(tr_htmlStr).template(TR_values).s;
                //console.log(rowsHtml);
            } else {
                rowsHtml += '</table>\n<hr>\n<table>\n';
            }
        });
        rowsHtml += '</table>';
        //var all_tr_values = {trContent: rowsHtml};
        //var x = S(table_htmlStr).template(all_tr_values).s;
        console.log(rowsHtml);
    });


    function createChordTDs(array) {
        var td_html = '';
        _.each(array, function(arrayItem) {
            td_html += '<td><span>Dm</span></td>'
        });
        return td_html;
    }

    function createSongTDs(array) {
        var td_html = '';
        _.each(array, function(arrayItem) {
            td_html += '<td>'+arrayItem+'</td>';
        });
        return td_html;
    }
});