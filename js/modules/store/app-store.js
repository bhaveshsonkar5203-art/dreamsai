/**
 * Centralized Application State Store
 * Handles application reactive state, listeners, and storage updates.
 */

class AppStore {
  constructor() {
    this.listeners = new Set();
    this.state = {
      data: [],
      selected: [],
      finalTraySerials: [],
      returnProductsState: [],
      gridCurrentPage: 1,
      gridPageSize: 36,
      selectedCurrentPage: 1,
      selectedPageSize: 24,
      lastSearchQuery: '',
      lastSortBy: '',
      controlsCollapsed: false,
      lastPdfBlob: null,
      lastPdfUrl: '',
      lastExportItems: [],
      lastExportTitle: 'Jewellery Catalogue',
      lastExportKind: 'none'
    };

    // Attach getter/setter wrappers on window for backwards compatibility with dynamic inline HTML events
    this.bindWindowGlobals();
  }

  bindWindowGlobals() {
    Object.defineProperty(window, 'selected', {
      get: () => this.state.selected,
      set: (val) => {
        this.setState({ selected: Array.isArray(val) ? val : [] });
      },
      configurable: true
    });

    Object.defineProperty(window, 'data', {
      get: () => this.state.data,
      set: (val) => {
        this.setState({ data: Array.isArray(val) ? val : [] });
      },
      configurable: true
    });
  }

  getState() {
    return this.state;
  }

  setState(partialState) {
    const previousState = { ...this.state };
    this.state = { ...this.state, ...partialState };
    this.notify(this.state, previousState);
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  notify(currentState, previousState) {
    for (const listener of this.listeners) {
      try {
        listener(currentState, previousState);
      } catch (err) {
        console.error('[AppStore] Error in store listener:', err);
      }
    }
  }

  // Helper actions
  setSelected(selectedSerials) {
    this.setState({ selected: [...selectedSerials] });
  }

  setFinalTraySerials(serials) {
    this.setState({ finalTraySerials: [...serials] });
  }

  setData(dataItems) {
    this.setState({ data: [...dataItems] });
  }
}

export const store = new AppStore();
