# Trello Resolutions
## Create a Trello Resolution board with NodeJS

## Setup:

1. Authorize your app by visiting `https://trello.com/1/connect?key=<PUBLIC_KEY>&name=MyApp&response_type=token&scope=read,write`
  - If you want the token to never expire, `add &expiration=never` to the end.
2. Create a Trello board with at least one list. Cards will be added to the first list on your board.
3. Put your secrets in secrets.yml
4. Put your calendar in data.yml

## Usage:

`node create-calendar.js January`

Note that Trello has an API rate limit, so it is recommended to do one month at a time.

