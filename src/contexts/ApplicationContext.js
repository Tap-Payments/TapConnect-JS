import { createContext } from 'react';
import { AppStateStore } from '../stores';
const appStateStore = new AppStateStore();

//// this function is used to inject the instance of the rootStore (AppStateStore) into the context
//// then, whenever the RootStore is needed, it can be fetched from the hooks [function useAppCtx]

export const ApplicationContext = createContext({ appStateStore });
