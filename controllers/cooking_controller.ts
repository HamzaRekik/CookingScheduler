// @ts-ignore
import { RouterContext } from "https://deno.land/x/oak@v12.0.0/mod.ts";
import data from "../services/data.ts";
import { calculateDuration } from "../static/static_methods.ts";

class CookingController {
  async cookingTime(context: RouterContext) {
    try {
      const ingredient: string = context.request.url.searchParams.get("ingredient");
      const day: number = context.request.url.searchParams.get("day");

      if (!ingredient) {
        context.response.status = 400;
        context.response.body = { error: "Missing 'ingredient' parameter" };
        return;
      }

      if (!isValidIngredient(ingredient)) {
        context.response.status = 400;
        context.response.body = { error: "Please provide a valid ingredient." };
        return;
      }

      if (!day) {
        context.response.status = 400;
        context.response.body = { error: "'day' parameter should not be empty." };
        return;
      }

      if ( day <= 0 || day > 30) {
        context.response.status = 400;
        context.response.body = { error: "Invalid 'day' parameter. It should be a number between 1 and 30." };
        return;
      }


      const asr = await data.getAdhanTime(day, "Asr");
      const maghrib = await data.getAdhanTime(day, "Maghrib");

      const duration = calculateDuration(asr, maghrib);
      const dishes = data.getSelectedDishesCookTime(duration, ingredient);

      context.response.body = dishes;
    } catch (error) {
      console.error("Error :", error);
      context.response.status = 500;
      context.response.body = { error: "Internal Server Error" };
    }
  }

  async dishSuggestion(context: RouterContext) {
    try {
      const day: number = context.request.url.searchParams.get("day");

      if (!day) {
        context.response.status = 400;
        context.response.body = { error: "'day' parameter should not be empty." };
        return;
      }

      if ( day <= 0 || day > 30) {
        context.response.status = 400;
        context.response.body = { error: "Invalid 'day' parameter. It should be a number between 1 and 30." };
        return;
      }

     

      const asr = await data.getAdhanTime(day, "Asr");
      const maghrib = await data.getAdhanTime(day, "Maghrib");

      const duration = calculateDuration(asr, maghrib);
      const dish = data.getDish(duration);

      context.response.body = dish;
    } catch (error) {
      console.error("Error in dishSuggestion:", error);
      context.response.status = 500;
      context.response.body = { error: "Internal Server Error" };
    }
  }
}

function isValidIngredient(ingredient: string): boolean {
  const allIngredients = data.getAllIngredients();
  return allIngredients.includes(ingredient);
}

const cookingController = new CookingController();
export default cookingController;
