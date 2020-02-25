# Installatie

```git clone git@github.com:Amsterdam/openstad-component-openstad-component-choices-guide.git```

of

```npm i git+ssh://git@github.com:Amsterdam/openstad-component-openstad-component-choices-guide.git```

## Build

'npm run build' herschrijft de files in /dist

### Devel: watch

'npm run watch' houdt de files in de gaten en herschrijft de files in /dist bij elke aanpassing

### Auto build on commit

Maak een file `.git/hooks/pre-commit` met als inhoud

```
#!/bin/sh

npm run build
```

## Gebruik

ToDo

- voor results wordt de size meegestuurd naar de plane, dat slaat natuurlijk helemaal nergens op
fLyMd-mAkEr