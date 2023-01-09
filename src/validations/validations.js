

const isValidName = function (name) {
    const nameRegex = /^[a-zA-Z_ ]+$/;
    return nameRegex.test(name);
};

const isValidEmail = function (name) {
    const emailRegex =/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return emailRegex.test(name);
};

const isValidMobile = function (name) {
    const mobileRegex =/^(\+\d{1,3}[- ]?)?\d{10}$/;
    return mobileRegex.test(name);
};

const isValidLink = function (name) {
    const linkRegex =/(.png|.jpg|.jpeg)$/i;
    return linkRegex.test(name);
};

const isValidFormat = function (name) {
    const linkRegex =/^http/i;
    return linkRegex.test(name);
};

module.exports = {isValidName,isValidEmail,isValidLink,isValidMobile,isValidFormat}