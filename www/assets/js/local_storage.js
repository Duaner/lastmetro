

////////////////////////////////////
//Création alarme Automatique     //
////////////////////////////////////

module.exports = function saveDestination(destination){
        window.localStorage.removeItem("0");
        window.localStorage.setItem("0", destination);

        var valueDestination = window.localStorage.getItem("0");
        console.log("Destination sauvegardée = "+valueDestination);
}
    

