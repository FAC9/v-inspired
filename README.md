# vinspired

Prototype for the Yoti hackathon.

vinspired is the leading volunteering charity for 14-25 year olds.

## What?

This application allows volunteers to sign in and out of volunteering events by scanning a Yoti QR code.

When they sign out the application tells them how long they have been volunteering for.

## Why?

vinspired are keen for volunteers to have an accurate record of how long they have been volunteering at events.

Additionally, event organisers benefit from knowing which people have turned up at the event.

## How?


Each volunteering event is identified through its QR code. When a volunteer scans the code their ID, email and the current time are saved in the app.

When they log out the details are retrieved and the total volunteering time calculated.

## Roadmap

In this prototype the login details are simply saved in an object. In order to persist the data we intend to save them to a database.

The prototype uses one Yoti application with one QR code. We intend to work with Yoti so that our application can either generate unique QR codes for each event or pass in information allowing the app to track multiple events at once.

The prototype presents the total volunteering time to the user. We intend to email the volunteer with this information after the event and also provide for integrating it into each volunteer's vinspired profile.

## Tech stack

Front-end:

* Sass

* jQuery

Back-end:

* Hapi

* Yoti Node SDK