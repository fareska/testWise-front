import React, {  useState } from 'react';
import { Alert, Button } from 'react-bootstrap';


export default function AlertDismissible(props) {
    const [show, setShow] = useState(true);
  
    return (
      <>
        <Alert show={show} variant="warning">
          <div className="d-flex justify-content-around">
          <Alert.Heading style={{color:'red'}}> {props.alert} </Alert.Heading>
            <Button onClick={() => setShow(false)} variant="warning">
              Close!!
            </Button>
          </div>
        </Alert>
        </>
    );
  }
  