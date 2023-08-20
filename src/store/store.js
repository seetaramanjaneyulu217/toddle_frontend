import { createStore } from "redux";

const initialState = {
  heading: 'toddle',
  openBoardForm: false,
  boardchange: true,
  allboards:[],
  boardsSearchResults: [],
  singleboard: {},
  openboardeditform: false,
  boarddetails: {},

  postsPage: false,
  openPostsForm: false,
  allposts: [],
  boardPosts: [],
  postssearchresults: [],
  reloadpostspage: false,
  singlepost: {},
  editpost: false
};

const reducer = (state = initialState, action) => {

  if(action.type === 'boardheading') {
    return {
      ...state,
      heading: action.payload
    }
  }

  if(action.type === 'openBoardForm') {
    return {
      ...state,
      openBoardForm: action.payload
    }
  }

  if(action.type === 'openPostsForm') {
    return {
      ...state,
      openPostsForm: action.payload
    }
  }

  if(action.type === 'allposts') {
    return {
      ...state,
      allposts: action.payload
    }
  }

  if(action.type === 'boardchange') {
    return {
      ...state,
      boardchange: !state.boardchange
    }
  }

  if(action.type === 'allboards') {
    return {
      ...state,
      allboards: action.payload
    }
  }

  if(action.type === 'openboardeditform') {
    return {
      ...state,
      openboardeditform: action.payload
    }
  }

  if(action.type === 'boarddetails') {
    return {
      ...state,
      boarddetails: action.payload
    }
  }


  if(action.type === 'singleboard') {
    return {
      ...state,
      singleboard: action.payload
    }
  }

  if(action.type === 'postspage') {
    return {
      ...state,
      postsPage: action.payload
    }
  }

  if(action.type === 'boardssearch') {
    return {
      ...state,
      boardsSearchResults: action.payload
    }
  }

  if(action.type === 'boardposts') {
    return {
      ...state,
      boardPosts: action.payload
    }
  }

  if(action.type === 'postssearchresults') {
    return {
      ...state,
      postssearchresults: action.payload
    }
  }

  if(action.type === 'reloadpostspage') {
    return {
      ...state,
      reloadpostspage: !state.reloadpostspage
    }
  }

  if(action.type === 'singlepost') {
    return {
      ...state,
      singlepost: action.payload
    }
  }

  if(action.type === 'editpost') {
    return {
      ...state,
      editpost: action.payload
    }
  }

  return state;
};

const store = createStore(reducer);

export default store;