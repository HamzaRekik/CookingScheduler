// @ts-ignore
import { Router } from "https://deno.land/x/oak@v12.0.0/mod.ts";
import cookingController from "./controllers/cooking_controller.ts";


const router = new Router();

router
  .get("/cooktime", cookingController.cookingTime)
  .get("/suggest", cookingController.dishSuggestion);

export default router;
