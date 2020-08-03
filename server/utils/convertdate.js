let convertDate = (date) => {
    let dateObj = new Date(date);
    return dateObj.toLocaleString("it-IT");
}

module.exports = convertDate;