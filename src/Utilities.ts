export function loadFile(filePath: string) {
    var result = null;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", filePath, false);
    xmlhttp.send();
    if (xmlhttp.status == 200) {
        result = xmlhttp.responseText;
    }
    return result;
}

export function toRadians(degrees:number){
    return degrees * (Math.PI / 180.0);
}