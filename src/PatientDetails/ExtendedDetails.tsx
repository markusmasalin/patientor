import React from 'react';
import { Entry } from '../types';
import { Grid, Segment, Header, Icon } from 'semantic-ui-react';
import { useStateValue } from '../state';

const ExtendedDetails: React.FC<{entry: Entry}> = ({entry}) => {
  const [{ diagnosis } ] = useStateValue();
  
    const assertNever = (value: never): never => {
        throw new Error(
          `Unhandled discriminated union member: ${JSON.stringify(value)}`
        );
      };
    
      const entryTypes = (e: Entry) => {
        switch (e.type){
            case "Hospital": 
              return "hospital outline" ;
            case "OccupationalHealthcare": 
              return "stethoscope";
            case "HealthCheck": 
                return "doctor";
            default: 
            assertNever(e);
        }
      };

      const healthColor = (c: number) => {
        switch (c) {
          case 4: return "black";
          case 3: return "red";
          case 2: return "orange";
          case 1: return "yellow";
          case 0: return "green";
        }
      };

    return (
        <>
            <Grid  stackable>
            <Grid.Column>
              <Segment>
                <Header as='h4' image>
                  <Header.Content>
                   {entry.date} <Icon name={entryTypes(entry)} size='big'/>
                    <Header.Subheader>{entry.description}</Header.Subheader>
                  </Header.Content>
                </Header>
                  <br></br>
                 {(entry.type === 'HealthCheck') &&
                 
                 <Icon name='heart' color={healthColor(entry.healthCheckRating)} />}
                 <ul>
                    {entry.diagnosisCodes?.map(((d, i) => {
                        return(
                          <>
                            <li key={i}>{d}  {Object.values(diagnosis).find(x => x.code === d)?.name};
                        </li>
                          </>
                        );
                    }))
                }
                </ul>   
                {(entry.type === 'Hospital') &&
                 <>
                   <h4>Discharge</h4>
                   <p>{entry.discharge.criteria} {entry.discharge.date} </p>
                 </>
                   }
                {(entry.type === 'OccupationalHealthcare') &&
                 <>
                   <h4>Employer</h4>
                   <p>{entry.employerName}</p>
                   <p>started: {entry.sickLeave?.startDate} </p> 
                   <p>ended: {entry.sickLeave?.endDate} </p> 
                 </>
                   }  
                 </Segment>

            </Grid.Column>
           
        </Grid>
      
        </>
    );
    
};


export default ExtendedDetails;

