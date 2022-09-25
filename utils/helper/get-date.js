function getTodaysDate() {
    const DAYS = {
        0: "Sunday",
        1: "Monday",
        2: "Tuesday", 
        3: "Wednesday", 
        4: "Thursday", 
        5: "Friday", 
        6: "Saturday",
    };

    const MONTHS = {
        0: "January", 
        1: "February",
        2: "March", 
        3: "April", 
        4: "May",
        5: "June", 
        6: "July", 
        7: "August", 
        8: "September", 
        9: "October",
        10: "November", 
        11: "December",
    };

    const date = new Date();
    const weekday = DAYS[date.getDay()];
    const day = date.getDate();
    const month = MONTHS[date.getMonth()];
    const year = date.getFullYear();

    return `${weekday.substring(0, 3)} | ${month.substring(0, 3)} ${day}, ${year}`;
}

module.exports = {
    getTodaysDate,
};

