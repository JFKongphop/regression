class MultipleLinearRegression {
  private x: number[][];
  private y: number[];
  private arraySize: number;

  constructor(x: number[][], y: number[]) {
    this.x = x
    this.y = y
    this.arraySize = y.length
  }
}


// const x: number[][] = [
//   [1, 8, 5], 
//   [1, 8, 6], 
//   [1, 2, 4], 
//   [1, 5, 4], 
//   [1, 8, 0]
// ]
// const y: number[] = [-26.1, -31, -33.1, -25.8, -2.2]
// const multipleLinearRegression = new MultipleLinearRegression(x, y)


