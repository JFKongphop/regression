export class MatrixOperation {
  private minorRow(
    matrix: number[][], 
    row: number, 
    col: number
  ): number[][] {
    const minorRow: number[][] = matrix
      .filter((_, rowIndex: number) => rowIndex !== row)
      .map((row: number[]) => row
        .filter((_, colIndex: number) => colIndex !== col)
      );
    
    return minorRow;
  }

  protected transpose(x: number[][]): number[][] {
    const transposedMatrix = x[0].map((_, colIndex: number) =>
      x.map((row: number[]) => row[colIndex])
    );

    return transposedMatrix;
  }

  protected multiplication(x: number[][], y: number[][]): number[][] {
    const xRow: number = x.length;
    const xColumn: number = x[0].length;
    const yRow: number = y.length;
    const yColumn: number = y[0].length;

    if (xColumn !== yRow) {
      throw new Error("Matrices cannot be multiplied: incompatible dimensions");    
    }

    const mutipliedMatrix: number[][] = [];
    for (let i = 0; i < xRow; i++) {
      const mutipliedRow: number[] = [];
      for (let j = 0; j < yColumn; j++) {
        let multipliedRowValue: number = 0;
        for (let k = 0; k < xColumn; k++) {
          multipliedRowValue += x[i][k] * y[k][j];
        }
        mutipliedRow.push(multipliedRowValue);
      }
      mutipliedMatrix.push(mutipliedRow);
    }

    return mutipliedMatrix;
  }

  protected inverse(x: number[][]): number[][] {
    const adjoint: number[][] = this.adjoint(x);
    const determinant: number = this.determinant(x)
    const inversedMatrix: number[][] = [];
    const matrixSize = x.length;
    for (let i = 0; i < matrixSize; i++) {
      const inversedRow: number[] = adjoint[i].map((number) => number / determinant);
      inversedMatrix.push(inversedRow)
    }

    return inversedMatrix;
  }

  protected determinant(x: number[][]): number {
    let determinant: number = 0;
    const xRow: number = x.length;
    const xColumn: number = x[0].length;

    if (xRow !== xColumn) {
      throw new Error("Matrices cannot be find minor: incompatible dimensions");    
    }

    for (let i = 0; i < xRow; i++) {
      const minorRow: number[][] = this.minorRow(x, 0, i);
      const minorPos: number = 
        (minorRow[0][0] * minorRow[1][1]) 
        - (minorRow[1][0] * minorRow[0][1]);

      if (i % 2 !== 0) {
        determinant += x[0][i] * (-minorPos)
      }
      else {
        determinant += x[0][i] * minorPos
      }
    }

    return determinant;
  }

  protected adjoint(x: number[][]): number[][] {
    const minor: number[][] = this.minor(x);
    const cofactor: number[][] = this.cofactor(minor);
    const adjoint: number[][] = this.transpose(cofactor);

    return adjoint;
  }

  protected minor(x: number[][]): number[][] {
    const minor: number[][] = [];
    const xRow: number = x.length;
    const xColumn: number = x[0].length;

    if (xRow !== xColumn) {
      throw new Error("Matrices cannot be find minor: incompatible dimensions");    
    }

    for (let i = 0; i < xRow; i++) {
      const newRow: number[] = []
      for (let j = 0; j < xRow; j++) {
        const minorRow: number[][] = this.minorRow(x, i, j);
        const minorSize: number = minorRow.length;

        if (minorSize === 2) {
          const minorPos: number = 
            (minorRow[0][0] * minorRow[1][1]) 
            - (minorRow[1][0] * minorRow[0][1]);
          newRow.push(minorPos);
        }
      }
      minor.push(newRow);
    }

    return minor;
  }

  protected cofactor(x: number[][]): number[][] {
    const cofactor: number[][] = [];
    const matrixSize: number = x.length;

    for (let i = 0; i < matrixSize; i++) {
      const cofactorRow: number[] = [];
      for (let j = 0; j < matrixSize; j++) {
        if (i % 2 == 0) {
          if (j % 2 == 0) {
            cofactorRow.push(x[i][j]);
          }
          else {
            cofactorRow.push(-x[i][j]);
          }
        }
        else {
          if (j % 2 == 0) {
            cofactorRow.push(-x[i][j]);
          }
          else {
            cofactorRow.push(x[i][j]);
          }
        }
      }
      cofactor.push(cofactorRow);
    }

    return cofactor;
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

// const matrixOperation = new MatrixOperation();
// const transposedMatrix = matrixOperation.transpose(x)
// const multiX = matrixOperation.multiplication(transposedMatrix, x)
// // console.log(multipliedMatrix)
// // const det = matrixOperation.determinant(multipliedMatrix)
// const inv = matrixOperation.inverse(multiX)
// const multiY = matrixOperation.multiplication(transposedMatrix, y)
// console.log(inv)

// const beta = matrixOperation.multiplication(inv, multiY)
// console.log(beta)

// console.log(multipliedMatrix)

// console.log(det)

// const minor = matrixOperation.minor(multipliedMatrix)
// //console.log(minor)

// const cofactor = matrixOperation.cofactor(minor)
// console.log(cofactor)

// const transCofactor = matrixOperation.transpose(cofactor)
// console.log(transCofactor)

// const adj = matrixOperation.adjoint(multipliedMatrix)
// console.log(adj)

const u = [
  [2, 3, 4],
  [4, 3, 1],
  [1, 2, 4]
]
const test =  [
  [5, 31, 19],
  [31, 221,116],
  [ 19, 116, 93]
]


