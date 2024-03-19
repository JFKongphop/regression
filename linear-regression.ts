class LinearRegression {
  private x: number[];
  private y: number[];

  constructor(x: number[], y: number[]) {
    this.x = x;
    this.y = y
  }

  private mean(array: number[]) {
    const sum = array.reduce((total: number, num: number) => { 
      return total + num 
    }, 0);
    const mean = sum / array.length;

    return mean;
  }

  private getB1() {
    let b1Fraction: number = 0;
    let b1Denominator: number = 0;

    const arraySize: number = this.x.length;
    const xBar = this.mean(this.x);
    const yBar = this.mean(this.y);

    for(let i = 0; i < arraySize; i++) {
      b1Fraction += (this.x[i] - xBar) * (this.y[i] - yBar)
      b1Denominator += Math.pow(this.x[i] - xBar, 2)
    }

    const b1: number = b1Fraction / b1Denominator

    return b1
  }

  private getB0() {
    const xBar = this.mean(this.x);
    const yBar = this.mean(this.y);
    const b1 = this.getB1();

    const b0 = yBar - (b1 * xBar);

    return b0;
  }

  private getYHat(x: number) {
    
  }

  getXArray() {
    return this.x;
  }

  getYArray() {
    return this.y;
  }

  getLinearAlgebralinear() {
    const b0 = this.getB0();
    const b1 = this.getB1();

    const yHat: string = `y = ${b0} + ${b1}(x)`;

    return yHat;
  }
}


const x: number[] = [9, 7, 7, 0]
const y: number[] = [33.7, 28.7, 29.4, 18]
const linearRegression = new LinearRegression(x, y)


console.log(linearRegression.getLinearAlgebralinear())