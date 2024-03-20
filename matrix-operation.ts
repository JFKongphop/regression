class MatrixOperation {
  private x: number[][]

  constructor(x: number[][]) {
    this.x = x
  }

  transpose(): number[][] {
    const transposedMatrix = this.x[0].map((_, colIndex: number) =>
      this.x.map((row: number[]) => row[colIndex])
    );

    return transposedMatrix
  }

  multiplication(x: number[][], y: number[][]): number[][] {
    const xRow: number = x.length;
    const xColumn: number = x[0].length;
    const yRow: number = y.length;
    const yColumn: number = y[0].length;

    if (xRow !== yColumn || xColumn !== yRow) {
      throw new Error('matrix is conflic dimesion, cannot mutiply.');
    }

    let mutipliedMatrix: number[][] = []
    for (let i = 0; i < x.length; i++) {
      let mutipliedRow: number[] = [];
      for (let j = 0; j < y[0].length; j++) {
        let multipliedRowValue: number = 0;
        for (let k = 0; k < x[0].length; k++) {
          multipliedRowValue += x[i][k] * y[k][j];
        }
        mutipliedRow.push(multipliedRowValue);
      }
      mutipliedMatrix.push(mutipliedRow);
    }

    return mutipliedMatrix
  }
}

const b: number[][] = [
  [1, 8, 5], 
  [1, 8, 6], 
  [1, 2, 4], 
  [1, 5, 4], 
  [1, 8, 0]
]

const matrixOperation = new MatrixOperation(b);
const transposedMatrix = matrixOperation.transpose()
const multipliedMatrix = matrixOperation.multiplication(transposedMatrix, b)
console.log(multipliedMatrix)

// let c: number[][] = []

// const bs = b.length // row
// const ins = b[0].length // column
// for (let i = 0; i < ins; i++) {
//   let a: number[] = []
//   for (let j = 0; j < bs; j++) {
//     a.push(b[j][i])
//   }

//   c.push(a)
// }

// console.log(c)
