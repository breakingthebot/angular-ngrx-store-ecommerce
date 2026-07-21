/*
 * store/meta-reducers/hydration.reducer.ts
 * Implements NgRx MetaReducer to hydrate and persist cart and order slices in localStorage.
 * Connects to: app.config.ts
 * Created: 2026-07-20
 */

import { ActionReducer, INIT, UPDATE } from '@ngrx/store';

export const STORAGE_KEY = 'NGRX_STORE_STATE';

export function hydrationMetaReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return (state, action) => {
    // 1. Hydrate state from localStorage on init action
    if (action.type === INIT || action.type === UPDATE) {
      const storageValue = localStorage.getItem(STORAGE_KEY);
      if (storageValue) {
        try {
          const savedState = JSON.parse(storageValue);
          return {
            ...state,
            ...savedState
          };
        } catch (e) {
          console.error('Failed to parse state from localStorage:', e);
          localStorage.removeItem(STORAGE_KEY);
        }
      }
    }

    // 2. Compute next state
    const nextState = reducer(state, action);

    // 3. Persist cart and order state slices to localStorage
    if (nextState) {
      const stateToSave = {
        cart: nextState.cart,
        order: nextState.order
      };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
      } catch (e) {
        console.error('Failed to save state to localStorage:', e);
      }
    }

    return nextState;
  };
}
