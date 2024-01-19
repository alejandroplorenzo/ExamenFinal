export type FromAPI = {
    net_worth: string;
    gender: string;
    nationality: string;
    occupation: string;
    height: string;
    birthday: string;
}

const getDatosAPI = async (
    nombreApellido: string
):Promise<FromAPI> => {
    const BASE_URL = "https://api.api-ninjas.com/v1";
    const API_KEY = Deno.env.get("API_KEY");
    const url = `${BASE_URL}/celebrity?name=${nombreApellido}`;
    const response = await fetch(url,
      {
        headers : {
            "X-Api-Key": 'API_KEY'
        }
      }  
    );

    const data = await response.json();

    return {
        net_worth: data.net_worth,
        gender: data.gender,
        nationality: data.nationality,
        occupation: data.occupation,
        height: data.height,
        birthday: data.birthday,
    }
}

export default getDatosAPI;