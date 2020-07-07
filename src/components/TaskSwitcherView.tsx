import React, {useEffect, useState} from 'react';
import {AppState, View} from 'react-native';

function TaskSwitcherView() {
  const [appState, setAppState] = useState(null);
  const [taskSwitcherVisible, setTaskSwitcherVisible] = useState(false);

  const _handleAppStateChange = nextAppState => {
    AppState.removeEventListener('change', _handleAppStateChange);
    if ((appState === 'background' || appState === 'inactive' || appState === 'unknown') && nextAppState === 'active') {
      setTaskSwitcherVisible(false);
    }
    if (appState === 'active' && (nextAppState === 'background' || nextAppState === 'inactive')) {
      setTaskSwitcherVisible(true);
    }
    setAppState(nextAppState);
  };

  useEffect(() => {
    AppState.addEventListener('change', _handleAppStateChange);

    return () => {
      AppState.removeEventListener('change', _handleAppStateChange);
    };
  }, [_handleAppStateChange]);

  return <>{taskSwitcherVisible && <View style={{backgroundColor: '#FFF', width: '100%', height: '100%'}} />}</>;
}

export default TaskSwitcherView;
