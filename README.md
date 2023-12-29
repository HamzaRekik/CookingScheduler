
# Cooking Scheduler Deno App

This Deno application provides a ramadan cooking scheduler based on the time between Maghrib and Asr prayers. It suggests dishes to cook or provides the cooking time for a specific ingredient.




## Table of Contents
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Data](#data)
- [Controllers](#controllers)
- [Static Methods](#static-methods)
- [Models](#models)

## Installation
1. Clone the repository:

   ```bash
   git clone https://github.com/HamzaRekik/CookingScheduler.git` 

2.  Navigate to the project directory:
    
    `cd CookingScheduler` 
    
3.  Run the application:
    
    
    `denon run --allow-net server.ts` 
    

## Usage

The application uses the Oak framework for routing. It listens on port 3000 by default. Make sure to allow network access when running the application.


``// Example of importing and running the app
// @ts-ignore
import { Application } from 'https://deno.land/x/oak@v12.0.0/mod.ts';
import router from './router.ts'

const app = new Application();

app.use(router.routes())
app.use(router.allowedMethods())

app.addEventListener('listen',({port})=>{
  console.log(`listening on ${port}`)
})

await app.listen({ port: 3000 });`` 

## API Endpoints

-   **GET /cooktime**
    
    Params:
    
    -   `ingredient`: The ingredient for which you want cooking time.
    -   `day`: The day of the month for the cooking schedule (1-30).
    
    Returns the suggested cooking time for the specified ingredient.
    
-   **GET /suggest**
    
    Params:
    
    -   `day`: The day of the month for the cooking schedule (1-30).
    
    Returns a suggested dish to cook based on the day's schedule.



## Data

The Data class fetches data related to prayer times and provides methods for retrieving dishes and ingredients.

**Adhan API** Base URL: `https://api.aladhan.com/v1/hijriCalendarByAddress/1446/9?address=Mecca&method=1`

**Methods**

-   `getAdhanTime(day: number, salat: string)`: Fetches the prayer time for a specific day and prayer.
-   `getDish(durationBetweenMaghribAndAsr: number)`: Returns a random dish based on the provided time duration.
-   `getDishesByIngredient(ingrd: string)`: Returns a list of dishes containing the specified ingredient.
-   `getSelectedDishesCookTime(durationBetweenMaghribAndAsr: number, ingredient: string)`: Returns dishes and their cooking times based on the specified ingredient and time duration.
-   `getAllIngredients()`: Returns a list of all unique ingredients used in the dishes.


## Controllers

The CookingController class handles the logic for the API endpoints.

**Methods**

-   `cookingTime(context: RouterContext)`: Handles the `/cooktime` endpoint, providing cooking times for a specified ingredient and day.
-   `dishSuggestion(context: RouterContext)`: Handles the `/suggest` endpoint, suggesting a dish to cook based on the day's schedule.


## Static Methods

The static_methods.ts file contains utility functions used in the application.

**Methods**

-   `calculateDuration(startTime: string, endTime: string)`: Calculates the duration between two time points.
-   `getStartingTime(durationBetweenMaghribAndAsr: number, cookingduration: number)`: Calculates the starting time for cooking based on the duration between Maghrib and Asr.


## Models

The dish.ts file contains the Dish classe used to represent dish data.

**Classes**

-   `Dish`: Represents a dish with name, ingredients, and cooking time.