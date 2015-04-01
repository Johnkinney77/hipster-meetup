var net = require('net');
var server = net.createServer();
var fs = require('fs');
jsonOriginal = fs.readFileSync('./hipster-meetup.json', 'utf8');
var jsonEdit = JSON.parse(jsonOriginal);

server.on('connection', function(client){
	console.log('USER CONNECTED');
	client.setEncoding('utf8');
	client.write("Welcome to Hipster Meetup!\n");

	client.on('data', function(userInput){
		var userArray = userInput.trim().split("|");

		function save(){
			var jsonFinal = JSON.stringify(jsonEdit);
			fs.writeFile('./hipster-meetup.json', jsonFinal, 'utf8');
		};

		if (userArray[0] === "1" && userArray[1] === "1") {
			switch(userArray[2].toLowerCase()){

				case "create":
				console.log(userArray)
				if (jsonEdit.eventName){
					client.write("Please `clear` your current event before making a new one")
				} else if (userArray.length === 8){
					var meetup = {};
					console.log(userArray)
					meetup.eventName = userArray[3];
					meetup.eventDate = userArray[4];
					meetup.eventTime = userArray[5] + " - " + userArray[6];
					meetup.eventLocation = userArray[7];
					meetup.rsvp = [];
					client.write("\nYou have created a new event: \n")
					client.write(meetup.eventName + "\n")
					client.write(meetup.eventDate + "\n")
					client.write(meetup.eventTime + "\n")
					client.write(meetup.eventLocation + "\n\n")
					jsonEdit = meetup;
					save();
				} else {
					client.write('\nYou did not enter all the information needed.\nRemember each piece of information must be separated by a `|`\n\n')
				}
				break;

				case "attending":
				if(jsonEdit.rsvp.length === 0){
					client.write("\nNo one is currently attending your event\n");
				} else {
					client.write("\nThe people who are attending are:\n")
					jsonEdit.rsvp.forEach(function(attendee){
						client.write(attendee.fullName + " - " + attendee.email + "\n")
					});
				}
				break;

				case "clear":
				userArray[3];
				jsonEdit = {};
				client.write("\nYou have cleared your current event.\n\n")
				save();
				break;

				case "manual":
				client.write('\nCreate an event\n`username|password|create|name|date|start time|end time|location`\n\nWho is attending?\n`username|password|attending`\n\nClear current event\n`username|password|clear`\n\n')
				break;

				default:
				client.write("Hello Admin, seems like you inputted something wrong, please refer to the admins user manual by typing into the console `username|password|manual`.\n\nThank You!\n\n")

				break;
			};
		} else {
			switch(userArray[0].toLowerCase()){
				case "event":
				if (jsonEdit.eventName){
					client.write("\nOur current event is "+ jsonEdit.eventName + "\n\n")
					client.write("Date: " + jsonEdit.eventDate + "\n")
					client.write("Time: " + jsonEdit.eventTime + "\n")
					client.write("Location: " + jsonEdit.eventLocation + "\n\n")
				} else {
					client.write("\nHello User, there are no events at this time, please check again at a later time\n\n")
				}
				break;

				case "headcount":
				client.write("\nThe number of attendees are " + (jsonEdit.rsvp.length).toString() + "\n\n")
				break;


				case "rsvp":
				if (userArray.length === 4) {
					var userAttend = {};
					userAttend.fullName = userArray[1] + " " + userArray[2];
					userAttend.email = userArray[3];
					client.write("\nHi " + userAttend.fullName + ", Thank you for RSVPing to our event, " + jsonEdit.eventName + " on " + jsonEdit.eventDate + " at " + jsonEdit.eventTime + ", at " + jsonEdit.eventLocation + ". We are looking forward to seeing you there!\n\n")
					jsonEdit.rsvp.push(userAttend);
				} else {
					client.write("You did not enter in the porper information, please try again:\nYou must write:\n`rsvp|`first name`|`last name`|email");
				} 
				save();
				break;

				case "manual":
				client.write('\nLook at the current event\n`event`\n\nHow many are attending?\n`headcount`\n\nRSVP\n`RSVP|First Name|Last Name-Email`\n\n')
				break;

				default:
				client.write("Hello User, seems like you inputted something wrong, please refer to the user manual by typing into the console `manual`.\n\nThank You!\n\n")

				break;
			};
		};
		client.end();


	});
});

server.listen(8124,function(){
	console.log('SERVER BOUND');
});
