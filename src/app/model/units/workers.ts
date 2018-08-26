import { BugTypes } from "../bugsTypes";
import { CONSTS } from "../CONSTATS";
import { FullUnit } from "../full-unit";
import { Game } from "../game";
import { MasteryTypes } from "../masteries/mastery";
import { Price } from "../price";
import { ProductionBonus } from "../production-bonus";
import { Research } from "../research";
import { UnitGroup } from "../unit-group";
import { World } from "../world";

export class Workers extends UnitGroup {
  farmer: FullUnit;
  carpenter: FullUnit;
  miner: FullUnit;
  scientist: FullUnit;

  scientificMethod1: Research;

  beeFarmer: FullUnit;
  beeCarpenter: FullUnit;
  beeMiner: FullUnit;
  beeScientist: FullUnit;

  constructor(game: Game) {
    super("Workers", game);
  }

  declareStuff(): void {
    this.farmer = new FullUnit("a");
    this.carpenter = new FullUnit("b");
    this.miner = new FullUnit("m");
    this.scientist = new FullUnit("d");

    this.beeFarmer = new FullUnit("A");
    this.beeFarmer.bugType = BugTypes.BEE;
    this.beeCarpenter = new FullUnit("B");
    this.beeCarpenter.bugType = BugTypes.BEE;
    this.beeMiner = new FullUnit("E");
    this.beeMiner.bugType = BugTypes.BEE;
    this.beeScientist = new FullUnit("D");
    this.beeScientist.bugType = BugTypes.BEE;

    this.scientificMethod1 = new Research("scie1", this.game.researches, true);

    this.addUnits([
      this.farmer,
      this.carpenter,
      this.miner,
      this.scientist,
      this.beeFarmer,
      this.beeCarpenter,
      this.beeMiner,
      this.beeScientist
    ]);

    this.firstResearch = new Research("w", this.game.researches);
    this.list.forEach(u => {
      const res = new Research(u.id, this.game.researches);
      res.toUnlock = [u];
      res.bugType = u.bugType;
      this.researchList.push(res);
    });
  }
  setRelations(): void {
    this.farmer.generateBuyAction([
      new Price(this.game.ants.larva, CONSTS.PRICE_LARVAE_0, 1),
      new Price(this.game.materials.food, CONSTS.PRICE_1),
      new Price(this.game.materials.crystal, CONSTS.PRICE_1)
    ]);
    this.carpenter.generateBuyAction([
      new Price(this.game.ants.larva, CONSTS.PRICE_LARVAE_0, 1),
      new Price(this.game.materials.food, CONSTS.PRICE_1.times(2))
    ]);
    this.miner.generateBuyAction([
      new Price(this.game.ants.larva, CONSTS.PRICE_LARVAE_0, 1),
      new Price(this.game.materials.food, CONSTS.PRICE_1),
      new Price(this.game.materials.soil, CONSTS.PRICE_1)
    ]);
    this.scientist.generateBuyAction([
      new Price(this.game.ants.larva, CONSTS.PRICE_LARVAE_0, 1),
      new Price(this.game.materials.food, CONSTS.PRICE_1),
      new Price(this.game.materials.crystal, CONSTS.PRICE_1)
    ]);
    this.game.materials.food.addProducer(this.farmer, CONSTS.PROD_1);
    this.game.materials.crystal.addProducer(this.farmer, CONSTS.CONSUME_1);

    this.game.materials.soil.addProducer(this.carpenter, CONSTS.PROD_1);
    this.game.materials.food.addProducer(this.carpenter, CONSTS.CONSUME_1);

    this.game.materials.crystal.addProducer(this.miner, CONSTS.PROD_1);
    this.game.materials.soil.addProducer(this.miner, CONSTS.CONSUME_1);

    this.game.materials.science.addProducer(this.scientist, CONSTS.PROD_1);
    this.game.materials.crystal.addProducer(this.scientist, CONSTS.CONSUME_1);

    //#region Bees
    this.beeFarmer.generateBuyAction([
      new Price(this.game.bees.larva, CONSTS.PRICE_LARVAE_0, 1),
      new Price(this.game.materials.food, CONSTS.PRICE_1),
      new Price(this.game.materials.crystal, CONSTS.PRICE_1)
    ]);
    this.beeCarpenter.generateBuyAction([
      new Price(this.game.bees.larva, CONSTS.PRICE_LARVAE_0, 1),
      new Price(this.game.materials.food, CONSTS.PRICE_1.times(2))
    ]);
    this.beeMiner.generateBuyAction([
      new Price(this.game.bees.larva, CONSTS.PRICE_LARVAE_0, 1),
      new Price(this.game.materials.food, CONSTS.PRICE_1),
      new Price(this.game.materials.soil, CONSTS.PRICE_1)
    ]);
    this.beeScientist.generateBuyAction([
      new Price(this.game.bees.larva, CONSTS.PRICE_LARVAE_0, 1),
      new Price(this.game.materials.food, CONSTS.PRICE_1),
      new Price(this.game.materials.crystal, CONSTS.PRICE_1)
    ]);
    this.game.materials.food.addProducer(this.beeFarmer, CONSTS.PROD_1);
    this.game.materials.soil.addProducer(this.beeFarmer, CONSTS.CONSUME_1);

    this.game.materials.soil.addProducer(this.beeCarpenter, CONSTS.PROD_1);
    this.game.materials.food.addProducer(this.beeCarpenter, CONSTS.CONSUME_1);

    this.game.materials.crystal.addProducer(this.beeMiner, CONSTS.PROD_1);
    this.game.materials.food.addProducer(this.beeMiner, CONSTS.CONSUME_1);

    this.game.materials.science.addProducer(this.beeScientist, CONSTS.PROD_1);
    this.game.materials.crystal.addProducer(
      this.beeScientist,
      CONSTS.CONSUME_1
    );
    //#endregion

    this.list.forEach(u => {
      if (u instanceof FullUnit) {
        this.game.addTeamAction(u, CONSTS.TEAM_PRICE_1);
        this.game.addTwinAction(u, CONSTS.TWIN_PRICE_2);
      }
    });

    this.firstResearch.prices = this.game.genSciencePrice(new Decimal(1e3));
    this.researchList.forEach(
      r => (r.prices = this.game.genSciencePrice(CONSTS.RES_PRICE_1))
    );
    this.firstResearch.toUnlock = this.researchList;

    this.scientificMethod1.prices = this.game.genSciencePrice(1e4, 100);
    this.researchList[3].toUnlock.push(this.scientificMethod1);

    const scieMetBon = new ProductionBonus(
      this.scientificMethod1,
      new Decimal(0.5)
    );
    scieMetBon.getMultiplier = () => {
      return new Decimal(
        1 + this.game.allMateries.getSum(MasteryTypes.SCIENTIFIC_METHOD)
      );
    };
    this.game.materials.science.productionsBonus.push(scieMetBon);

    this.setBugType();
  }
}
