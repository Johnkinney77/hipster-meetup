#Hipster Meetup Read Me
###User Features

**User can display upcoming event**
```bash
event
'Upcoming Meetup:
Event: The Beards Coding Convention,
Date: 4/12/15,
Time: 12:00 PM - 4:00 PM,
Location: Turkey Town, USA
'
```

**User can get headcount**
```bash
headcount
'34 people are going'
```
**User can RSVP**
```bash
RSVP `First Name` `Last Name` `Email`
`Thank you John, we are looking forward to seeing you there`
```
`First name` would be the Users first name

`Last name` would be the Users last name

`Email` would be the Users email

---

###Admin Features

**Admin can create new events**
```bash
`username` `password` `create` `name` `date` `start time` `end time` `location`

```
Please use '' around each element in order to support multi word event names and locations.

`username` is the username we provide you

`password` is the password we provide you`

`create` is the variable we use to create a new event

`name` is the name of the event

`start time` is the start time of the event

`end time` is the end time of the event

`location` is the location of the event, please include entire address e.g. `2 fake rode, faux town, FalSA, 11722`

**Admin can see who is going**
```bash
`username` `password` `attending`
`John Kinney johnkinney77@gmail.com,
Gabby Losch glosch00@gmail.com`
```
**Admin can clear previous event**
```bash
`username` `password` `clear`
```
