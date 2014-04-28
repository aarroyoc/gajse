GAJSE
=====

Graphic Adventure JavaScript Engine

##Introduction
GAJSE is a library for create graphic adventures in a GrimE like style that runs on your browser. It runs on all modern browsers and it has a lot of features. 

##Installation
GAJSE is availible on npm. Do the following for use it on a project.

```
npm install gajse --save
```


##Building

You can manually build gajse:

```
git clone https://github.com/AdrianArroyoCalle/gajse

cd gajse

npm install

npm -g install browserify (may require sudo)

browserify -r ./lib/gajse-api.js -r three gajse.js > gajse.min.js

```

At your option use uglify-js.

##Tutorial

Create an index.html on a new folder. Put this:

```
<!DOCTYPE html>
<html>
	<head>
		<script src="node_modules/gajse/gajse.min.js"></script>
	</head>
	<body>
		<article id="gajse" data-gajse="game/mygame.json"></article>
	</body>
</html>
```
Where mygame.json is a file containing the main description of the game such as name, description, loading image, features, mininum GAJSE version and paths for resources. It's more explained on the Wiki, or you can use La Maquinaria de Videojuegos to create the game with GUI.

##Price
GAJSE is under the Affero GPL license so:

 * You can use it for open source projects
 * You should give us credit
 * You can use it on hosted servers, but you need the full source
 * You announce the changes made by you
 * You can use it on commercial projects

But if you need full control of the library, GAJSE offers a Commercial Release:

 * You pay for a Commercial License of GAJSE the only price of 50$
 * You can do whatever you want
