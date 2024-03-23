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
    const xMultiXtrans = this.multiplication(xTranspose, this.x);
    const xMultiXtransInv = this.inverse(xMultiXtrans);
    const xTransMultiY = this.multiplication(xTranspose, this.y);
    const betaMatrix = this.multiplication(xMultiXtransInv, xTransMultiY)
    const beta = betaMatrix.reduce((row, num) => row.concat(num), []);

    return beta;
  }

  getYHat(x1: number, x2: number): number {
    const beta = this.getBeta();
    const yHat = beta[0] + (beta[1] * x1) + (beta[2] * x2);
    
    return yHat;
  }

//   ssr = 0
// sse = 0
// for i in range(5):
//   y_hat = beta[0] + (beta[1] * x1[i]) + (beta[2] * x2[i])
//   ssr += math.pow(y_hat - mean_y, 2)
//   sse += math.pow(y[i] - y_hat, 2)
  getSSE(): number {
    let sse: number = 0;
    const x1X2: number[][] = x.map((row) => row.slice(1));
    
    for (let i = 0; i < this.arraySize; i++) {
      const yHat = this.getYHat(x1X2[i][0], x1X2[i][1]);
      sse += Math.pow(this.y[i][0] - yHat, 2);
    }

    return sse;
  }

  getSSR(): number {

  }

  // sst = ssr + sse
  // getSST(): number {
  //   const sst = this.getSSR() + this.getSSE();
  //   return sst;
  // }

  // getRSquare(): number {
  //   const rSquare = this.getSSR() / this.getSST();
  //   return rSquare;
  // }
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
console.log(multipleLinearRegression.getBeta())



const beta = x.reduce((row, num) => row.concat(num), []);
console.log(beta)

const t = x.map((row) => row.slice(1))
console.log(t)

this.y.reduce((sum, num) => sum += (num[0]), 0)