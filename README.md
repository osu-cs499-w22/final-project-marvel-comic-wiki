# Marvel API Wiki

This service retrieves data from Marvel's Developer API and provides the user with a simple UI to traverse through Marvel's database.

## Adding your Marvel API Key

1) Go to https://developer.marvel.com/docs and create your Marvel account.

2) After signing up, login and click the "Get a Key" tab to active your API key.

3) After activating your API key, refresh the page then click the "My Developer Account" tab (this replaces "Get a Key").

4) Create .env file within the repo's root directory on your local machine, then add the lines: 

```REACT_APP_MARVEL_API_PUB_KEY = {your public key here}```
<br>
```REACT_APP_MARVEL_API_PRIV_KEY = {your private key here}```
