import { Dish, NewDish } from "../models/dish.ts";
import { dishes } from "../static/dishes.ts";
import { getStartingTime } from "../static/static_methods.ts";

class Data {
  adhanUrl =
    "https://api.aladhan.com/v1/hijriCalendarByAddress/1446/9?address=Mecca&method=1";

  async getAdhanTime(day: number, salat: string) {
    try {
if (!day || !salat) {
        const response = await fetch(this.adhanUrl);
        const data = await response.json();
        const adhanTime = data["data"][day]["timings"][salat].replace(
          /\s*\(\+\d+\)/,
          "",
        );
        return adhanTime;
}
    } catch (error) {
      console.error(error)
    }
  }

  getDish(durationBetweenMaghribAndAsr: number) {

try {
  const numberOfDishes = dishes.length;
  const randomNumber = Math.floor(Math.random() * numberOfDishes);
  const randomDish = dishes[randomNumber];

if (!durationBetweenMaghribAndAsr) {
    const startingTime = getStartingTime(
      durationBetweenMaghribAndAsr,
      randomDish["duration"],
    );
    const newDish: Dish = {
      name: randomDish["name"],
      ingredients: randomDish["ingredients"],
      cooktime: startingTime,
    };

    return newDish;
}
  
} catch (error) {
  console.error(error)
  
}
  }

  getDishesByIngredient(ingrd: string) {
    const dishesList: Dish[] = [];
      for (const dish of dishes) {
        for (const ingredient of dish["ingredients"]) {
          if (ingredient == ingrd) {
            const d = Dish.fromJson(dish);
            dishesList.push(d);
          }
        }
      }
      return dishesList;
    
  }

  getSelectedDishesCookTime(
    durationBetweenMaghribAndAsr: number,
    ingredient: string,
  ) {
    const durations: Dish[] = [];
    const dishes = this.getDishesByIngredient(ingredient);
    for (const dish of dishes) {
      const startingTime = getStartingTime(
        durationBetweenMaghribAndAsr,
        dish["duration"]!,
      );
      const newDish: Dish = {
        name: dish["name"],
        ingredients: dish["ingredients"],
        cooktime: startingTime,
      };
      durations.push(newDish);
    }
    return durations;
  }

  getAllIngredients() {
    const allIngredients = new Set();
    for (const dish of dishes) {
      const ingredients = dish["ingredients"];
      ingredients.forEach((ingredient) => allIngredients.add(ingredient));
    }
    return Array.from(allIngredients);
  }
}
const data = new Data();
export default data;
