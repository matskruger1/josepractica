export async function getUser(q){
    try{
        let response= await fetch ("https://rickandmortyapi.com/api/character/" +q )
        let json = await response.json ()
        return json;
    }catch(error) {
        console.log (error)

    }
}