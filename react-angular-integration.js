import _ from 'lodash';
import contextFactory from './context-factory';
import onChange from './on-change';
import safeValue from 'evolve-maturity-calendar/shared/utils/safe-value';
import safeApply from 'evolve-maturity-calendar/shared/utils/safe-apply';
import {store} from 'evolve-maturity-calendar/redux/store';

function controller(scope) {
	scope.context = contextFactory.create({ onChange });
	scope.isFilterPanelOpen = false;
	store.subscribe(_.partial(onStoreChange, scope));
}

function onStoreChange(scope) {	
	var newValue = safeValue(store.getState(), 'filterPanel.isOpen');
	if(scope.isFilterPanelOpen === newValue) {
		return;
	}
	scope.isFilterPanelOpen = newValue;
	safeApply(scope);
}

controller.$inject = ['$scope'];

export default controller;
