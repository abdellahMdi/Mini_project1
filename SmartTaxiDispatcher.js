const prompt = require("prompt-sync")();
let ArrayTaxies = [{ id: 1, position: 5, available: true, timeRemaining: 0, totalRides:0 },
{ id: 2, position: 12, available: true, timeRemaining: 0,totalRides: 0 },
{ id: 3, position: 20, available: true, timeRemaining: 0,totalRides: 0 }];
let ID_Taxie = 4;
let Requests =[]
let Id_Requests = 1;
function AjouterUneTaxie(){
    let location;
    let disponible;
    do{
        location = prompt("quelle est sa position : ");
    }while(location != Number(location))
    do{
        disponible = prompt("est il disponible ? (Oui/Non) :");
        disponible.toLocaleLowerCase();
    }while(disponible != "oui" && disponible != "non")
    const NewTaxie = {
        id : ID_Taxie,
        position : location,
        timeRemaining : 0,
        available : disponible == "oui" && timeRemaining == 0  ? true :false,
        totalRides : 0,
    }
    ArrayTaxies.push(NewTaxie);
    ID_Taxie++;
    
}

function AjouterUnRequest(){
    let bool = True;
    let leave;
    let client_position;
    let clientduree;
    let client_destination;
    while(bool){
    do{
        client_position = +prompt("quelle est la position du client : ");
    }while(location != Number(client_position))
        do{
        client_destination = +prompt("quelle position est la destination du client : ");
    }while(location != Number(client_destination))
    do{
        clientduree = +prompt("Quelle est la durée estimée du trajet(en minutes) : ");
    }while(location != Number(clientduree))
     
    const NewRequest = {
        reqId : Id_Requests,
        position : client_position,
        positionFinal : client_destination,
        duration : clientduree,
        time : date.getDate()+"       "+date.getHours()+" : "+date.getMinutes()+" : "+date.getSeconds(),
        TaxiAssinedToIt : "No One !!!"
    }
    Requests.push(NewRequest)
     leave = String(prompt('vouler vous ajouter un autre requeste ? (Y/N)'));
    if(leave == 'Y' || leave =='y'){
        
    }else{
        bool = false
    }
    }
}
    
    function liaisionRequest(){
    let FreeTaxies = 0;
    let ClosestTaxie;
    let libretaxi;
    let IndexFreeTaxies = [];
    function afterTimeOut(k){
    ArrayTaxies[ IndexFreeTaxies[k]].available = true ;
    Requests = Requests.shift();
    console.log("Taxie with id :",ArrayTaxies[ IndexFreeTaxies[k]].id,"is available Now !")
    }
    for(let i=0;i<ArrayTaxies.length;i++){
        if(ArrayTaxies[i].available == True){
             FreeTaxies++;
             IndexFreeTaxies.push(i);
            }
        }
        for(let j = 0 ;j<Requests.length;j++){
    
    if(FreeTaxies == 0){
        console.log("Aucun taxi n'est disponible pour le moment, veuillez patienter un instant !!");
        break;
    }else if(FreeTaxies == 1 && IndexFreeTaxies.length == 1){
        Requests[j].TaxiAssinedToIt = ArrayTaxies[IndexFreeTaxies[0]]
        ArrayTaxies[IndexFreeTaxies[0]].available = false;
        ArrayTaxies[IndexFreeTaxies[0]].position = client_destination
        ArrayTaxies[IndexFreeTaxies[0]].timeRemaining = 
        setTimeout(afterTimeOut(0),Requests[j].duration*10000 )
        ArrayTaxies[IndexFreeTaxies[0]].totalRides++;
        break;
    }else if(FreeTaxies > 1 && IndexFreeTaxies.length > 1){
        for(let i=0;i<IndexFreeTaxies.length;){
            if(i=0) ClosestTaxie =  ArrayTaxies[IndexFreeTaxies[i]].position;
            if(Math.abs(ClosestTaxie-Requests[j].position)>Math.abs(ArrayTaxies[IndexFreeTaxies[i]].position-Requests[j].position)){
                ClosestTaxie =  ArrayTaxies[IndexFreeTaxies[i]].position;
                libretaxi = i;
            }
        }
         Requests[j].TaxiAssinedToIt = ArrayTaxies[libretaxi]
        ArrayTaxies[libretaxi].available = false;
        ArrayTaxies[libretaxi].position = client_destination
        ArrayTaxies[libretaxi].timeRemaining = Requests[j].duration
        setTimeout(afterTimeOut(0),Requests[j].duration*10000 )
        ArrayTaxies[libretaxi].totalRides++;
    
    }
    }

}



function MenuPrincioal(){
    console.log("=========Menu ==========");
    console.log("1 : ajouter un request ");
    console.log("2 : ajouter un taxie");
    console.log("0 : Quitter");
    let choix
    do{
        choix = +prompt("Entrez le nombre de l'opération : ");
    }while(choix != 1 && choix != 2 && choix != 0)
        switch(choix){
            case 0 :
                console.log(ArrayTaxies);
                break;
            case 1 :
                AjouterUnRequest();
                liaisionRequest();
                break;
            case 2 :
                AjouterUneTaxie();
                break;

                
        }


}
