const request = require('request');
const prompt = require('prompt');
const chalk = require('chalk');
const fs = require('fs');
const colors = require('colors');
process.on('uncaughtException', err => {});
process.on('unhandledRejection', err => {});

function write(content, file) {
    [...new Set(fs.appendFile(file, content, function(err) {}))];
}
var fail = 0;
var work = 0;
var invalid = 0;
var long = 0;
var total = work + fail;
const usernames = [...new Set(require('fs').readFileSync('usernames.txt', 'utf-8').replace(/\r/g, '').split('\n'))];

function getRandomString(length) {
    var randomChars = 'abcdefghijklmnopqrstuvwxyz';
    var result = '';
    for (var i = 0; i < length; i++) {
        result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    }
    return result;
}
class Tiktok1 {
    static generate(username, speed) {
        function getRandomString(length) {
            var randomChars = 'abcdefghijklmnopqrstuvwxyz';
            var result = '';
            for (var i = 0; i < length; i++) {
                result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
            }
            return result;
        }
        let i = 0,
            int = setInterval(() => {
                var letters = getRandomString(6);
                if (i++ >= 5000000000) return clearInterval(int);
                var username = letters;
                request.get('https://www.tiktok.com/api/register/check/login/name/?login_name=' + username + '&_signature=_02B4Z6wo00101LgfXcwAAIBDUDgEacykhIi4HllAAHFs39', {
                    json: true,
                    gzip: true,
                    headers: {
                        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36',
                        'content-type': 'application/json; charset=utf-8',
                        'content-encoding': 'br'
                    },
                }, (err, res, body) => {

                    if (body.valid == true) {
                        work++;
                        write(username + '\n', "available.txt");
                        console.log(chalk.green('(%s) [True] Username %s is Available!'), work, username);
                    } else if (body.valid == false) {
                        fail++;
                        console.log(chalk.red('(%s) [False] Username %s is Taken!'), fail, username);
                    } else if (body.status_msg == 'Invalid parameters') {
                        invalid++;
                        console.log(chalk.red('(%s) [ERROR] Username %s is Invalid'.inverse), invalid, username);
                    } else {
                        usernames.forEach(username => Tiktok.checkUser(username, speed));
                    }
                    process.title = `[TikTok Username] - Username ${username} | Work ${work} | Fail ${fail} | Invalid ${invalid}`;
                });

            }, speed);
    }
}
class Tiktok2 {
    static file(username, speed) {
        let i = 0,
            int = setInterval(() => {
                if (i++ >= 1) return clearInterval(int);
                request.get('https://www.tiktok.com/api/register/check/login/name/?login_name=' + username + '&_signature=_02B4Z6wo00101LgfXcwAAIBDUDgEacykhIi4HllAAHFs39', {
                    json: true,
                    gzip: true,
                    headers: {
                        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36',
                        'content-type': 'application/json; charset=utf-8',
                        'content-encoding': 'br'
                    },
                }, (err, res, body) => {
                    if (body.valid == true) {
                        work++;
                        write(username + '\n', "available.txt");
                        console.log(chalk.green('(%s) [True] Username %s is Available!'), work, username);
                    } else if (body.valid == false) {
                        fail++;
                        console.log(chalk.red('(%s) [False] Username %s is Taken!'), fail, username);
                    } else if (body.status_msg == 'Invalid parameters') {
                        invalid++;
                        console.log(chalk.red('(%s) [ERROR] Username %s is Invalid'.inverse), invalid, username);
                    } else {
                        usernames.forEach(username => Tiktok.checkUser(username, speed));
                    }
                    process.title = `[TikTok Username] - Username ${username} | Work ${work} | Fail ${fail} | Invalid ${invalid}`;
                });
            }, speed);
    }
}
prompt.start();
console.log(chalk.green('Type 1 for auto generated'.inverse + ('\n') + 'Type 2 for usernames.txt'.inverse));
console.log(chalk.green('Leave Answer blank for auto generating" default'.inverse));
prompt.get(['answer', 'speed'], function(err, result) {
    console.log('');
    const speed = result.speed;
    const answer = result.answer;
    if (answer == "1") {
        usernames.forEach(username => Tiktok1.generate(username, speed));
    } else if (answer == "2") {
        usernames.forEach(username => Tiktok2.file(username, speed));
    } else {
        usernames.forEach(username => Tiktok1.generate(username, speed));
    }
});