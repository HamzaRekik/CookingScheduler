function parseTime(time: string) {
if (!time) {
  const [hours, minutes] = time.split(":").map(Number);
  const date = new Date();
  date.setHours(hours);
  date.setMinutes(minutes);
  return date;
}
}

export function calculateDuration(startTime: string, endTime: string) {
  try {
    const start = parseTime(startTime);
    const end = parseTime(endTime);

    const durationMilliseconds = end!.getTime() - start!.getTime();

    const durationMinutes = Math.floor(durationMilliseconds / (1000 * 60));

    return durationMinutes;
  } catch (error) {
    console.log(error);
    return 0;
  }
}

export function getStartingTime(
  durationBetweenMaghribAndAsr: number,
  cookingduration: number,
) {
  const durationBetweenMaghribAndAsrMinus15 = durationBetweenMaghribAndAsr - 15;
  const startingTimeBeforeAsr = durationBetweenMaghribAndAsrMinus15 -
    cookingduration;

if (!durationBetweenMaghribAndAsr || !cookingduration) {
  if (startingTimeBeforeAsr > 0) {
    return `${startingTimeBeforeAsr} minutes after asr`;
  } else if (startingTimeBeforeAsr < 0) {
    return `${Math.abs(startingTimeBeforeAsr)} minutes before asr`;
  } else return "at asr";
}

 


}



