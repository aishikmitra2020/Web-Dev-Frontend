export const getMoviesData = async () => {
    try{
        const response = await fetch(
            'https://data.jujutsukaisenapi.site/api/v1/characters'
        );

        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
};