

function getTest(req,res){
    res.json({ message: 'GET TEST '});
}

function populateArray(input){
    if(input) {
        return input.split('\n');
    } else {
        return [];
    }
}

function writeMultipleLines(nightmare, input){
    var txtLineArray = populateArray(input);
    for(var i=0;i<txtLineArray.length;i++){
        console.log('writing line ', txtLineArray[i]);
        nightmare.type('textarea[id="translater"]', txtLineArray[i] +' ')
            .wait(500)
            .insert('textarea[id="translater"]','\n')
            .wait(500)
    }
    return nightmare;
}

function getTranslated(req, res){
    var Nightmare = require('nightmare');
    var nightmare = Nightmare({ show: true});
    nightmare.goto('http://www.alllanguagetranslator.com/2014/12/english-to-sinhalese-conversion-english.html');
    return writeMultipleLines(nightmare, req.body.input)
        .wait('#translater')
        .evaluate(function () {
            return document.querySelector('#translater').value
        })
        .end()
        .then(function (result) {
            console.log('result is ', result);
            res.json({payload:result});
        });

}

function readFileAndTranslate(req, res) {
    var Nightmare = require('nightmare');
    var nightmare = Nightmare({ show: false });
    var fs = require('fs');
    var LineByLineReader = require('line-by-line')
    var  lr = new LineByLineReader('../file.txt');
    nightmare.goto('http://www.alllanguagetranslator.com/2014/12/english-to-sinhalese-conversion-english.html')

    lr.on('error', function (err) {
        // 'err' contains error object
        return 'Error '+err;
    });

    lr.on('line', function (line) {
        // 'line' contains the current line without the trailing newline character.
        nightmare
            .type('textarea[id="translater"]', line +' ')
            .wait(500)
            .insert('textarea[id="translater"]','\n')
            .wait(500)
    });

    lr.on('end', function () {
        nightmare
            .click('.bsuccess')
            .wait('#translater')
            .evaluate(function () {
                return document.querySelector('#translater').value
            })
            .end()
            .then(function (result) {
                console.log(result);
                res.json({payload:result});
            })
    });
}

module.exports = {
    readFileAndTranslate:readFileAndTranslate,
    getTranslated: getTranslated
}