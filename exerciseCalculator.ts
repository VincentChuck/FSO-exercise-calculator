interface ExerciseInput {
  target: number;
  training: Array<number>;
}

const processArguments = (args: Array<string>): ExerciseInput => {
  if (args.length < 4) throw new Error('Not enough arguments');

  let target;
  let training = [];

  for (let i = 2; i < args.length; i++) {
    if (!isNaN(Number(args[i]))) {
      if (i === 2) {
        target = Number(args[i]);
      } else {
        training.push(Number(args[i]));
      }
    } else {
      throw new Error('Provided values were not numbers!');
    }
  }
  return { target, training };
};

interface Output {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (
  target: number,
  training: Array<number>
): Output => {
  const periodLength = training.length;
  const trainingDays = training.filter((day) => day !== 0).length;
  const average = training.reduce((a, b) => a + b, 0) / periodLength;
  const success = average > target;
  let rating;
  let ratingDescription;
  const metric = average / target;
  if (metric > 1.1) {
    rating = 3;
    ratingDescription = 'excellent!';
  } else if (metric >= 1) {
    rating = 2;
    ratingDescription = "good job! you've hit your target";
  } else {
    rating = 1;
    ratingDescription = 'you need to try harder to hit your target';
  }
  const output = {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };

  return output;
};

try {
  const { target, training } = processArguments(process.argv);
  console.log(calculateExercises(target, training));
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}
