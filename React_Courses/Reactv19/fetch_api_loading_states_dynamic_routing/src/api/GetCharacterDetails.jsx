
// we cannot use useParams to get the dynamic route value in loaders, instead we can directly destructure and et the value inside the router loader
export const getCharacterDetails = async ({ params }) => {

    const id = params.characterId;

    try{
        const response = await fetch(
            `https://data.jujutsukaisenapi.site/api/v1/characters/${id}`
        );

        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
};