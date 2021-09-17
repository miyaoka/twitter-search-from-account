# Twitter search by account

Auto input search params by account page.

## Usage

Text will be inserted when focusing search input.

### on profile page

- url: `https://twitter.com/[accountId]`
- input: `from:[accountId]`

<img src="https://user-images.githubusercontent.com/1443118/133705632-2fa03d24-427e-46dd-a0cd-82ad5311a7f7.png" width="600">

### on status page

- url: `https://twitter.com/[accountId]/status/[statusId]`
- input: `from:[accountId] until:[YYYY-MM-DD_hh:mm:ss]_UTC`

<img src="https://user-images.githubusercontent.com/1443118/133705668-194bab0a-e37e-4b77-bee9-e5dda6fd1aab.png" width="600">

## development

### setup

- yarn

### dev

- yarn dev

### Load extension

- open `chrome://extensions/`
- click `Load unpacked` button and select `./dist` directory
