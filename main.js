//Atributos
const listado = $('#listado');
const input = $('input');
const caratula = $('#caratula');

let HelperLista = (url_img, id)=>{
    listado.append("<div class='imagen_min col-2'><img id ='"+ id + "' src='"+url_img+"' draggable='true' ondragstart='drag(event)' '></div>");
};

let HelperCaratula= (url_img)=>{
    caratula.empty();
    caratula.append("<img src='"+url_img+"'>")
};

let Busqueda= async ()=> {
    listado.empty();
    let autor = input.val();
   SC.initialize({
       client_id: 'aa06b0630e34d6055f9c6f8beb8e02eb'
   });
   try{
    let resultado = await SC.get('/tracks',{q:autor})
    let numeroCanciones = (resultado.length >5)? 5 : resultado.length;
    for(let i= 0; i<numeroCanciones; i++){
        (resultado[i].artwork_url !==null)
        ? HelperLista(resultado[i].artwork_url, resultado[i].id)
        : null;
    }
  
   }catch (error){
       console.error(error);
   }
}

let drag= (ev)=>{
    ev.dataTransfer.setData("text", ev.target.id);
    ev.dataTransfer.setData("image", ev.target.src);
}

let allowDrop = (ev)=>{
    ev.preventDefault();
}

let drop=(ev)=>{
    ev.preventDefault();
    let id = ev.dataTransfer.getData("text");
    let src= ev.dataTransfer.getData("image");
    HelperCaratula(src);
    reproducir(id);

}
let reproducir= async (id)=>{
    SC.initialize({
        client_id: 'aa06b0630e34d6055f9c6f8beb8e02eb'
    });
    try{
        player = await SC.stream('tracks/'+id);
        player.play();
    }catch (error){
        console.error(error);
    }
}

//let cancion = (track)=>{ let descripcion = track.description }

let pause=()=>{
    player.pause();
}
let play=()=>{
    player.play();
}
