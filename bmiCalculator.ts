const calculateBmi = (height: number, weight: number) => {
  const bmi = weight / Math.pow(height / 100, 2);
  if (bmi > 24.9) {
    return 'Overweight';
  } else if (bmi < 18.5) {
    return 'Underweight';
  } else {
    return 'Normal (healthy weight)';
  }
};

console.log(calculateBmi(180, 74));
