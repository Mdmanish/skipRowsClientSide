export const operationOnTimes = (time1, time2, operation) => {
    const [hours1, minutes1] = time1.split(':').map(Number);
    const [hours2, minutes2] = time2.split(':').map(Number);
    let totalMinutes = 0;

    if (operation === '+' ) {
        totalMinutes = (hours1 * 60 + minutes1) + (hours2 * 60 + minutes2);
    } else if (operation === '-') {
        totalMinutes = (hours1 * 60 + minutes1) - (hours2 * 60 + minutes2);
    }
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}:${minutes}`;
};
