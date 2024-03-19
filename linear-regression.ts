class LinearRegression {
  private x: number[];
  private y: number[];
  private arraySize: number

  constructor(x: number[], y: number[]) {
    this.x = x;
    this.y = y
    this.arraySize = x.length
  }

  private mean(array: number[]): number {
    const sum = array.reduce((total: number, num: number) => { 
      return total + num 
    }, 0);
    const mean = sum / array.length;

    return mean;
  }

  private getB1(): number {
    let b1Fraction: number = 0;
    let b1Denominator: number = 0;

    const xBar = this.mean(this.x);
    const yBar = this.mean(this.y);

    for (let i = 0; i < this.arraySize; i++) {
      b1Fraction += (this.x[i] - xBar) * (this.y[i] - yBar)
      b1Denominator += Math.pow(this.x[i] - xBar, 2)
    }

    const b1: number = b1Fraction / b1Denominator

    return b1
  }

  private getB0(): number {
    const xBar = this.mean(this.x);
    const yBar = this.mean(this.y);
    const b1 = this.getB1();

    const b0: number = yBar - (b1 * xBar);

    return b0;
  }

  private getYHat(x: number): number {
    const b0 = this.getB0();
    const b1 = this.getB1();

    const yHatValue: number = b0 + (b1 * x);

    return yHatValue;
  }

  getXArray(): number[] {
    return this.x;
  }

  getYArray(): number[] {
    return this.y;
  }

  getLinearAlgebralinear(): string {
    const b0 = this.getB0();
    const b1 = this.getB1();

    const yHat: string = `y = ${b0} + ${b1}(x)`;

    return yHat;
  }

  getSSE(): number {
    let sse: number = 0;

    for (let i = 0; i < this.arraySize; i++) {
      const yHat = this.getYHat(this.x[i]);
      sse += Math.pow(this.y[i] - yHat, 2);
    }

    return sse;
  }

  getMSE(): number {
    const sse = this.getSSE();
    const mse: number = sse / (this.arraySize- 2);

    return mse;
  }
}


const x: number[] = [9, 7, 7, 0]
const y: number[] = [33.7, 28.7, 29.4, 18]
const linearRegression = new LinearRegression(x, y)