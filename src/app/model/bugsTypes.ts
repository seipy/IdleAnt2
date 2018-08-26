export enum BugTypes {
  ANT = 0,
  BEE
}
export class Bug {
  constructor(
    public priceMulti: number,
    public prodMulti: number,
    public efficiencyMulti: number,
    public teamPriceMulti: number,
    public twinPriceMulti: number,
    public color: string
  ) {}
}
export const BUGS = {
  0: new Bug(1, 1, 1, 1, 1, "#36a2eb"),
  1: new Bug(1.5, 1.1, 1.2, 0.1, 1, "#FFCE56")
};
