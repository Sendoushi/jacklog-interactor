const TIME_DEBOUNCE = 1000;
const API_URL = 'https://api.jacklog.io/api';

let runDry = false;
let apiKey = '';

type IAction = {
  name: string;
  properties: { [key: string]: any; };
};

const cachedActions: IAction[] = [];
const resolveFns: Function[] = [];
const rejectFns: Function[] = [];

let timerDebounce: any;

/**
 * Sends the actions to the api
 */
const request = async (): Promise<IAction[]> => {
  if (apiKey == null || typeof apiKey !== 'string' || apiKey.length === 0) {
    throw new Error('API key is required to interact with Jacklog');
  }

  const actions = cachedActions.map((action) => {
    const properties = action.properties == null ? {} : action.properties;
    const newAction = {
      name: action.name,
      properties: {
        ...properties
      }
    };

    return newAction;
  });

  // clear the actions
  while (cachedActions.length > 0) {
    cachedActions.pop();
  }

  if (actions == null || actions.length === 0) {
    return [];
  }

  const req = {
    timeout: 180000,
    headers: {
      Authorization: `Key ${apiKey}`,
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({
      subject: 'action',
      verb: 'createActions',
      params: {
        apiKey,
        actions
      }
    })
  };

  if (!runDry) {
    const response = await fetch(API_URL, req);
    await response.json();
  }

  return actions;
};

/**
 * Sets a request debounce
 * @returns {Promise<IAction[]>}
 */
const requestDebounce = async (): Promise<IAction[]> => {
  const p: Promise<IAction[]> = new Promise((resolve, reject) => {
    // cache the resolve
    resolveFns.push(resolve);
    rejectFns.push(reject);

    // wait for the last one to go through
    if (timerDebounce != null) {
      return;
    }

    // set the debouncer so that actions don't screw the server
    timerDebounce = setTimeout(
      async () => {
        timerDebounce = null;

        // actually request
        try {
          const data = await request();

          // call all the resolves
          for (let i = 0; i < resolveFns.length; i += 1) {
            resolveFns[i](data);
          }
        } catch (err) {
          // call all the rejects
          for (let i = 0; i < rejectFns.length; i += 1) {
            rejectFns[i](err);
          }
        }

        // clear the resolves / rejects
        while (resolveFns.length > 0) {
          resolveFns.pop();
        }

        while (rejectFns.length > 0) {
          rejectFns.pop();
        }
      },
      TIME_DEBOUNCE
    );
  });

  return p;
};

/**
 * Gets all the cached actions
 */
export const getCachedActions = () => cachedActions;

/**
 * Resets all the cached actions
 */
export const resetCachedActions = () => {
  while (cachedActions.length > 0) {
    cachedActions.pop();
  }
};

/**
 * Sets the library to run dry for testing purposes
 * @param {boolean} runDry
 */
export const setRunDry = (newRunDry: boolean) => {
  runDry = newRunDry;
};

/**
 * Sets the API key for the interactions
 * @param {string} newKey
 */
export const setApiKey = (newKey: string, force = false) => {
  if (newKey == null || typeof newKey !== 'string' || newKey.length === 0) {
    if (!force) {
      throw new Error('API key is required to interact with JackLog');
    }
  }

  apiKey = newKey;
};

/**
 * Send an action to JackLog
 * @param {string} name
 * @param {object?} properties
 */
export const sendAction = async (
  name: string,
  properties: { [key: string]: any; } = {}
) => {
  if (name == null || typeof name !== 'string' || name.length === 0) {
    throw new Error('A name is required to create an action with JackLog');
  }

  if (typeof properties !== 'object') {
    throw new Error('Properties need to be an object to create an action with JackLog');
  }

  cachedActions.push({ name, properties });
  return requestDebounce();
};
