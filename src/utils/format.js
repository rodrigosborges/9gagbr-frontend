exports.formatDate = (date) => {
    var datetime = new Date(date);
    var now = new Date();
    var sec_num = (now - datetime) / 1000;
    var years    = Math.floor(sec_num / (3600 * 24* 30* 12));
    var months    = Math.floor(sec_num / (3600 * 24* 30));
    var days    = Math.floor(sec_num / (3600 * 24));
    var hours   = Math.floor((sec_num - (days * (3600 * 24)))/3600);
    var minutes = Math.floor((sec_num - (days * (3600 * 24)) - (hours * 3600)) / 60);
    var seconds = Math.floor(sec_num - (days * (3600 * 24)) - (hours * 3600) - (minutes * 60));

    if(years > 0)
        return years+" ano"+(years > 1 ? "s" : "")
    else if(months > 0)
        return months+" mes"+(months > 1 ? "es" : "")
    else if(days > 0)
        return days+" dia"+(days > 1 ? "s" : "")
    else if(hours > 0)
        return hours+" hora"+(hours > 1 ? "s" : "")
    else if(minutes > 0)
        return minutes+" minuto"+(minutes > 1 ? "s" : "")
    else
        return seconds+" segundo"+(seconds > 1 ? "s" : "")
}