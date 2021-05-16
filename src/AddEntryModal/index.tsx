import React from 'react';
import { Modal, Segment } from 'semantic-ui-react';
import AddHospitalEntryForm, { EntryFormValues } from './AddHospitalEntryForm';
import AddOccupationalForm from './AddOccupationalForm';
import  AddHealthCareEntryForm  from './AddHealtcareEntryForm';


interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: EntryFormValues) => void;
  error?: string;
  entryFormType?: string;
}

const AddEntryModal = ({ modalOpen, onClose, onSubmit, error, entryFormType}: Props) => {
  
  if (entryFormType === undefined) {
    return (
      <>
      </>
    );
  }
  console.log(entryFormType, "entryFormType");

  const entryType = (e: string) => {
   
    switch (e) {
      case 'Hospital':
        return <AddHospitalEntryForm onSubmit={onSubmit} onCancel={onClose}/>;
      case 'Occupational healthcheck':
        return <AddOccupationalForm onSubmit={onSubmit} onCancel={onClose} />;
      case 'Healthcheck':
        return <AddHealthCareEntryForm onSubmit={onSubmit} onCancel={onClose} />;
      default:
        return null;
    }

  };
  
  return (
  <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
    <Modal.Header>Add a new patient entry</Modal.Header>
    <Modal.Content>
      {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
      {entryType(entryFormType)}
    </Modal.Content>
  </Modal>
  );
};

export default AddEntryModal;