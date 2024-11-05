// Action pour définir les publications
export const addNewPost = (post) => ({
    type: 'ADD_NEW_POST',
    payload: post,
});
export const setPosts = (posts) => ({
    type: 'SET_POSTS',
    payload: posts,
});

// Action pour mettre à jour l'URL de la prochaine page
export const setNextPage = (nextPage) => ({
    type: 'SET_NEXT_PAGE',
    payload: nextPage,
});



export const fetchPagePosts = (pageId, nextPage = null) => async (dispatch, getState) => {
    dispatch({ type: 'LOADING_POSTS' });

    try {
         // Vérifiez la structure complète de Redux
         console.log("État Redux complet:", getState());

        const pages = getState().auth.pages; // Par exemple, si les pages sont dans `auth`

        if (!pages) {
            throw new Error("Les pages sont manquantes dans l'état Redux.");
        }

        // Récupérer le token d'accès spécifique à la page
        const pageAccessToken = pages.find(page => page.id === pageId)?.accessToken;

        if (!pageAccessToken) {
            throw new Error("Page access token is missing.");
        }
        // Construire l'URL pour récupérer les publications de la page
        const url = nextPage || `/${pageId}/posts?fields=message,full_picture,attachments{media,type,url}&access_token=${pageAccessToken}`;

        window.FB.api(url, (response) => {
            if (response && !response.error) {
                dispatch(setPosts(response.data));
                
                if (response.paging && response.paging.next) {
                    dispatch(setNextPage(response.paging.next));
                } else {
                    dispatch(setNextPage(null));
                }
            } else {
                console.error("Erreur lors de la récupération des publications :", response.error);
            }
        });
    } catch (error) {
        console.error("Erreur dans fetchPagePosts:", error);
    }
};

