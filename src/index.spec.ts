import * as interactor from './index';

describe('jacklog-interactor', () => {
  beforeEach(() => {
    interactor.resetCachedActions();
    interactor.setRunDry(true);
    interactor.setApiKey('', true);
  });

  it('runs', () => {
    expect(interactor).toBeTruthy();
    expect(interactor).toHaveProperty('setRunDry');
    expect(interactor).toHaveProperty('getCachedActions');
    expect(interactor).toHaveProperty('resetCachedActions');
    expect(interactor).toHaveProperty('setApiKey');
    expect(interactor).toHaveProperty('sendAction');
    expect(interactor.setRunDry).toBeInstanceOf(Function);
    expect(interactor.getCachedActions).toBeInstanceOf(Function);
    expect(interactor.resetCachedActions).toBeInstanceOf(Function);
    expect(interactor.setApiKey).toBeInstanceOf(Function);
    expect(interactor.sendAction).toBeInstanceOf(Function);
  });

  describe('setRunDry', () => {
    it('runs', () => {
      interactor.setRunDry(true);
      interactor.setRunDry(false);
    });
  });

  describe('getCachedActions', () => {
    it('runs', () => {
      const beforeActions = interactor.getCachedActions();
      expect(beforeActions.length).toEqual(0);

      interactor.sendAction('foo')
      .catch(() => {
        // DEV: ignore for now
      });

      const afterActions = interactor.getCachedActions();
      expect(afterActions.length).toEqual(1);
    });
  });

  describe('resetCachedActions', () => {
    it('runs', () => {
      interactor.sendAction('foo')
      .catch(() => {
        // DEV: ignore for now
      });

      const beforeActions = interactor.getCachedActions();
      expect(beforeActions.length).toEqual(1);

      interactor.resetCachedActions();

      const afterActions = interactor.getCachedActions();
      expect(afterActions.length).toEqual(0);
    });
  });

  describe('setApiKey', () => {
    it('errors if API key is null', () => {
      let err: any;

      try {
        interactor.setApiKey(null as any);
      } catch (e) {
        err = e;
      }

      expect(err).toBeTruthy();
    });

    it('errors if API key is not string', () => {
      let err: any;

      try {
        interactor.setApiKey(true as any);
      } catch (e) {
        err = e;
      }

      expect(err).toBeTruthy();
    });

    it('errors if API key is empty', () => {
      let err: any;

      try {
        interactor.setApiKey('');
      } catch (e) {
        err = e;
      }

      expect(err).toBeTruthy();
    });

    it('runs with API key empty with force', () => {
      let err: any;

      try {
        interactor.setApiKey('');
      } catch (e) {
        err = e;
      }

      expect(err).toBeTruthy();
    });

    it('runs', () => {
      interactor.setApiKey('foo');
      interactor.setApiKey('', true);
    });

    it('runs with API key empty with force', () => {
      interactor.setApiKey('', true);
    });
  });

  describe('sendAction', () => {
    it('errors if name is null', async () => {
      let err: any;

      try {
        await interactor.sendAction(null as any);
      } catch (e) {
        err = e;
      }

      expect(err).toBeTruthy();
    });

    it('errors if name is not string', async () => {
      let err: any;

      try {
        await interactor.sendAction(true as any);
      } catch (e) {
        err = e;
      }

      expect(err).toBeTruthy();
    });

    it('errors if name is empty', async () => {
      let err: any;

      try {
        await interactor.sendAction('');
      } catch (e) {
        err = e;
      }

      expect(err).toBeTruthy();
    });

    it('errors if properties invalid', async () => {
      let err: any;

      try {
        await interactor.sendAction('foo', true as any);
      } catch (e) {
        err = e;
      }

      expect(err).toBeTruthy();
    });

    it('passes the errors from the request', async () => {
      interactor.setApiKey('', true);

      const action = {
        name: 'foo',
        properties: { zed: 'bar '}
      };

      const startDateTime = (new Date()).getTime();

      let err: any;

      try {
        await interactor.sendAction(action.name, action.properties);
      } catch (e) {
        err = e;
      }

      expect(err).toBeTruthy();

      // we want it to debounce for at least "0.9s" (there might exist some fluctuation)
      const endDateTime = (new Date()).getTime();
      const timeResult = endDateTime - startDateTime;
      expect(timeResult).toBeGreaterThanOrEqual(900);
    });

    it('runs', async () => {
      interactor.setApiKey('foo');

      const action = {
        name: 'foo',
        properties: { zed: 'bar '}
      };

      const startDateTime = (new Date()).getTime();

      const beforeActions = interactor.getCachedActions();
      expect(beforeActions.length).toEqual(0);

      const promise = interactor.sendAction(action.name, action.properties);

      const afterActions = interactor.getCachedActions();
      expect(afterActions.length).toEqual(1);

      const res = await promise;
      expect(res).toBeTruthy();
      expect(res.length).toEqual(1);
      expect(res[0]).toBeTruthy();
      expect(res[0].name).toEqual(action.name);
      expect(res[0].properties).toEqual(action.properties);

      // we want it to debounce for at least "0.9s" (there might exist some fluctuation)
      const endDateTime = (new Date()).getTime();
      const timeResult = endDateTime - startDateTime;
      expect(timeResult).toBeGreaterThanOrEqual(900);

      const afterAllActions = interactor.getCachedActions();
      expect(afterAllActions.length).toEqual(0);
    });
  });
});
