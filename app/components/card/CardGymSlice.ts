import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Comment {
  id: number;
  user: string;
  text: string;
}

interface CardState {
  favorites: string[];
  likes: string[];
  comments: { [gymId: string]: Comment[] };
}

const initialState: CardState = {
  favorites: [],
  likes: [],
  comments: {},
};

const cardSlice = createSlice({
  name: "card",
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      if (state.favorites.includes(id)) {
        state.favorites = state.favorites.filter(favId => favId !== id);
      } else {
        state.favorites.push(id);
      }
    },
    toggleLike: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      if (state.likes.includes(id)) {
        state.likes = state.likes.filter(likeId => likeId !== id);
      } else {
        state.likes.push(id);
      }
    },
    addComment: (
      state,
      action: PayloadAction<{ gymId: string; comment: Comment }>
    ) => {
      const { gymId, comment } = action.payload;
      if (!state.comments[gymId]) {
        state.comments[gymId] = [];
      }
      state.comments[gymId].push(comment);
    },
    resetCardState: () => initialState,
  },
});

export const { toggleFavorite, toggleLike, addComment, resetCardState } = cardSlice.actions;
export default cardSlice.reducer;