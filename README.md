# Duck's Labyrinth Solving Micro-engine

DLSMe is a little project i am working on for a school project about algorithmics.

![image](https://github.com/lecuek/Typescript_labyrinth_solving/assets/46426142/8fd59dfe-f791-470b-bfe4-f9f7952b69b4)

# Running the project

After cloning the project locally:

Serve the labyrinths.json file using any tool you want, make sure it is served on localhost:3000 and each labyrinth's size is served on a different route like this:

- localhost:3000/3
- localhost:3000/4
- localhost:3000/5
- localhost:3000/13
- localhost:3000/25
- and so on

Note to self: implement a way to load one or more labyrinth(s) directly from a file, and also add support for non-square labyrinths.

During the development i mostly used json-server so here's how to install and use it:

```bash
npm install -g json-server
```

```bash
json-server --watch data/labyrinths.json
```

Open the index.html file.

# Contributing

## Dependencies

- npm : Node Package Manager

## Setting up the environment

Run :

```bash
npm install
```

This should install dependencies you need, including webpack.

To compile the bundle use :

```bash
npm run build
```

I used VSCode's live server plugin to serve changes to the code.
