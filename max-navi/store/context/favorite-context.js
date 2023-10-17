import {createContext, useState} from 'react';

export const FavoritesContext = createContext({
  id: [],
  addFavorite: (id) => {},
  removeFavorite: (id) => {},
});

const FavoritesContextProvider = ({children}) => {
  const [favoriteMealIds, setfavoriteMealIds] = useState([]);

  const addFavorite = (id) => {
    setfavoriteMealIds((currentFavIds) => [...currentFavIds, id]);
  };
  const removeFavorite = (id) => {
    setfavoriteMealIds((currentFavIds) =>
      currentFavIds.filter((mealId) => mealId !== id)
    );
  };

  const value = {
    ids: favoriteMealIds,
    addFavorite: addFavorite,
    removeFavorite: removeFavorite,
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};

export default FavoritesContextProvider;
