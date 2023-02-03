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
  training: Array<number>,
  target: number
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

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
