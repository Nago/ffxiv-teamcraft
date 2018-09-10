import { AlarmsAction, AlarmsActionTypes } from './alarms.actions';
import { Alarm } from '../alarm';
import { AlarmGroup } from '../alarm-group';

export interface AlarmsState {
  alarms: Alarm[];
  groups: AlarmGroup[];
  loaded: boolean;
}

export const initialState: AlarmsState = {
  alarms: [],
  groups: [],
  loaded: false
};

export function alarmsReducer(
  state: AlarmsState = initialState,
  action: AlarmsAction): AlarmsState {
  switch (action.type) {
    case AlarmsActionTypes.AlarmsLoaded:
      return {
        ...state,
        alarms: action.alarms,
        groups: action.groups,
        loaded: true
      };

    case AlarmsActionTypes.AddAlarms:
      return {
        ...state,
        alarms: [...state.alarms, ...action.payload]
      };

    case AlarmsActionTypes.RemoveAlarm:
      return {
        ...state,
        alarms: [...state.alarms.filter(alarm => alarm.$key !== action.id)]
      };

    case AlarmsActionTypes.CreateAlarmGroup:
      return {
        ...state,
        groups: [...state.groups, new AlarmGroup(action.name, action.index)]
      };

    case AlarmsActionTypes.UpdateAlarmGroup:
      return {
        ...state,
        groups: [...state.groups.map(group => {
          if (group.$key === action.group.$key) {
            Object.assign(group, action.group);
          }
          return group;
        })]
      };

    case AlarmsActionTypes.DeleteAlarmGroup:
      return {
        ...state,
        groups: [...state.groups.filter(group => group.$key !== action.id)]
      };

    case AlarmsActionTypes.AssignGroupToAlarm:
      return {
        ...state,
        alarms: [...state.alarms.map(alarm => {
          if (alarm.$key === action.alarm.$key) {
            alarm.groupId = action.groupId;
          }
          return alarm;
        })]
      };
  }
  return state;
}
