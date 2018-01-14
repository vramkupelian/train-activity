var db = firebase.database();


$(".submit-button").on("click", function(event){
        //prevents refresh on form submission
        event.preventDefault();

        //grabs user input
        var trainName = $(".name").val().trim();
        var trainDestination = $(".destination").val().trim();
        var trainFirst = $(".first").val().trim();
        var trainFreq = $(".freq").val().trim();
    

    //     //Create a new variable that will hold a <p>
    //    var theName = $("<p>");
    //    var theDestination = $("<p>");
    //    var theFirst = $("<p>");
    //    var theFreq = $("<p>");

    //     theName = trainName;
    //     theDestination = trainDestination;
    //     theFirst = trainFirst;
    //     theFreq = trainFreq;

        // Math .......................................................
         // Assumptions
   

    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(trainFirst, "hh:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % trainFreq;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = trainFreq - tRemainder;
    tMinutesTillTrain = JSON.stringify(tMinutesTillTrain);
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
     nextTrain = moment(nextTrain).format("hh:mm")
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
     nextTrain = JSON.stringify(nextTrain);


       //Create a new variable that will hold a <p>
       var theName = $("<p>");
       var theDestination = $("<p>");
       var theFirst = $("<p>");
       var theFreq = $("<p>");
       var theNext = $("<p>");
       var theTimeUntil = $("<p>");

        theName = trainName;
        theDestination = trainDestination;
        theFirst = trainFirst;
        theFreq = trainFreq;
        theNext = nextTrain;
        theTimeUntil = tMinutesTillTrain;


// .............................................................


        
        // $(".train-name").append(theName);
        // $(".train-destination").append(theDestination);
        // $(".train-next").append(theNext);
        // $(".train-away").append(theTimeUntil);

        db.ref().push({
            name: theName,
            dest: theDestination,
            start: theFirst,
            rate: theFreq,
            next: nextTrain,
            timeUntil: tMinutesTillTrain,
            // dateAdded: db.ServerValue.TIMESTAMP,
        })

        //Clear textbox when done
        $(".name").val("");
        $(".destination").val("");
        $(".first").val("");
        $(".freq").val("");
});

db.ref().on("child_added", function(snapshot){
    var list =  $("<tr>");
    var newName = $("<td>").text(snapshot.val().name);
    list.append(newName);

    var newDest = $("<td>").text(snapshot.val().dest);
    list.append(newDest);

    var newStart = $("<td>").text(snapshot.val().start);
    list.append(newStart);

    var newRate = $("<td>").text(snapshot.val().rate);
    list.append(newRate);

    var newNext = $("<td>").text(snapshot.val().next);
    list.append(newNext);
    
    var newTimeUntil = $("<td>").text(snapshot.val().timeUntil);
    list.append(newTimeUntil);
    $(".all-info").append(list);

});