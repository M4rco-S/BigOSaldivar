/* Remember that all your functions have to respect the functional programming rules:
 *  - 🔥 Pure functions and side effects 
 *  - 🔥 First class functions & higher order functions
 *  - 🔥 Immutability ⚠️
 *  - 🔥 Composition 
 *
 * See more info here: 
 * https://www.learningjournal.guru/courses/scala/scala-programming-foundation/elements-of-functional-programming-1/
 * 
 * I'm putting a warning in Immutability to remember you that every time you try
 * to change the state var... just be carefull...⚠️
 */


type State = { pins: number[] }
const INITIAL_STATE: State = { pins: [] }

export const createBowlingGame = (state: State = INITIAL_STATE) => Object.freeze({
  roll: (pins: number) => roll(state, pins),
  score: () => score(state),
})

const roll = (state: State, pins: number) => {
  return createBowlingGame ({
  pins: [...state.pins, pins],
  });
}

const score = ({ pins }: State) => {
  const FRAMES = 10;
  let score = 0;
  let firstTry = 0;

 for (let i=0; i < FRAMES; i++){
  if (isStrike(pins, firstTry)){
    score +=scoreForStrike(pins, firstTry)
    firstTry += 1
  }else if (isSpare(pins, firstTry)){
    score += scoreForSpare(pins, firstTry)
    firstTry += 2
  }else{
    score += scoreForFrame(pins, firstTry)
    firstTry += 2
  }
 }

  return score;
}

export type Game = ReturnType<typeof createBowlingGame>;

function scoreForStrike(pins: number[], firstTry: number) {
  return 10 + pins[firstTry + 1] + pins[firstTry + 2];
}

function isStrike(pins: number[], firstTry: number) {
  return pins[firstTry] === 10;
}

function scoreForFrame(pins: number[], firstTry: number) {
  return pins[firstTry] + pins[firstTry + 1];
}

function scoreForSpare(pins: number[], firstTry: number) {
  return 10 + pins[firstTry + 2];
}

function isSpare(pins: number[], firstTry: number) {
  return pins[firstTry] + pins[firstTry + 1] === 10;
}
