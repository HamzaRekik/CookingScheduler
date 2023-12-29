export class Dish {
  name: string;
  ingredients: string[];
  duration?: number;
  cooktime?: string;

  constructor({
    name,
    ingredients,
    duration,
    cooktime
  }: {
    name: string;
    ingredients: string[];
    duration: number;
    cooktime: string;
    
  }) {
    this.name = name;
    this.ingredients = ingredients;
    this.duration = duration;
    this.cooktime = cooktime;
  }

  static fromJson(json: any): Dish {
    return new Dish({
      name: json.name,
      ingredients: json.ingredients,
      duration: json.duration,
      cooktime: json.cooktime,

    });
  }

}


