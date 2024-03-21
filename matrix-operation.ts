class MatrixOperation {
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

  transpose(x: number[][]): number[][] {
    const transposedMatrix = x[0].map((_, colIndex: number) =>
      x.map((row: number[]) => row[colIndex])
    );

    return transposedMatrix;
  }

  multiplication(x: number[][], y: number[][]): number[][] {
    const xRow: number = x.length;
    const xColumn: number = x[0].length;
    const yRow: number = y.length;
    const yColumn: number = y[0].length;

    if (xRow !== yColumn || xColumn !== yRow) {
      throw new Error("Matrices cannot be multiplied: incompatible dimensions");    
    }

    const mutipliedMatrix: number[][] = [];
    for (let i = 0; i < x.length; i++) {
      const mutipliedRow: number[] = [];
      for (let j = 0; j < y[0].length; j++) {
        let multipliedRowValue: number = 0;
        for (let k = 0; k < x[0].length; k++) {
          multipliedRowValue += x[i][k] * y[k][j];
        }
        mutipliedRow.push(multipliedRowValue);
      }
      mutipliedMatrix.push(mutipliedRow);
    }

    return mutipliedMatrix;
  }

  inverse(x: number[][], determinant: number): number[][] {
    const inversedMatrix: number[][] = [];
    const matrixSize = x.length;
    for (let i = 0; i < matrixSize; i++) {
      const inversedRow: number[] = x[i].map((number) => number / determinant);
      inversedMatrix.push(inversedRow)
    }

    return inversedMatrix;
  }

  determinant(x: number[][]): number {
    let determinant: number = 0;
    const xRow: number = x.length;
    const xColumn: number = x[0].length;

    if (xRow !== xColumn) {
      throw new Error("Matrices cannot be find minor: incompatible dimensions");    
    }

    for (let i = 0; i < xRow; i++) {
      const minorRow: number[][] = this.minorRow(x, 0, i);
      console.log(minorRow)
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

  adjoint(x: number[][]): number[][] {
    const minor: number[][] = this.minor(x);
    const cofactor: number[][] = this.cofactor(minor);
    const adjoint: number[][] = this.transpose(cofactor);

    return adjoint;
  }

  minor(x: number[][]): number[][] {
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

  cofactor(x: number[][]): number[][] {
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

const b: number[][] = [
  [1, 8, 5], 
  [1, 8, 6], 
  [1, 2, 4], 
  [1, 5, 4], 
  [1, 8, 0]
]

const matrixOperation = new MatrixOperation();
const transposedMatrix = matrixOperation.transpose(b)
const multipliedMatrix = matrixOperation.multiplication(transposedMatrix, b)
// console.log(multipliedMatrix)

const minor = matrixOperation.minor(multipliedMatrix)
//console.log(minor)

const cofactor = matrixOperation.cofactor(minor)
console.log(cofactor)

const transCofactor = matrixOperation.transpose(cofactor)
console.log(transCofactor)

const adj = matrixOperation.adjoint(multipliedMatrix)
console.log(adj)

const u = [
  [2, 3, 4],
  [4, 3, 1],
  [1, 2, 4]
]

const dt = matrixOperation.determinant(u)
const ad = matrixOperation.adjoint(u);
console.log(ad)
const inv = matrixOperation.inverse(ad, dt);
console.log(inv)

console.log()


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

// function getMinorMatrix(matrix: number[][], rowToRemove: number, colToRemove: number): number[][] {
//   return matrix.filter((_, rowIndex) => rowIndex !== rowToRemove)
//                .map(row => row.filter((_, colIndex) => colIndex !== colToRemove));
// }

// // Example matrix
// const matrix = [
//   [1, 2, 3],
//   [4, 5, 6],
//   [7, 8, 9]
// ];

// // Get the minor matrix excluding the first row and second column
// const minorMatrix = getMinorMatrix(matrix, 0, 0);

// // Output the result
// console.log(minorMatrix);

// function determinant(matrix: number[][]) {
//   if (matrix.length === 2 && matrix[0].length === 2) {
//       return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];
//   } else {
//     let det = 0;
//     for (let i = 0; i < matrix.length; i++) {        
//       det += 
//         matrix[0][i] 
//         * determinant(getMinorMatrix(matrix, 0, i)) 
//         * (i % 2 === 0 ? 1 : -1);
//     }
//       return det;
//   }
// }

// console.log(determinant(matrix))
