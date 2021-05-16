import React  from "react";
import axios from "axios";
import { apiBaseUrl } from "../constants";
import { addPatientData, changePatientData, useStateValue } from "../state";
import { Patient, Gender } from "../types";
import { useParams } from "react-router-dom";
import { Button, Checkbox, Form, Icon } from "semantic-ui-react";
import ExtendedDetails  from './ExtendedDetails';
import AddEntryModal  from '../AddEntryModal';
import { EntryFormValues } from "../AddEntryModal/AddHospitalEntryForm";


const PatientDetails: React.FC = () => {
    const [{ patientData }, dispatch] = useStateValue();
    const { id } = useParams<{ id: string }>();

    const [modalOpen, setModalOpen] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string | undefined>();
    const openModal = (): void => setModalOpen(true);
    const [patient, setPatient ] = React.useState<Patient>();
    const [entryFormType, setEntryFormType ] = React.useState<string>();


    React.useEffect(() => {
      const fetchPatientData =  async () => {
        try {          
          const { data: patientDataFromApi } = await axios.get<Patient>(
            `${apiBaseUrl}/patients/${id}`
          );  
          dispatch(addPatientData(patientDataFromApi));     
        } catch (e) {
          console.error(e);
        }
      };
      if(!Object.keys(patientData).includes(id)){
        fetchPatientData();
      }  
      const findPatient =  (Object.values(patientData).find(p => p.id === id));
      if (findPatient) {
        setPatient(findPatient);
      }
     
    }, [patientData, id, dispatch, entryFormType]);

    const closeModal = (): void => {
      setModalOpen(false);
      setError(undefined);
    };

    const showIcon = (gender: Gender) => {
        switch (gender) {
            case (Gender.Male):
                return (
                  <Icon name='mars'> </Icon>
                );
            case (Gender.Female):
                return (
                    <Icon name='venus'> </Icon>
                );
            default: 
                return (
                    <Icon name='other gender vertical'></Icon>
                );
        }   
    };


    const submitNewPatient = async (values: EntryFormValues) => {

      try {
        const { data: newPatient } = await axios.post<Patient>(
          `${apiBaseUrl}/patients/${id}/entries`,
          values
        );
 
        dispatch(changePatientData(newPatient));
        const findPatient =  (Object.values(newPatient).find(p => p.id === id));
        setPatient(findPatient);
        console.log(patient, "Patient");
        closeModal();
      } catch (e) {
        console.error(e.response.data);
        setError(e.response.data.error);
      }
    };
    
    console.log(entryFormType, "entry");
     
    if (!patient) return null;

    return (
      <div>
        <h1>{patient.name} {showIcon(patient.gender)}</h1>
        <p>ssn: {patient.ssn}</p>
        <p>occupation: {patient.occupation}</p>
        <h3>entries</h3>
        {patient.entries.map(e => {
            console.log(e);
            return (
              <>
              <ExtendedDetails entry={e}/>  
              </>
            );
          }
        )} 
        <AddEntryModal 
           modalOpen={modalOpen}
           onSubmit={submitNewPatient}
           error={error}
           onClose={closeModal}
           entryFormType={entryFormType}
        />

        <h2>Add new entry</h2>
        <Form>
          <Form.Field>
            Selected value: <b>{entryFormType}</b>
          </Form.Field>
          <Form.Field>
            <Checkbox
              radio
              label='Hospital'
              name='checkboxRadioGroup'
              value='Hospital'
              checked={entryFormType === 'Hospital'}
              onChange={() => setEntryFormType('Hospital')}
            />
            </Form.Field>
            <Form.Field>
              <Checkbox
                radio
                label='Healthcheck'
                name='checkboxRadioGroup'
                value='Healthcheck'
                checked={entryFormType === 'Healthcheck'}
                onChange={() => setEntryFormType('Healthcheck')}
              />
            </Form.Field>
            <Form.Field>
              <Checkbox
                radio
                label='Occupational healthcheck'
                name='checkboxRadioGroup'
                value='Occupational'
                checked={entryFormType === 'Occupational healthcheck'}
                onChange={() => setEntryFormType('Occupational healthcheck')}
              />
            </Form.Field>
        </Form>
        <br></br>
          <Button primary onClick={() => openModal()}>Add New Entry</Button>
   
      </div>
    );

};

export default PatientDetails;