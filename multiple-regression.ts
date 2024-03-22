import { MatrixOperation } from "./matrix-operation";


class MultipleLinearRegression extends MatrixOperation {
  private x: number[][];
  private y: number[][];
  private arraySize: number;

  constructor(x: number[][], y: number[][]) {
    super();
    this.x = x
    this.y = y
    this.arraySize = y.length
  }


  getBeta(): number[] {
    const xTranspose = this.transpose(this.x);
    const xMultiXtrans = this.multiplication(xTranspose, x);
    const xMultiXtransInv = this.inverse(xMultiXtrans);
    const xTransMultiY = this.multiplication(xTranspose, y);
    const betaMatrix = this.multiplication(xMultiXtransInv, xTransMultiY)
    const beta = betaMatrix.reduce((acc, val) => acc.concat(val), []);

    return beta
  }
}


const x: number[][] = [
  [1, 8, 5], 
  [1, 8, 6], 
  [1, 2, 4], 
  [1, 5, 4], 
  [1, 8, 0]
]
const y: number[][] = [
  [-26.1], 
  [-31], 
  [-33.1], 
  [-25.8], 
  [-2.2]
]
// const y: number[] = [-26.1, -31, -33.1, -25.8, -2.2]
const multipleLinearRegression = new MultipleLinearRegression(x, y)
console.log(multipleLinearRegression.getBeta(x, y))


