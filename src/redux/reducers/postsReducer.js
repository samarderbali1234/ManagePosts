const initialState = {
    posts: [],
    loading: false,
    nextPage: null,
};

const postsReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOADING_POSTS':
            return { ...state, loading: true };
        case 'SET_POSTS':
            const existingPosts = Array.isArray(state.posts) ? state.posts : []; 
            const newPosts = action.payload.filter(post => !existingPosts.some(p => p.id === post.id)); // Filtre les doublons
            return {
                ...state,
                posts: [...existingPosts, ...newPosts],
                loading: false,
            };
        case 'ADD_NEW_POST':
            return {
                ...state,
                posts: [action.payload, ...state.posts], // Ajoute la nouvelle publication en haut de la liste
            };
        case 'SET_NEXT_PAGE':
            return { ...state, nextPage: action.payload };
        default:
            return state;
    }
};

export default postsReducer;
