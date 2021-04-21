angular.module("exam04Module", [])
    .config(function() {
        console.log("exam04Module - config callback");
    })
    .run(function() {
        console.log("exam04Module - run callback");
    });