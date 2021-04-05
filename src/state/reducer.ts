import { State } from "./state";
import { Diagnosis, Patient } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT_DATA";
      payload: Patient;
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  |
    {
      type: "SET_DIAGNOSIS_DATA";
      payload: Diagnosis[];
    }
    ;

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
      case "ADD_PATIENT":
        return {
          ...state,
          patients: {
            ...state.patients,
            [action.payload.id]: action.payload
          }
        };
      case "ADD_PATIENT_DATA":
        return {
          ...state,
          patientData: {
            ...state.patientData,
            [action.payload.id]: action.payload
          }
        };
        case "SET_DIAGNOSIS_DATA":
          return {
            ...state,
            diagnosis: {
              ...action.payload.reduce(
                (memo, diagnose) => ({ ...memo, [diagnose.code]: diagnose }),
                {}
              ),
            }
          };
    default:
      return state;
  }
};

export const setPatientList = (patientListFromApi: Patient[]): Action => {
  return {
      type: "SET_PATIENT_LIST", payload: patientListFromApi
  };
};

export const addPatientData = (patientDataFromApi: Patient ): Action => {
  return { 
    type: "ADD_PATIENT_DATA", payload: patientDataFromApi 
  };
};

export const addPatient = (newPatient: Patient ): Action => {
  return { 
    type: "ADD_PATIENT", payload: newPatient 
  };
};

export const setDiagnosisData = (diagnosisDataFromApi: Diagnosis[]): Action => {
  return {
    type: "SET_DIAGNOSIS_DATA", payload: diagnosisDataFromApi
  };
};